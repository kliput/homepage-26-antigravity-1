// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from 'rehype-external-links';
import { remarkRewriteLinks } from "./src/plugins/remark-rewrite-links.mjs";
import { remarkNormalizeLanguages } from "./src/plugins/remark-normalize-languages.mjs";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://onedata.org',

  image: {
    responsiveStyles: true,
    layout: "constrained",
  },

  markdown: {
    remarkPlugins: [remarkRewriteLinks, remarkNormalizeLanguages],
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ],
  },

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});