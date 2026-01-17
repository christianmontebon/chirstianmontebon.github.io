function ExperienceItem({
  dateRange,
  title,
  company,
  companyUrl,
  description,
  links,
  tech,
}: {
  dateRange: string
  title: string
  company: string
  companyUrl: string
  description: string
  links?: { label: string; url: string }[]
  tech: string[]
}) {
  return (
    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary/50" />

      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
        {dateRange}
      </header>

      <div className="z-10 sm:col-span-6">
        <h3 className="font-medium leading-snug">
          <a
            href={companyUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group/link inline-flex items-baseline text-foreground hover:text-accent focus-visible:text-accent"
          >
            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
            <span>
              {title} · {company}
              <span className="inline-block ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </span>
          </a>
        </h3>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {links && links.length > 0 && (
          <ul
            className="mt-2 flex flex-wrap gap-x-4"
            aria-label="Related links"
          >
            {links.map(link => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-muted-foreground hover:text-accent inline-flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3 w-3"
                  >
                    <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                    <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01-.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                  </svg>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <ul
          className="mt-3 flex flex-wrap gap-2"
          aria-label="Technologies used"
        >
          {tech.map(t => (
            <li key={t}>
              <span className="flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ExperienceItem
