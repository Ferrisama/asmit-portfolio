import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/asmit-portfolio",
  assetPrefix: "/asmit-portfolio/",
  trailingSlash: true,
};

export default nextConfig;
