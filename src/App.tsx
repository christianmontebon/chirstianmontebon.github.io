'use client'

import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

// Data
const navItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
]

const experiences = [
  {
    period: '2021 — 2024',
    title: 'Web Developer',
    company: 'Luminous',
    url: 'https://www.joinluminous.com',
    description:
      'At Luminous, I worked on a large-scale web application used by businesses to manage operations and third-party integrations. I built and maintained features using Angular and Laravel, developed an internal UI component library, and created reusable backend packages to support multiple integrations. I worked closely with designers, product managers, and other engineers, with a strong focus on maintainable code, performance, and long-term scalability.',
    technologies: ['Angular', 'Laravel', 'TypeScript', 'PHP', 'MySQL'],
  },
  {
    period: '2022 — 2023',
    title: 'Frontend Developer (Part-Time)',
    company: 'MeldCX PH',
    url: 'https://www.meldcx.com',
    description:
      'I worked on analytics and data-visualization interfaces, primarily customizing and extending Apache Superset charts using React. My role involved implementing new features, fixing bugs, and improving existing components to ensure charts were flexible, reliable, and easy to integrate into dashboards.',
    technologies: ['React', 'TypeScript', 'Apache Superset', 'D3.js'],
  },
  {
    period: '2020 — 2022',
    title: 'Web Developer',
    company: 'Fligno PH',
    url: 'https://www.fligno.com',
    description:
      'At Fligno, I built and maintained web applications using Vue, React, and Laravel for various client projects. I integrated third-party POS systems such as Shopify, Vend, and Square, worked with both REST and GraphQL APIs, and implemented payment gateways including Stripe and Merchant Warrior while keeping applications stable and maintainable.',
    technologies: ['Vue', 'React', 'Laravel', 'GraphQL', 'Stripe'],
  },
  {
    period: '2018 — 2020',
    title: 'Web Developer',
    company: 'Innovuze Solutions, Inc.',
    url: 'https://www.innovuze.com',
    description:
      'I worked on a mix of WordPress sites and custom web applications, built data scraping tools using Python and Scrapy, developed a parametric search application with Vue, CraftCMS, and Elasticsearch, and created interactive calculators with dynamic charts. This role gave me broad exposure to different technologies early in my career.',
    technologies: ['Vue', 'WordPress', 'Python', 'Scrapy', 'Elasticsearch'],
  },
]

const projects = [
  {
    title: 'Luminous',
    description:
      'A web platform for managing business operations and integrations.',
    url: 'https://www.joinluminous.com',
  },
  {
    title: 'TAGR',
    description:
      'A web-based platform for organizing and managing digital content.',
    url: 'https://tagr.io',
  },
  {
    title: 'QRThis',
    description:
      'A simple and practical QR code solution for businesses and individuals.',
    url: 'https://qrthis.io',
  },
  {
    title: 'Digikey Conversion Tools',
    description:
      'Interactive calculators used by thousands of users worldwide.',
    url: 'https://www.digikey.ph/en/resources/online-conversion-calculators',
  },
  {
    title: 'House of Joy',
    description:
      'A website built with clarity and accessibility in mind for a local organization.',
    url: 'https://www.houseofjoycdo.org',
  },
  {
    title: 'Highlands Realty PH',
    description:
      'A real estate website with custom content management features.',
    url: 'https://www.highlandsrealtyph.com',
  },
]

const writings = [
  {
    year: '2024',
    title:
      'Practical Lessons from Building and Maintaining Large Web Applications',
  },
  {
    year: '2020',
    title: 'Integrating Search and Performance in Content-Heavy Websites',
  },
  {
    year: '2019',
    title: 'Building Scalable Frontend Interfaces for Real Clients',
  },
]

