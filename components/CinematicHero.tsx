'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Pause, Play, RotateCcw } from 'lucide-react';
import studio from '@/content/studio.json';

const chapters = [{ name: 'Through the lens', time: 0 }, { name: 'Build the world', time: 4 }, { name: 'Find the detail', time: 8 }, { name: 'Make it feel real', time: 16 }];

export function CinematicHero({ onReel }: { onReel: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [failed, setFailed] = useState(false);
  const wanted = useRef(true);
  useEffect(() => {
    const el = video.current;
    const host = section.current;
    if (!el || !host) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const sync = () => {
      if (motion.matches || connection?.saveData) { wanted.current = false; el.pause(); }
      else { setEnabled(true); wanted.current = true; }
    };
    sync();
    motion.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && wanted.current && !motion.matches && !document.hidden) el.play().catch(() => {});
      else el.pause();
    }, { threshold: .15 });
    observer.observe(host);
    const visibility = () => { if (document.hidden) el.pause(); else if (wanted.current && host.getBoundingClientRect().bottom > 0 && !motion.matches) el.play().catch(() => {}); };
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); motion.removeEventListener('change', sync); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  function jump(index: number) {
    const el = video.current;
    if (!el) return;
    setEnabled(true); setChapter(index); wanted.current = false;
    el.currentTime = chapters[index].time; el.pause();
  }
  function toggle() {
    const el = video.current;
    if (!el) return;
    setEnabled(true);
    if (playing) { wanted.current = false; el.pause(); }
    else { wanted.current = true; el.play().catch(() => setPlaying(false)); }
  }
  return <section ref={section} className="cinema-hero" aria-labelledby="hero-title">
    <div className="cinema-picture" aria-hidden="true">
      <img className="cinema-poster" src="/images/cinematic/observatory-final.webp" alt="" width={1536} height={864} fetchPriority="high" />
      {!failed && <video ref={video} src={enabled ? '/videos/fiip-inside-the-shot.mp4' : undefined} poster="/images/cinematic/observatory-final.webp" muted loop playsInline preload="none" onLoadedData={() => { if (wanted.current) video.current?.play().catch(() => {}); }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} onTimeUpdate={() => { const time = video.current?.currentTime ?? 0; setChapter(chapters.reduce((last, c, i) => (time >= c.time ? i : last), 0)); }} />}
    </div>
    <div className="cinema-shade" aria-hidden="true" />
    <div className="cinema-copy page-width">
      <p className="eyebrow">{studio.homepage.eyebrow}</p>
      <h1 id="hero-title">The final<br /><span>feeling.</span></h1>
      <p className="cinema-intro">A world imagined.<br />Every detail made real.</p>
      <p className="cinema-description">Editorial, visual effects and colour.<br />From the first possibility to the final frame.</p>
      <div className="hero-actions"><button className="pill-button pill-light" onClick={onReel}><Play size={13} fill="currentColor" />Watch the studio reel</button><a className="text-link" href="#inside-the-shot">Step inside the shot <ArrowDown size={16} /></a></div>
    </div>
    <div className="cinema-transport page-width absolute">
      <div className="cinema-chapters" aria-label="Explore the opening film">{chapters.map((c, i) => <button key={c.name} onClick={() => jump(i)} aria-pressed={chapter === i}><span>0{i + 1}</span>{c.name}<i aria-hidden="true" /></button>)}</div>
      <div className="cinema-playback"><span className="cinema-caption">A FIIP concept film</span><button onClick={() => { jump(0); wanted.current = true; video.current?.play().catch(() => {}); }} aria-label="Replay opening film" disabled={failed}><RotateCcw size={16} /></button><button onClick={toggle} aria-label={playing ? 'Pause opening film' : 'Play opening film'} disabled={failed}>{playing ? <Pause size={16} /> : <Play size={16} />}</button></div>
    </div>
  </section>;
}
