import { useMemo, useRef } from 'react'
import { navItems } from './data/navItems'
import { useActiveSection } from './hooks/useActiveSection'
import { useScrollToSection } from './hooks/useScrollToSection'
import Header from './components/Header'
import About from './components/About'
import Experience from './components/Experiences'
import Projects from './components/Projects'
import { parseFrontmatter } from './utils/frontmatter'
import { notes, noteContentByPath } from './data/notes'
import { Link } from 'react-router-dom'

export default function App() {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const activeSection = useActiveSection(navItems, sectionRefs)
  const scrollToSection = useScrollToSection(sectionRefs)

  const latestNotes = useMemo(() => {
    const all = notes.map(n => {
      const raw = noteContentByPath[n.path] || ''
      const { data } = parseFrontmatter(raw)
      const fileName = n.path.split('/').pop() || ''
      const slug = fileName.replace(/\\.md$/, '')
      return {
        title: n.title,
        date: String(data.date ?? ''),
        slug,
      }
    })
    return all.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="lg:flex lg:gap-12">
          <Header activeSection={activeSection} onNavigate={scrollToSection} />

          <main className="lg:w-[55%] lg:pt-24">
            <About
              sectionRef={el => {
                sectionRefs.current.about = el
              }}
            />
            <Experience
              sectionRef={el => {
                sectionRefs.current.experience = el
              }}
            />
            <Projects
              sectionRef={el => {
                sectionRefs.current.projects = el
              }}
            />

            {/* Notes (latest 3) */}
            <section className="mt-12">
              <div className="flex items-baseline justify-between">
                <h2 className="text-sm font-medium text-muted-foreground tracking-widest">
                  NOTES
                </h2>
                <Link
                  to="/notes"
                  className="text-xs text-muted-foreground hover:underline underline-offset-4"
                >
                  View all notes →
                </Link>
              </div>
              <ul className="mt-4 space-y-3">
                {latestNotes.map(note => (
                  <li key={note.slug} className="py-1">
                    <Link
                      to={`/notes/${note.slug}`}
                      className="flex items-baseline gap-3 group"
                    >
                      <span className="text-foreground group-hover:underline underline-offset-4">
                        {note.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {note.date}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <footer className="text-sm text-muted-foreground pb-24">
              Built with curiosity, a bit of vibe coding, and a constant search
              for better workflows.
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
