import Image from 'next/image'
import { getSettings } from '@/lib/db/settings'
import Reveal from '@/components/portfolio/Reveal'

export default async function About() {
  const { aboutText, aboutImageUrl } = await getSettings(['aboutText', 'aboutImageUrl'])
  const paragraphs = aboutText ? aboutText.split('\n\n').filter(Boolean) : []

  return (
    <main className="pt-32 pb-20 max-w-2xl mx-auto px-8">
      <Reveal>
        <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">About</h1>
      </Reveal>

      {aboutImageUrl && (
        <Reveal delay={0.1} className="mt-8">
          <Image
            src={aboutImageUrl}
            alt="Joshua Lee Garza"
            width={320}
            height={400}
            className="rounded-2xl max-w-xs w-full h-auto object-cover"
          />
        </Reveal>
      )}

      <Reveal delay={0.2} className="mt-8 space-y-4">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, i) => (
            <p key={i} className="text-xs font-normal text-zinc-600 leading-snug">
              {p}
            </p>
          ))
        ) : (
          <p className="text-zinc-300 text-xs">Content coming soon.</p>
        )}
      </Reveal>
    </main>
  )
}
