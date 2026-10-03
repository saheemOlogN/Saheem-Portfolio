import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
const phrases=['Full-Stack Developer.','Professional Shawarma Critic.','6.7 ahh IQ.','Building things. Chasing sleep.']
export default function RoleType(){const reduced=useReducedMotion(),[text,setText]=useState(phrases[0]),[visible,setVisible]=useState(!document.hidden)
 useEffect(()=>{const change=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change)},[])
 useEffect(()=>{if(reduced||!visible)return;let phrase=0,index=phrases[0].length,deleting=true,timer:ReturnType<typeof setTimeout>;function step(){if(deleting){index--;setText(phrases[phrase].slice(0,index));if(index===0){deleting=false;phrase=(phrase+1)%phrases.length;timer=setTimeout(step,350)}else timer=setTimeout(step,35)}else{index++;setText(phrases[phrase].slice(0,index));if(index===phrases[phrase].length){deleting=true;timer=setTimeout(step,1800)}else timer=setTimeout(step,75)}}timer=setTimeout(step,1800);return()=>clearTimeout(timer)},[reduced,visible])
 return <p className="hero-role role-type" aria-label={phrases.join(' ')}><span aria-hidden="true">{reduced?phrases[0]:text}<span className="type-cursor" data-paused={!visible||reduced}>▏</span></span></p>
}
