import { z } from 'zod'

export const caseStudySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug may only contain lowercase letters, numbers, and hyphens'),
  summary: z.string().min(1, 'Summary is required').max(140, 'Summary must be 140 characters or fewer'),
  problem: z.string().min(1, 'The Problem section is required'),
  approach: z.string().min(1, 'Our Approach section is required'),
  outcome: z.string().min(1, 'The Outcome section is required'),
  techStack: z.array(z.string()),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  coverImage: z.string().url().optional().or(z.literal('')),
  coverImageAlt: z.string().optional().or(z.literal('')),
  seoTitle: z.string().max(60, 'SEO title should be 60 characters or fewer').optional().or(z.literal('')),
  metaDescription: z
    .string()
    .max(160, 'Meta description should be 160 characters or fewer')
    .optional()
    .or(z.literal('')),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean(),
  order: z.number().int(),
  publishedAt: z.date().nullable(),
})

export type CaseStudyInput = z.infer<typeof caseStudySchema>
