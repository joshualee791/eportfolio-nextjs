import Image from 'next/image'
import { getSetting } from '@/lib/db/settings'
import CrosshatchCard from '@/components/portfolio/CrosshatchCard'

export default async function PhotoCard() {
  const aboutImageUrl = await getSetting('aboutImageUrl')

  return (
    <CrosshatchCard className="w-full max-w-xs mx-auto md:mx-0">
      <div
        className="relative rounded-2xl overflow-hidden bg-zinc-100 border-2 border-teal-600 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl h-full"
        style={{ aspectRatio: '3/4' }}
      >
        {aboutImageUrl ? (
          <Image src={aboutImageUrl} alt="Joshua Garza" fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span
              className="font-extrabold tracking-widest text-teal-200 select-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}
            >
              JLG
            </span>
            <span className="text-xs tracking-widest uppercase text-zinc-300 font-light">Photo</span>
          </div>
        )}
      </div>
    </CrosshatchCard>
  )
}
