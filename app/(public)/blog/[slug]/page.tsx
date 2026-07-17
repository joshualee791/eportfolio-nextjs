import Image from 'next/image'
import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import { db } from '@/lib/db/client'
import { blogPosts } from '@/lib/db/schema'
import Reveal from '@/components/portfolio/Reveal'
import RichText from '@/components/portfolio/RichText'
import PageContainer from '@/components/layout/PageContainer'

export async function generateStaticParams() {
  const posts = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
  return posts.map((post) => ({ slug: post.slug }))
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug))

  if (!post || !post.published) return {}

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug))

  if (!post || !post.published) {
    notFound()
  }

  return (
    <PageContainer variant="detail">
      {post.coverImage && (
        <Reveal>
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            width={800}
            height={450}
            className="rounded-xl w-full aspect-video object-cover mb-8"
          />
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">
          {post.title}
        </h1>
        {post.publishedAt && (
          <p className="text-[10px] uppercase tracking-wide text-zinc-400 mt-3">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </Reveal>

      <Reveal delay={0.2} className="mt-8">
        <RichText html={post.content} />
      </Reveal>
    </PageContainer>
  )
}
