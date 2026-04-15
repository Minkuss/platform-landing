import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY ?? "";
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? "";
const repositoryName = repository.split("/")[1] ?? "";
const derivedBasePath =
  repositoryName && owner && repositoryName !== `${owner}.github.io`
    ? `/${repositoryName}`
    : "";

const basePath = process.env.BASE_PATH ?? derivedBasePath;
const withBasePath = basePath.length > 0;

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
