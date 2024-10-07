/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minotar.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'db.wardrobe.gg',
        port: '',
      },
    ]
  }
};

export default nextConfig;
