import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://exam-app.elevate-bootcamp.cloud/storage/entities/**'),
    ]
  },
  serverExternalPackages: ['next-auth'],
};

export default nextConfig;