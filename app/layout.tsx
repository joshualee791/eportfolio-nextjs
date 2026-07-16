import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import TopoBackground from '@/components/home/TopoBackground'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '700', '800'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Joshua Lee Garza',
  description: 'Portfolio of Joshua Lee Garza — Computer Science Student & Full-Stack Developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const resumeUrl = ''

  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-white text-zinc-600 text-xs leading-snug antialiased`}>
        <TopoBackground />
        <div className="relative z-10">
          <Header resumeUrl={resumeUrl} />
          {children}
        </div>
      </body>
    </html>
  )
}
