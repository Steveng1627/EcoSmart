/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ecosmart/ui', '@ecosmart/types'],
  images: {
    domains: ['localhost'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default-key',
  },
  // Support for newer Node.js versions
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
