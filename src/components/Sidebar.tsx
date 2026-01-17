import { Github, Linkedin } from 'lucide-react'

function Sidebar({ activeSection }: { activeSection: string }) {
  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
  ]

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 lg:px-24">
      <div>
        <h1 className="text-5xl font-bold text-foreground tracking-tight">
          Christian Montebon
        </h1>
        <h2 className="mt-3 text-xl font-medium text-foreground">
          Frontend / Full-Stack Web Developer
        </h2>
        <p className="mt-4 max-w-xs text-muted-foreground leading-relaxed">
          I build clean, reliable web applications with a strong focus on
          usability, maintainability, and real-world business needs.
        </p>

        <nav className="mt-16 hidden lg:block" aria-label="In-page navigation">
          <ul className="flex flex-col gap-5">
            {navItems.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`group flex items-center gap-4 text-xs font-bold tracking-widest transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span
                    className={`h-px transition-all duration-200 ${
                      activeSection === item.id
                        ? 'w-16 bg-foreground'
                        : 'w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-foreground'
                    }`}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className="mt-8 flex items-center gap-5" aria-label="Social media">
        <li>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </li>
      </ul>
    </header>
  )
}

export default Sidebar
