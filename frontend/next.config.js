/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:5041/:path*',
      },
    ]
  },
}

module.exports = nextConfig
