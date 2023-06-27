/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true
  },
  webpack: (config, { isServer, nextRuntime }) => {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }
    return config
  },
};

module.exports = nextConfig;
