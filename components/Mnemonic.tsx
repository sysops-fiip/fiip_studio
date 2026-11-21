'use client';

import { useEffect, useId, useRef } from 'react';

/*
 * Mnemonics — procedural, seamlessly looping line animations for each discipline.
 *
 * Every mark is generated from its frame size, so the same idea composes properly as a
 * square icon, a wide band (3:1) or a tall column (1:2): more tracks, more dots, more
 * clips, never a stretched icon. Motion is SMIL only (one engine, native in every
 * browser including iOS Safari) on a shared 4 s cycle whose first and last frames are
 * identical, so the loop has no seam. Paused offscreen and frozen on a readable pose
 * under prefers-reduced-motion. Transparent: they sit on any background.
 */

export type MnemonicKind = 'editorial' | 'vfx' | 'colour' | 'conform' | 'generative' | 'review' | 'archive' | 'contact' | 'studio';
export type MnemonicShape = 'square' | 'wide' | 'tall';

const MAP: Record<string, MnemonicKind> = {
  editorial: 'editorial', 'editorial finishing': 'editorial',
  vfx: 'vfx', 'visual effects': 'vfx', 'vfx supervision & production': 'vfx',
  colour: 'colour', 'colour & finishing': 'colour',
  conform: 'conform', 'conform & mastering': 'conform',
  generative: 'generative', 'ai-assisted vfx': 'generative',
  review: 'review', archive: 'archive', contact: 'contact', studio: 'studio',
};
export const mnemonicFor = (key: string): MnemonicKind => MAP[key.toLowerCase()] ?? 'studio';

