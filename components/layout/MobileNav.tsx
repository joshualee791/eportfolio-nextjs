'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Mail } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/education', label: 'Education' },
  { href: '/skills', label: 'Skills' },
  { href: '/work', label: 'Work' },
]

const workLinks = [
  { href: '/artifacts', label: 'Artifacts' },
  { href: '/case-studies', label: 'Case Studies' },
]

const linkStyle =
  'block w-full py-3 px-6 text-sm font-medium text-zinc-700 hover:text-teal-600 hover:bg-zinc-50 border-b border-zinc-100 transition-colors'

type MobileNavProps = {
  resumeUrl?: string
  linkedinUrl?: string
}

export default function MobileNav({ resumeUrl = '', linkedinUrl = '' }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasResume = Boolean(resumeUrl)

  function close() {
    setIsOpen(false)
  }

  return (
    <div className="flex md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="flex items-center justify-center"
      >
        <Menu size={24} className="text-zinc-900" />
      </button>

      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="inline-block font-extrabold text-sm tracking-[0.25em] text-teal-600 border-[1.5px] border-teal-600 px-2 py-1 rounded-[2px]">
            JLG
          </span>
          <button type="button" onClick={close} aria-label="Close menu">
            <X size={24} className="text-zinc-900" />
          </button>
        </div>

        <nav>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkStyle} onClick={close}>
              {link.label}
            </Link>
          ))}
          <a
            href={hasResume ? resumeUrl : '#'}
            target="_blank"
            rel="noopener"
            onClick={close}
            className={linkStyle + (hasResume ? '' : ' text-zinc-300 pointer-events-none')}
          >
            Resume
          </a>
          {workLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkStyle} onClick={close}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className={linkStyle} onClick={close}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4 px-6 pb-8 mt-4">
          <a
            href={linkedinUrl || 'https://linkedin.com'}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            className="text-zinc-500 hover:text-teal-600 transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="mailto:joshualee791@gmail.com"
            aria-label="Email"
            className="text-zinc-500 hover:text-teal-600 transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}
