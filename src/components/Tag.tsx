import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  className?: string
}

export default function Tag({ children, className }: TagProps) {
  const baseClasses =
    'relative inline-flex items-center text-xs px-2.5 py-1 rounded-full ' +
    'text-foreground/80 border border-foreground/20 ' +
    'backdrop-blur-md backdrop-saturate-150 shadow-sm ' +
    'bg-gradient-to-br from-white/20 via-white/10 to-white/5 ' +
    'dark:from-white/10 dark:via-white/5 dark:to-white/0 ' +
    'transition-colors hover:from-white/25 hover:to-white/10'

  return <span className={`${baseClasses} ${className ?? ''}`}>{children}</span>
}