// Components
function ExperienceCard({
  experience,
  isHovered,
  onHover,
}: {
  experience: (typeof experiences)[0]
  isHovered: boolean
  onHover: (hovered: boolean) => void
}) {
  return (
    <a
      href={experience.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-lg p-4 -mx-4 transition-all duration-200 ${isHovered ? 'bg-foreground/5' : ''}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="text-xs text-muted-foreground font-medium tracking-wide w-32 shrink-0 pt-1">
          {experience.period}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors flex items-center gap-1">
            {experience.title} · {experience.company}
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {experience.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {experience.technologies.map(tech => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-foreground/10 text-foreground/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}

function ProjectCard({
  project,
  isHovered,
  onHover,
}: {
  project: (typeof projects)[0]
  isHovered: boolean
  onHover: (hovered: boolean) => void
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-lg p-4 -mx-4 transition-all duration-200 ${isHovered ? 'bg-foreground/5' : ''}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors flex items-center gap-1">
        {project.title}
        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
      </h3>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
        {project.description}
      </p>
    </a>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150

      for (const section of navItems) {
        const element = sectionRefs.current[section.id]
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="lg:flex lg:gap-12">
          {/* Left Sidebar */}
          <header className="lg:w-[45%] lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                Christian Montebon
              </h1>
              <h2 className="text-lg font-medium text-foreground/80 mt-3">
                Frontend / Full-Stack Web Developer
              </h2>
              <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
                I build clean, reliable web applications with a strong focus on
                usability, maintainability, and real-world business needs.
              </p>

              {/* Navigation */}
              <nav className="hidden lg:block mt-16">
                <ul className="space-y-4">
                  {navItems.map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`group flex items-center gap-4 text-xs font-medium tracking-widest transition-all ${
                          activeSection === item.id
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span
                          className={`h-px transition-all ${
                            activeSection === item.id
                              ? 'w-16 bg-foreground'
                              : 'w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-foreground'
                          }`}
                        />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social Links */}
            <div className="flex gap-5 mt-8 lg:mt-0 py-8 lg:py-0">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </header>

          {/* Right Content */}
          <main className="lg:w-[55%] lg:py-24">
            {/* About Section */}
            <section
              id="about"
              ref={el => {
                sectionRefs.current.about = el
              }}
              className="mb-24 scroll-mt-24"
            >
              <h2 className="text-xs font-medium tracking-widest text-foreground mb-8 lg:hidden">
                ABOUT
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a web developer based in Cagayan de Oro City, Philippines,
                  with experience working remotely with international teams.
                  Over the years, I've worked on a wide range of projects, from
                  content-driven websites to large, data-heavy web applications
                  used in production.
                </p>
                <p>
                  My work sits at the intersection of frontend and backend
                  development. I enjoy building interfaces that feel natural to
                  use while making sure the systems behind them are scalable and
                  easy to maintain. I've spent most of my career working with
                  JavaScript frameworks and PHP-based backends, collaborating
                  closely with designers, product managers, and other engineers.
                </p>
                <p>
                  Outside of work, I enjoy refining my workflows, learning new
                  tools, and continuously improving how I approach
                  problem-solving in both code and design.
                </p>
              </div>
            </section>

            {/* Experience Section */}
            <section
              id="experience"
              ref={el => {
                sectionRefs.current.experience = el
              }}
              className="mb-24 scroll-mt-24"
            >
              <h2 className="text-xs font-medium tracking-widest text-foreground mb-8 lg:hidden">
                EXPERIENCE
              </h2>
              <div
                className={`space-y-2 ${hoveredExp !== null ? 'children-dimmed' : ''}`}
              >
                {experiences.map((exp, index) => (
                  <ExperienceCard
                    key={index}
                    experience={exp}
                    isHovered={hoveredExp === index}
                    onHover={hovered => setHoveredExp(hovered ? index : null)}
                  />
                ))}
              </div>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-1 mt-8 text-foreground font-medium hover:text-foreground/80 transition-colors group"
              >
                View Full Résumé
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </section>

            {/* Projects Section */}
            <section
              id="projects"
              ref={el => {
                sectionRefs.current.projects = el
              }}
              className="mb-24 scroll-mt-24"
            >
              <h2 className="text-xs font-medium tracking-widest text-foreground mb-8 lg:hidden">
                PROJECTS
              </h2>
              <div
                className={`space-y-2 ${hoveredProject !== null ? 'children-dimmed' : ''}`}
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    project={project}
                    isHovered={hoveredProject === index}
                    onHover={hovered =>
                      setHoveredProject(hovered ? index : null)
                    }
                  />
                ))}
              </div>
              <a
                href="/projects"
                className="inline-flex items-center gap-1 mt-8 text-foreground font-medium hover:text-foreground/80 transition-colors group"
              >
                View Full Project Archive
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </section>

            {/* Footer */}
            <footer className="text-sm text-muted-foreground pb-24"></footer>
          </main>
        </div>
      </div>
    </div>
  )
}
