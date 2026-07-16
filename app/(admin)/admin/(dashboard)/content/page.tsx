import { desc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { artifacts, blogPosts, caseStudies } from '@/lib/db/schema'
import ContentManager from '@/components/admin/ContentManager'
import type { ContentTableItem } from '@/components/admin/ContentTable'

export default async function AdminContentPage() {
  const [blogRows, caseStudyRows, artifactRows] = await Promise.all([
    db.select().from(blogPosts).orderBy(desc(blogPosts.updatedAt)),
    db.select().from(caseStudies).orderBy(desc(caseStudies.updatedAt)),
    db.select().from(artifacts).orderBy(desc(artifacts.updatedAt)),
  ])

  const toItem = (row: { id: string; title: string; slug: string; publishedAt: Date | null; updatedAt: Date | null }): ContentTableItem => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.publishedAt ? 'published' : 'draft',
    updatedAt: row.updatedAt,
  })

  return (
    <ContentManager
      blogPosts={blogRows.map(toItem)}
      caseStudies={caseStudyRows.map(toItem)}
      artifacts={artifactRows.map(toItem)}
    />
  )
}
