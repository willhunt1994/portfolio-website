import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/mockup-submissions-2', destination: '/mockups-submissions-2', permanent: false },
      { source: '/mockup-submissions-2/:path*', destination: '/mockups-submissions-2/:path*', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shadcnstudio.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "**.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.pixieset.com",
      },
      {
        protocol: "https",
        hostname: "pixieset.com",
      },
      {
        protocol: "https",
        hostname: "dropbox.com",
      },
      {
        protocol: "https",
        hostname: "**.dropbox.com",
      },
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
