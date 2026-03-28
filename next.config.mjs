/** @type {import('next').NextConfig} */
const nextConfig = {
  // Not `output: "export"` — we need serverless API routes (e.g. /api/webring/join) on Vercel.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
