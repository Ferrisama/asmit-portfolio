import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/asmit-portfolio",
  assetPrefix: "/asmit-portfolio/",
};

export default nextConfig;
