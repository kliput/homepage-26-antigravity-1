// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";
import { remarkRewriteLinks } from "./src/plugins/remark-rewrite-links.mjs";
import { remarkNormalizeLanguages } from "./src/plugins/remark-normalize-languages.mjs";

// https://astro.build/config
export default defineConfig({
  site: 'https://onedata.org',
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  markdown: {
    remarkPlugins: [remarkRewriteLinks, remarkNormalizeLanguages],
  },
  integrations: [sitemap()]
});