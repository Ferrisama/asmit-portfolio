import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/asmit-portfolio",
  assetPrefix: "/asmit-portfolio/",
  trailingSlash: true,

  // Disable optimizations causing the hang
  reactStrictMode: false,
  swcMinify: false,

  // Increase build timeout
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
