import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
  }),
});

const releasesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/releases" }),
  schema: z.object({
    version: z.string(), // e.g. "25.0"
    codename: z.string().optional(),
    releaseDate: z.string(), // e.g. "Q1 2025" (human-readable)
    date: z.date(), // for chronological sorting with blog posts
    minOneprovider: z.string().optional(), // e.g. "20.02.8"
    title: z.string(), // blog post / release page title
    description: z.string(), // short description (card + full post header)
    image: z.string().optional(), // blog card image
    highlights: z.array(
      z.object({
        title: z.string(),
        shortDescription: z.string(),
      }),
    ),
    upgradeNotes: z.array(z.string()), // upgrade note bullet points
    changelog: z.array(
      z.object({
        issue: z.string(),
        products: z.string(),
        description: z.string(),
      }),
    ),
  }),
});

const releasesDocsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/releases-docs",
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  docs: docsCollection,
  releases: releasesCollection,
  "releases-docs": releasesDocsCollection,
};
