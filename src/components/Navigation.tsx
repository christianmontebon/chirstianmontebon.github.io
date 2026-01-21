import { navItems } from '../data/navItems'

interface NavigationProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

export default function Navigation({
  activeSection,
  onNavigate,
}: NavigationProps) {
  return (
    <nav className="hidden lg:block mt-16">
      <ul className="space-y-4">
        {navItems.map(item => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={`group flex items-center gap-4 text-xs font-medium tracking-widest transition-colors ${
                activeSection === item.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span
                className={`h-px rounded-full transition-all ${
                  activeSection === item.id
                    ? 'w-24 bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.45)]'
                    : 'w-10 bg-muted-foreground/50 group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-emerald-400/60 group-hover:to-sky-400/60 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.35)]'
                }`}
              />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
