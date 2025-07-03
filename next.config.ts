import rehypePrism from "@mapbox/rehype-prism";
import bundleAnalyzer from "@next/bundle-analyzer";
import nextMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});

export default withMDX(
  createConfig({
    distDir: "artifacts/next/dist",
    output: "standalone",
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
    reactStrictMode: true,
  }),
);

function createConfig(config: NextConfig): NextConfig {
  return process.env.ANALYZE === "true"
    ? bundleAnalyzer({ openAnalyzer: false })(config)
    : config;
}
