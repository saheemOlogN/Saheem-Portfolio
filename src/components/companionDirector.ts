export type AvatarMode =
  | 'idle'
  | 'gear5'
  | '67'
  | 'dance'
  | 'thinking'
  | 'sleepy'
  | 'celebrate'
export const dialogue: Record<AvatarMode, string[]> = {
  idle: [
    'Observation Haki: checking every breakpoint.',
    'Side quest: find the missing semicolon.',
    'The One Piece is probably in node_modules.',
  ],
  gear5: [
    'Gear 5: the rubber-hose debugging arc.',
    'Drums of Liberation. Zero dependency conflicts.',
    'Nika mode: even this layout can stretch.',
  ],
  '67': [
    'Six seven. SIX SEVEN. Complexity: O(67).',
    'Six seven… even the compiler is doing it.',
    'Six seven. No lore. Just the hand physics.',
  ],
  dance: [
    'The build passed. Cue the Mos Eisley shuffle.',
    'Binks’ Sake, but the crew is all CSS divs.',
    'Konami-code energy. No extra lives required.',
  ],
  thinking: [
    'Domain Expansion: Infinite Stack Trace.',
    'L reading posture. One suspicious edge case.',
    'Stockfish would call this a dubious variable name.',
  ],
  sleepy: [
    'Zoro got lost. I found the nap route.',
    'AFK in the bonfire menu. Estus can wait.',
    'The JVM is warm. The developer is buffering.',
  ],
  celebrate: [
    'Achievement unlocked: it works outside localhost.',
    'The build is green. Praise the Sun!',
    'A critical hit on the final boss: off-by-one.',
  ],
}
export class CompanionDirector {
  mode: AvatarMode = 'idle'
  message = ''
  private home = true
  private clock = 0
  private lastHomeDialogue = -30000
  private skills = false
  private elapsed = 0
  private dialogueElapsed = 0
  private nextSpecial: number
  private specialRemaining = 0
  private random: () => number
  private sixSevenRemaining = 5000
  private lastSpecial: AvatarMode = '67'
  private lineIndex: Partial<Record<AvatarMode, number>> = { idle: 0 }
  constructor(random: () => number = Math.random) {
    this.random = random
    this.nextSpecial = this.delay()
  }
  private delay() {
    return 12000 + this.random() * 12000
  }
  private speak() {
    if (this.home && this.clock - this.lastHomeDialogue < 30000) {
      this.message = ''
      return
    }
    if (this.home) this.lastHomeDialogue = this.clock
    const index =
      ((this.lineIndex[this.mode] ?? -1) + 1) % dialogue[this.mode].length
    this.lineIndex[this.mode] = index
    this.message = dialogue[this.mode][index]
    this.dialogueElapsed = 0
  }
  private enter(mode: AvatarMode) {
    this.mode = mode
    this.speak()
  }
  setSection(section: string) {
    this.home = section === 'hero'
    if (this.home) this.message = ''
    this.skills = section === 'skills'
    if (this.mode === '67' && this.specialRemaining > 0) return
    this.specialRemaining = 0
    this.enter(this.skills ? 'gear5' : 'idle')
    this.elapsed = 0
    this.nextSpecial = this.delay()
  }
  trigger(mode: AvatarMode) {
    if (this.mode === '67' && this.specialRemaining > 0) return
    this.enter(mode)
    this.specialRemaining = 6000
    if (mode === '67') this.sixSevenRemaining = 24000 + this.random() * 10000
  }
  advance(milliseconds: number) {
    this.clock += milliseconds
    this.dialogueElapsed += milliseconds
    if (this.home && this.dialogueElapsed >= 6000) this.message = ''
    this.sixSevenRemaining -= milliseconds
    if (this.sixSevenRemaining <= 0 && this.mode !== '67') {
      this.trigger('67')
      return this.mode
    }
    if (this.specialRemaining > 0) {
      this.specialRemaining -= milliseconds
      if (this.specialRemaining <= 0) {
        this.enter(this.skills ? 'gear5' : 'idle')
        this.elapsed = 0
        this.nextSpecial = this.delay()
      }
    } else if (!this.skills) {
      this.elapsed += milliseconds
      if (this.elapsed >= this.nextSpecial) {
        const choices: AvatarMode[] = [
          'dance',
          'thinking',
          'sleepy',
          'celebrate',
        ].filter((mode) => mode !== this.lastSpecial) as AvatarMode[]
        const next =
          choices[
            Math.min(
              choices.length - 1,
              Math.floor(this.random() * choices.length),
            )
          ]
        this.lastSpecial = next
        this.trigger(next)
      }
    }
    if (this.dialogueElapsed >= (this.home ? 30000 : 8500)) this.speak()
    return this.mode
  }
}
