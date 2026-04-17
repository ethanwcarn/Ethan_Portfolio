import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limiter is only active when Upstash env vars are present.
// If not configured, checkRateLimit() always returns allowed so the site
// still works during local dev and before Upstash is set up.
let ratelimit: Ratelimit | null = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  // Sliding window: max 5 login attempts per IP per 15 minutes
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    prefix: "admin_login",
    analytics: true,
  });
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number; // seconds until the window resets
}

export async function checkLoginRateLimit(ip: string): Promise<RateLimitResult> {
  if (!ratelimit) return { allowed: true };

  const { success, reset } = await ratelimit.limit(ip);
  if (!success) {
    return { allowed: false, retryAfter: Math.ceil((reset - Date.now()) / 1000) };
  }
  return { allowed: true };
}
