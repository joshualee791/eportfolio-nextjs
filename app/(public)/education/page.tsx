import type { Metadata } from 'next'
import { getSetting } from '@/lib/db/settings'
import Reveal from '@/components/portfolio/Reveal'
import RichText, { isEmptyHtml } from '@/components/portfolio/RichText'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Education',
  description: "Joshua Lee Garza's academic background and education history.",
}

export default async function Education() {
  const content = await getSetting('educationContent')

  return (
    <PageContainer>
      <PageHeader>Education</PageHeader>

      {isEmptyHtml(content) ? (
        <Reveal delay={0.1} className="mt-8">
          <p className="text-zinc-300 text-xs">Education history coming soon.</p>
        </Reveal>
      ) : (
        <Reveal delay={0.1} className="mt-8 max-w-2xl">
          <RichText html={content} />
        </Reveal>
      )}
    </PageContainer>
  )
}
