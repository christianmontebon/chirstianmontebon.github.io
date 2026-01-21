interface AboutProps {
  sectionRef: (el: HTMLElement | null) => void
}

export default function About({ sectionRef }: AboutProps) {
  return (
    <section id="about" ref={sectionRef} className="mb-24 scroll-mt-24">
      <h2 className="text-xs font-medium tracking-widest text-foreground mb-8 lg:hidden">
        ABOUT
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          I’m a web developer based in Cagayan de Oro City, Philippines, with
          experience working remotely with international teams. Over the years,
          I’ve worked on a wide range of projects, from content-driven websites
          to large, data-heavy web applications used in production.
        </p>
        <p>
          My experience sits across frontend and backend development, where I’ve
          worked on features, workflows, and integrations that support real
          business operations. I tend to focus on clarity and maintainability,
          especially when systems grow and requirements change.
        </p>
        <p>
          Outside of work, I spend time improving my workflows, experimenting
          with new tools, and automating small, repetitive tasks. I enjoy
          finding practical ways to reduce friction and keep projects manageable
          over time.
        </p>
      </div>
    </section>
  )
}
