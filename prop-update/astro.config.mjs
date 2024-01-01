import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";
import svelte from "@astrojs/svelte";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), svelte()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});