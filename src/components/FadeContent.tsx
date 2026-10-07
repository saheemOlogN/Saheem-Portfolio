import { useReducedMotion } from './MotionPreference'
// Adapted from React Bits FadeContent (ReactBits-LICENSE.md).
// Retains its one-time opacity reveal using the project's existing Motion runtime.
import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
export default function FadeContent({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null),
    reduced = useReducedMotion()
  const visible = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div
      ref={ref}
      className="project-reveal"
      initial={false}
      animate={{
        opacity: reduced || visible ? 1 : 0.82,
        y: reduced || visible ? 0 : 6,
      }}
      transition={{ duration: reduced ? 0 : 0.24, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
