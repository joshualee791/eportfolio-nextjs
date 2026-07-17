'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Settings, X } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import Monogram from '@/components/layout/Monogram'

function HamburgerIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="0" y1="1.5" x2="28" y2="1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="18.5" x2="13" y2="18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ExpandIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('transition-transform duration-200', isOpen && 'rotate-45')}
    >
      <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

type NavChild = { label: string; href: string; external?: boolean }
type NavGroup = { top: { label: string; href: string }; children: NavChild[] }

const iconLinkStyle =
  'w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-teal-600 transition-colors'

type MobileNavProps = {
  resumeUrl?: string
  linkedinUrl?: string
}

export default function MobileNav({ resumeUrl = '', linkedinUrl = '' }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (label: string) => setExpanded((prev) => (prev === label ? null : label))
  const close = () => setOpen(false)

  const navGroups: NavGroup[] = [
    { top: { label: 'Home', href: '/' }, children: [] },
    {
      top: { label: 'About', href: '/about' },
      children: [
        { label: 'Blog', href: '/blog' },
        { label: 'Education', href: '/education' },
        { label: 'Skills', href: '/skills' },
      ],
    },
    {
      top: { label: 'Work', href: '/work' },
      children: [
        { label: 'Resume', href: resumeUrl || '#', external: true },
        { label: 'Artifacts', href: '/artifacts' },
        { label: 'Case Studies', href: '/case-studies' },
      ],
    },
    { top: { label: 'Contact', href: '/contact' }, children: [] },
  ]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden flex items-center justify-center w-11 h-11 text-zinc-700 hover:text-teal-600 transition-colors"
      >
        <HamburgerIcon />
      </button>

      <div
        className={cn(
          'fixed inset-0 bg-black/30 z-40 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={close}
        aria-hidden="true"
      />

      <div
        className={cn(
          'fixed inset-0 w-full h-full bg-white z-50 transform transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col items-center pt-10 pb-5 px-8 relative">
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-zinc-700 hover:text-teal-600 transition-colors"
          >
            <X size={22} />
          </button>

          <Monogram size={44} className="mb-5" />

          <div className="flex items-center gap-6">
            <a
              href={linkedinUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={iconLinkStyle}
            >
              <FaLinkedin size={26} />
            </a>
            <Link href="/contact" aria-label="Email" className={iconLinkStyle} onClick={close}>
              <Mail size={26} />
            </Link>
            <Link href="/admin" aria-label="Admin" className={iconLinkStyle} onClick={close}>
              <Settings size={26} />
            </Link>
          </div>

          <div className="w-10 h-px bg-zinc-200 mt-5" />
        </div>

        <nav className="flex flex-col items-center pt-1 overflow-y-auto pb-10">
          {navGroups.map((group) => {
            const isOpen = expanded === group.top.label
            const hasChildren = group.children.length > 0

            return (
              <div key={group.top.label} className="w-full flex flex-col items-center">
                <div className="relative flex items-center justify-center w-full py-2">
                  <Link
                    href={group.top.href}
                    onClick={close}
                    className="text-2xl font-bold tracking-tight text-zinc-900 hover:text-teal-600 transition-colors"
                  >
                    {group.top.label}
                  </Link>
                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => toggle(group.top.label)}
                      aria-label={isOpen ? `Collapse ${group.top.label}` : `Expand ${group.top.label}`}
                      aria-expanded={isOpen}
                      className="absolute right-8 w-11 h-11 flex items-center justify-center text-zinc-500 hover:text-teal-600 transition-colors"
                    >
                      <ExpandIcon isOpen={isOpen} />
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <div
                    className={cn(
                      'flex flex-col items-center transition-all duration-300 ease-in-out overflow-hidden',
                      isOpen ? 'max-h-48 opacity-100 mb-2' : 'max-h-0 opacity-0'
                    )}
                  >
                    {group.children.map((child) =>
                      child.external ? (
                        <a
                          key={child.label}
                          href={child.href}
                          target="_blank"
                          rel="noopener"
                          onClick={close}
                          className="text-sm font-normal tracking-wide text-zinc-400 hover:text-teal-600 py-1.5 transition-colors"
                        >
                          {child.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={close}
                          className="text-sm font-normal tracking-wide text-zinc-400 hover:text-teal-600 py-1.5 transition-colors"
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </>
  )
}
