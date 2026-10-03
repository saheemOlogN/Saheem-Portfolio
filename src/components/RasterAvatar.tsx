import './RasterCharacter.css'
export const characterStates = [
  'idle',
  'gear5',
  '67',
  'dance',
  'thinking',
  'sleepy',
  'celebrate',
] as const
export type CharacterState = (typeof characterStates)[number]
export default function Character({
  state = 'idle',
  animate = true,
}: {
  state?: CharacterState
  animate?: boolean
}) {
  return (
    <span
      className={`character-face raster-character character-${state}`}
      data-character-state={state}
      data-animated={animate}
      role="img"
      aria-label={`Saheem pixel avatar, ${state === '67' ? 'six seven hand animation' : state === 'gear5' ? 'Gear 5' : state}`}
    >
      <span className="raster-face" />
      {state === '67' && (
        <span className="avatar-caption" aria-hidden="true">
          SIX SEVEN
          <br />
          SIX SEVEN
        </span>
      )}
      {state === 'thinking' && (
        <span className="avatar-effect" aria-hidden="true">
          ?
        </span>
      )}
      {state === 'sleepy' && (
        <span className="avatar-effect" aria-hidden="true">
          Zzz
        </span>
      )}
      {state === 'celebrate' && (
        <span className="avatar-effect" aria-hidden="true">
          ★ +1
        </span>
      )}
      {state === 'dance' && (
        <span className="avatar-effect" aria-hidden="true">
          ♫
        </span>
      )}
    </span>
  )
}
