// @ts-check
console.log(">> [CONFIG] ASTRO CONFIG LOADED - SSG MODE (STATIC) IS ACTIVE");
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';


import { fileURLToPath, URL } from 'url';

// https://astro.build/config
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  site: 'https://alexis-vuadelle.com',
  output: 'static',
  image: {
    domains: ['alexis-vuadelle.com']
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      preserveSymlinks: true
    }
  }
});