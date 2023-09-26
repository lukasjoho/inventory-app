/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uplift-images.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
