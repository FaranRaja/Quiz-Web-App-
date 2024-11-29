// frontend/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds = true,
  },
  typescript: {
    // Ensures the TypeScript build is included in the Vercel deployment
    ignoreBuildErrors: false, // You can set to true if you want to bypass TypeScript errors
  },
  transpilePackages: ["lucide-react"],
  sassOptions: {
    includePaths: ["./styles"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Backend server
      },
    ];
  },
};

export default nextConfig;
