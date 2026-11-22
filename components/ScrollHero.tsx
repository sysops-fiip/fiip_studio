'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

/*
 * ScrollHero: a scroll-driven shot used by every page hero.
 *   0 → A   play the shot up to the hold frame (or to the end when there is no hold)
 *   A → B   hold: each state wipes over the exact frame (passes, disciplines, projects…), then the frame returns
 *   B → C   play the rest of the shot
 *   C → 1   handoff: the picture dims, the page headline and actions arrive, the page releases
 * Per-frame work writes straight to the DOM; frames are decoded to ImageBitmaps; the stage height is
 * locked at load so mobile URL-bar resizes never reflow. Reduced motion shows the final frame and the copy.
 */

export type HeroState = { id: string; label: string; meta: string; swatch: string };
export type HeroManifest = {
  frames: number; base: string; mobileBase: string; ext: string; poster: string; reverse?: boolean; range?: [number, number]; focus?: number; mobileFocus?: number;
  hold?: { frame: number; title?: string; prefix?: string; passes: HeroState[] };
};
type Props = {
  manifest: HeroManifest; eyebrow: string; lede: ReactNode; chapters: string[];
  title: ReactNode; titleId: string; intro?: ReactNode; actions?: ReactNode; screens?: [number, number]; statePrefix?: string;
};

const pad = (n: number) => String(n).padStart(4, '0');
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

