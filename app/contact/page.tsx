import type { Metadata } from 'next'
import ContactForm from '@/components/portfolio/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with Joshua Lee Garza.",
}

export default function Contact() {
  return (
    <main id="main-content" className="max-w-lg mx-auto pt-32 pb-20 px-8">
      <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">Contact</h1>
      <p className="text-xs font-normal text-zinc-600 leading-snug mt-4">
        Have a question or want to work together? Send a message and I&apos;ll get back to you.
      </p>

      <ContactForm />
    </main>
  )
}
