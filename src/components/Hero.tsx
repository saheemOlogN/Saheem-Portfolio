import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import DecryptedText from './DecryptedText'
import ClickSpark from './ClickSpark'
import { profile } from '../data'
import './Hero.css'
import Character from './Character'

export { Companion, signalCompanion } from './Companion'
import { signalCompanion } from './Companion'
import RoleType from './RoleType'
import HireMe from './HireMe'

// Existing 440 x 276 world coordinates stay independent of responsive display size.
export const mazeLayout = {
  viewBox: '0 0 440 276',
  walls: 'M18 18H422V258H18Z M18 64H76V112H126V64H176V18 M222 18V65H274V112H326V64H374V18 M18 160H76V210H126V258 M174 258V210H224V160H276V210H326V258 M374 258V160H422 M126 112V160H174V112H222 M326 112V160H276 M76 18V32 M374 64V112H422 M18 210H40 M224 65V112',
  player: { x: 46, y: 125 },
  college: { x: 197, y: 237 },
  procrastination: { x: 347, y: 196 },
  sleep: [[105, 84], [348, 38], [301, 187], [47, 238]],
} as const

export function Hero() {
  const reduced = useReducedMotion()
  const [finePointer, setFinePointer] = useState(false)
  const scene = useRef<HTMLElement>(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 65, damping: 25 })
  const smoothY = useSpring(y, { stiffness: 65, damping: 25 })
  const foregroundX = useTransform(smoothX, value => value * 1.7)
  const foregroundY = useTransform(smoothY, value => value * 1.3)
  useEffect(() => {
    const query = matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFinePointer(query.matches)
    update(); query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  useEffect(() => { if (reduced || !finePointer) { x.set(0); y.set(0) } }, [reduced, finePointer, x, y])
  function move(event: PointerEvent<HTMLElement>) {
    if (reduced || !finePointer || event.pointerType !== 'mouse') return
    if ((event.target as Element).closest('[data-game-surface]')) return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / rect.width - .5) * 10)
    y.set(((event.clientY - rect.top) / rect.height - .5) * 6)
  }
  function resetDepth() { x.set(0); y.set(0) }
  return <section id="hero" ref={scene} className="hero-scene" aria-labelledby="hero-title" onPointerMove={move} onPointerLeave={resetDepth} data-depth-enabled={!reduced && finePointer}>
    <div className="scene-art" aria-hidden="true">
      <motion.div className="city-layer" style={{ x: reduced ? 0 : smoothX, y: reduced ? 0 : smoothY }} />
      <div className="scene-shade" />
      <motion.svg className="rooftop-layer" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ x: reduced ? 0 : foregroundX, y: reduced ? 0 : foregroundY }}><path d="M0 45H200V62H516V70H855V49H1080V64H1440V100H0Z" fill="#090e19"/><path d="M0 45H200V62H516M855 49H1080V64H1440" fill="none" stroke="#354154" strokeWidth="3"/><path d="M88 45V100M305 62V100M730 70V100M1182 64V100" stroke="#182232" strokeWidth="2"/></motion.svg>
    </div>
    <div className="hero-layout wrap">
      <div className="hero-intro">
        <h1 id="hero-title"><span className="hello-line">Hi, I’m</span><span className="name-line">{reduced ? 'Saheem.' : <DecryptedText text="Saheem." animateOn="view" speed={40} maxIterations={4} characters="SAHEEM.01" />}</span></h1>
        <RoleType/>
        <p className="hero-copy">I build web apps, work with APIs, and spend a little too long figuring out why my C++ code fails.</p>
        <ClickSpark sparkColor="#b4e0bc" sparkCount={4} sparkSize={4} sparkRadius={12} duration={220}>
          <div className="hero-buttons"><HireMe/><a className="arcade-button secondary-action" href="/Saheem_Nakhwa_Resume.pdf" target="_blank" rel="noreferrer">Resume <svg aria-hidden="true" viewBox="0 0 16 16" width="15" height="15"><path d="M4 1h6l3 3v11H3V1h1m5 0v4h4M5 8h5M5 11h5" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></a></div>
        </ClickSpark>
        <div className="hero-socials">{profile.links.map(link => <a key={link.name} href={link.url} target="_blank" rel="noreferrer">{link.name}</a>)}</div>
      </div>
      <div className="quest" data-game-surface onPointerEnter={() => { resetDepth(); signalCompanion('game-preview') }}>
        <div className="quest-heading"><h2>Sleep Quest</h2><span>Coming soon</span></div>
        <Maze />
        <div className="quest-legend"><span><PixelIcon kind="college"/> College</span><span><PixelIcon kind="ghost"/> Procrastination</span><span className="sleep-legend">Zzz <span>Sleep</span></span></div>
        <p className="quest-caption">Collect some sleep. Dodge the distractions.</p>
      </div>
    </div>
    <a className="hero-explore" href="#about">A little more about me <span aria-hidden="true">↓</span></a>
  </section>
}

