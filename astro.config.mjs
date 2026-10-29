// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Organization Pages serves this repository at the domain root.
export default defineConfig({
  site: 'https://tpami-trustworthy-ai-si.github.io',
  base: '/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    assets: 'assets',
  },
  vite: { plugins: [tailwindcss()] },
});
