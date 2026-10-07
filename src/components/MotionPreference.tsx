import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { MotionConfig } from 'motion/react'

const MotionContext = createContext(false)

export function MotionPreference({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'paused' : 'playing'
    return () => {
      delete document.documentElement.dataset.motion
    }
  }, [reduced])

  return (
    <MotionContext.Provider value={reduced}>
      <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  )
}

export function useReducedMotion() {
  return useContext(MotionContext)
}
