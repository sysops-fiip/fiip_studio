'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, Play } from 'lucide-react';
import studio from '@/content/studio.json';
import manifest from '@/data/scroll-shot.json';

/*
 * Scroll-scrubbed opening shot. The page scroll drives a frame sequence
 * (exported from the generated shot). At each "hold" the playback freezes and
 * the procedurally derived passes for that exact frame wipe in one after
 * another, each with a colour card, then the beauty wipes back and the shot
 * continues. Reduced motion: a still frame with the copy, no scrubbing.
 */

type Pass = { id: string; label: string; meta: string; swatch: string };
type Hold = { frame: number; title: string; passes: Pass[] };
type Segment = { kind: 'play'; from: number; to: number; units: number } | { kind: 'wipe'; hold: number; pass: number; units: number };

const m = manifest as { frames: number; width: number; height: number; base: string; mobileBase: string; ext: string; holds: Hold[]; poster: string };
const pad = (n: number) => String(n).padStart(4, '0');

function buildSegments(): Segment[] {
  const segs: Segment[] = [];
  let at = 0;
  m.holds.forEach((h, hi) => {
    segs.push({ kind: 'play', from: at, to: h.frame, units: Math.max(1, (h.frame - at) / 12) });
    h.passes.forEach((_, pi) => segs.push({ kind: 'wipe', hold: hi, pass: pi, units: 1 }));
    segs.push({ kind: 'wipe', hold: hi, pass: h.passes.length, units: 0.8 }); // beauty returns
    at = h.frame;
  });
  segs.push({ kind: 'play', from: at, to: m.frames - 1, units: Math.max(1, (m.frames - 1 - at) / 12) });
  return segs;
}

