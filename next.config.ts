import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Allow production builds even if there are type errors
    ignoreBuildErrors: true,
  },
  output:"export",
};

export default nextConfig;
