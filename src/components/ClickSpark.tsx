// Adapted from React Bits ClickSpark. License: ReactBits-LICENSE.md.
// Uses the original radial spark geometry; frames run only during a click burst.
import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react'
import { useReducedMotion } from 'motion/react'
export default function ClickSpark({
  children,
  sparkColor = '#fff',
  sparkCount = 4,
  sparkSize = 4,
  sparkRadius = 12,
  duration = 220,
}: {
  children: ReactNode
  sparkColor?: string
  sparkCount?: number
  sparkSize?: number
  sparkRadius?: number
  duration?: number
}) {
  const reduced = useReducedMotion(),
    canvas = useRef<HTMLCanvasElement>(null),
    frame = useRef(0)
  useEffect(() => () => cancelAnimationFrame(frame.current), [])
  useEffect(() => {
    if (reduced) {
      cancelAnimationFrame(frame.current)
      const el = canvas.current
      el?.getContext('2d')?.clearRect(0, 0, el.width, el.height)
    }
  }, [reduced])
  function burst(event: MouseEvent<HTMLDivElement>) {
    if (
      reduced ||
      !event.detail ||
      !(event.target as Element).closest('a,button')
    )
      return
    const el = canvas.current,
      ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const rect = el.getBoundingClientRect()
    el.width = rect.width
    el.height = rect.height
    const x = event.clientX - rect.left,
      y = event.clientY - rect.top,
      start = performance.now()
    cancelAnimationFrame(frame.current)
    const draw = (now: number) => {
      const t = Math.min((now - start) / duration, 1),
        e = t * (2 - t)
      ctx.clearRect(0, 0, el.width, el.height)
      if (t === 1) return
      for (let i = 0; i < sparkCount; i++) {
        const angle = (2 * Math.PI * i) / sparkCount,
          d = e * sparkRadius
        ctx.fillStyle = sparkColor
        ctx.fillRect(
          Math.round(x + d * Math.cos(angle)),
          Math.round(y + d * Math.sin(angle)),
          Math.max(1, sparkSize * (1 - e)),
          Math.max(1, sparkSize * (1 - e)),
        )
      }
      frame.current = requestAnimationFrame(draw)
    }
    frame.current = requestAnimationFrame(draw)
  }
  return (
    <div className="click-spark" onClick={burst}>
      <canvas ref={canvas} aria-hidden="true" />
      {children}
    </div>
  )
}
