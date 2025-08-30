import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // 🚑 disables TS errors only on build
  },
  // Production optimizations
  output: "standalone",
};

export default nextConfig;
