import { Mail } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { getSetting } from '@/lib/db/settings'
import PhotoCard from '@/components/home/PhotoCard'

export default async function Hero() {
  const linkedinUrl = await getSetting('linkedinUrl')
  const heroSubtitle = (await getSetting('heroSubtitle')) || 'Computer Science  ·  Full-Stack Developer'

  return (
    <section className="relative h-screen flex items-center overflow-hidden px-8 md:px-16">
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="w-full flex justify-center md:hidden">
          <PhotoCard />
        </div>

        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h1
            className="font-extrabold text-teal-600 leading-none tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)' }}
          >
            Joshua Garza
          </h1>

          <div className="flex md:hidden items-center gap-4 mb-5 w-full max-w-xs">
            <div className="flex-1 h-px bg-zinc-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          <div className="hidden md:flex items-center gap-3 mb-5">
            <div className="w-10 h-0.5 bg-teal-500" />
            <div className="w-20 h-px bg-zinc-200" />
          </div>

          <p
            className="font-light uppercase text-zinc-700 mb-10"
            style={{ fontSize: 'clamp(0.6rem, 1.2vw, 1rem)', letterSpacing: '0.16em' }}
          >
            {heroSubtitle}
          </p>

          <div className="flex items-center gap-1">
            <a
              href={linkedinUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-teal-600 transition-colors"
            >
              <FaLinkedin size={26} />
            </a>
            <a
              href="/contact"
              aria-label="Email"
              className="w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-teal-600 transition-colors"
            >
              <Mail size={26} />
            </a>
          </div>
        </div>

        <div className="hidden md:flex w-[42%] justify-end group cursor-pointer">
          <PhotoCard />
        </div>
      </div>
    </section>
  )
}
