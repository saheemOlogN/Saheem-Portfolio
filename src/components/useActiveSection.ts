import { useEffect, useState } from 'react'
import { signalCompanion } from './Companion'
export default function useActiveSection(){
 const [active,setActive]=useState('hero')
 useEffect(()=>{
  const entries=new Map<string,IntersectionObserverEntry>()
  let previous='hero'
  const observer=new IntersectionObserver(changes=>{
   changes.forEach(entry=>entries.set(entry.target.id,entry))
   const visible=[...entries.values()].filter(e=>e.isIntersecting).sort((a,b)=>Math.abs(a.target.getBoundingClientRect().top-120)-Math.abs(b.target.getBoundingClientRect().top-120))
   const id=visible[0]?.target.id
   if(!id||id===previous)return
   previous=id;setActive(id)
   signalCompanion(`section-${id}`)
  },{rootMargin:'-12% 0px -48% 0px',threshold:[0,.1,.3,.6]})
  document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section))
  return()=>observer.disconnect()
 },[])
 return active
}
