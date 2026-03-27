import type { NextConfig } from "next";

/**
 * Mirror of `next.config.mjs`. Next.js 14’s config loader does not execute
 * `.ts` here — the live config is `next.config.mjs`. Keep both in sync.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
