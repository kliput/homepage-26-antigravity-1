// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkFlexibleContainers from "remark-flexible-containers";
import { remarkRewriteLinks } from "./src/plugins/remark-rewrite-links.mjs";
import { remarkNormalizeLanguages } from "./src/plugins/remark-normalize-languages.mjs";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://onedata.org",

  image: {
    responsiveStyles: true,
    layout: "constrained",
  },

  markdown: {
    remarkPlugins: [
      remarkRewriteLinks,
      remarkNormalizeLanguages,
      remarkFlexibleContainers,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: {
            "aria-hidden": "true",
            tabIndex: -1,
            className: ["heading-anchor-link"],
          },
          content: {
            type: "text",
            value: "#",
          },
        },
      ],
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
  },

  integrations: [sitemap(), react(), tailwind()],
});
