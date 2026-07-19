import Image from 'next/image'
import type { Metadata } from 'next'
import { getSettings } from '@/lib/db/settings'
import Reveal from '@/components/portfolio/Reveal'
import RichText, { isEmptyHtml } from '@/components/portfolio/RichText'
import CrosshatchCard from '@/components/portfolio/CrosshatchCard'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Skills',
  description: "Joshua Lee Garza's technical skills and areas of expertise.",
}

export default async function Skills() {
  const { skillsContent, skillsImageUrl } = await getSettings(['skillsContent', 'skillsImageUrl'])

  return (
    <PageContainer>
      <PageHeader>Skills</PageHeader>

      <div className="max-w-4xl mt-8 flex flex-col md:flex-row gap-8 md:gap-10">
        {skillsImageUrl && (
          <Reveal delay={0.1} className="md:w-1/3 shrink-0">
            <CrosshatchCard className="w-full">
              <div
                className="relative rounded-2xl overflow-hidden bg-zinc-100 border-2 border-teal-600 h-full"
                style={{ aspectRatio: '3/4' }}
              >
                <Image src={skillsImageUrl} alt="Joshua Lee Garza's skills" fill className="object-cover" />
              </div>
            </CrosshatchCard>
          </Reveal>
        )}

        <Reveal delay={0.2} className="md:w-2/3">
          {isEmptyHtml(skillsContent) ? (
            <p className="text-zinc-300 text-xs">Skills coming soon.</p>
          ) : (
            <RichText html={skillsContent} />
          )}
        </Reveal>
      </div>
    </PageContainer>
  )
}
