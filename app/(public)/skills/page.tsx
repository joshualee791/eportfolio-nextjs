import type { Metadata } from 'next'
import { getSetting } from '@/lib/db/settings'
import Reveal from '@/components/portfolio/Reveal'
import RichText, { isEmptyHtml } from '@/components/portfolio/RichText'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Skills',
  description: "Joshua Lee Garza's technical skills and areas of expertise.",
}

export default async function Skills() {
  const content = await getSetting('skillsContent')

  return (
    <PageContainer>
      <PageHeader>Skills</PageHeader>

      {isEmptyHtml(content) ? (
        <Reveal delay={0.1} className="mt-8">
          <p className="text-zinc-300 text-xs">Skills coming soon.</p>
        </Reveal>
      ) : (
        <Reveal delay={0.1} className="mt-8 max-w-2xl">
          <RichText html={content} />
        </Reveal>
      )}
    </PageContainer>
  )
}
