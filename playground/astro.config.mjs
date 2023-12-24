import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import svelte from "@astrojs/svelte";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), svelte(), alpinejs()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});