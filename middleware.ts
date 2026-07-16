import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import { edgeAuthConfig } from '@/lib/auth/edge-config'

const { auth } = NextAuth(edgeAuthConfig)

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isLoginPage = nextUrl.pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*'],
}
