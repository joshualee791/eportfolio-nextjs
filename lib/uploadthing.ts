import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { requireAdmin } from '@/lib/auth/session'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      await requireAdmin()
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url }
    }),

  pdfUploader: f({ pdf: { maxFileSize: '16MB', maxFileCount: 1 } })
    .middleware(async () => {
      await requireAdmin()
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
