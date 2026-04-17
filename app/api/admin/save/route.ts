import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { put } from "@vercel/blob";
import type { SiteContent } from "@/lib/content";

async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("admin_session")?.value;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret.trim()));
    return true;
  } catch {
    return false;
  }
}

// Recursively walk a value and trim all strings, returning null for anything
// that isn't a plain string/number/boolean/array/object.
function sanitizeValue(val: unknown, depth = 0): unknown {
  if (depth > 10) return null; // prevent deeply nested abuse
  if (typeof val === "string") return val.trim().slice(0, 10_000);
  if (typeof val === "number" || typeof val === "boolean") return val;
  if (Array.isArray(val)) return val.slice(0, 500).map((v) => sanitizeValue(v, depth + 1));
  if (val !== null && typeof val === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      // Only allow plain string keys, max 100 chars
      if (typeof k === "string" && k.length <= 100) {
        out[k] = sanitizeValue(v, depth + 1);
      }
    }
    return out;
  }
  return null;
}

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Reject non-JSON content types
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "Invalid content shape" }, { status: 400 });
  }

  const content = sanitizeValue(raw) as SiteContent;

  // Extract filename from CONTENT_BLOB_URL, default to content.json
  const blobUrl = process.env.CONTENT_BLOB_URL ?? "";
  const filename = blobUrl ? blobUrl.split("/").pop() ?? "content.json" : "content.json";

  const blob = await put(filename, JSON.stringify(content, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });

  return NextResponse.json({ ok: true, url: blob.url });
}
