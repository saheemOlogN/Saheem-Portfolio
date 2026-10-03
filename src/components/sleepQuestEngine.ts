export const maze = [
  '#################',
  '#o......#......o#',
  '#.###.#.#.#.###.#',
  '#.....#...#.....#',
  '###.#.#####.#.###',
  '#...#... ...#...#',
  '#.#####.#.#####.#',
  '#.......#.......#',
  '#.###.#.#.#.###.#',
  '#o....#...#....o#',
  '#################',
] as const
export type Direction = 'up' | 'down' | 'left' | 'right'
export type Point = { x: number; y: number }
export type Game = {
  player: Point
  enemies: Point[]
  direction: Direction | null
  queued: Direction | null
  pellets: Set<string>
  powers: Set<string>
  score: number
  lives: number
  tick: number
  power: number
  grace: number
  status: 'ready' | 'playing' | 'paused' | 'won' | 'lost'
}
export const directions: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}
export const start = { x: 8, y: 5 }
const homes = [
  { x: 1, y: 1 },
  { x: 15, y: 9 },
]
export const key = (p: Point) => `${p.x},${p.y}`
export const walkable = (p: Point) =>
  maze[p.y]?.[p.x] !== undefined && maze[p.y][p.x] !== '#'
const move = (p: Point, d: Direction): Point => ({
  x: p.x + directions[d].x,
  y: p.y + directions[d].y,
})
export function createGame(): Game {
  const pellets = new Set<string>(),
    powers = new Set<string>()
  maze.forEach((row, y) =>
    [...row].forEach((cell, x) => {
      if (cell === '.' || cell === 'o') pellets.add(`${x},${y}`)
      if (cell === 'o') powers.add(`${x},${y}`)
    }),
  )
  return {
    player: { ...start },
    enemies: homes.map((p) => ({ ...p })),
    direction: null,
    queued: null,
    pellets,
    powers,
    score: 0,
    lives: 3,
    tick: 0,
    power: 0,
    grace: 14,
    status: 'ready',
  }
}
function distance(from: Point, to: Point): number {
  const queue = [{ ...from, d: 0 }],
    seen = new Set([key(from)])
  for (let i = 0; i < queue.length; i++) {
    const p = queue[i]
    if (key(p) === key(to)) return p.d
    for (const d of Object.keys(directions) as Direction[]) {
      const n = move(p, d)
      if (walkable(n) && !seen.has(key(n))) {
        seen.add(key(n))
        queue.push({ ...n, d: p.d + 1 })
      }
    }
  }
  return Infinity
}
export function step(game: Game, random = Math.random): Game {
  if (game.status !== 'playing') return game
  const g: Game = {
    ...game,
    player: { ...game.player },
    enemies: game.enemies.map((p) => ({ ...p })),
    pellets: new Set(game.pellets),
    powers: new Set(game.powers),
    tick: game.tick + 1,
    power: Math.max(0, game.power - 1),
    grace: Math.max(0, game.grace - 1),
  }
  if (g.queued && walkable(move(g.player, g.queued))) g.direction = g.queued
  if (g.direction && walkable(move(g.player, g.direction)))
    g.player = move(g.player, g.direction)
  const cell = key(g.player)
  if (g.pellets.delete(cell)) g.score += 10
  if (g.powers.delete(cell)) {
    g.power = 40
    g.score += 40
  }
  const collide = () => {
    if (g.grace > 0) return false
    for (let i = 0; i < g.enemies.length; i++)
      if (key(g.enemies[i]) === key(g.player)) {
        if (g.power) {
          g.score += 100
          g.enemies[i] = { ...homes[i] }
        } else {
          g.lives--
          g.status = g.lives ? 'playing' : 'lost'
          g.player = { ...start }
          g.enemies = homes.map((p) => ({ ...p }))
          g.direction = null
          g.queued = null
          g.grace = 14
          return true
        }
      }
    return false
  }
  if (collide()) return g
  if (g.tick % 3 === 0) {
    g.enemies = g.enemies.map((p) => {
      const options = (Object.keys(directions) as Direction[])
        .map((d) => move(p, d))
        .filter(walkable)
      if (!options.length) return p
      if (random() < 0.22)
        return options[
          Math.min(options.length - 1, Math.floor(random() * options.length))
        ]
      options.sort((a, b) =>
        g.power
          ? distance(b, g.player) - distance(a, g.player)
          : distance(a, g.player) - distance(b, g.player),
      )
      return options[0]
    })
  }
  if (collide()) return g
  if (g.pellets.size === 0) g.status = 'won'
  return g
}
