import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

export default createConfig({
  devIndicators: false,
  distDir: "artifacts/next/dist",
  output: "standalone",
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/about",
      permanent: false,
    },
  ],
});

function createConfig(config: NextConfig): NextConfig {
  return process.env.ANALYZE === "true"
    ? bundleAnalyzer({ openAnalyzer: false })(config)
    : config;
}
