import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/asmit-portfolio" : "",
  assetPrefix: isProd ? "/asmit-portfolio/" : "",
  trailingSlash: true,
};

export default nextConfig;
