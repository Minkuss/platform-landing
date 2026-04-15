import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH ?? "";
const withBasePath = process.env.NODE_ENV === "production" && basePath.length > 0;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: withBasePath ? basePath : undefined,
  assetPrefix: withBasePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
      },
    ],
  },
};

export default nextConfig;
