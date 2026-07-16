'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { artifacts } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/auth/session'
import { artifactSchema, type ArtifactInput } from '@/lib/validations/artifact.schema'

type ActionResult = { success: true; id?: string } | { success: false; error: string }

function toValues(v: ArtifactInput) {
  return {
    title: v.title,
    slug: v.slug,
    description: v.description,
    type: v.type,
    fileUrl: v.fileUrl,
    tags: v.tags,
    coverImage: v.coverImage || null,
    coverImageAlt: v.coverImageAlt || null,
    seoTitle: v.seoTitle || null,
    metaDescription: v.metaDescription || null,
    canonicalUrl: v.canonicalUrl || null,
    featured: v.featured,
    order: v.order,
    publishedAt: v.publishedAt,
  }
}

export async function createArtifact(data: ArtifactInput): Promise<ActionResult> {
  await requireAdmin()
  const parsed = artifactSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  try {
    const [row] = await db.insert(artifacts).values(toValues(parsed.data)).returning({ id: artifacts.id })
    revalidatePath('/artifacts')
    revalidatePath(`/artifacts/${parsed.data.slug}`)
    return { success: true, id: row.id }
  } catch {
    return { success: false, error: 'Failed to create artifact' }
  }
}

export async function updateArtifact(id: string, data: ArtifactInput): Promise<ActionResult> {
  await requireAdmin()
  const parsed = artifactSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  try {
    await db
      .update(artifacts)
      .set({ ...toValues(parsed.data), updatedAt: new Date() })
      .where(eq(artifacts.id, id))
    revalidatePath('/artifacts')
    revalidatePath(`/artifacts/${parsed.data.slug}`)
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update artifact' }
  }
}

export async function deleteArtifact(id: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    const [existing] = await db.select({ slug: artifacts.slug }).from(artifacts).where(eq(artifacts.id, id))
    await db.delete(artifacts).where(eq(artifacts.id, id))
    revalidatePath('/artifacts')
    if (existing) revalidatePath(`/artifacts/${existing.slug}`)
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete artifact' }
  }
}
