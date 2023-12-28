import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";
import react from "@astrojs/react";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), react(), svelte()]
});