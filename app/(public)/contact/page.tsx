import Image from 'next/image'
import type { Metadata } from 'next'
import ContactForm from '@/components/portfolio/ContactForm'
import CrosshatchCard from '@/components/portfolio/CrosshatchCard'
import PageContainer from '@/components/layout/PageContainer'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with Joshua Lee Garza.",
}

export default function Contact() {
  return (
    <PageContainer>
      <div className="max-w-4xl flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        <div className="w-full md:w-1/2">
          <PageHeader>Contact</PageHeader>
          <p className="text-xs font-normal text-zinc-600 leading-snug mt-4">
            Have a question or want to work together? Send a message and I&apos;ll get back to you.
          </p>

          <ContactForm />
        </div>

        <div className="w-full md:w-1/2">
          <CrosshatchCard className="w-full">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 border-2 border-teal-600 aspect-square">
              <Image
                src="/logo-owl-closeup-rotated.png"
                alt=""
                fill
                className="object-contain p-6"
              />
            </div>
          </CrosshatchCard>
        </div>
      </div>
    </PageContainer>
  )
}
