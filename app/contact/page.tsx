'use client'

import { useState, useTransition } from 'react'
import { Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { sendContactEmail } from '@/lib/actions/contact'

type Status = 'idle' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await sendContactEmail(formData)
      if (result.success) {
        setStatus('success')
        setError('')
      } else {
        setStatus('error')
        setError(result.error)
      }
    })
  }

  return (
    <main className="max-w-lg mx-auto pt-32 pb-20 px-8">
      <h1 className="text-5xl font-bold text-teal-600 leading-tight tracking-tight">Contact</h1>
      <p className="text-xs font-normal text-zinc-600 leading-snug mt-4">
        Have a question or want to work together? Send a message and I&apos;ll get back to you.
      </p>

      <form action={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs text-zinc-600">
            Name
          </Label>
          <Input id="name" name="name" required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs text-zinc-600">
            Email
          </Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject" className="text-xs text-zinc-600">
            Subject
          </Label>
          <Input id="subject" name="subject" required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-xs text-zinc-600">
            Message
          </Label>
          <Textarea id="message" name="message" required className="min-h-32" />
        </div>

        <Button type="submit" disabled={isPending} className="w-full gap-2">
          <Send size={14} />
          {isPending ? 'Sending…' : 'Send Message'}
        </Button>

        {status === 'success' && (
          <p className="text-teal-600 text-xs">Message sent! I&apos;ll be in touch soon.</p>
        )}
        {status === 'error' && <p className="text-red-500 text-xs">{error}</p>}
      </form>
    </main>
  )
}
