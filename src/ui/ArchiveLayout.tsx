import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

interface ArchiveItem {
  title: string
  slug: string
  date?: string
  description?: string
  topics?: string[]
  tools?: string[]
}

interface ArchiveLayoutProps {
  title: string
  description?: string
  items: ArchiveItem[]
  basePath?: string // when provided, href becomes `${basePath}/${slug}` unless slug is an absolute URL
  showFilters?: boolean // enable filtering by topics/tools
}

export default function ArchiveLayout({
  title,
  description,
  items,
  basePath,
  showFilters = false,
}: ArchiveLayoutProps) {
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  // Extract all unique tools and topics
  const allTools = useMemo(() => {
    const tools = new Set<string>()
    items.forEach(item => {
      item.tools?.forEach(tool => tools.add(tool))
    })
    return Array.from(tools).sort()
  }, [items])

  const allTopics = useMemo(() => {
    const topics = new Set<string>()
    items.forEach(item => {
      item.topics?.forEach(topic => topics.add(topic))
    })
    return Array.from(topics).sort()
  }, [items])

  // Filter items based on selected filters
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // If tools are selected, item must have at least one selected tool
      if (selectedTools.length > 0 && !item.tools?.some(tool => selectedTools.includes(tool))) {
        return false
      }
      // If topics are selected, item must have at least one selected topic
      if (selectedTopics.length > 0 && !item.topics?.some(topic => selectedTopics.includes(topic))) {
        return false
      }
      return true
    })
  }, [items, selectedTools, selectedTopics])

  const toggleTool = (tool: string) => {
    setSelectedTools(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    )
  }

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
  }

  const resetFilters = () => {
    setSelectedTools([])
    setSelectedTopics([])
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors italic underline">back to home</Link>
          </div>
          {description ? (
            <p className="text-muted-foreground mt-3">{description}</p>
          ) : null}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <ul className="space-y-4">
              {filteredItems.map(item => {
                const isAbsolute =
                  item.slug.startsWith('http://') || item.slug.startsWith('https://')
                const href = isAbsolute
                  ? item.slug
                  : basePath
                  ? `${basePath}/${item.slug}`
                  : item.slug
                const date = item.date

                const content = (
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-foreground hover:underline underline-offset-4">
                        {item.title}
                      </span>
                      {date ? (
                        <span className="text-xs text-muted-foreground">{date}</span>
                      ) : null}
                    </div>
                    {item.description ? (
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                )

                return (
                  <li key={item.slug} className="py-1">
                    {isAbsolute ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {content}
                      </a>
                    ) : (
                      <Link to={href} className="block">
                        {content}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Filters sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Tools filter */}
                {allTools.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTools.map(tool => (
                        <button
                          key={tool}
                          onClick={() => toggleTool(tool)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            selectedTools.includes(tool)
                              ? 'bg-foreground/10 border-foreground/30 text-foreground'
                              : 'bg-background border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topics filter */}
                {allTopics.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTopics.map(topic => (
                        <button
                          key={topic}
                          onClick={() => toggleTopic(topic)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            selectedTopics.includes(topic)
                              ? 'bg-foreground/10 border-foreground/30 text-foreground'
                              : 'bg-background border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reset filters */}
                {(selectedTools.length > 0 || selectedTopics.length > 0) && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
