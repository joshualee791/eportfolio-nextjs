# Joshua Garza — ePortfolio

A personal portfolio and content management site built to showcase my work and projects as my undergraduate capstone project, and to carry forward as I begin my MBA at the University of North Texas.

**This project was built with heavy AI assistance** (Claude Code). I directed the architecture, design decisions, and content, and reviewed/edited the generated code, but a large share of the implementation — components, database schema, admin tooling, styling — was written collaboratively with AI. I'm noting that here in the interest of transparency, since this site is itself part of a professional portfolio.

## What it is

A full-stack Next.js site with:

- **Public site** — home, about, work, education, skills, case studies, blog, artifacts, and contact pages.
- **Admin dashboard** — a password-protected CMS for editing site content (case studies, blog posts, artifacts, page settings) without touching code, including a rich text editor and image uploads.
- **Contact form** — sends email via Resend.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Radix-based components)
- [Drizzle ORM](https://orm.drizzle.team) + [Neon](https://neon.tech) (serverless Postgres)
- [Auth.js (NextAuth)](https://authjs.dev) for admin authentication
- [Tiptap](https://tiptap.dev) rich text editor for blog/case study content
- [UploadThing](https://uploadthing.com) for image uploads
- [Resend](https://resend.com) for transactional email
- [Framer Motion](https://www.framer.com/motion/) for animation

## Project structure

```
app/
  (public)/    # public-facing pages: about, work, education, skills, case-studies, blog, artifacts, contact
  (admin)/     # admin login + dashboard (content manager, settings)
  api/         # auth and uploadthing route handlers
components/
  home/        # homepage-specific components
  layout/      # header, nav, page shell
  portfolio/   # cards, rich text renderer, contact form
  admin/       # CMS editors and forms
  ui/          # shadcn/ui primitives
lib/
  actions/     # server actions (blog, case studies, artifacts, contact, settings, auth)
  auth/        # NextAuth config and session helpers
  db/          # Drizzle schema, migrations, seed script
  validations/ # zod schemas
```

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site, and [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

### Environment variables

Create a `.env.local` with:

```
DATABASE_URL=          # Neon/Postgres connection string
ADMIN_EMAIL=            # admin login email
ADMIN_PASSWORD=         # admin login password
RESEND_API_KEY=         # for the contact form
CONTACT_TO_EMAIL=       # where contact form submissions are sent
```

UploadThing and NextAuth also require their standard environment variables — see their docs for details.

### Database

```bash
npm run db:generate   # generate a new Drizzle migration from schema changes
npm run db:migrate     # apply migrations
npm run db:seed        # seed initial content
npm run db:studio      # open Drizzle Studio
```

## Deployment

Deployed on [Vercel](https://vercel.com), connected to a Neon Postgres database.
