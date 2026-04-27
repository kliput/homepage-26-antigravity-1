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

export const ChangelogEntrySchema = z.object({
  issue: z.string(),
  products: z.array(z.string()).optional(),
  description: z.string(),
});

export type ChangelogEntryType = z.infer<typeof ChangelogEntrySchema>;

const releasesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/releases" }),
  schema: z.object({
    version: z.string(), // e.g. "25.0"
    codename: z.string().optional(),
    date: z.date(), // for chronological sorting with blog posts
    // Provided for squashed release, e.g., 17.06.x, which summaries multiple legacy
    // releases, is date of the first unstable release in this line.
    beginDate: z.date().optional(),
    // e.g. "20.02.8"
    minOneprovider: z.string().optional(),
    // blog post / release page title
    title: z.string(),
    // short description (card + full post header)
    description: z.string(),
    // blog card image
    image: z.string().optional(),
    highlights: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
    // non-buletted single paragraph in the Highlights section if highlights collection is empty
    highlightsPlaceholder: z.string().optional(),
    // upgrade note bullet points
    upgradeNotes: z.array(z.string()).optional(),
    changelog: z.array(ChangelogEntrySchema),
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
