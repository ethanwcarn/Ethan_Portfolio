import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// bcrypt silently truncates inputs at 72 bytes — a caller sending megabytes of
// data would still cause the full bcrypt work-factor to run before truncation,
// creating a CPU-exhaustion (DoS) vector. Cap at 256 chars on the way in.
const MAX_PASSWORD_LENGTH = 256;

export async function POST(req: Request) {
  // Reject non-JSON content types
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

  const { password } = body as Record<string, unknown>;

  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 });
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const hash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.ADMIN_JWT_SECRET;

  if (!hash || !secret) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const valid = await bcrypt.compare(password, hash.trim());
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

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
