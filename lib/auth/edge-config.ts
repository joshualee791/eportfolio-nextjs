import type { NextAuthConfig } from 'next-auth'

/**
 * Edge-safe base config: no providers, no bcrypt/DB imports.
 * Used directly by middleware (which always runs in the Edge Runtime) and
 * extended with the Credentials provider in config.ts for Node.js runtime use
 * (API route handler, server actions). Keeping bcryptjs/Drizzle out of this
 * file is required — otherwise they get bundled into the Edge middleware and
 * crash in production (bcryptjs needs Node's crypto/setImmediate, unsupported
 * on Edge).
 */
export const edgeAuthConfig: NextAuthConfig = {
  providers: [],
  // Required outside of `next dev` and Vercel (both auto-trust the host).
  // Safe here since NEXTAUTH_URL pins the expected origin and this is a
  // single-admin site with no multi-tenant host routing.
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role: string }).role
      return token
    },
    session({ session, token }) {
      if (session.user) (session.user as typeof session.user & { role?: string }).role = token.role as string
      return session
    },
  },
}
