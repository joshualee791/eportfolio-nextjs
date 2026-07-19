export const proseClass =
  'prose prose-sm max-w-none prose-headings:text-zinc-900 prose-headings:font-bold prose-p:text-zinc-600 prose-p:text-xs prose-p:leading-snug prose-li:text-zinc-600 prose-li:text-xs prose-a:text-teal-600 prose-strong:text-zinc-900 prose-blockquote:text-zinc-500 prose-blockquote:border-zinc-200'

// A cleared Tiptap editor still outputs "<p></p>", not an empty string.
export function isEmptyHtml(html: string): boolean {
  return !html || html.replace(/<[^>]*>/g, '').trim().length === 0
}

type RichTextProps = {
  html: string
  className?: string
}

export default function RichText({ html, className }: RichTextProps) {
  return (
    <div
      className={className ? `${proseClass} ${className}` : proseClass}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
