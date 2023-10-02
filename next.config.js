/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",

        // port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",

        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