const DUR = '4s';
const SIZE: Record<MnemonicShape, [number, number]> = { square: [96, 96], wide: [288, 96], tall: [96, 192] };
const INK = 'var(--mn-ink, #d9d9d4)', DIM = 'var(--mn-dim, #4d4d4b)', ACC = 'var(--studio-accent, #ca943e)';
const EASE = '0.65 0 0.35 1';
const splines = (n: number) => Array(n).fill(EASE).join(';');
const kt = (...t: number[]) => t.join(';');
const hash = (i: number) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const line = { stroke: INK, strokeWidth: 1.25, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none', vectorEffect: 'non-scaling-stroke' as const };
const dim = { ...line, stroke: DIM, strokeWidth: 1 };
const acc = { ...line, stroke: ACC, strokeWidth: 1.5 };

function Editorial({ W, H, uid }: { W: number; H: number; uid: string }) {
  const rows = Math.max(1, Math.floor((H - 28) / 18));
  const top = (H - rows * 18) / 2 + 2;
  const els = [];
  for (let r = 0; r < rows; r++) {
    const y = top + r * 18;
    const n = Math.max(2, Math.round(W / 34));
    const slot = (W - 20) / n;
    els.push(<line key={`t${r}`} x1={10} y1={y + 12} x2={W - 10} y2={y + 12} {...dim} />);
    for (let i = 0; i < n; i++) {
      const w = slot * (0.55 + 0.35 * hash(r * 7 + i)), x = 10 + i * slot;
      const moving = (i + r) % 3 === 1;
      els.push(<rect key={`c${r}-${i}`} x={x} y={y} width={w} height={9} rx={1.5} {...(moving ? line : dim)}>
        {moving && <animate attributeName="x" dur={DUR} repeatCount="indefinite" calcMode="spline" keyTimes={kt(0, 0.35, 0.5, 0.85, 1)} keySplines={splines(4)} values={`${x};${x};${x + slot * 0.4};${x + slot * 0.4};${x}`} />}
      </rect>);
    }
  }
  return <g>{els}
    <g><line x1={0} y1={6} x2={0} y2={H - 6} {...acc} /><path d={`M-3.5 4 h7 l-3.5 4z`} fill={ACC} />
      <animateTransform attributeName="transform" type="translate" dur={DUR} repeatCount="indefinite" values={`10 0;${W - 10} 0;10 0`} keyTimes="0;0.5;1" calcMode="spline" keySplines={splines(2)} /></g>
  </g>;
}

function Vfx({ W, H, uid }: { W: number; H: number; uid: string }) {
  const m = 10, fy = 14, fh = H - 28;
  const bars = [], n = Math.max(3, Math.round((W - 2 * m) / 16));
  for (let i = 0; i < n; i++) {
    const bw = (W - 2 * m) / n, x = m + i * bw + 2, h = fh * (0.25 + 0.45 * hash(i + 3));
    bars.push(<rect key={i} x={x} y={fy + fh - h} width={bw - 5} height={h} {...line} />);
  }
  const ext = m + Math.floor(n * 0.66) * ((W - 2 * m) / n) + 2, extW = (W - 2 * m) / n - 5;
  return <g>
    <rect x={m - 4} y={fy - 4} width={W - 2 * m + 8} height={fh + 8} rx={2} {...dim} />
    {bars}
    <rect x={ext} y={fy + 6} width={extW} height={fh * 0.32} {...acc} strokeDasharray="3 3">
      <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes={kt(0, 0.45, 0.6, 0.9, 1)} values="0;0;1;1;0" />
    </rect>
    <line x1={m} y1={fy + 4} x2={W - m} y2={fy + fh * 0.45} {...line} strokeDasharray="2 3">
      <animate attributeName="stroke-dashoffset" dur={DUR} repeatCount="indefinite" values="0;-20" />
      <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes={kt(0, 0.08, 0.45, 0.92, 1)} values="1;1;0;0;1" />
    </line>
    <line x1={0} y1={fy - 4} x2={0} y2={fy + fh + 4} {...acc}>
      <animateTransform attributeName="transform" type="translate" dur={DUR} repeatCount="indefinite" calcMode="spline" keyTimes={kt(0, 0.08, 0.45, 1)} keySplines={splines(3)} values={`${m} 0;${m} 0;${W - m} 0;${W - m} 0`} />
      <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes={kt(0, 0.06, 0.45, 0.52, 1)} values="0;1;1;0;0" />
    </line>
  </g>;
}

function tiles(W: number, H: number) {
  const s = Math.min(W, H), n = Math.max(1, Math.round(Math.max(W, H) / s));
  const step = (Math.max(W, H) - s) / Math.max(1, n - 1);
  return Array.from({ length: n }, (_, i) => (W >= H ? { x: n === 1 ? (W - s) / 2 : i * step, y: (H - s) / 2, s, i } : { x: (W - s) / 2, y: n === 1 ? (H - s) / 2 : i * step, s, i }));
}

function Colour({ W, H, uid }: { W: number; H: number; uid: string }) {
  return <g>{tiles(W, H).map(({ x, y, s, i }) => {
    const p = 12, a = x + p, b = y + p, c = s - 2 * p;
    const lin = `M${a} ${b + c} C ${a + c / 3} ${b + 2 * c / 3}, ${a + 2 * c / 3} ${b + c / 3}, ${a + c} ${b}`;
    const sc = `M${a} ${b + c} C ${a + c * 0.45} ${b + c * 0.98}, ${a + c * 0.55} ${b + c * 0.02}, ${a + c} ${b}`;
    const off = `${-(i * 0.6).toFixed(2)}s`;
    return <g key={i}>
      <rect x={a} y={b} width={c} height={c} rx={2} {...dim} />
      {[1, 2].map(k => <g key={k}><line x1={a + (c * k) / 3} y1={b} x2={a + (c * k) / 3} y2={b + c} {...dim} opacity={0.6} /><line x1={a} y1={b + (c * k) / 3} x2={a + c} y2={b + (c * k) / 3} {...dim} opacity={0.6} /></g>)}
      <path d={lin} {...line} strokeWidth={1.8}><animate attributeName="d" dur={DUR} begin={off} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines={splines(2)} values={`${lin};${sc};${lin}`} /></path>
      <circle r={2.6} fill={ACC}><animateMotion dur={DUR} begin={off} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines={splines(2)} values={`${a + c / 3},${b + 2 * c / 3};${a + c * 0.3},${b + c * 0.86};${a + c / 3},${b + 2 * c / 3}`} /></circle>
      <circle r={2.6} fill={ACC}><animateMotion dur={DUR} begin={off} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines={splines(2)} values={`${a + 2 * c / 3},${b + c / 3};${a + c * 0.7},${b + c * 0.14};${a + 2 * c / 3},${b + c / 3}`} /></circle>
    </g>;
  })}</g>;
}

function Conform({ W, H, uid }: { W: number; H: number; uid: string }) {
  const rows = Math.max(2, Math.floor((H - 20) / 14)), top = (H - rows * 14) / 2 + 2, cx = W / 2;
  return <g>
    {Array.from({ length: rows }, (_, r) => {
      const y = top + r * 14, d = (hash(r + 11) - 0.5) * 18;
      return <g key={r}>
        <rect x={10} y={y} width={cx - 14} height={8} rx={1.5} {...line} />
        <rect x={cx + 4} y={y} width={W - cx - 14} height={8} rx={1.5} {...dim} />
        <animateTransform attributeName="transform" type="translate" dur={DUR} repeatCount="indefinite" calcMode="spline" keyTimes={kt(0, 0.4, 0.85, 1)} keySplines={splines(3)} values={`${d.toFixed(1)} 0;0 0;0 0;${d.toFixed(1)} 0`} />
      </g>;
    })}
    <line x1={cx} y1={6} x2={cx} y2={H - 6} {...acc}>
      <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes={kt(0, 0.4, 0.45, 0.85, 1)} values="0.35;0.35;1;1;0.35" />
    </line>
  </g>;
}

function Generative({ W, H, uid }: { W: number; H: number; uid: string }) {
  const gap = 8, cols = Math.floor((W - 12) / gap), rows = Math.floor((H - 12) / gap);
  const ox = (W - (cols - 1) * gap) / 2, oy = (H - (rows - 1) * gap) / 2;
  const rx = Math.min(W, H * 2) * 0.32, ry = H * 0.3, cx = W / 2, cy = H / 2;
  const dots = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const px = ox + x * gap, py = oy + y * gap, i = y * cols + x;
    const e = Math.hypot((px - cx) / rx, (py - cy) / ry);
    const inside = e < 1 && e > 0.55;
    const n0 = (0.15 + 0.7 * hash(i)).toFixed(2), n1 = (0.15 + 0.7 * hash(i + 999)).toFixed(2);
    const end = inside ? '1' : '0.08';
    dots.push(<circle key={i} cx={px} cy={py} r={inside ? 1.7 : 1.4} fill={INK}>
      <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes={kt(0, 0.15, 0.3, 0.5, 0.8, 1)} values={`${n0};${n1};${n0};${end};${end};${n0}`} />
    </circle>);
  }
  return <g>{dots}<circle cx={cx} cy={cy} r={3.2} fill={ACC}><animate attributeName="r" dur={DUR} repeatCount="indefinite" keyTimes={kt(0, 0.35, 0.5, 0.8, 1)} values="0;0;3.2;3.2;0" /></circle></g>;
}

