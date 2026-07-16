import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { artifacts, blogPosts, caseStudies } from '@/lib/db/schema'
import PostEditor, { type PostFormState } from '@/components/admin/PostEditor'
import type { ContentType } from '@/lib/actions/slug'

const validTypes: ContentType[] = ['blog', 'case-study', 'artifact']

type EditPostPageProps = {
  params: Promise<{ type: string; id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { type, id } = await params
  if (!validTypes.includes(type as ContentType)) notFound()

  let initialData: Partial<PostFormState> | undefined

  if (type === 'blog') {
    const [row] = await db.select().from(blogPosts).where(eq(blogPosts.id, id))
    if (!row) notFound()
    initialData = {
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      coverImage: row.coverImage ?? '',
      coverImageAlt: row.coverImageAlt ?? '',
      seoTitle: row.seoTitle ?? '',
      metaDescription: row.metaDescription ?? '',
      canonicalUrl: row.canonicalUrl ?? '',
      publishedAt: row.publishedAt,
    }
  } else if (type === 'case-study') {
    const [row] = await db.select().from(caseStudies).where(eq(caseStudies.id, id))
    if (!row) notFound()
    initialData = {
      title: row.title,
      slug: row.slug,
      summary: row.summary,
      problem: row.problem,
      approach: row.approach,
      outcome: row.outcome,
      techStack: row.techStack,
      githubUrl: row.githubUrl ?? '',
      liveUrl: row.liveUrl ?? '',
      coverImage: row.coverImage ?? '',
      coverImageAlt: row.coverImageAlt ?? '',
      seoTitle: row.seoTitle ?? '',
      metaDescription: row.metaDescription ?? '',
      canonicalUrl: row.canonicalUrl ?? '',
      featured: row.featured,
      order: row.order,
      publishedAt: row.publishedAt,
    }
  } else {
    const [row] = await db.select().from(artifacts).where(eq(artifacts.id, id))
    if (!row) notFound()
    initialData = {
      title: row.title,
      slug: row.slug,
      description: row.description,
      artifactType: row.type,
      fileUrl: row.fileUrl,
      tags: row.tags,
      coverImage: row.coverImage ?? '',
      coverImageAlt: row.coverImageAlt ?? '',
      seoTitle: row.seoTitle ?? '',
      metaDescription: row.metaDescription ?? '',
      canonicalUrl: row.canonicalUrl ?? '',
      featured: row.featured,
      order: row.order,
      publishedAt: row.publishedAt,
    }
  }

  return <PostEditor type={type as ContentType} initialData={initialData} id={id} />
}
