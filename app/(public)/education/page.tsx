import Image from 'next/image'
import type { Metadata } from 'next'
import { getSettings } from '@/lib/db/settings'
import Reveal from '@/components/portfolio/Reveal'
import RichText, { isEmptyHtml } from '@/components/portfolio/RichText'
import CrosshatchCard from '@/components/portfolio/CrosshatchCard'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Education',
  description: "Joshua Lee Garza's academic background and education history.",
}

export default async function Education() {
  const { educationContent, educationImageUrl } = await getSettings([
    'educationContent',
    'educationImageUrl',
  ])

  return (
    <PageContainer>
      <PageHeader>Education</PageHeader>

      <div className="max-w-4xl mt-8 flex flex-col md:flex-row gap-8 md:gap-10">
        {educationImageUrl && (
          <Reveal delay={0.1} className="md:w-1/3 shrink-0">
            <CrosshatchCard className="w-full">
              <div
                className="relative rounded-2xl overflow-hidden bg-zinc-100 border-2 border-teal-600 h-full"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src={educationImageUrl}
                  alt="Joshua Lee Garza's education"
                  fill
                  className="object-cover"
                />
              </div>
            </CrosshatchCard>
          </Reveal>
        )}

        <Reveal delay={0.2} className="md:w-2/3">
          {isEmptyHtml(educationContent) ? (
            <p className="text-zinc-300 text-xs">Education history coming soon.</p>
          ) : (
            <RichText html={educationContent} />
          )}
        </Reveal>
      </div>
    </PageContainer>
  )
}
