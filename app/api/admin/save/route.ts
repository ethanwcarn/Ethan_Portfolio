import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { put } from "@vercel/blob";

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

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await req.json();

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
