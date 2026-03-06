// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";
import { remarkRewriteLinks } from "./src/plugins/remark-rewrite-links.mjs";

// https://astro.build/config
export default defineConfig({
  site: 'https://onedata.org',
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  markdown: {
    remarkPlugins: [remarkRewriteLinks],
  },
  integrations: [sitemap()]
});