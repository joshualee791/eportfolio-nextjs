import Image from 'next/image'
import { notFound } from 'next/navigation'
import { eq, isNotNull } from 'drizzle-orm'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { db } from '@/lib/db/client'
import { caseStudies } from '@/lib/db/schema'
import { Button } from '@/components/ui/button'
import Reveal from '@/components/portfolio/Reveal'
import RichText from '@/components/portfolio/RichText'

export async function generateStaticParams() {
  const rows = await db
    .select({ slug: caseStudies.slug })
    .from(caseStudies)
    .where(isNotNull(caseStudies.publishedAt))
  return rows.map((row) => ({ slug: row.slug }))
}

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>
}

function Section({ heading, html }: { heading: string; html: string }) {
  return (
    <div>
      <h2 className="text-2xl font-light uppercase tracking-[0.12em] text-zinc-900 leading-tight">
        {heading}
      </h2>
      <div className="mt-4">
        <RichText html={html} />
      </div>
    </div>
  )
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const [study] = await db.select().from(caseStudies).where(eq(caseStudies.slug, slug))

  if (!study || !study.publishedAt) {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto pt-32 pb-20 px-8">
      {study.coverImage && (
        <Reveal>
          <Image
            src={study.coverImage}
            alt={study.coverImageAlt ?? study.title}
            width={960}
            height={540}
            className="rounded-xl w-full aspect-video object-cover mb-8"
          />
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">
          {study.title}
        </h1>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {study.techStack.map((tech) => (
            <span key={tech} className="text-[10px] bg-teal-50 text-teal-600 rounded px-1.5 py-0.5">
              {tech}
            </span>
          ))}
        </div>

        {(study.githubUrl || study.liveUrl) && (
          <div className="flex gap-3 mt-5">
            {study.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={study.githubUrl} target="_blank" rel="noopener">
                  <FaGithub size={14} />
                  GitHub
                </a>
              </Button>
            )}
            {study.liveUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={study.liveUrl} target="_blank" rel="noopener">
                  <ExternalLink size={14} />
                  Live
                </a>
              </Button>
            )}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.2} className="mt-10">
        <Section heading="The Problem" html={study.problem} />
      </Reveal>

      <div className="border-t border-zinc-100 my-10" />

      <Reveal delay={0.1}>
        <Section heading="Our Approach" html={study.approach} />
      </Reveal>

      <div className="border-t border-zinc-100 my-10" />

      <Reveal delay={0.1}>
        <Section heading="The Outcome" html={study.outcome} />
      </Reveal>
    </main>
  )
}
