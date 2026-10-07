import { useReducedMotion } from './MotionPreference'
import { useRef, useState, type KeyboardEvent } from 'react'
import { motion, useInView } from 'motion/react'
import { experience } from '../data'
import './ExperienceMap.css'

function LocationIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width="40"
      height="40"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      shapeRendering="crispEdges"
    >
      {index === 0 ? (
        <>
          <path d="M8 34V12h24v22M14 12V6h12v6M5 34h30" />
          <path
            d="M14 17h4v4h-4Zm9 0h4v4h-4ZM14 26h4v4h-4Zm9 0h4v4h-4Z"
            fill="currentColor"
          />
        </>
      ) : index === 1 ? (
        <>
          <path d="M5 34h30M9 34V16l11-9 11 9v18M15 34v-9h10v9M15 17h10v4H15" />
          <path d="M17 4h6v4h-6" fill="currentColor" />
        </>
      ) : (
        <>
          <path d="M5 9h30v20H5ZM2 34h36M10 29l-2 5m22-5 2 5M13 16l-4 4 4 4m14-8 4 4-4 4m-5-10-4 12" />
        </>
      )}
    </svg>
  )
}
const positions = [
  { left: '16%', top: '26%' },
  { left: '50%', top: '12%' },
  { left: '84%', top: '26%' },
]
export default function ExperienceMap() {
  const [selected, setSelected] = useState(0),
    ref = useRef<HTMLDivElement>(null),
    seen = useInView(ref, { once: true, amount: 0.25 }),
    reduced = useReducedMotion(),
    buttons = useRef<(HTMLButtonElement | null)[]>([])
  function keyboard(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = i
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
      next = (i + 1) % experience.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
      next = (i + experience.length - 1) % experience.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = experience.length - 1
    else return
    e.preventDefault()
    setSelected(next)
    buttons.current[next]?.focus()
  }
  const job = experience[selected]
  return (
    <div ref={ref} className="experience-map">
      <p className="route-note">
        Explore a checkpoint. Freelance work runs alongside these roles.
      </p>
      <div className={`route-map ${seen ? 'route-seen' : ''}`}>
        <svg
          className="route-path route-path-desktop"
          viewBox="0 0 1000 210"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="route-track" d="M160 78H265V32H500V32H730V78H840" />
          <path
            className="route-dashes"
            d="M160 78H265V32H500V32H730V78H840"
            pathLength="1"
          />
        </svg>
        <svg
          className="route-path route-path-mobile"
          viewBox="0 0 60 390"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="route-track"
            d="M25 36V105H42V164H25V234H42V294H25V358"
          />
          <path
            className="route-dashes"
            d="M25 36V105H42V164H25V234H42V294H25V358"
            pathLength="1"
          />
        </svg>
        <motion.span
          className={`route-traveler traveler-${selected}`}
          aria-hidden="true"
          animate={positions[selected]}
          transition={{ duration: reduced ? 0 : 0.38, ease: 'easeInOut' }}
        >
          ◆
        </motion.span>
        <div
          className="route-checkpoints"
          role="group"
          aria-label="Experience checkpoints"
        >
          {experience.map((entry, i) => (
            <button
              ref={(el) => {
                buttons.current[i] = el
              }}
              className={`checkpoint checkpoint-${i}`}
              key={entry.company}
              aria-pressed={selected === i}
              aria-controls="experience-details"
              onClick={() => setSelected(i)}
              onKeyDown={(e) => keyboard(e, i)}
            >
              <span className="checkpoint-icon">
                <LocationIcon index={i} />
              </span>
              <span className="checkpoint-company">{entry.company}</span>
              <span className="checkpoint-role">{entry.role}</span>
              <span className="checkpoint-date">{entry.date}</span>
              <span className="checkpoint-place">{entry.location}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        id="experience-details"
        className="route-details"
        role="region"
        aria-label="Selected experience responsibilities"
        aria-live="polite"
      >
        <motion.div
          key={selected}
          initial={reduced ? false : { opacity: 0.4, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
        >
          <div className="route-detail-title">
            <h3>{job.role}</h3>
            <span>
              {job.company} · {job.date}
            </span>
          </div>
          <ul>
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
