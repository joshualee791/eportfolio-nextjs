import { getSettings } from '@/lib/db/settings'
import Hero from '@/components/home/Hero'

export default async function Home() {
  const { aboutImageUrl, heroSubtitle, linkedinUrl } = await getSettings([
    'aboutImageUrl',
    'heroSubtitle',
    'linkedinUrl',
  ])

  return (
    <main id="main-content">
      <Hero aboutImageUrl={aboutImageUrl} heroSubtitle={heroSubtitle} linkedinUrl={linkedinUrl} />
    </main>
  )
}
