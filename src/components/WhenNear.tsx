import { useEffect, useRef, useState, type ReactNode } from 'react'

export default function WhenNear({
  children,
  minHeight = 0,
}: {
  children: ReactNode
  minHeight?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ minHeight }}>
      {ready ? children : null}
    </div>
  )
}
