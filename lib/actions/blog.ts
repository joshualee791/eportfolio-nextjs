'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { blogPosts } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/auth/session'
import { blogPostSchema, type BlogPostInput } from '@/lib/validations/blogPost.schema'

type ActionResult = { success: true; id?: string } | { success: false; error: string }

function toValues(v: BlogPostInput) {
  return {
    title: v.title,
    slug: v.slug,
    excerpt: v.excerpt,
    content: v.content,
    coverImage: v.coverImage || null,
    coverImageAlt: v.coverImageAlt || null,
    seoTitle: v.seoTitle || null,
    metaDescription: v.metaDescription || null,
    canonicalUrl: v.canonicalUrl || null,
    published: v.published,
    publishedAt: v.publishedAt,
  }
}

export async function createBlogPost(data: BlogPostInput): Promise<ActionResult> {
  await requireAdmin()
  const parsed = blogPostSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  try {
    const [row] = await db.insert(blogPosts).values(toValues(parsed.data)).returning({ id: blogPosts.id })
    revalidatePath('/blog')
    revalidatePath(`/blog/${parsed.data.slug}`)
    return { success: true, id: row.id }
  } catch {
    return { success: false, error: 'Failed to create blog post' }
  }
}

export async function updateBlogPost(id: string, data: BlogPostInput): Promise<ActionResult> {
  await requireAdmin()
  const parsed = blogPostSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  try {
    await db
      .update(blogPosts)
      .set({ ...toValues(parsed.data), updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
    revalidatePath('/blog')
    revalidatePath(`/blog/${parsed.data.slug}`)
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update blog post' }
  }
}

export async function deleteBlogPost(id: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    const [existing] = await db.select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.id, id))
    await db.delete(blogPosts).where(eq(blogPosts.id, id))
    revalidatePath('/blog')
    if (existing) revalidatePath(`/blog/${existing.slug}`)
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete blog post' }
  }
}
