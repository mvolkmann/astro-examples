import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});