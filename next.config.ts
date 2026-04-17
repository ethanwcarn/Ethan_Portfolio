import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent this site from being embedded in iframes (clickjacking protection)
  { key: "X-Frame-Options", value: "DENY" },
  // Stop browsers from MIME-sniffing the content type (prevents content-type attacks)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send the origin (no path) as the referrer when navigating cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable access to sensitive browser APIs that this site doesn't use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Ask browsers to always connect over HTTPS for 1 year (production only — Vercel handles this)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Enable basic XSS filtering in older browsers (defense in depth)
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
