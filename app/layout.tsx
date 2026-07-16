import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '700', '800'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: { default: 'Joshua Lee Garza', template: '%s | Joshua Lee Garza' },
  description: 'Computer Science Student & Full-Stack Developer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Joshua Lee Garza',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-white text-zinc-600 text-xs leading-snug antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white text-teal-600 px-4 py-2 text-sm font-medium rounded"
        >
          Skip to content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
