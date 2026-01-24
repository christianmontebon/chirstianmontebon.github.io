import { useEffect, useState } from 'react'

export default function MouseTrail() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) {
      return
    }

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  if (!position) return null

  return (
    <div
      className="pointer-events-none fixed z-10"
      aria-hidden="true"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '700px',
        height: '700px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.06) 15%, rgba(6, 182, 212, 0.04) 30%, rgba(2, 132, 199, 0.02) 45%, transparent 60%)`,
        mixBlendMode: 'screen',
        clipPath: 'circle(50% at 50% 50%)',
      }}
    />
  )
}
