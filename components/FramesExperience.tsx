'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Circle, Columns2, Layers, MessageSquare, Pause, Play, RotateCcw, Send, SlidersHorizontal, Users } from 'lucide-react';

type Mode = 'wipe' | 'side-by-side' | 'overlay';
type Note = { id: number; text: string; frame: number; resolved: boolean };
const steps = [{ label: 'Compare', title: 'See what changed.', text: 'Wipe between versions, place them side by side, or overlay one on the other. Keep the conversation on the picture.' }, { label: 'Review', title: 'A note. On the exact frame.', text: 'Attach feedback to a frame. Mark the detail that matters, then keep replies and resolutions with the shot.' }, { label: 'Assign', title: 'A clear next move.', text: 'Give the work an owner. Keep the task, its status and the next delivery visible to the team.' }];
export function FramesExperience({ compact = false }: { compact?: boolean }) {
 const [step,setStep]=useState(0),[mode,setMode]=useState<Mode>('wipe'),[wipe,setWipe]=useState(50),[frame,setFrame]=useState(1018),[draft,setDraft]=useState(''),[assignee,setAssignee]=useState('Udhaya Kumar'),[status,setStatus]=useState('In progress'),[tour,setTour]=useState(false);
 const [notes,setNotes]=useState<Note[]>([{id:1,text:'Bring a little more warmth into the doorway.',frame:1018,resolved:false}]);
 const host=useRef<HTMLDivElement>(null), count=useRef(2);
 useEffect(()=>{
  if(!tour)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');if(reduced.matches){setTour(false);return;}
  const timer=setInterval(()=>{if(document.hidden||!host.current||host.current.getBoundingClientRect().bottom<0)return;setStep(s=>(s+1)%3);},5000);
  return()=>clearInterval(timer);
 },[tour]);
 const choose=(s:number)=>{setTour(false);setStep(s);};
 function reset(){setTour(false);setStep(0);setMode('wipe');setWipe(50);setFrame(1018);setDraft('');setNotes([{id:1,text:'Bring a little more warmth into the doorway.',frame:1018,resolved:false}]);setAssignee('Udhaya Kumar');setStatus('In progress');}
 function addNote(){const text=draft.trim();if(!text)return;setNotes(n=>[...n,{id:count.current++,text,frame,resolved:false}]);setDraft('');}
 return <div ref={host} className={`frames-experience ${compact?'frames-compact':''}`}>
  <div className="frames-demo-heading"><span>FRAMES <i>/</i> PICTURE REVIEW</span><div><span className="demo-disclosure">Interactive walkthrough</span><button onClick={()=>setTour(!tour)} aria-label={tour?'Pause guided tour':'Play guided tour'}>{tour?<Pause size={15}/>:<Play size={15}/>}</button><button onClick={reset} aria-label="Reset walkthrough"><RotateCcw size={15}/></button></div></div>
  <div className="frames-workspace">
   <div className="frames-rail" aria-hidden="true"><Layers size={17}/><SlidersHorizontal size={17}/><MessageSquare size={17}/><Users size={17}/></div>
   <div className="frames-main">
    <div className="frames-shotbar"><span>OBSERVATORY <ChevronRight size={12}/> SH010</span><span className="version-badge">V02</span><span className="frames-review-state">In review</span></div>
    <div className={`frames-viewport mode-${mode}`}>
     <img src="/images/cinematic/observatory-final.webp" alt="Finished observatory shot, version two" width={1536} height={864} loading="lazy" />
     {step===0&&<div className="frames-compare-layer" style={mode==='wipe'?{clipPath:`inset(0 ${100-wipe}% 0 0)`}:mode==='overlay'?{opacity:wipe/100}:{}}><img src="/images/cinematic/observatory-clay.webp" alt="Clay lighting study, version one" width={1536} height={864} loading="lazy" /></div>}
     {step===0&&mode==='wipe'&&<div className="frames-wipe-line" style={{left:`${wipe}%`}}><span><ChevronLeft size={12}/><ChevronRight size={12}/></span></div>}
     <span className="frames-version-label left">{step===0?'V01 / LIGHTING':'SH010 / V02'}</span>{step===0&&<span className="frames-version-label right">V02 / FINAL</span>}
     {step===1&&<button className="frames-note-pin" aria-label="Show note at frame 1018" onClick={()=>{setFrame(1018);setTour(false);}}>1<span/></button>}
     <span className="frames-timecode">01:00:{String(Math.floor((frame-1000)/24)).padStart(2,'0')}:{String((frame-1000)%24).padStart(2,'0')}</span>
    </div>
    <div className="frames-playerbar"><button aria-label="Previous frame" onClick={()=>{setTour(false);setFrame(f=>Math.max(1000,f-1));}}><ChevronLeft size={16}/></button><span>F{frame}</span><button aria-label="Next frame" onClick={()=>{setTour(false);setFrame(f=>Math.min(1120,f+1));}}><ChevronRight size={16}/></button><input aria-label="Review frame" type="range" min={1000} max={1120} value={frame} onChange={e=>{setTour(false);setFrame(Number(e.target.value));}}/><span>24 FPS</span></div>
    {step===0&&<div className="frames-compare-controls"><div className="frames-mode-buttons">{(['wipe','side-by-side','overlay'] as Mode[]).map(m=><button key={m} aria-pressed={mode===m} onClick={()=>{setTour(false);setMode(m);}}>{m==='wipe'?<SlidersHorizontal size={13}/>:m==='side-by-side'?<Columns2 size={13}/>:<Layers size={13}/>} {m==='side-by-side'?'Side by side':m[0].toUpperCase()+m.slice(1)}</button>)}</div>{mode!=='side-by-side'&&<label>{mode==='wipe'?'Drag to compare':'Blend versions'}<input type="range" min={0} max={100} value={wipe} aria-label={mode==='wipe'?'Comparison wipe position':'Version overlay opacity'} onChange={e=>{setTour(false);setWipe(Number(e.target.value));}}/></label>}</div>}
   </div>
   <aside className="frames-detail" aria-label="Walkthrough controls">
    {step===0?<div className="frames-panel-content"><p className="frames-panel-kicker">VERSION HISTORY</p><h3>Same shot.<br/>A new perspective.</h3><div className="frames-version-row"><span>V02</span><div>Final composite<small>Current version</small></div><Check size={14}/></div><div className="frames-version-row"><span>V01</span><div>Lighting study<small>Compare against</small></div><Circle size={12}/></div><p className="frames-panel-help">Use the controls below the image to explore three ways of comparing a shot.</p></div>:step===1?<div className="frames-panel-content"><p className="frames-panel-kicker">FRAME NOTES</p><div className="frames-notes" aria-live="polite">{notes.map(note=><article key={note.id} className={note.resolved?'is-resolved':''}><div><span>Review note</span><button onClick={()=>setFrame(note.frame)}>F{note.frame}</button></div><p>{note.text}</p><button className="frames-resolve" onClick={()=>{setTour(false);setNotes(n=>n.map(x=>x.id===note.id?{...x,resolved:!x.resolved}:x));}}><Check size={12}/>{note.resolved?'Resolved':'Mark resolved'}</button></article>)}</div><form onSubmit={e=>{e.preventDefault();setTour(false);addNote();}}><label htmlFor={compact?'home-note':'frames-note'}>Try a frame note</label><textarea id={compact?'home-note':'frames-note'} value={draft} onChange={e=>setDraft(e.target.value)} placeholder="What should change?" maxLength={240}/><button type="submit" disabled={!draft.trim()}><Send size={13}/>Add at F{frame}</button></form></div>:<div className="frames-panel-content"><p className="frames-panel-kicker">SHOT ASSIGNMENT</p><h3>From feedback<br/>to the next version.</h3><div className="frames-task-title">SH010 · Refine doorway lighting</div><label className="frames-field">Assignee<select value={assignee} onChange={e=>{setTour(false);setAssignee(e.target.value);}}>{['Udhaya Kumar','Sri Karthik','Koushik Raj'].map(n=><option key={n}>{n}</option>)}</select></label><label className="frames-field">Status<select value={status} onChange={e=>{setTour(false);setStatus(e.target.value);}}>{['To do','In progress','Ready for review','Approved'].map(n=><option key={n}>{n}</option>)}</select></label><div className="frames-task-receipt" aria-live="polite"><span className="frames-person-dot">{assignee.split(' ').map(w=>w[0]).slice(0,2).join('')}</span><div>{assignee}<small>{status}</small></div><Check size={15}/></div></div>}
   </aside>
  </div>
  <div className="frames-story-controls">{steps.map((s,i)=><button key={s.label} aria-pressed={step===i} onClick={()=>choose(i)}><span>0{i+1}</span>{s.label}<ArrowRight size={14}/></button>)}</div>
  <div className="frames-story-caption" aria-live="polite"><h3>{steps[step].title}</h3><p>{steps[step].text}</p></div>
  <p className="frames-demo-note">Example shot and local demo controls. Your changes here stay in this walkthrough.</p>
 </div>;
}
