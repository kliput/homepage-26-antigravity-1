// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://onedata.org',
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  integrations: [sitemap()]
});