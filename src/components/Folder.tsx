// Adapted from the official React Bits Folder structure and opening transforms.
// https://reactbits.dev/components/folder | ReactBits-LICENSE.md
import { useState, type CSSProperties, type ReactNode, type MouseEvent } from 'react'
import './Folder.css'
interface FolderProps { color?: string; items?: ReactNode[]; name: string; onOpen: (event: MouseEvent<HTMLButtonElement>) => void }
function darkenColor(hex: string, percent: number) {
 const value=parseInt(hex.replace('#',''),16), channel=(shift:number)=>Math.floor(((value>>shift)&255)*(1-percent)).toString(16).padStart(2,'0')
 return `#${channel(16)}${channel(8)}${channel(0)}`
}
export default function Folder({color='#48665f',items=[],name,onOpen}:FolderProps){
 const [open,setOpen]=useState(false), papers=items.slice(0,3)
 const style={'--folder-color':color,'--folder-back-color':darkenColor(color,.22)} as CSSProperties
 return <button className={`folder ${open?'open':''}`} style={style} aria-label={`Open ${name} project details`} onPointerEnter={e=>{if(e.pointerType==='mouse')setOpen(true)}} onPointerLeave={()=>setOpen(false)} onFocus={()=>setOpen(true)} onBlur={()=>setOpen(false)} onClick={onOpen}>
  <span className="folder__back"><span className="folder-tab" aria-hidden="true">Project collection</span>{papers.map((item,i)=><span className={`paper paper-${i+1}`} key={i} aria-hidden="true">{item}</span>)}<span className="folder__front"/><span className="folder__front right"/><span className="folder-label"><span>{name}</span><small>Open case study <span aria-hidden="true">↗</span></small></span></span>
 </button>
}
