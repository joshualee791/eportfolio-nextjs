import Image from 'next/image'
import { notFound } from 'next/navigation'
import { eq, isNotNull } from 'drizzle-orm'
import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { db } from '@/lib/db/client'
import { artifacts } from '@/lib/db/schema'
import Reveal from '@/components/portfolio/Reveal'

export async function generateStaticParams() {
  const rows = await db
    .select({ slug: artifacts.slug })
    .from(artifacts)
    .where(isNotNull(artifacts.publishedAt))
  return rows.map((row) => ({ slug: row.slug }))
}

type ArtifactPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArtifactPageProps): Promise<Metadata> {
  const { slug } = await params
  const [artifact] = await db.select().from(artifacts).where(eq(artifacts.slug, slug))

  if (!artifact || !artifact.publishedAt) return {}

  return {
    title: artifact.seoTitle || artifact.title,
    description: artifact.metaDescription || artifact.description,
    alternates: artifact.canonicalUrl ? { canonical: artifact.canonicalUrl } : undefined,
    openGraph: {
      title: artifact.seoTitle || artifact.title,
      description: artifact.metaDescription || artifact.description,
      images: artifact.coverImage ? [{ url: artifact.coverImage }] : undefined,
    },
  }
}

export default async function ArtifactPage({ params }: ArtifactPageProps) {
  const { slug } = await params
  const [artifact] = await db.select().from(artifacts).where(eq(artifacts.slug, slug))

  if (!artifact || !artifact.publishedAt) {
    notFound()
  }

  const typeLabel = artifact.type.charAt(0).toUpperCase() + artifact.type.slice(1)

  return (
    <main id="main-content" className="max-w-3xl mx-auto pt-32 pb-20 px-8">
      {artifact.coverImage && (
        <Reveal>
          <Image
            src={artifact.coverImage}
            alt={artifact.coverImageAlt ?? artifact.title}
            width={960}
            height={540}
            className="rounded-xl w-full aspect-video object-cover mb-8"
          />
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">
          {artifact.title}
        </h1>

        <div className="flex flex-wrap items-center gap-1.5 mt-4">
          <span className="text-[10px] uppercase tracking-wide border border-zinc-200 rounded px-1.5 py-0.5 text-zinc-400">
            {artifact.type}
          </span>
          {artifact.tags.map((tag) => (
            <span key={tag} className="text-[10px] bg-teal-50 text-teal-600 rounded px-1.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-xs font-normal text-zinc-600 leading-snug mt-6">
          {artifact.description}
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <a
          href={artifact.fileUrl}
          target="_blank"
          rel="noopener"
          className="mt-8 flex items-center justify-center gap-2 w-full rounded-md bg-teal-600 text-white text-sm font-medium py-3 hover:bg-teal-700 transition-colors"
        >
          <ExternalLink size={16} />
          Open {typeLabel}
        </a>
      </Reveal>
    </main>
  )
}
