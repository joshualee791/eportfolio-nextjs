import Link from 'next/link'
import { Settings } from 'lucide-react'
import MobileNav from '@/components/layout/MobileNav'
import Monogram from '@/components/layout/Monogram'

const navLinkStyle =
  'text-base font-medium text-zinc-700 hover:text-teal-600 transition-colors px-3 py-2'

const dropdownItemStyle =
  'block px-3 py-2 text-sm text-zinc-600 hover:text-teal-600 hover:bg-zinc-50 rounded-md transition-colors'

type HeaderProps = {
  resumeUrl?: string
  linkedinUrl?: string
}

export default function Header({ resumeUrl = '', linkedinUrl = '' }: HeaderProps) {
  const hasResume = Boolean(resumeUrl)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      <Link href="/">
        <Monogram size={36} />
      </Link>

      <nav className="hidden md:flex items-center">
        <ul className="flex items-center">
          <li>
            <Link href="/" className={navLinkStyle}>
              Home
            </Link>
          </li>

          <li className="relative group">
            <Link href="/about" className={navLinkStyle}>
              About
            </Link>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150">
              <div className="bg-white border border-zinc-100 rounded-xl shadow-sm p-2 min-w-36">
                <Link href="/blog" className={dropdownItemStyle}>
                  Blog
                </Link>
                <Link href="/education" className={dropdownItemStyle}>
                  Education
                </Link>
                <Link href="/skills" className={dropdownItemStyle}>
                  Skills
                </Link>
              </div>
            </div>
          </li>

          <li className="relative group">
            <Link href="/work" className={navLinkStyle}>
              Work
            </Link>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150">
              <div className="bg-white border border-zinc-100 rounded-xl shadow-sm p-2 min-w-36">
                <a
                  href={hasResume ? resumeUrl : '#'}
                  target="_blank"
                  rel="noopener"
                  className={dropdownItemStyle + (hasResume ? '' : ' text-zinc-300 pointer-events-none')}
                >
                  Resume
                </a>
                <Link href="/artifacts" className={dropdownItemStyle}>
                  Artifacts
                </Link>
                <Link href="/case-studies" className={dropdownItemStyle}>
                  Case Studies
                </Link>
              </div>
            </div>
          </li>

          <li>
            <Link href="/contact" className={navLinkStyle}>
              Contact
            </Link>
          </li>
        </ul>

        <Link href="/admin" aria-label="Admin">
          <Settings
            size={16}
            className="text-zinc-400 hover:text-teal-600 transition-colors ml-6"
          />
        </Link>
      </nav>

      <MobileNav resumeUrl={resumeUrl} linkedinUrl={linkedinUrl} />
    </header>
  )
}
