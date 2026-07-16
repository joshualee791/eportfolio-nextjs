import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const session = await auth()
  if (!session || (session.user as { role?: string } | undefined)?.role !== 'admin') {
    redirect('/admin/login')
  }
  return session
}

export async function getSession() {
  return auth()
}
