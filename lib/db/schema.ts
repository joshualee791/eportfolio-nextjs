import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from 'drizzle-orm/pg-core'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password'),
  role: text('role').notNull().default('admin'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const caseStudies = pgTable('case_studies', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  summary: text('summary').notNull(),
  problem: text('problem').notNull(),
  approach: text('approach').notNull(),
  outcome: text('outcome').notNull(),
  coverImage: text('cover_image'),
  coverImageAlt: text('cover_image_alt'),
  seoTitle: text('seo_title'),
  metaDescription: text('meta_description'),
  techStack: text('tech_stack')
    .array()
    .notNull()
    .default([]),
  githubUrl: text('github_url'),
  liveUrl: text('live_url'),
  featured: boolean('featured').notNull().default(false),
  order: integer('order').notNull().default(0),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const artifacts = pgTable('artifacts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  fileUrl: text('file_url').notNull(),
  coverImage: text('cover_image'),
  tags: text('tags').array().notNull().default([]),
  seoTitle: text('seo_title'),
  metaDescription: text('meta_description'),
  coverImageAlt: text('cover_image_alt'),
  featured: boolean('featured').notNull().default(false),
  order: integer('order').notNull().default(0),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const blogPosts = pgTable('blog_posts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  coverImage: text('cover_image'),
  coverImageAlt: text('cover_image_alt'),
  seoTitle: text('seo_title'),
  metaDescription: text('meta_description'),
  published: boolean('published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
})

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export type CaseStudy = InferSelectModel<typeof caseStudies>
export type NewCaseStudy = InferInsertModel<typeof caseStudies>

export type Artifact = InferSelectModel<typeof artifacts>
export type NewArtifact = InferInsertModel<typeof artifacts>

export type BlogPost = InferSelectModel<typeof blogPosts>
export type NewBlogPost = InferInsertModel<typeof blogPosts>

export type SiteSetting = InferSelectModel<typeof siteSettings>
export type NewSiteSetting = InferInsertModel<typeof siteSettings>
