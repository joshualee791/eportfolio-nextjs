'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { caseStudies } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/auth/session'
import { caseStudySchema, type CaseStudyInput } from '@/lib/validations/caseStudy.schema'

type ActionResult = { success: true; id?: string } | { success: false; error: string }

function toValues(v: CaseStudyInput) {
  return {
    title: v.title,
    slug: v.slug,
    summary: v.summary,
    problem: v.problem,
    approach: v.approach,
    outcome: v.outcome,
    techStack: v.techStack,
    githubUrl: v.githubUrl || null,
    liveUrl: v.liveUrl || null,
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

export async function createCaseStudy(data: CaseStudyInput): Promise<ActionResult> {
  await requireAdmin()
  const parsed = caseStudySchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  try {
    const [row] = await db.insert(caseStudies).values(toValues(parsed.data)).returning({ id: caseStudies.id })
    revalidatePath('/case-studies')
    revalidatePath(`/case-studies/${parsed.data.slug}`)
    return { success: true, id: row.id }
  } catch {
    return { success: false, error: 'Failed to create case study' }
  }
}

export async function updateCaseStudy(id: string, data: CaseStudyInput): Promise<ActionResult> {
  await requireAdmin()
  const parsed = caseStudySchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }

  try {
    await db
      .update(caseStudies)
      .set({ ...toValues(parsed.data), updatedAt: new Date() })
      .where(eq(caseStudies.id, id))
    revalidatePath('/case-studies')
    revalidatePath(`/case-studies/${parsed.data.slug}`)
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update case study' }
  }
}

export async function deleteCaseStudy(id: string): Promise<ActionResult> {
  await requireAdmin()
  try {
    const [existing] = await db.select({ slug: caseStudies.slug }).from(caseStudies).where(eq(caseStudies.id, id))
    await db.delete(caseStudies).where(eq(caseStudies.id, id))
    revalidatePath('/case-studies')
    if (existing) revalidatePath(`/case-studies/${existing.slug}`)
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete case study' }
  }
}
