import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
  // type: "content",
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    description: z.string(),
    // Publication fields
    journalAbbreviation: z.string().optional(),
    impactFactor: z.union([z.string(), z.number()]).optional(),
    year: z.union([z.string(), z.number()]).optional(),
    externalDoiLink: z.string().optional(),
    authors: z.array(z.string()).optional(),
    journalFullName: z.string().optional(),
    issueDetails: z.string().optional(),
    abstract: z.string().optional(),
    pdfUrl: z.string().optional(),
    citationBibtex: z.string().optional(),
    citationPlain: z.string().optional(),
  }),
});

const docsCollection = defineCollection({
  // type: "content",
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  docs: docsCollection,
};
