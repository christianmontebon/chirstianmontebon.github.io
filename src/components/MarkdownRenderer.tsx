import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import { defaultSchema } from 'hast-util-sanitize'
import { parseFrontmatter } from '../utils/frontmatter'
import { notes, noteContentByPath } from '../data/notes'

export default function MarkdownRenderer() {
  const { slug = '' } = useParams()

  const match = notes.find(n => n.slug === slug)
  const raw = match ? noteContentByPath[match.path] : undefined

  const parsed = useMemo(() => {
    if (!raw) return null
    return parseFrontmatter(raw)
  }, [raw])

  if (!raw || !parsed) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-muted-foreground">Not found.</p>
          <Link
            to="/notes"
            className="text-sm hover:underline underline-offset-4"
          >
            Back to notes
          </Link>
        </div>
      </div>
    )
  }

  const { data, content } = parsed
  const title = match?.title ?? String(data.title ?? slug)
  const date = match?.date || ''
  const tags = match?.tags || []

  // Allow highlight.js classes and language-* on pre/code
  const schema: any = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      code: [
        ...(defaultSchema.attributes?.code || []),
        ['className', 'language-*'],
      ],
      pre: [
        ...(defaultSchema.attributes?.pre || []),
        ['className', 'language-*'],
      ],
      span: [
        ...(defaultSchema.attributes?.span || []),
        ['className', 'hljs-*'],
      ],
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <Link
              to="/notes"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors italic underline"
            >
              back to notes
            </Link>
          </div>
          {(date || tags.length > 0) && (
            <div className="space-y-2">
              {date && <p className="text-sm text-muted-foreground">{date}</p>}
              {tags.length > 0 && (
                <p className="text-xs text-muted-foreground italic">
                  <span className="font-medium">tags:</span> {tags.join(', ')}
                </p>
              )}
            </div>
          )}
        </header>

        <article className="text-foreground space-y-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              [rehypeRaw],
              [rehypeSanitize, schema],
              [rehypeHighlight],
            ]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-3xl font-semibold tracking-tight mt-10 mb-6"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-semibold tracking-tight mt-10 mb-4"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl font-semibold tracking-tight mt-8 mb-4"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="leading-7 text-foreground/90" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="underline underline-offset-4 hover:no-underline"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 space-y-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 space-y-2" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="leading-7" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-2 border-border pl-4 italic text-foreground/80 bg-foreground/5 rounded py-2"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img className="rounded" {...props} />
              ),
              hr: ({ node, ...props }) => (
                <hr className="my-10 border-border" {...props} />
              ),
              table: ({ node, ...props }) => (
                <table className="w-full border-collapse text-sm" {...props} />
              ),
              thead: ({ node, ...props }) => (
                <thead className="text-foreground" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th
                  className="text-left font-semibold border-b border-border pb-2"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="border-b border-border/60 py-2 align-top"
                  {...props}
                />
              ),
              // TS: react-markdown's typings don't expose `inline` here; accept any for simplicity.
              // Also detect block code by presence of language-* class as a fallback.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              code: ({ node, inline, className, ...props }: any) => {
                const isBlock =
                  (!inline && /language-/.test(className || '')) ||
                  (className && /language-/.test(className))
                if (isBlock) {
                  return (
                    <code
                      className="block p-4 rounded bg-foreground/10 text-foreground/90 overflow-x-auto text-sm"
                      {...props}
                    />
                  )
                }
                return (
                  <code
                    className="inline-block whitespace-nowrap align-baseline px-1.5 py-0.5 rounded bg-foreground/10 text-foreground/90"
                    {...props}
                  />
                )
              },
              pre: ({ node, ...props }) => <pre className="my-6" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
