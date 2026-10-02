import { useRef, useState, type FormEvent } from 'react'
import { profile, experience, projects, skills } from './data'
import './App.css'
import { Hero, Companion, signalCompanion } from './components/Hero'
import Portfolio from './components/Portfolio'
const nav = ['About', 'Experience', 'Projects', 'Activity', 'Contact']
export default function App() {
 const dialog=useRef<HTMLDialogElement>(null), opener=useRef<HTMLButtonElement>(null), input=useRef<HTMLInputElement>(null)
 const [menu,setMenu]=useState(false), [command,setCommand]=useState(''), [history,setHistory]=useState(['Saheem OS / portfolio terminal','Type help to begin. This is a portfolio interface, not a system shell.'])
 function close(){signalCompanion('terminal-close');dialog.current?.close();document.body.style.overflow='';opener.current?.focus()}
 function open(){signalCompanion('terminal-open');dialog.current?.showModal();document.body.style.overflow='hidden';input.current?.focus()}
 function submit(e:FormEvent){
  e.preventDefault();const cmd=command.trim().toLowerCase();setCommand('');if(!cmd)return
  if(cmd==='exit')return close()
  if(cmd==='clear'){setHistory([]);return}
  const commands:Record<string,string>={help:'Commands: help, whoami, skills, experience, projects, github, contact, resume, play, clear, exit.',whoami:'Saheem Nakhwa. Full-stack developer building React interfaces, backend APIs, and useful web applications. Studying Computer Science and Engineering (AI & ML).',skills:Object.entries(skills).map(([category,items])=>category+': '+items.join(', ')).join('\n'),experience:experience.map(job=>job.role+' at '+job.company+' ('+job.date+')').join('\n'),projects:projects.map(project=>project.name+': '+project.description+'\n'+project.repo).join('\n'),contact:profile.email+'\n'+profile.links.map(link=>link.name+': '+link.url).join('\n'),play:'Sleep Quest is a static preview. Gameplay is not available yet.'}
  let output=commands[cmd]
  if(cmd==='github'||cmd==='resume'){const url=cmd==='github'?profile.links[0].url:'/Saheem_Nakhwa_Resume.pdf';window.open(url,'_blank','noopener,noreferrer');output=cmd==='github'?'GitHub profile opened in a new tab.':'Resume opened in a new tab.'}
  if(cmd==='gear5'||cmd==='67'){signalCompanion(cmd);output=cmd==='gear5'?'Imagination unlocked.':'Six… seven.'}
  setHistory(h=>[...h,'> '+cmd,output??'Unknown command. Type help to see available commands.'])
 }
 return <><a className="skip" href="#main">Skip to content</a><header><div className="nav-shell"><a className="brand" href="#main" aria-label="Saheem home">s<span>n</span>_</a><nav id="main-nav" aria-label="Main navigation" className={menu?'expanded':''}>{nav.map(n=><a key={n} href={`#${n.toLowerCase()}`} onClick={()=>setMenu(false)}>{n}</a>)}</nav><div className="nav-end"><button ref={opener} className="terminal-button" onClick={open}><span>&gt;_</span> Terminal</button><Companion/><button className="menu-button" aria-expanded={menu} aria-controls="main-nav" onClick={()=>setMenu(!menu)}>{menu?'Close':'Menu'}</button></div></div></header>
 <main id="main"><Hero/>
 <Portfolio/></main><footer className="wrap"><span>© {new Date().getFullYear()} Saheem Nakhwa</span><span>BUILT WITH INTENT. A LITTLE BIT OF ARCADE.</span><a href="#main">Back to top ↑</a></footer>
 <dialog ref={dialog} aria-labelledby="terminal-title" onCancel={e=>{e.preventDefault();close()}} onClose={()=>{document.body.style.overflow='';opener.current?.focus()}} onKeyDown={e=>{if(e.key==='Tab'){const nodes=dialog.current?.querySelectorAll<HTMLElement>('button,input');if(!nodes)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}}><div className="dialog-bar"><h2 id="terminal-title">saheem@portfolio: ~</h2><button onClick={close} aria-label="Close terminal">Close ×</button></div><div className="terminal-content"><div className="terminal-history" role="log" aria-live="polite">{history.map((line,i)=><p key={i}>{line}</p>)}</div><form onSubmit={submit}><label htmlFor="command">guest &gt;</label><input ref={input} id="command" aria-label="Terminal command" autoComplete="off" spellCheck={false} value={command} onChange={e=>setCommand(e.target.value)}/><button type="submit">Run</button></form><p className="terminal-hint">Enter to run · Escape to close</p></div></dialog></>
}
