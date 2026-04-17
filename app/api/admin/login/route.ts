import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { checkLoginRateLimit } from "@/lib/ratelimit";

// bcrypt silently truncates at 72 bytes — a very long input still runs the
// full work factor before truncating, enabling CPU-exhaustion DoS.
const MAX_PASSWORD_LENGTH = 256;

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // If Turnstile isn't configured, skip verification (graceful degradation)
  if (!secret) return true;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token, remoteip: ip }),
      }
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    // If Cloudflare is unreachable, fail open so legitimate admins aren't locked out
    return true;
  }
}

export async function POST(req: NextRequest) {
  // --- Rate limiting (per IP, sliding window 5 req / 15 min) ---
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, retryAfter } = await checkLoginRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter ?? 60) },
      }
    );
  }

  // --- Content-type & JSON validation ---
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { password, cfToken } = body as Record<string, unknown>;

  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 });
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // --- Cloudflare Turnstile CAPTCHA verification ---
  const tokenStr = typeof cfToken === "string" ? cfToken : "";
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (turnstileSecret && !tokenStr) {
    return NextResponse.json({ error: "CAPTCHA token required" }, { status: 400 });
  }

  if (tokenStr) {
    const captchaOk = await verifyTurnstile(tokenStr, ip);
    if (!captchaOk) {
      return NextResponse.json({ error: "CAPTCHA verification failed" }, { status: 400 });
    }
  }

  // --- Password verification ---
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.ADMIN_JWT_SECRET;

  if (!hash || !secret) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const valid = await bcrypt.compare(password, hash.trim());
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // --- Issue JWT session cookie ---
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(secret.trim()));

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return res;
}
