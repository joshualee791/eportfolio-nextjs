import Image from 'next/image'
import { getSetting } from '@/lib/db/settings'

export default async function PhotoCard() {
  const aboutImageUrl = await getSetting('aboutImageUrl')

  return (
    <div className="relative w-full max-w-xs mx-auto md:mx-0" style={{ paddingBottom: '12px', paddingRight: '12px' }}>
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          transform: 'translate(12px, 12px)',
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(13, 148, 136, 0.35) 0px,
              rgba(13, 148, 136, 0.35) 1px,
              transparent 1px,
              transparent 7px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(13, 148, 136, 0.22) 0px,
              rgba(13, 148, 136, 0.22) 1px,
              transparent 1px,
              transparent 7px
            )
          `,
          backgroundColor: 'rgba(13, 148, 136, 0.04)',
        }}
        aria-hidden="true"
      />

      <div
        className="relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl"
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
    </div>
  )
}
