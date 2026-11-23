/** @type {import('next').NextConfig} */
// Static export for Cloudflare Pages (free plan: static assets only, no Functions = nothing metered).
// Security and cache headers live in public/_headers; the www -> apex redirect is a Cloudflare redirect rule.
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

module.exports = nextConfig;
