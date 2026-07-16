import { z } from 'zod'

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug may only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(1, 'Excerpt is required').max(200, 'Excerpt must be 200 characters or fewer'),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.string().url().optional().or(z.literal('')),
  coverImageAlt: z.string().optional().or(z.literal('')),
  seoTitle: z.string().max(60, 'SEO title should be 60 characters or fewer').optional().or(z.literal('')),
  metaDescription: z
    .string()
    .max(160, 'Meta description should be 160 characters or fewer')
    .optional()
    .or(z.literal('')),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  published: z.boolean(),
  publishedAt: z.date().nullable(),
})

export type BlogPostInput = z.infer<typeof blogPostSchema>
