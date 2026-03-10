import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
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
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'docs': docsCollection,
};
