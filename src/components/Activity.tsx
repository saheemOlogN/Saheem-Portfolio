import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

type Day = {date:string;count:number;level:number}
type Snapshot = {fetchedAt:string;contributions:Day[]}
const endpoint='https://github-contributions-api.jogruber.de/v4/saheemOlogN?y=last'
function validDays(value:unknown):value is Day[]{return Array.isArray(value)&&value.length>0&&value.length<400&&value.every(d=>typeof d.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d.date)&&Number.isInteger(d.count)&&d.count>=0&&Number.isInteger(d.level)&&d.level>=0&&d.level<=4)}
export default function Activity(){
 const [data,setData]=useState<Snapshot|null>(null),[status,setStatus]=useState('Loading GitHub activity…'),[selected,setSelected]=useState(0),[attempt,setAttempt]=useState(0)
 const cells=useRef<(HTMLButtonElement|null)[]>([])
 useEffect(()=>{
  const controller=new AbortController();let active=true
  async function load(){
   let fallback:Snapshot|null=null
   try{const response=await fetch('/data/github-contributions.json',{signal:controller.signal});const saved=await response.json();if(validDays(saved.contributions)&&typeof saved.fetchedAt==='string'){fallback=saved;if(active){setData(saved);setSelected(saved.contributions.length-1);setStatus('Saved GitHub snapshot. Checking for updates…')}}}catch{/* Live request below can still succeed. */}
   try{const response=await fetch(endpoint,{signal:AbortSignal.any([controller.signal,AbortSignal.timeout(8000)])});if(!response.ok)throw Error('upstream');const result=await response.json();if(!validDays(result.contributions))throw Error('invalid data');const contributions=[...result.contributions].sort((a,b)=>a.date.localeCompare(b.date));if(active){setData({fetchedAt:new Date().toISOString(),contributions});setSelected(contributions.length-1);setStatus('Retrieved from GitHub Contributions API; upstream cache up to one hour.')}}catch{if(active)setStatus(fallback?'Live refresh unavailable. Showing the saved GitHub snapshot.':'GitHub activity is unavailable right now. Visit my profile or try again.')}
  }
  void load();return()=>{active=false;controller.abort()}
 },[attempt])
 const days=data?.contributions??[],offset=days.length?new Date(days[0].date+'T00:00:00Z').getUTCDay():0
 const weeks=Math.ceil((offset+days.length)/7), chosen=days[selected]
 function keyboard(e:KeyboardEvent<HTMLButtonElement>,i:number){let next=i;if(e.key==='ArrowRight')next=i+7;else if(e.key==='ArrowLeft')next=i-7;else if(e.key==='ArrowDown')next=i+1;else if(e.key==='ArrowUp')next=i-1;else if(e.key==='Home')next=0;else if(e.key==='End')next=days.length-1;else return;e.preventDefault();next=Math.max(0,Math.min(days.length-1,next));setSelected(next);cells.current[next]?.focus()}
 return <div className="contribution-panel"><div className="activity-summary"><div><h3>{data?<><strong>{days.reduce((sum,d)=>sum+d.count,0)}</strong> contributions in this period</>:'The daily commit'}</h3></div><a className="text-link" href="https://github.com/saheemOlogN" target="_blank" rel="noreferrer">View GitHub profile</a></div>
 {days.length>0&&<><p className="calendar-range">{days[0].date} to {days[days.length-1].date}</p><div className="calendar-scroll" role="region" aria-label="GitHub contribution calendar. Use arrow keys to explore days." tabIndex={0}><div className="calendar" style={{'--weeks':weeks} as React.CSSProperties}><div className="month-labels">{days.map((d,i)=>{const date=new Date(d.date+'T00:00:00Z');return date.getUTCDate()===1?<span key={d.date} style={{gridColumn:Math.floor((i+offset)/7)+1}}>{date.toLocaleDateString('en',{month:'short',timeZone:'UTC'})}</span>:null})}</div><div className="day-labels"><span>Mon</span><span>Wed</span><span>Fri</span></div><div className="calendar-grid">{Array.from({length:offset},(_,i)=><span key={`blank${i}`} aria-hidden="true"/>)}{days.map((day,i)=><button key={day.date} ref={el=>{cells.current[i]=el}} className={`day level-${day.level}`} tabIndex={i===selected?0:-1} aria-label={`${day.date}: ${day.count} contribution${day.count===1?'':'s'}`} aria-pressed={i===selected} title={`${day.date}: ${day.count} contribution${day.count===1?'':'s'}`} onFocus={()=>setSelected(i)} onClick={()=>setSelected(i)} onKeyDown={e=>keyboard(e,i)}/>)}</div></div></div><div className="calendar-footer"><p aria-live="polite">{chosen?`${chosen.date}: ${chosen.count} contribution${chosen.count===1?'':'s'}`:'Select a day for details.'}</p><div className="calendar-legend" aria-label="Color intensity: fewer to more contributions">Less {[0,1,2,3,4].map(n=><span key={n} className={`level-${n}`} aria-hidden="true"/>)} More</div></div></>}
 <div className="activity-status"><div><p role="status">{status}</p>{data&&<p>Last retrieved: <time dateTime={data.fetchedAt}>{new Date(data.fetchedAt).toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'})}</time></p>}</div><button className="small-button" onClick={()=>{setStatus('Refreshing GitHub activity…');setAttempt(n=>n+1)}}>Refresh</button></div></div>
}

