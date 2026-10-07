import { useReducedMotion } from './MotionPreference'
import { useEffect, useState } from 'react'
import Character from './Character'
import { CompanionDirector, type AvatarMode } from './companionDirector'
import './Companion.css'
export type CompanionEvent =
  | AvatarMode
  | 'terminal-open'
  | 'terminal-close'
  | 'game-preview'
  | 'game-win'
  | 'game-loss'
  | 'sleep-collected'
  | 'project-instagram'
  | 'project-urban'
  | 'farewell'
  | 'gear6'
  | `section-${string}`
export function signalCompanion(event: CompanionEvent) {
  window.dispatchEvent(
    new CustomEvent('portfolio:companion', { detail: event }),
  )
}
const actions: { mode: AvatarMode; label: string }[] = [
  { mode: 'idle', label: 'Look around' },
  { mode: 'gear5', label: 'Gear 5' },
  { mode: '67', label: 'Six seven' },
  { mode: 'dance', label: 'Victory dance' },
  { mode: 'thinking', label: 'Think' },
  { mode: 'sleepy', label: 'Power nap' },
  { mode: 'celebrate', label: 'Level up' },
]
const eventModes: Record<string, AvatarMode> = {
  'terminal-open': 'thinking',
  'terminal-close': 'celebrate',
  'game-preview': 'thinking',
  'game-win': 'celebrate',
  'game-loss': 'sleepy',
  'sleep-collected': 'sleepy',
  'project-instagram': 'celebrate',
  'project-urban': 'thinking',
}
export function Companion() {
  const reduced = useReducedMotion()
  const [director] = useState(() => new CompanionDirector())
  const [frame, setFrame] = useState({
    mode: director.mode,
    message: director.message,
  })
  useEffect(() => {
    if (reduced) return
    const update = () =>
      setFrame((previous) =>
        previous.mode === director.mode && previous.message === director.message
          ? previous
          : { mode: director.mode, message: director.message },
      )
    const respond = (event: Event) => {
      const key = (event as CustomEvent<CompanionEvent>).detail
      if (key.startsWith('section-')) director.setSection(key.slice(8))
      else if (actions.some((action) => action.mode === key))
        director.trigger(key as AvatarMode)
      else if (eventModes[key]) director.trigger(eventModes[key])
      update()
    }
    window.addEventListener('portfolio:companion', respond)
    const timer = setInterval(() => {
      if (!document.hidden) {
        director.advance(100)
        update()
      }
    }, 100)
    return () => {
      clearInterval(timer)
      window.removeEventListener('portfolio:companion', respond)
    }
  }, [director, reduced])
  return (
    <div
      className="face-companion automatic-companion"
      data-companion-state={frame.mode}
    >
      <div
        className="companion-speech"
        aria-hidden={!frame.message}
        style={{ visibility: frame.message ? 'visible' : 'hidden' }}
      >
        <p>{frame.message}</p>
      </div>
      <div className="companion-portrait">
        <Character state={frame.mode} />
      </div>
    </div>
  )
}
