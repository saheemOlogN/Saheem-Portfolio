import { useRef, useState } from 'react'
import { TerminalDemo } from './components/TerminalDemo'
import './App.css'
import { Hero, Companion, signalCompanion } from './components/Hero'
import Portfolio from './components/Portfolio'
import useActiveSection from './components/useActiveSection'
import './components/ArcadeNav.css'
const nav = ['About', 'Experience', 'Projects', 'Activity', 'Contact']
export default function App() {
 const activeSection=useActiveSection(), navSection=['skills','achievements'].includes(activeSection)?'projects':activeSection
 const dialog=useRef<HTMLDialogElement>(null), opener=useRef<HTMLButtonElement>(null)
 const [menu,setMenu]=useState(false), [terminalOpen,setTerminalOpen]=useState(false)
 function close(){setTerminalOpen(false);signalCompanion('terminal-close');dialog.current?.close();document.body.style.overflow='';opener.current?.focus()}
 function open(){setMenu(false);setTerminalOpen(true);signalCompanion('terminal-open');dialog.current?.showModal();document.body.style.overflow='hidden'}
 return <><a className="skip" href="#main">Skip to content</a><header className="arcade-nav"><div className="nav-shell">
 <div className="arcade-nav-left"><button className="menu-button" aria-expanded={menu} aria-controls="main-nav" onClick={()=>setMenu(!menu)}><span aria-hidden="true">{menu?'×':'☰'}</span> {menu?'Close menu':'Select stage'}</button>
 <nav id="main-nav" aria-label="Main navigation" className={menu?'expanded':''} onKeyDown={e=>{if(e.key==='Escape'){setMenu(false);e.currentTarget.parentElement?.querySelector<HTMLButtonElement>('.menu-button')?.focus()}}}>
 {nav.map(n=><a key={n} href={`#${n.toLowerCase()}`} aria-current={navSection===n.toLowerCase()?'location':undefined} onClick={()=>setMenu(false)}><span>{n}</span><span className="nav-stage-cursor" aria-hidden="true">▸</span></a>)}
 <button ref={opener} className="terminal-button" onClick={open} aria-haspopup="dialog"><span aria-hidden="true">&gt;_</span> Terminal</button>
 </nav></div><div className="nav-end"><Companion/></div>
 </div></header>
 <main id="main"><Hero/>
 <Portfolio/></main><footer className="wrap"><span>© {new Date().getFullYear()} Saheem Nakhwa</span><span>BUILT WITH INTENT. A LITTLE BIT OF ARCADE.</span><a href="#main">Back to top ↑</a></footer>
 <dialog className="terminal-dialog" ref={dialog} aria-label="Saheem-Portfolio terminal" onClick={e=>{if(e.target===e.currentTarget){const rect=e.currentTarget.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)close()}}} onCancel={e=>{e.preventDefault();close()}} onClose={()=>{setTerminalOpen(false);document.body.style.overflow='';opener.current?.focus()}} onKeyDown={e=>{if(e.key==='Tab'){const nodes=dialog.current?.querySelectorAll<HTMLElement>('button,input');if(!nodes)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}}>{terminalOpen && <TerminalDemo onClose={close}/>}</dialog></>
}


