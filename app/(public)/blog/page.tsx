import Link from 'next/link'
import type { Metadata } from 'next'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { blogPosts } from '@/lib/db/schema'
import Reveal from '@/components/portfolio/Reveal'
import CrosshatchCard from '@/components/portfolio/CrosshatchCard'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Blog',
  description: "Writing from Joshua Lee Garza on software, design, and engineering.",
}

export default async function Blog() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.publishedAt))

  return (
    <PageContainer>
      <PageHeader>Blog</PageHeader>

      {posts.length === 0 ? (
        <Reveal delay={0.1} className="mt-8">
          <p className="text-zinc-300 text-xs">No posts published yet.</p>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <CrosshatchCard offset={6}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-teal-400 hover:shadow-sm transition-all"
                >
                  <h2 className="text-base font-bold text-zinc-900 group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-zinc-500 line-clamp-3 mt-1">{post.excerpt}</p>
                  {post.publishedAt && (
                    <p className="text-[10px] uppercase tracking-wide text-zinc-400 mt-2">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </Link>
              </CrosshatchCard>
            </Reveal>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
