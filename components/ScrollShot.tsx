'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play } from 'lucide-react';
import studio from '@/content/studio.json';
import manifest from '@/data/scroll-shot.json';

/*
 * The opening shot, driven by scroll.
 *   0 → A   Through the lens: the iris opens and the camera pushes into the world.
 *   A → B   Inside the shot: the frame holds while each render pass wipes in, then the beauty returns.
 *   B → C   The final frame: the camera continues toward the portal.
 *   C → 1   Handoff: the picture settles and dims, the headline and actions arrive, and the page releases.
 *
 * Performance: every per-frame update writes straight to the DOM (no React re-render on scroll),
 * frames are decoded before first draw, the displayed position eases toward the scroll position,
 * and the stage height is locked at load so mobile URL-bar resizes never reflow the canvas.
 */

type Pass = { id: string; label: string; meta: string; swatch: string };
const m = manifest as { frames: number; base: string; mobileBase: string; ext: string; poster: string; hold: { frame: number; title: string; passes: Pass[] } };
const pad = (n: number) => String(n).padStart(4, '0');
const A = 0.26, B = 0.6, C = 0.86; // phase boundaries in scroll progress
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

export function ScrollShot({ onReel }: { onReel: () => void }) {
  const host = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const outro = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const chapter = useRef<HTMLDivElement>(null);
  const passLabel = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) { setStill(true); return; }
    const el = host.current!, cv = canvas.current!;
    const ctx = cv.getContext('2d', { alpha: false })!;
    const mobile = innerWidth < 768;
    const base = mobile ? m.mobileBase : m.base;
    const passes = m.hold.passes, P = passes.length;
    let dirty = true;

    // Lock the stage height once (and again only on real width/orientation changes).
    let lockedW = innerWidth;
    const lock = () => { el.style.setProperty('--stage-h', `${innerHeight}px`); };
    lock();

    // Frames become ImageBitmaps once decoded: GPU-ready, so a draw costs almost nothing.
    type Pic = HTMLImageElement | ImageBitmap;
    const frames: Pic[] = new Array(m.frames);
    const requested = new Uint8Array(m.frames), ready = new Uint8Array(m.frames);
    const canBitmap = typeof createImageBitmap === 'function';
    const load = (i: number) => {
      if (requested[i]) return; requested[i] = 1;
      const im = new Image(); im.src = `${base}/f${pad(i)}.${m.ext}`; frames[i] = im;
      im.decode().then(() => canBitmap ? createImageBitmap(im).then(bm => { frames[i] = bm; }) : undefined)
        .then(() => { ready[i] = 1; dirty = true; }).catch(() => {});
    };
    load(0); load(m.hold.frame);
    for (const step of [16, 8, 4, 2, 1]) for (let i = 0; i < m.frames; i += step) load(i);
    const passImgs: (Pic | null)[] = passes.map(() => null);
    passes.forEach((p, k) => { const im = new Image(); im.src = `${base}/hold-${p.id}.${m.ext}`; im.decode().then((): Promise<Pic> | Pic => (canBitmap ? createImageBitmap(im) : im)).then(x => { passImgs[k] = x; dirty = true; }).catch(() => {}); });
    const ok = (im?: Pic | null) => !!im;
    const dims = (im: Pic) => ('naturalWidth' in im ? [im.naturalWidth, im.naturalHeight] : [im.width, im.height]);
    const nearest = (i: number) => { for (let d = 0; d < m.frames; d++) for (const j of [i - d, i + d]) if (j >= 0 && j < m.frames && ready[j]) return frames[j]; return null; };

    let W = 0, H = 0;
    const focus = mobile ? 0.6 : 0.5;
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
    const playFrame = (pos: number) => {
      const i0 = Math.floor(pos), i1 = Math.min(m.frames - 1, i0 + 1), f = pos - i0;
      if (ready[i0] && ready[i1]) { draw(frames[i0]); if (f > 0.02 && !fast) draw(frames[i1], f); }
      else { const n = nearest(Math.round(pos)); if (n) draw(n); }
    };

    const target = () => { const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - innerHeight)); };
    let shown = target(), raf = 0, lastKey = '', fast = false;

    const setPass = (idx: number) => {
      const key = String(idx);
      if (key === lastKey) return;
      lastKey = key;
      const ps = idx >= 0 && idx < P ? passes[idx] : null;
      passLabel.current!.innerHTML = ps ? `<i style="background:${ps.swatch}"></i><span><small>Pass ${String(idx + 1).padStart(2, '0')} / ${String(P).padStart(2, '0')}</small><strong>${ps.label}</strong><em>${ps.meta}</em></span>` : '';
      passLabel.current!.style.opacity = ps ? '1' : '0';
      rail.current!.querySelectorAll('span').forEach((s, i) => { s.className = i < idx ? 'done' : i === idx ? 'on' : ''; });
    };

    const render = () => {
      const p = shown;
      if (p <= A) { playFrame(span(p, 0, A) * m.hold.frame); setPass(-1); }
      else if (p < B) {
        const t = span(p, A, B) * (P + 1);               // P passes in, then the beauty returns
        const k = Math.min(P, Math.floor(t)), w = ease(t - k);
        const beauty = nearest(m.hold.frame);
        const under = k === 0 ? beauty : passImgs[k - 1];
        const over = k < P ? passImgs[k] : beauty;
        if (ok(under)) draw(under!);
        if (ok(over)) { draw(over!, 1, W * w); if (w > 0.002 && w < 0.998) { ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fillRect(W * w - 0.75, 0, 1.5, H); } }
        setPass(w > 0.5 ? k : k - 1);
      } else { playFrame(m.hold.frame + span(p, B, C) * (m.frames - 1 - m.hold.frame)); setPass(-1); }

      const inP = 1 - span(p, 0.015, 0.07);
      intro.current!.style.opacity = String(inP);
      intro.current!.style.visibility = inP < 0.01 ? 'hidden' : 'visible';
      const out = ease(span(p, C, 0.97));
      const o = outro.current!;
      o.style.opacity = String(out);
      o.style.transform = `translate3d(0,${((1 - out) * 28).toFixed(1)}px,0)`;
      o.style.pointerEvents = out > 0.6 ? 'auto' : 'none';
      o.style.visibility = out < 0.01 ? 'hidden' : 'visible';
      shade.current!.style.opacity = String(0.15 + 0.65 * out);
      rail.current!.style.opacity = p > A - 0.012 && p < B + 0.012 ? '1' : '0';
      chapter.current!.dataset.ch = String(p < A ? 0 : p < B ? 1 : 2);
      chapter.current!.style.opacity = String((1 - out) * (1 - inP * 0.0));
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
    const loader = setInterval(() => { if (dirty) kick(); }, 120);   // repaint as frames finish decoding
    const onResize = () => { if (Math.abs(innerWidth - lockedW) > 2) { lockedW = innerWidth; lock(); } size(); kick(); };
    size(); kick();
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', onResize);
    return () => { removeEventListener('scroll', kick); removeEventListener('resize', onResize); clearInterval(loader); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const copy = studio.homepage;
  const actions = <div className="hero-actions"><button className="pill-button pill-light" onClick={onReel}><Play size={13} fill="currentColor" />Watch the studio reel</button><a className="text-link" href="#selected-work">See the work <ArrowDown size={16} /></a></div>;

  if (still) return <section className="scroll-shot is-still" aria-labelledby="hero-title">
    <div className="scroll-shot-stage">
      <img className="scroll-shot-poster" src={m.poster} alt="" />
      <div className="scroll-shot-shade" style={{ opacity: 0.8 }} />
      <div className="scroll-shot-outro page-width" style={{ opacity: 1, visibility: 'visible' }}>
        <p className="eyebrow">{copy.eyebrow}</p><h1 id="hero-title">The final<br /><span>feeling.</span></h1>
        <p className="cinema-intro">A world imagined.<br />Every detail made real.</p>{actions}
      </div>
    </div>
  </section>;

  return <section ref={host} className="scroll-shot" aria-labelledby="hero-title">
    <div className="scroll-shot-stage sticky">
      <canvas ref={canvas} className="scroll-shot-canvas" aria-hidden="true" />
      <div ref={shade} className="scroll-shot-shade" aria-hidden="true" />
      <div ref={intro} className="scroll-shot-intro page-width">
        <p className="eyebrow">{copy.eyebrow}</p>
        <p className="scroll-shot-lede">Every frame,<br />from the inside.</p>
        <span className="scroll-cue" aria-hidden="true">Scroll <ArrowDown size={14} /></span>
      </div>
      <div ref={chapter} className="scroll-shot-chapter page-width" aria-hidden="true" data-ch="0">
        <span>01 · Through the lens</span><span>02 · Inside the shot</span><span>03 · The final frame</span>
      </div>
      <div ref={passLabel} className="scroll-shot-pass" aria-live="polite" />
      <div ref={rail} className="scroll-shot-rail" aria-hidden="true">{m.hold.passes.map(p => <span key={p.id}><b style={{ background: p.swatch }} />{p.label}</span>)}</div>
      <div ref={outro} className="scroll-shot-outro page-width">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="hero-title">The final<br /><span>feeling.</span></h1>
        <p className="cinema-intro">A world imagined.<br />Every detail made real.</p>
        {actions}
      </div>
      <div className="scroll-shot-progress" aria-hidden="true"><i ref={bar} /></div>
    </div>
  </section>;
}
