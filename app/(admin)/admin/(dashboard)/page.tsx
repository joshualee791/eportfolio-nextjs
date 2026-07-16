import Link from 'next/link'
import { eq, isNotNull } from 'drizzle-orm'
import { count } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { artifacts, blogPosts, caseStudies } from '@/lib/db/schema'
import { Button } from '@/components/ui/button'

async function getStats() {
  const [
    [{ value: publishedCaseStudies }],
    [{ value: totalCaseStudies }],
    [{ value: publishedArtifacts }],
    [{ value: totalArtifacts }],
    [{ value: publishedBlogPosts }],
    [{ value: totalBlogPosts }],
  ] = await Promise.all([
    db.select({ value: count() }).from(caseStudies).where(isNotNull(caseStudies.publishedAt)),
    db.select({ value: count() }).from(caseStudies),
    db.select({ value: count() }).from(artifacts).where(isNotNull(artifacts.publishedAt)),
    db.select({ value: count() }).from(artifacts),
    db.select({ value: count() }).from(blogPosts).where(eq(blogPosts.published, true)),
    db.select({ value: count() }).from(blogPosts),
  ])

  return {
    publishedCaseStudies,
    totalCaseStudies,
    publishedArtifacts,
    totalArtifacts,
    publishedBlogPosts,
    totalBlogPosts,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'Published Case Studies', value: stats.publishedCaseStudies },
    { label: 'Total Case Studies', value: stats.totalCaseStudies },
    { label: 'Published Artifacts', value: stats.publishedArtifacts },
    { label: 'Total Artifacts', value: stats.totalArtifacts },
    { label: 'Published Blog Posts', value: stats.publishedBlogPosts },
    { label: 'Total Blog Posts', value: stats.totalBlogPosts },
  ]

  return (
    <div>
      <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white border border-zinc-100 rounded-xl p-4">
            <p className="text-xs text-zinc-400 uppercase tracking-wide">{card.label}</p>
            <p className="text-3xl font-extrabold text-zinc-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <Button asChild className="mt-8">
        <Link href="/admin/content">Go to Content Manager</Link>
      </Button>
    </div>
  )
}
