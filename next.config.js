/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // swcMinify: true,
  experimental: { urlImports: ["https://cdn.jsdelivr.net"] },
};

module.exports = nextConfig;
