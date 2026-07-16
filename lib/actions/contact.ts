'use server'

import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'

type ContactResult = { success: true } | { success: false; error: string }

export async function sendContactEmail(formData: FormData): Promise<ContactResult> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { name, email, subject, message } = parsed.data

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })
    return { success: true }
  } catch {
    return { success: false, error: 'Something went wrong sending your message. Please try again.' }
  }
}
