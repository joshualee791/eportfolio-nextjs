'use client'

import { motion } from 'framer-motion'
import { Mail, UserRound } from 'lucide-react'
import { FaLinkedinIn } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row items-center relative z-10 px-16 md:px-10 sm:px-6">
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-8xl lg:text-7xl md:text-6xl font-extrabold text-teal-600 leading-none tracking-tight"
          >
            Joshua Lee
            <br />
            Garza
          </motion.h1>

          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[3.9rem] lg:text-[3rem] md:text-[2.25rem] font-light uppercase tracking-[0.12em] text-zinc-900 leading-tight mt-2 max-w-xl"
          >
            Computer Science Student · Full-Stack Developer · Building at the
            intersection of elegant design and engineering.
          </motion.p>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-row gap-3 mt-6"
          >
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-teal-600 hover:border-teal-600 transition-colors"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="mailto:joshualee791@gmail.com"
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-teal-600 hover:border-teal-600 transition-colors"
            >
              <Mail size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex-shrink-0 flex items-center justify-center pl-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="w-72 h-96 xl:w-80 xl:h-[28rem] rounded-2xl bg-zinc-100 border border-zinc-200 flex flex-col items-center justify-center gap-2 text-zinc-300 text-xs">
            <UserRound size={48} className="text-zinc-300" />
            <span>Portrait</span>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
