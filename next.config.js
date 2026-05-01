/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Each static page is generated at build time; Zoho changes trigger revalidate.
  // Revalidate window (ISR). Admin button can also force on-demand revalidation.
  experimental: {},
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
