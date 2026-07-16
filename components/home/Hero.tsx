'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'

type HeroProps = {
  aboutImageUrl: string
  heroSubtitle: string
  linkedinUrl: string
}

export default function Hero({ aboutImageUrl, heroSubtitle, linkedinUrl }: HeroProps) {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative z-10">
      {aboutImageUrl && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-zinc-100 mb-8 shadow-sm"
        >
          <Image src={aboutImageUrl} alt="Joshua Lee Garza" fill className="object-cover" />
        </motion.div>
      )}

      <motion.h1
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-teal-600 leading-none tracking-tight mb-4"
      >
        Joshua Lee Garza
      </motion.h1>

      {heroSubtitle && (
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl font-light uppercase tracking-[0.12em] text-zinc-900 leading-tight mb-10"
        >
          {heroSubtitle}
        </motion.h2>
      )}

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex items-center gap-6"
      >
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-400 hover:text-teal-600 transition-colors"
          >
            <FaLinkedin size={22} />
          </a>
        )}
        <a
          href="mailto:joshualee791@gmail.com"
          aria-label="Email"
          className="text-zinc-400 hover:text-teal-600 transition-colors"
        >
          <Mail size={22} />
        </a>
      </motion.div>
    </section>
  )
}