function Review({ W, H, uid }: { W: number; H: number; uid: string }) {
  const m = 10, y0 = 12, y1 = H - 20;
  const np = Math.max(4, Math.round(W / 22));
  const pts = Array.from({ length: np }, (_, i) => [m + (i * (W - 2 * m)) / (np - 1), y1 - (y1 - y0) * (0.2 + 0.55 * hash(i + 5))]);
  const path = 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L');
  const peak = pts.reduce((a, b) => (b[1] < a[1] ? b : a));
  return <g>
    <rect x={m} y={y0} width={W - 2 * m} height={y1 - y0} rx={2} {...line} />
    <path d={path} {...dim} />
    <clipPath id={`rv${uid}`}><rect x={m} y={y0} width={(W - 2 * m) / 2} height={y1 - y0}>
      <animate attributeName="width" dur={DUR} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines={splines(2)} values={`${(W - 2 * m) * 0.25};${(W - 2 * m) * 0.75};${(W - 2 * m) * 0.25}`} /></rect></clipPath>
    <path d={path} {...line} strokeWidth={1.6} clipPath={`url(#rv${uid})`} />
    <line x1={0} y1={y0} x2={0} y2={y1} stroke="#fff" strokeWidth={1.4}>
      <animateTransform attributeName="transform" type="translate" dur={DUR} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines={splines(2)} values={`${m + (W - 2 * m) * 0.25} 0;${m + (W - 2 * m) * 0.75} 0;${m + (W - 2 * m) * 0.25} 0`} />
    </line>
    <circle cx={peak[0]} cy={peak[1]} r={3} fill={ACC} />
    <circle cx={peak[0]} cy={peak[1]} r={3} fill="none" stroke={ACC} strokeWidth={1}>
      <animate attributeName="r" dur="2s" repeatCount="indefinite" values="3;10" /><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.9;0" />
    </circle>
    <line x1={m} y1={H - 8} x2={W - m} y2={H - 8} {...dim} />
    <circle cy={H - 8} r={2.2} fill={ACC}><animate attributeName="cx" dur={DUR} repeatCount="indefinite" values={`${m};${W - m}`} /></circle>
  </g>;
}

function Archive({ W, H, uid }: { W: number; H: number; uid: string }) {
  const horiz = W >= H, L = horiz ? W : H, S = horiz ? H : W;
  const band = Math.min(S - 20, 44), o = (S - band) / 2, pitch = band * 0.62;
  const n = Math.ceil(L / pitch) + 2;
  const cells = Array.from({ length: n }, (_, i) => {
    const a = i * pitch - pitch;
    const r = (x: number, y: number, w: number, h: number, k: string, props: object) => horiz ? <rect key={k} x={x} y={y} width={w} height={h} {...props} /> : <rect key={k} x={y} y={x} width={h} height={w} {...props} />;
    return <g key={i}>
      {r(a + 3, o + 3, pitch * 0.32, 3, 'p1', { fill: DIM })}
      {r(a + 3, o + band - 6, pitch * 0.32, 3, 'p2', { fill: DIM })}
      {r(a + 2, o + 10, pitch - 4, band - 20, 'f', { ...(i === Math.floor(n / 2) ? acc : dim), rx: 1 })}
    </g>;
  });
  const clipId = `ar${uid}`;
  return <g>
    <clipPath id={clipId}><rect x={horiz ? 8 : o} y={horiz ? o : 8} width={horiz ? W - 16 : band} height={horiz ? band : H - 16} rx={2} /></clipPath>
    <rect x={horiz ? 8 : o} y={horiz ? o : 8} width={horiz ? W - 16 : band} height={horiz ? band : H - 16} rx={2} {...line} />
    <g clipPath={`url(#${clipId})`}><g>{cells}
      <animateTransform attributeName="transform" type="translate" dur={DUR} repeatCount="indefinite" values={horiz ? `0 0;${-pitch} 0` : `0 0;0 ${-pitch}`} /></g></g>
  </g>;
}

