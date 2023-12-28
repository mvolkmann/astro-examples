import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import svelte from '@astrojs/svelte';
import alpinejs from '@astrojs/alpinejs';
import icon from 'astro-icon';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), svelte(), alpinejs(), icon(), react()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});
