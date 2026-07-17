import type { Metadata } from 'next'
import ContactForm from '@/components/portfolio/ContactForm'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with Joshua Lee Garza.",
}

export default function Contact() {
  return (
    <PageContainer>
      <div className="max-w-lg">
        <PageHeader>Contact</PageHeader>
        <p className="text-xs font-normal text-zinc-600 leading-snug mt-4">
          Have a question or want to work together? Send a message and I&apos;ll get back to you.
        </p>

        <ContactForm />
      </div>
    </PageContainer>
  )
}
