import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import './Character.css'
export const characterStates=['neutral','blinking','talking','smiling','sleepy','annoyed','curious','celebrating','gear5','67'] as const
export type CharacterState=typeof characterStates[number]
/** One illustrated identity. Facial layers animate independently; no raster/photo texture. */
export default function Character({state='neutral',animate=true}:{state?:CharacterState;animate?:boolean}){
 const reduced=useReducedMotion(), ref=useRef<SVGSVGElement>(null)
 const [visible,setVisible]=useState(true),[pageVisible,setPageVisible]=useState(!document.hidden)
 useEffect(()=>{const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting));if(ref.current)observer.observe(ref.current);const change=()=>setPageVisible(!document.hidden);document.addEventListener('visibilitychange',change);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',change)}},[])
 const running=animate&&!reduced&&visible&&pageVisible
 const happy=['smiling','celebrating','gear5'].includes(state)
 return <svg ref={ref} className={`character-face character-${state}`} viewBox="0 0 160 160" width="100%" height="100%" role="img" aria-label={`Saheem cartoon avatar, ${state}`} data-character-state={state} data-running={running}>
 <g className="avatar-clouds" fill="#f1ecde" stroke="#bab6cc" strokeWidth="2"><path d="M9 67q-9-10 2-16q-3-11 8-10q7-9 14 0l-8 12q-11-4-8 9Z"/><path d="M136 51q8-16 15-5q13-1 6 12q8 10-6 15l-7-10q8-4 0-6Z"/></g>
 <g className="avatar-head" stroke="#17151d" strokeWidth="3" strokeLinejoin="round">
 <path d="M31 81q-15-8-16 7q-2 18 19 22M128 81q16-8 17 7q1 18-19 22" fill="#dd8c4d"/><path d="M24 87q-4 9 6 15m106-15q4 9-6 15" fill="none" stroke="#9c5738"/>
 <path d="M31 63q6-33 49-31q43-2 49 31l-3 47q-9 24-46 37q-37-13-46-37Z" fill="#efa85f"/>
 <path d="M38 98q2 29 42 43q-29-6-41-28Z" fill="#ce7a40" stroke="none"/><path d="M84 89l-5 20h9" fill="none" stroke="#b96e3d" strokeWidth="2"/>
 <g className="avatar-cheeks" fill="#d47758" stroke="none" opacity={happy?.65:.18}><ellipse cx="44" cy="107" rx="10" ry="5"/><ellipse cx="117" cy="107" rx="10" ry="5"/></g>
 <g className="avatar-brows" fill="none" strokeWidth="5"><path className="brow-left" d={state==='annoyed'?'M43 75l23 7':state==='curious'?'M43 72q12-10 23-2':'M43 75q12-7 23-1'}/><path className="brow-right" d={state==='annoyed'?'M95 82l23-7':state==='curious'?'M95 77q12-2 23 0':'M95 74q12-6 23 1'}/></g>
 <g className="avatar-eyes"><g className="eye-open"><ellipse cx="55" cy="91" rx="13" ry={happy?10:12} fill="#fff5df"/><ellipse cx="106" cy="91" rx="13" ry={happy?10:12} fill="#fff5df"/><g className="avatar-gaze" fill="#251e25" stroke="none"><ellipse cx="56" cy="91" rx="7" ry="10"/><ellipse cx="105" cy="91" rx="7" ry="10"/><g fill="#fff9e7"><circle cx="58" cy="87" r="3"/><circle cx="107" cy="87" r="3"/></g></g></g><g className="eye-closed" fill="none"><path d="M43 92q12 6 24 0m27 0q12 6 24 0"/></g><g className="sleep-lids" fill="#efa85f"><path d="M41 78h28v13q-14-3-28 0Zm51 0h28v13q-14-3-28 0Z"/></g></g>
 <g className="avatar-glasses" fill="none" stroke="#fff0d3" strokeWidth="4"><path d="M34 80q15-5 38 0l-3 21q-13 7-29 0Zm54 0q21-5 39 0l-5 21q-17 7-30 0ZM72 85q8-5 16 0M22 77l12 7m93 0 11-7"/></g>
 <path d="M65 115q8-5 15-2q7-3 16 2l-2 4q-8 0-14-3q-6 4-16 3Z" fill="#292029" stroke="none"/>
 <g className="avatar-mouth" fill="#572b30" strokeWidth="2"><path className="mouth-rest" d={happy?'M65 121q15 23 31 0Z':'M68 124q12 7 25-1'} fill={happy?'#572b30':'none'}/>{happy&&<path d="M68 122h25l-3 5H72Z" fill="#fff3d7" stroke="none"/>}<ellipse className="mouth-talk" cx="81" cy="126" rx="8" ry="6"/><ellipse className="mouth-yawn" cx="81" cy="125" rx="7" ry="10"/></g>
 <path d="m73 138 7 3 8-3-3 6h-9Z" fill="#30222a" stroke="none"/>
 <g className="avatar-hair" fill={state==='gear5'?'#f4f0e6':'#24222e'}><path d="M29 91 21 72l-7-5 8-14-4-7 14-7-1-10 16-4 7-10 22 1 14-9 20 8 5 12 15-1 3 10 15 7-2 14 7 10-15 13-8 20-4-30-16-17q-3 22-23 29l3-21q-17 16-32 13l10-17q-19 4-27 16Z"/><path d="M29 54q16-18 38-17M56 30q21 4 35-8M83 54q2-18 20-18M113 54q15 3 17 15M44 60l-12 9" fill="none" stroke={state==='gear5'?'#c5c0d5':'#45404f'} strokeWidth="5"/></g>
 </g>
 <g className="avatar-hands" fill="#efa85f" stroke="#211b24" strokeWidth="2.5"><path className="hand-left" d="M7 120v-12q0-5 4-3l2 8v-14q4-4 6 1v14l3-10q5-2 5 3l-3 14q6-5 8-1q1 4-9 12H13Z"/><path className="hand-right" d="M153 120v-12q0-5-4-3l-2 8v-14q-4-4-6 1v14l-3-10q-5-2-5 3l3 14q-6-5-8-1q-1 4 9 12h10Z"/></g>
 <text className="avatar-zzz" x="123" y="31" fill="#c9c0e0" fontFamily="monospace" fontSize="16">Zzz</text>
 </svg>
}
