import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import DecryptedText from './DecryptedText'
import ClickSpark from './ClickSpark'
import { profile } from '../data'
import './Hero.css'
import SleepQuest from './SleepQuest'

export { Companion, signalCompanion } from './Companion'
import RoleType from './RoleType'
import HireMe from './HireMe'

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
      <SleepQuest/>
    </div>
    <a className="hero-explore" href="#about">A little more about me <span aria-hidden="true">↓</span></a>
  </section>
}
