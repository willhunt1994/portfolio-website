import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
