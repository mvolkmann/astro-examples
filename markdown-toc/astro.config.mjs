import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";

export default defineConfig({
  markdown: {
    remarkPlugins: [[remarkToc, { maxDepth: 3, ordered: true, tight: false }]],
  },
});
