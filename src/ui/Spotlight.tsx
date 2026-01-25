import { useEffect, useState, useRef } from 'react'

export default function Spotlight() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  )
  const rafRef = useRef<number | null>(null)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) {
      return
    }

    const handleMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY }

      // Throttle updates using requestAnimationFrame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        // Only update if position changed significantly (reduces unnecessary renders)
        if (!lastPosRef.current) {
          setPosition(newPos)
          lastPosRef.current = newPos
        } else {
          const dist = Math.hypot(
            newPos.x - lastPosRef.current.x,
            newPos.y - lastPosRef.current.y
          )
          // Update if moved more than 5px
          if (dist > 5) {
            setPosition(newPos)
            lastPosRef.current = newPos
          }
        }
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  if (!position) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
      style={{
        background: `radial-gradient(800px at ${position.x}px ${position.y}px, rgba(100, 220, 210, 0.08), transparent 90%)`,
        willChange: 'background',
      }}
    />
  )
}