export function PixelIcon({kind}:{kind:'college'|'ghost'}) {
 return <svg viewBox="0 0 16 16" width="24" height="24" aria-hidden="true" shapeRendering="crispEdges">{kind==='college'?<>
  <path d="M3 1h10v1h1v12h-1v1H2V2h1Z" fill="#241c27"/><path d="M3 2h9v11H3Z" fill="#e19b73"/><path d="M3 2h2v11H3Z" fill="#9d5c51"/><path d="M5 13h8v2H5Z" fill="#f1dab0"/><path d="M6 5h2v1h1v1H7V6H6m4 1V5h2v1h-1v1M7 9h4v1H7" fill="#342635"/><path d="M4 15h2v1H3v-1m8 0h2v1h-3v-1" fill="#e19b73"/>
 </>:<><path d="M5 1h6v1h2v2h1v8h1v3h-3v-2h-2v2H7v-2H5v2H2v-3h1V4h1V2h1Z" fill="#c2b5dd"/><path d="M3 10h2v3H3m8-10h2v9h-2v2h-1v-3h1Z" fill="#8b7eaa"/><path d="M5 6h3v1H5m5-1h3v1h-3M8 9h1v1h2V9h1v2H8Z" fill="#29283b"/></>}</svg>
}
function Maze() {
 return <svg className="quest-maze" viewBox={mazeLayout.viewBox} role="img" aria-label="Sleep Quest static maze: Saheem's cartoon avatar, angry College book, sleepy Procrastination ghost and Zzz sleep collectibles">
  <rect x="11" y="11" width="418" height="254" rx="3" fill="#0c1320" fillOpacity=".97"/>
  <path d={mazeLayout.walls} fill="none" stroke="#739f9a" strokeWidth="6" strokeLinejoin="miter"/>
  <path d={mazeLayout.walls} fill="none" stroke="#bdd4b6" strokeWidth="2" strokeLinejoin="miter"/>
  <g fill="#748181">{[[45,42],[100,40],[147,41],[199,88],[299,43],[347,91],[399,137],[346,235],[246,236],[149,189],[45,184],[98,137],[200,187],[350,137]].map(([px,py])=><rect key={`${px}-${py}`} x={px} y={py} width="3" height="3"/>)}</g>
  <g fill="#e2c991" fontFamily="Silkscreen,monospace" fontSize="14">{mazeLayout.sleep.map(([px,py])=><text key={`${px}-${py}`} x={px} y={py} textAnchor="middle">Zzz</text>)}</g>
  <foreignObject x={mazeLayout.player.x-18} y={mazeLayout.player.y-18} width="36" height="36"><Character/></foreignObject>
  <g transform={`translate(${mazeLayout.college.x-12} ${mazeLayout.college.y-12})`}><PixelIcon kind="college"/></g>
  <g transform={`translate(${mazeLayout.procrastination.x-12} ${mazeLayout.procrastination.y-12})`}><PixelIcon kind="ghost"/></g>
 </svg>
}


