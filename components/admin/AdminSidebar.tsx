'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileStack, Settings, LogOut } from 'lucide-react'
import { logoutAction } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/content', label: 'Content', icon: FileStack },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 border-r border-zinc-100 flex flex-col py-8 px-4">
      <Link href="/" className="mb-8">
        <span className="inline-block font-extrabold text-sm tracking-[0.25em] text-teal-600 border-[1.5px] border-teal-600 px-2 py-1 rounded-[2px]">
          JLG
        </span>
      </Link>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors',
                active ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'
              )}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <form action={logoutAction}>
        <button
          type="submit"
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors w-full"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </form>
    </aside>
  )
}