function Contact({ W, H, uid }: { W: number; H: number; uid: string }) {
  const horiz = W >= H;
  const a = horiz ? [14, H * 0.62] : [W * 0.35, H - 14], b = horiz ? [W - 14, H * 0.38] : [W * 0.65, 14];
  const d = horiz ? `M${a[0] + 6} ${a[1]} C ${W * 0.4} ${a[1]}, ${W * 0.6} ${b[1]}, ${b[0] - 6} ${b[1]}` : `M${a[0]} ${a[1] - 6} C ${a[0]} ${H * 0.6}, ${b[0]} ${H * 0.4}, ${b[0]} ${b[1] + 6}`;
  return <g>
    <circle cx={a[0]} cy={a[1]} r={5} {...line} /><circle cx={b[0]} cy={b[1]} r={5} {...line} />
    <path d={d} {...dim} />
    <path d={d} {...acc} pathLength={100} strokeDasharray="16 100"><animate attributeName="stroke-dashoffset" dur={DUR} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.7;1" keySplines={splines(2)} values="16;-100;-100" /></path>
    <circle cx={b[0]} cy={b[1]} r={5} fill="none" stroke={ACC} strokeWidth={1}>
      <animate attributeName="r" dur={DUR} repeatCount="indefinite" keyTimes="0;0.65;1" values="5;5;16" /><animate attributeName="opacity" dur={DUR} repeatCount="indefinite" keyTimes="0;0.65;1" values="0;0.9;0" />
    </circle>
  </g>;
}

function Studio({ W, H, uid }: { W: number; H: number; uid: string }) {
  return <g>{tiles(W, H).map(({ x, y, s, i }) => {
    const cx = x + s / 2, cy = y + s / 2, R = s * 0.36, off = `${-(i * 0.8).toFixed(1)}s`;
    return <g key={i}>
      <circle cx={cx} cy={cy} r={R} {...line} />
      {Array.from({ length: 6 }, (_, k) => { const t = (k * Math.PI) / 3; return <line key={k} x1={cx + Math.sin(t) * R} y1={cy - Math.cos(t) * R} x2={cx + Math.sin(t) * R * 0.8} y2={cy - Math.cos(t) * R * 0.8} {...dim} />; })}
      <circle cx={cx} cy={cy} r={R * 0.6} {...dim}><animate attributeName="r" dur={DUR} begin={off} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines={splines(2)} values={`${R * 0.35};${R * 0.72};${R * 0.35}`} /></circle>
      <circle cx={cx} cy={cy} r={3} fill={ACC} />
    </g>;
  })}</g>;
}

const BODY: Record<MnemonicKind, (p: { W: number; H: number; uid: string }) => React.JSX.Element> = { editorial: Editorial, vfx: Vfx, colour: Colour, conform: Conform, generative: Generative, review: Review, archive: Archive, contact: Contact, studio: Studio };

export function Mnemonic({ kind, shape = 'square', size, className = '', label }: { kind: MnemonicKind | string; shape?: MnemonicShape; size?: number; className?: string; label?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const k = mnemonicFor(kind);
  const [W, H] = SIZE[shape];
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      if (motion.matches) { svg.pauseAnimations(); svg.setCurrentTime(1.6); return; }
      if (visible && !document.hidden) svg.unpauseAnimations(); else svg.pauseAnimations();
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { rootMargin: '120px' });
    io.observe(svg); motion.addEventListener('change', sync); document.addEventListener('visibilitychange', sync); sync();
    return () => { io.disconnect(); motion.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, []);
  const Body = BODY[k];
  const scale = size ? size / Math.max(W, H) : 1;
  return <svg ref={ref} className={`mnemonic mn-${k} mn-${shape} ${className}`} width={Math.round(W * scale)} height={Math.round(H * scale)} viewBox={`0 0 ${W} ${H}`} fill="none"
    role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false"><Body W={W} H={H} uid={uid} /></svg>;
}
