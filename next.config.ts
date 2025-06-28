import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all HTTPS domains, but consider narrowing down to specific domains for security
        pathname: '/**', // Optional: you can also restrict specific paths here if needed
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '1000mb', // Ensure this is the right size for your app. Consider reducing if unnecessary
    },
  },
};

export default nextConfig;
