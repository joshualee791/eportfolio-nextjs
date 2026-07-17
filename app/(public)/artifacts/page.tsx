import type { Metadata } from 'next'
import { asc, isNotNull } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { artifacts } from '@/lib/db/schema'
import ArtifactCard from '@/components/portfolio/ArtifactCard'
import Reveal from '@/components/portfolio/Reveal'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Artifacts',
  description: 'Documents, slides, designs, and deliverables from Joshua Lee Garza.',
}

export default async function Artifacts() {
  const items = await db
    .select()
    .from(artifacts)
    .where(isNotNull(artifacts.publishedAt))
    .orderBy(asc(artifacts.order))

  return (
    <PageContainer>
      <PageHeader>Artifacts</PageHeader>

      {items.length === 0 ? (
        <Reveal delay={0.1} className="mt-8">
          <p className="text-zinc-300 text-xs">No artifacts published yet.</p>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {items.map((artifact, i) => (
            <Reveal key={artifact.id} delay={i * 0.05}>
              <ArtifactCard artifact={artifact} />
            </Reveal>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
