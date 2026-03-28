/**
 * Seed script — uploads defaultContent as content.json to Vercel Blob.
 *
 * Run:
 *   npx ts-node --skip-project scripts/seed-content.ts
 *
 * Requires BLOB_READ_WRITE_TOKEN to be present in .env.local (or already in
 * the environment). The resulting URL is printed as:
 *   CONTENT_BLOB_URL=https://...
 * Copy that value and add it to .env.local, then push to Vercel with:
 *   vercel env add CONTENT_BLOB_URL
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { put } from "@vercel/blob";
import { defaultContent } from "../lib/content";

// ---------------------------------------------------------------------------
// Load .env.local so BLOB_READ_WRITE_TOKEN is available when running locally
// via ts-node (which does not auto-load env files).
// ---------------------------------------------------------------------------
function loadEnvLocal(): void {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    // Strip surrounding single or double quotes (added by `vercel env pull`)
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    // Only set if not already defined (real env vars take precedence)
    if (key && !(key in process.env)) {
      process.env[key] = val;
    }
  }
}

loadEnvLocal();

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------
async function seed(): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error(
      "\nERROR: BLOB_READ_WRITE_TOKEN is not set.\n" +
        "Make sure it is in your .env.local file and re-run the script.\n"
    );
    process.exit(1);
  }

  console.log("Uploading content.json to Vercel Blob...");

  const json = JSON.stringify(defaultContent, null, 2);

  const blob = await put("content.json", json, {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    token,
  });

  console.log("\nSeed complete!");
  console.log("─────────────────────────────────────────────────────────────");
  console.log("CONTENT_BLOB_URL=" + blob.url);
  console.log("─────────────────────────────────────────────────────────────");
  console.log("\nNext steps:");
  console.log("1. Add to .env.local:");
  console.log("   CONTENT_BLOB_URL=" + blob.url);
  console.log("\n2. Push to Vercel:");
  console.log("   vercel env add CONTENT_BLOB_URL");
}

seed().catch((err: unknown) => {
  console.error("Seed failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