export function ScrollHero({ manifest: raw, eyebrow, lede, chapters, title, titleId, intro, actions, screens = [6.5, 5.5], statePrefix = 'Pass' }: Props) {
  // An optional file range plays only part of a sequence (e.g. contact reuses the homepage frames in reverse).
  const m = raw.range ? { ...raw, frames: raw.range[1] - raw.range[0] + 1 } : raw;
  const host = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const introEl = useRef<HTMLDivElement>(null);
  const outro = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const chapter = useRef<HTMLDivElement>(null);
  const passLabel = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [still, setStill] = useState(false);
  const [optIn, setOptIn] = useState(false);   // reduced-motion visitors can still choose to play (kept in memory only)
  const hasHold = !!m.hold && m.hold.passes.length > 0;
  const A = hasHold ? 0.24 : 0.84, B = hasHold ? 0.62 : 0.84, C = 0.84, END = 0.92;

  useEffect(() => {
    if (!optIn && matchMedia('(prefers-reduced-motion: reduce)').matches) { setStill(true); return; }
    if (still) { setStill(false); return; }            // render the canvas first; the effect re-runs once it exists
    const el = host.current, cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext('2d', { alpha: false })!;
    const mobile = innerWidth < 768;
    const base = mobile ? m.mobileBase : m.base;
    const passes = m.hold?.passes ?? [], P = passes.length, holdF = m.hold?.frame ?? m.frames - 1;
    const r0 = raw.range ? raw.range[0] : 0;
    const idx = (i: number) => r0 + (m.reverse ? m.frames - 1 - i : i);
    let dirty = true;
    let lockedW = innerWidth;
    const lock = () => { el.style.setProperty('--stage-h', `${innerHeight}px`); };
    lock();

    type Pic = HTMLImageElement | ImageBitmap;
    const frames: Pic[] = new Array(m.frames);
    const requested = new Uint8Array(m.frames), ready = new Uint8Array(m.frames);
    const canBitmap = typeof createImageBitmap === 'function';
    const load = (i: number) => {
      if (i < 0 || i >= m.frames || requested[i]) return; requested[i] = 1;
      const im = new Image(); im.src = `${base}/f${pad(idx(i))}.${m.ext}`; frames[i] = im;
      im.decode().then(() => canBitmap ? createImageBitmap(im).then(bm => { frames[i] = bm; }) : undefined)
        .then(() => { ready[i] = 1; dirty = true; }).catch(() => {});
    };
    load(0); load(holdF);
    for (const step of [16, 8, 4, 2, 1]) for (let i = 0; i < m.frames; i += step) load(i);
    const passImgs: (Pic | null)[] = passes.map(() => null);
    passes.forEach((p, k) => { const im = new Image(); im.src = `${base}/${m.hold?.prefix ?? 'hold'}-${p.id}.${m.ext}`; im.decode().then((): Promise<Pic> | Pic => (canBitmap ? createImageBitmap(im) : im)).then(x => { passImgs[k] = x; dirty = true; }).catch(() => {}); });
    const dims = (im: Pic) => ('naturalWidth' in im ? [im.naturalWidth, im.naturalHeight] : [im.width, im.height]);
    const nearest = (i: number) => { for (let d = 0; d < m.frames; d++) for (const j of [i - d, i + d]) if (j >= 0 && j < m.frames && ready[j]) return frames[j]; return null; };

    let W = 0, H = 0;
    const focus = mobile ? (m.mobileFocus ?? 0.6) : (m.focus ?? 0.5);
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, mobile ? 2 : 1.25);
      W = cv.width = Math.round(cv.clientWidth * dpr); H = cv.height = Math.round(cv.clientHeight * dpr); dirty = true;
    };
    const draw = (im: Pic, alpha = 1, clipW = W) => {
      const [iw, ih] = dims(im);
      const s = Math.max(W / iw, H / ih), dw = iw * s, dh = ih * s;
      ctx.save(); if (clipW < W) { ctx.beginPath(); ctx.rect(0, 0, clipW, H); ctx.clip(); }
      ctx.globalAlpha = alpha; ctx.drawImage(im, (W - dw) * focus, (H - dh) / 2, dw, dh); ctx.restore();
    };
    let fast = false;
    const playFrame = (pos: number) => {
      const i0 = Math.floor(pos), i1 = Math.min(m.frames - 1, i0 + 1), f = pos - i0;
      if (ready[i0] && ready[i1]) { draw(frames[i0]); if (f > 0.02 && !fast) draw(frames[i1], f); }
      else { const n = nearest(Math.round(pos)); if (n) draw(n); }
    };
    const target = () => { const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight)); };
    let shown = target(), raf = 0, lastKey = '';
    const setPass = (k: number) => {
      if (!passLabel.current) return;
      const key = String(k); if (key === lastKey) return; lastKey = key;
      const ps = k >= 0 && k < P ? passes[k] : null;
      passLabel.current.innerHTML = ps ? `<i style="background:${ps.swatch}"></i><span><small>${statePrefix} ${String(k + 1).padStart(2, '0')} / ${String(P).padStart(2, '0')}</small><strong>${ps.label}</strong><em>${ps.meta}</em></span>` : '';
      passLabel.current.style.opacity = ps ? '1' : '0';
      rail.current?.querySelectorAll('span').forEach((s, i) => { s.className = i < k ? 'done' : i === k ? 'on' : ''; });
    };

    const render = () => {
      const p = shown;
      if (p <= A) { playFrame(span(p, 0, A) * holdF); setPass(-1); }
      else if (p < B) {
        const t = span(p, A, B) * (P + 1);
        const k = Math.min(P, Math.floor(t)), w = ease(t - k);
        const beauty = nearest(holdF);
        const under = k === 0 ? beauty : passImgs[k - 1];
        const over = k < P ? passImgs[k] : beauty;
        if (under) draw(under);
        if (over) { draw(over, 1, W * w); if (w > 0.002 && w < 0.998) { ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fillRect(W * w - 0.75, 0, 1.5, H); } }
        setPass(w > 0.5 ? k : k - 1);
      } else { playFrame(hasHold ? holdF + span(p, B, C) * (m.frames - 1 - holdF) : m.frames - 1); setPass(-1); }

      const inP = 1 - span(p, 0.015, 0.07);
      introEl.current!.style.opacity = String(inP);
      introEl.current!.style.visibility = inP < 0.01 ? 'hidden' : 'visible';
      const out = ease(span(p, C, END));
      const o = outro.current!;
      o.style.opacity = String(out);
      o.style.transform = `translate3d(0,${((1 - out) * 28).toFixed(1)}px,0)`;
      o.style.pointerEvents = out > 0.6 ? 'auto' : 'none';
      o.style.visibility = out < 0.01 ? 'hidden' : 'visible';
      shade.current!.style.opacity = String(0.15 + 0.65 * out);
      if (rail.current) rail.current.style.opacity = hasHold && p > A - 0.012 && p < B + 0.012 ? '1' : '0';
      const nCh = chapters.length;
      const ch = hasHold ? (p < A ? 0 : p < B ? 1 : 2) : Math.min(nCh - 1, Math.floor(span(p, 0, C) * nCh));
      chapter.current!.dataset.ch = String(ch);
      chapter.current!.style.opacity = String(1 - out);
      bar.current!.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const tick = () => {
      const goal = target(), diff = goal - shown;
      fast = Math.abs(diff) > 0.01;
      shown = Math.abs(diff) < 0.0001 ? goal : shown + diff * (mobile ? 0.22 : 0.14);
      render(); dirty = false;
      raf = shown !== goal ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const loader = setInterval(() => { if (dirty) kick(); }, 120);
    const onResize = () => { if (Math.abs(innerWidth - lockedW) > 2) { lockedW = innerWidth; lock(); } size(); kick(); };
    size(); kick();
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', onResize);
    return () => { removeEventListener('scroll', kick); removeEventListener('resize', onResize); clearInterval(loader); if (raf) cancelAnimationFrame(raf); };
  }, [raw, A, B, C, hasHold, chapters.length, statePrefix, optIn, still]); // eslint-disable-line react-hooks/exhaustive-deps

  const style = { ['--hero-screens' as string]: screens[0], ['--hero-screens-m' as string]: screens[1] } as React.CSSProperties;
  // Scroll-snap beats: the opening, the hold, each state fully revealed, the frame returning, the finished headline.
  const P = m.hold?.passes.length ?? 0;
  const beats = hasHold
    ? [0, A, ...Array.from({ length: P }, (_, k) => A + ((k + 1) / (P + 1)) * (B - A)), B, END]
    : [0, ...chapters.slice(1).map((_, k) => ((k + 1) / chapters.length) * C), END];
  if (still) return <section className="scroll-shot is-still" aria-labelledby={titleId}>
    <div className="scroll-shot-stage">
      <img className="scroll-shot-poster" src={m.poster} alt="" />
      <div className="scroll-shot-shade" style={{ opacity: 0.8 }} />
      <div className="scroll-shot-outro page-width" style={{ opacity: 1, visibility: 'visible' }}><p className="eyebrow">{eyebrow}</p><h1 id={titleId}>{title}</h1>{intro}{actions}</div>
      <button type="button" className="scroll-shot-play" onClick={() => setOptIn(true)}><i aria-hidden="true">▶</i><span>Play the shot<small>Reduced motion is on for this device</small></span></button>
    </div>
  </section>;

  return <section ref={host} className="scroll-shot" style={style} aria-labelledby={titleId}>
    {beats.map((b, i) => <i key={i} className="scroll-snap-beat" aria-hidden="true" style={{ ['--beat' as string]: b.toFixed(4) } as React.CSSProperties} />)}
    <div className="scroll-shot-stage sticky">
      <canvas ref={canvas} className="scroll-shot-canvas" aria-hidden="true" />
      <div ref={shade} className="scroll-shot-shade" aria-hidden="true" />
      <div ref={introEl} className="scroll-shot-intro page-width">
        <p className="eyebrow">{eyebrow}</p>
        <p className="scroll-shot-lede">{lede}</p>
        <span className="scroll-cue" aria-hidden="true">Scroll <ArrowDown size={14} /></span>
      </div>
      <div ref={chapter} className="scroll-shot-chapter page-width" aria-hidden="true" data-ch="0">{chapters.map(c => <span key={c}>{c}</span>)}</div>
      {hasHold && <div ref={passLabel} className="scroll-shot-pass" aria-live="polite" />}
      {hasHold && <div ref={rail} className="scroll-shot-rail" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${m.hold!.passes.length}, 1fr)` }}>{m.hold!.passes.map(p => <span key={p.id}><b style={{ background: p.swatch }} />{p.label}</span>)}</div>}
      <div ref={outro} className="scroll-shot-outro page-width"><p className="eyebrow">{eyebrow}</p><h1 id={titleId}>{title}</h1>{intro}{actions}</div>
      <div className="scroll-shot-progress" aria-hidden="true"><i ref={bar} /></div>
    </div>
  </section>;
}
