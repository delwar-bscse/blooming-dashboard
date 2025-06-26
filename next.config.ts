import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all HTTPS domains
      },
    ],
  },
  serverActions: {
    bodySizeLimit: '5mb', // Adjust the limit to whatever size you need
  },
};

export default nextConfig;
