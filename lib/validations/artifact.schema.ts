import { z } from 'zod'

export const artifactTypes = ['pdf', 'slides', 'design', 'link', 'other'] as const

export const artifactSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug may only contain lowercase letters, numbers, and hyphens'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(300, 'Description must be 300 characters or fewer'),
  type: z.enum(artifactTypes),
  fileUrl: z.string().min(1, 'File URL is required'),
  tags: z.array(z.string()),
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

export type ArtifactInput = z.infer<typeof artifactSchema>
