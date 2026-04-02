import type { NextConfig } from "next";

/**
 * Static export: deploy the `out/` directory to any static host.
 * `images.unoptimized` is required for `next/image` with `output: "export"`.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
