'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Settings } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const navLinkStyle =
  'text-xs font-medium text-zinc-700 hover:text-teal-600 transition-colors'

const dropdownItemStyle =
  'block px-3 py-2 text-xs text-zinc-600 hover:text-teal-600 hover:bg-zinc-50 rounded-md transition-colors'

const triggerStyle =
  'bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent h-auto p-0 ' +
  navLinkStyle

const mobileLinkStyle = 'block py-3 text-xs text-zinc-700 border-b border-zinc-100'

type HeaderProps = {
  resumeUrl?: string
}

export default function Header({ resumeUrl = '' }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const hasResume = Boolean(resumeUrl)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      <Link href="/">
        <span className="inline-block font-extrabold text-sm tracking-[0.25em] text-teal-600 border-[1.5px] border-teal-600 px-2 py-1 rounded-[2px]">
          JLG
        </span>
      </Link>

      <nav className="hidden md:flex items-center">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navLinkStyle}>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerStyle}>
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white border border-zinc-100 rounded-xl shadow-sm p-2">
                <Link href="/blog" className={dropdownItemStyle}>
                  Blog
                </Link>
                <Link href="/education" className={dropdownItemStyle}>
                  Education
                </Link>
                <Link href="/skills" className={dropdownItemStyle}>
                  Skills
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerStyle}>
                Work
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white border border-zinc-100 rounded-xl shadow-sm p-2">
                <a
                  href={hasResume ? resumeUrl : '#'}
                  target="_blank"
                  rel="noopener"
                  className={
                    dropdownItemStyle +
                    (hasResume ? '' : ' text-zinc-300 pointer-events-none')
                  }
                >
                  Resume
                </a>
                <Link href="/artifacts" className={dropdownItemStyle}>
                  Artifacts
                </Link>
                <Link href="/case-studies" className={dropdownItemStyle}>
                  Case Studies
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navLinkStyle}>
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link href="/admin">
          <Settings
            size={16}
            className="text-zinc-400 hover:text-teal-600 transition-colors ml-6"
          />
        </Link>
      </nav>

      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button aria-label="Open menu">
              <Menu size={20} className="text-zinc-700" />
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="px-4 pt-4 text-xs uppercase tracking-widest text-zinc-400">
              Menu
            </SheetTitle>
            <nav className="px-4">
              <Link href="/" className={mobileLinkStyle} onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link href="/about" className={mobileLinkStyle} onClick={() => setOpen(false)}>
                About
              </Link>
              <Link href="/blog" className={mobileLinkStyle} onClick={() => setOpen(false)}>
                Blog
              </Link>
              <Link
                href="/education"
                className={mobileLinkStyle}
                onClick={() => setOpen(false)}
              >
                Education
              </Link>
              <Link href="/skills" className={mobileLinkStyle} onClick={() => setOpen(false)}>
                Skills
              </Link>
              <Link href="/work" className={mobileLinkStyle} onClick={() => setOpen(false)}>
                Work
              </Link>
              <a
                href={hasResume ? resumeUrl : '#'}
                target="_blank"
                rel="noopener"
                className={
                  mobileLinkStyle + (hasResume ? '' : ' text-zinc-300 pointer-events-none')
                }
              >
                Resume
              </a>
              <Link
                href="/artifacts"
                className={mobileLinkStyle}
                onClick={() => setOpen(false)}
              >
                Artifacts
              </Link>
              <Link
                href="/case-studies"
                className={mobileLinkStyle}
                onClick={() => setOpen(false)}
              >
                Case Studies
              </Link>
              <Link
                href="/contact"
                className={mobileLinkStyle}
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
