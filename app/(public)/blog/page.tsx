import Link from 'next/link'
import type { Metadata } from 'next'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { blogPosts } from '@/lib/db/schema'
import Reveal from '@/components/portfolio/Reveal'

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
    <main id="main-content" className="pt-32 pb-20 max-w-5xl mx-auto px-8">
      <Reveal>
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">Blog</h1>
      </Reveal>

      {posts.length === 0 ? (
        <Reveal delay={0.1} className="mt-8">
          <p className="text-zinc-300 text-xs">No posts published yet.</p>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <Link href={`/blog/${post.slug}`} className="block group">
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
            </Reveal>
          ))}
        </div>
      )}
    </main>
  )
}
