import type { NextConfig } from "next";
const url = process.env.NEXT_PUBLIC_API_URL

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${url}/:path*`,
      },
    ];
  },
};

export default nextConfig;
