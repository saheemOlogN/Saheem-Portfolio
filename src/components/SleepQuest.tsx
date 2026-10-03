import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Character from './Character'
import { signalCompanion } from './Companion'
import {
  createGame,
  step,
  maze,
  type Direction,
  type Game,
} from './sleepQuestEngine'
import './SleepQuest.css'
const cell = 24
const keys: Record<string, Direction> = {
  ArrowUp: 'up',
  w: 'up',
  ArrowDown: 'down',
  s: 'down',
  ArrowLeft: 'left',
  a: 'left',
  ArrowRight: 'right',
  d: 'right',
}
export default function SleepQuest() {
  const [game, setGame] = useState(createGame),
    current = useRef(game),
    board = useRef<HTMLDivElement>(null),
    root = useRef<HTMLDivElement>(null)
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem('sleep-quest-best')) || 0
    } catch {
      return 0
    }
  })
  function publish(next: Game) {
    current.current = next
    setGame(next)
  }
  function pause() {
    if (current.current.status === 'playing')
      publish({ ...current.current, status: 'paused' })
  }
  function play() {
    const g = current.current
    publish(
      g.status === 'paused'
        ? { ...g, status: 'playing' }
        : { ...createGame(), status: 'playing' },
    )
    board.current?.focus()
  }
  function steer(direction: Direction) {
    if (current.current.status !== 'playing') return
    publish({ ...current.current, queued: direction })
    board.current?.focus()
  }
  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target instanceof HTMLButtonElement) return
    const direction = keys[event.key] ?? keys[event.key.toLowerCase()]
    if (direction) {
      event.preventDefault()
      steer(direction)
    } else if (event.key === ' ' || event.key === 'Escape') {
      event.preventDefault()
      if (current.current.status === 'playing') pause()
      else if (event.key === ' ') play()
    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      const before = current.current
      if (before.status !== 'playing') return
      const next = step(before)
      current.current = next
      setGame(next)
      if (next.status === 'won' || next.status === 'lost') {
        signalCompanion(next.status === 'won' ? 'game-win' : 'game-loss')
        setBest((previous) => {
          const score = Math.max(previous, next.score)
          try {
            localStorage.setItem('sleep-quest-best', String(score))
          } catch {
            /* Optional persistence. */
          }
          return score
        })
      } else if (next.power > before.power) signalCompanion('sleep-collected')
    }, 150)
    const stop = () => {
      if (current.current.status === 'playing') {
        const next = { ...current.current, status: 'paused' as const }
        current.current = next
        setGame(next)
      }
    }
    const visibility = () => {
      if (document.hidden) stop()
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) stop()
      },
      { threshold: 0 },
    )
    if (root.current) observer.observe(root.current)
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('blur', stop)
    return () => {
      clearInterval(timer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('blur', stop)
    }
  }, [])
  const overlay = game.status !== 'playing'
  return (
    <div
      ref={root}
      className="quest playable-quest"
      data-game-surface
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) pause()
      }}
    >
      <div className="quest-heading">
        <h2>Sleep Quest</h2>
        <span>Best {best}</span>
      </div>
      <div className="quest-scoreboard">
        <span>
          Score <strong>{game.score}</strong>
        </span>
        <span>
          Sleep left <strong>{game.pellets.size}</strong>
        </span>
        <span aria-label={`${game.lives} lives`}>
          {'♥'.repeat(game.lives)}
          {'♡'.repeat(3 - game.lives)}
        </span>
      </div>
      <div
        ref={board}
        className="quest-board"
        tabIndex={0}
        role="group"
        aria-label="Sleep Quest game board"
        aria-describedby="quest-controls"
        onKeyDown={keyboard}
      >
        <svg viewBox={`0 0 ${17 * cell} ${11 * cell}`} aria-hidden="true">
          <rect width="408" height="264" fill="#0c1320" />
          {maze.flatMap((row, y) =>
            [...row].map((value, x) =>
              value === '#' ? (
                <rect
                  key={`${x},${y}`}
                  x={x * cell + 2}
                  y={y * cell + 2}
                  width={20}
                  height={20}
                  rx={3}
                  fill="#1d343c"
                  stroke="#7eaaa0"
                  strokeWidth={1.5}
                />
              ) : null,
            ),
          )}
          {[...game.pellets].map((id) => {
            const [x, y] = id.split(',').map(Number)
            return game.powers.has(id) ? (
              <text
                key={id}
                x={x * cell + 12}
                y={y * cell + 15}
                textAnchor="middle"
                fill="#e8ce8d"
                fontSize="10"
                fontFamily="monospace"
              >
                Zzz
              </text>
            ) : (
              <circle
                key={id}
                cx={x * cell + 12}
                cy={y * cell + 12}
                r={2}
                fill="#c7d0ad"
              />
            )
          })}
          {game.enemies.map((enemy, i) => (
            <g
              key={i}
              transform={`translate(${enemy.x * cell + 3} ${enemy.y * cell + 3})`}
              opacity={game.power ? 0.55 : 1}
            >
              <path
                d="M2 18V7a7 7 0 0 1 14 0v11l-4-3-3 3-3-3Z"
                fill={game.power ? '#78b9d0' : i ? '#c2aee0' : '#e29f76'}
              />
              <rect x="5" y="7" width="3" height="4" fill="#101722" />
              <rect x="11" y="7" width="3" height="4" fill="#101722" />
            </g>
          ))}
          <foreignObject
            x={game.player.x * cell - 3}
            y={game.player.y * cell - 3}
            width={30}
            height={30}
            opacity={game.grace > 0 && game.tick % 2 === 0 ? 0.55 : 1}
          >
            <Character state={game.power ? 'gear5' : 'idle'} />
          </foreignObject>
        </svg>
        {overlay && (
          <div className="quest-overlay">
            <h3>
              {game.status === 'ready'
                ? 'A little rest, earned.'
                : game.status === 'paused'
                  ? 'Taking a breather.'
                  : game.status === 'won'
                    ? 'Sleep secured!'
                    : 'Distractions won.'}
            </h3>
            <p>
              {game.status === 'ready'
                ? 'Collect every dot. Zzz gives you six seconds to chase the distractions.'
                : game.status === 'paused'
                  ? 'Your progress is safe.'
                  : `Final score: ${game.score}`}
            </p>
            <button type="button" className="small-button" onClick={play}>
              {game.status === 'paused'
                ? 'Resume'
                : game.status === 'ready'
                  ? 'Start game'
                  : 'Play again'}
            </button>
          </div>
        )}
      </div>
      <div className="quest-game-actions">
        <p role="status">
          {game.power
            ? `Gear 5 · ${Math.ceil(game.power * 0.15)}s`
            : game.status === 'playing'
              ? 'Dodge College and Procrastination.'
              : game.status === 'won'
                ? 'All sleep collected!'
                : game.status === 'lost'
                  ? 'Try another run.'
                  : 'Ready when you are.'}
        </p>
        {game.status === 'playing' && (
          <button type="button" className="small-button" onClick={pause}>
            Pause
          </button>
        )}
      </div>
      <div className="quest-dpad" role="group" aria-label="Movement controls">
        {(['up', 'left', 'down', 'right'] as Direction[]).map((direction) => (
          <button
            key={direction}
            type="button"
            className={`quest-direction-${direction}`}
            aria-label={`Move ${direction}`}
            disabled={game.status !== 'playing'}
            onClick={() => steer(direction)}
          >
            {{ up: '↑', down: '↓', left: '←', right: '→' }[direction]}
          </button>
        ))}
      </div>
      <p id="quest-controls" className="quest-caption">
        Arrow keys / WASD to move · Space to pause.
        <br />
        On touch, tap an arrow to turn.
      </p>
    </div>
  )
}