export function ScrollShot({ onReel }: { onReel: () => void }) {
  const host = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState({ hold: -1, pass: -1, wipe: 0, progress: 0 });
  const [still, setStill] = useState(false);
  const segments = useMemo(buildSegments, []);
  const total = segments.reduce((s, g) => s + g.units, 0);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) { setStill(true); return; }
    const el = host.current, cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext('2d')!;
    const mobile = innerWidth < 768;
    const base = mobile ? m.mobileBase : m.base;
    let last = '';
    const frames: (HTMLImageElement | null)[] = new Array(m.frames).fill(null);
    const passImgs = new Map<string, HTMLImageElement>();
    const load = (i: number) => { if (frames[i]) return; const im = new Image(); im.decoding = 'async'; im.src = `${base}/f${pad(i)}.${m.ext}`; frames[i] = im; im.onload = () => { last = ''; draw(); }; };
    // Coarse-to-fine: every 8th frame first so scrubbing is immediately usable.
    for (const step of [8, 4, 2, 1]) for (let i = 0; i < m.frames; i += step) load(i);
    m.holds.forEach((h, hi) => h.passes.forEach(p => { const im = new Image(); im.src = `${base}/hold${hi}-${p.id}.${m.ext}`; im.onload = () => { last = ''; draw(); }; passImgs.set(`${hi}-${p.id}`, im); }));
    const nearest = (i: number) => { for (let d = 0; d < m.frames; d++) { for (const j of [i - d, i + d]) { const f = frames[j]; if (f && f.complete && f.naturalWidth) return f; } } return null; };
    const target = () => { const r = el!.getBoundingClientRect(); return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight))); };
    let shown = target();
    function locate() {
      const p = shown;
      let u = p * total;
      for (const g of segments) { if (u <= g.units) return { g, t: u / g.units, p }; u -= g.units; }
      const g = segments[segments.length - 1];
      return { g, t: 1, p };
    }
    function cover(img: CanvasImageSource, iw: number, ih: number) {
      const W = cv!.width, H = cv!.height, s = Math.max(W / iw, H / ih);
      const dw = iw * s, dh = ih * s, dx = (W - dw) * (mobile ? 0.62 : 0.5), dy = (H - dh) / 2;
      return { dx, dy, dw, dh, draw: () => ctx.drawImage(img, dx, dy, dw, dh) };
    }
    function draw() {
      const { g, t, p } = locate();
      const key = `${g === undefined ? '' : segments.indexOf(g)}:${t.toFixed(4)}:${cv!.width}`;
      if (key === last) return; last = key;
      ctx.fillStyle = '#060707'; ctx.fillRect(0, 0, cv!.width, cv!.height);
      if (g.kind === 'play') {
        const pos = g.from + (g.to - g.from) * t, i0 = Math.floor(pos), frac = pos - i0;
        const a = frames[i0], b = frames[Math.min(m.frames - 1, i0 + 1)];
        const ready = (x: HTMLImageElement | null) => !!x && x.complete && x.naturalWidth > 0;
        if (ready(a) && ready(b) && frac > 0.02) {
          cover(a!, a!.naturalWidth, a!.naturalHeight).draw();
          ctx.globalAlpha = frac; cover(b!, b!.naturalWidth, b!.naturalHeight).draw(); ctx.globalAlpha = 1;
        } else {
          const f = nearest(Math.round(pos));
          if (f) cover(f, f.naturalWidth, f.naturalHeight).draw();
        }
        setState(s => (s.hold === -1 && Math.abs(s.progress - p) < 0.002 ? s : { hold: -1, pass: -1, wipe: 0, progress: p }));
        return;
      }
      const h = m.holds[g.hold];
      const beauty = nearest(h.frame);
      const under = g.pass === 0 ? beauty : passImgs.get(`${g.hold}-${h.passes[g.pass - 1].id}`);
      const over = g.pass < h.passes.length ? passImgs.get(`${g.hold}-${h.passes[g.pass].id}`) : beauty;
      if (under && under.naturalWidth) cover(under, under.naturalWidth, under.naturalHeight).draw();
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      if (over && over.naturalWidth) {
        const c = cover(over, over.naturalWidth, over.naturalHeight);
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, cv!.width * e, cv!.height); ctx.clip(); c.draw(); ctx.restore();
        if (e > 0 && e < 1) { ctx.fillStyle = '#ca943e'; ctx.fillRect(cv!.width * e - 1, 0, 2, cv!.height); }
      }
      setState({ hold: g.hold, pass: g.pass, wipe: e, progress: p });
    }
    const size = () => { const dpr = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(cv.clientWidth * dpr); cv.height = Math.round(cv.clientHeight * dpr); last = ''; draw(); };
    let raf = 0;
    // Ease the displayed position toward the scroll position: wheel steps and swipes glide instead of jumping.
    const tick = () => {
      const goal = target(), diff = goal - shown;
      shown = Math.abs(diff) < 0.00005 ? goal : shown + diff * 0.16;
      draw();
      raf = shown === goal ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    size();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', size);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', size); if (raf) cancelAnimationFrame(raf); };
  }, [segments, total]);

  const hold = state.hold >= 0 ? m.holds[state.hold] : null;
  const activePass = hold && state.pass < hold.passes.length ? hold.passes[state.pass] : null;
  const shownPass = hold ? (state.wipe > 0.5 ? activePass : (state.pass > 0 ? hold.passes[state.pass - 1] : null)) : null;
  const copyOpacity = still ? 1 : Math.max(0, 1 - state.progress * 9);

  return <section ref={host} className={`scroll-shot ${still ? 'is-still' : ''}`} style={{ height: still ? undefined : `${Math.round(total * 55 + 100)}vh` }} aria-labelledby="hero-title">
    <div className="scroll-shot-stage sticky">
      {still ? <img className="scroll-shot-poster" src={m.poster} alt="" /> : <canvas ref={canvas} className="scroll-shot-canvas" aria-hidden="true" />}
      <div className="scroll-shot-shade" aria-hidden="true" style={{ opacity: 0.25 + 0.75 * copyOpacity }} />
      <div className="scroll-shot-copy page-width" style={{ opacity: copyOpacity, visibility: copyOpacity < 0.02 ? 'hidden' : 'visible' }}>
        <p className="eyebrow">{studio.homepage.eyebrow}</p>
        <h1 id="hero-title">The final<br /><span>feeling.</span></h1>
        <p className="cinema-intro">A world imagined.<br />Every detail made real.</p>
        <div className="hero-actions"><button className="pill-button pill-light" onClick={onReel}><Play size={13} fill="currentColor" />Watch the studio reel</button><span className="text-link scroll-cue">Scroll to step inside the shot <ArrowDown size={16} /></span></div>
      </div>
      {!still && <>
        <div className={`pass-card ${shownPass ? 'is-on' : ''}`} aria-live="polite">
          {shownPass && <><span className="pass-swatch" style={{ background: shownPass.swatch }} /><div><strong>{shownPass.label}</strong><small>{shownPass.meta}</small></div></>}
        </div>
        {hold && <div className="pass-rail page-width" aria-hidden="true"><span className="pass-rail-title">{hold.title}</span>{hold.passes.map((p, i) => <span key={p.id} className={i === state.pass && state.wipe > 0.5 || (i === state.pass - 1 && state.wipe <= 0.5) ? 'is-active' : i < state.pass ? 'is-done' : ''}><i style={{ background: p.swatch }} />{p.label}</span>)}</div>}
        <div className="scroll-shot-progress" aria-hidden="true"><i style={{ transform: `scaleX(${state.progress})` }} /></div>
      </>}
    </div>
  </section>;
}
