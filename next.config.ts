import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;