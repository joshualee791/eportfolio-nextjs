import { asc, isNotNull } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { caseStudies } from '@/lib/db/schema'
import CaseStudyCard from '@/components/portfolio/CaseStudyCard'
import Reveal from '@/components/portfolio/Reveal'

export default async function CaseStudies() {
  const items = await db
    .select()
    .from(caseStudies)
    .where(isNotNull(caseStudies.publishedAt))
    .orderBy(asc(caseStudies.order))

  return (
    <main className="pt-32 pb-20 max-w-5xl mx-auto px-8">
      <Reveal>
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">
          Case Studies
        </h1>
      </Reveal>

      {items.length === 0 ? (
        <Reveal delay={0.1} className="mt-8">
          <p className="text-zinc-300 text-xs">No case studies published yet.</p>
        </Reveal>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 mt-10">
          {items.map((study, i) => (
            <Reveal key={study.id} delay={i * 0.05}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  )
}
