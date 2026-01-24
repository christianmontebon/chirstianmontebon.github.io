import { useEffect, useRef } from 'react'

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const cursorPosRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) {
      return
    }

    const setSize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()

    const handleMove = (e: MouseEvent) => {
      cursorPosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleLeave = () => {
      // Keep the spotlight at the last position when cursor leaves
      // Don't update cursorPosRef, so it stays where it was
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (cursorPosRef.current) {
        const { x, y } = cursorPosRef.current
        const radius = 600

        ctx.globalCompositeOperation = 'screen'
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius)
        // Subtle spotlight effect
        grad.addColorStop(0, 'rgba(16, 185, 129, 0.08)')
        grad.addColorStop(0.3, 'rgba(6, 182, 212, 0.05)')
        grad.addColorStop(0.6, 'rgba(2, 132, 199, 0.02)')
        grad.addColorStop(1, 'rgba(2, 132, 199, 0)')
        
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalCompositeOperation = 'source-over'
      }

      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    window.addEventListener('resize', setSize)
    
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('resize', setSize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    />
  )
}
