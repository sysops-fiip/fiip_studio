'use client';

import { useEffect, useRef } from 'react';

/*
 * Mnemonics — tiny looping line animations that stand in for each discipline.
 * Pure SVG (transparent, resolution independent, ~2 KB each). Geometry is
 * procedural where it can be; motion is CSS keyframes in globals.css (.mn-*),
 * plus SMIL for path morphs. Reduced motion freezes everything on a readable pose.
 */

export type MnemonicKind = 'editorial' | 'vfx' | 'colour' | 'conform' | 'generative' | 'review' | 'archive' | 'contact' | 'studio';

const MAP: Record<string, MnemonicKind> = {
  review: 'review', archive: 'archive', contact: 'contact', studio: 'studio',
  editorial: 'editorial', 'editorial finishing': 'editorial',
  vfx: 'vfx', 'visual effects': 'vfx', 'vfx supervision & production': 'vfx',
  colour: 'colour', 'colour & finishing': 'colour',
  conform: 'conform', 'conform & mastering': 'conform',
  generative: 'generative', 'ai-assisted vfx': 'generative',
};
export const mnemonicFor = (key: string): MnemonicKind => MAP[key.toLowerCase()] ?? 'studio';

const hash = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function Generative() {
  const dots = [];
  for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) {
    const cx = 16 + x * 8, cy = 16 + y * 8, i = y * 9 + x;
    const r = Math.hypot(cx - 48, cy - 48);
    const inside = r < 25 && r > 11;
    dots.push(<circle key={i} cx={cx} cy={cy} r={1.6} className={inside ? 'mn-gen-in' : 'mn-gen-out'} style={{ animationDelay: `${-(hash(i) * 6).toFixed(2)}s, 0s` }} />);
  }
  return <g>{dots}<circle cx="48" cy="48" r="3" className="mn-accent-fill mn-gen-core" /></g>;
}

function Body({ kind }: { kind: MnemonicKind }) {
  switch (kind) {
    case 'editorial':
      return <g>
        <line x1="10" y1="62" x2="86" y2="62" className="mn-faint" />
        <rect x="12" y="44" width="26" height="12" rx="1.5" className="mn-line" />
        <g className="mn-ed-b"><rect x="41" y="44" width="16" height="12" rx="1.5" className="mn-line" /></g>
        <g className="mn-ed-c"><rect x="60" y="44" width="24" height="12" rx="1.5" className="mn-line" /></g>
        <rect x="12" y="30" width="40" height="8" rx="1.5" className="mn-faint" />
        <g className="mn-ed-head"><line x1="12" y1="24" x2="12" y2="68" className="mn-accent" /><path d="M9 22 h6 l-3 4z" className="mn-accent-fill" /></g>
      </g>;
    case 'vfx':
      return <g>
        <rect x="12" y="20" width="72" height="56" rx="2" className="mn-line" />
        <path d="M18 70 V54 h10 v-8 h8 v24 M44 70 V58 h12 v12 M62 70 V50 h8 v20" className="mn-line" />
        <path d="M70 50 V28 h8 v22" className="mn-dash mn-vfx-ext" />
        <g className="mn-vfx-wire"><line x1="16" y1="26" x2="80" y2="44" className="mn-line mn-wire" /></g>
        <line x1="12" y1="20" x2="12" y2="76" className="mn-accent mn-vfx-scan" />
      </g>;
    case 'colour':
      return <g>
        <rect x="16" y="16" width="64" height="64" rx="2" className="mn-faint" />
        <line x1="37.3" y1="16" x2="37.3" y2="80" className="mn-faint" /><line x1="58.6" y1="16" x2="58.6" y2="80" className="mn-faint" />
        <line x1="16" y1="37.3" x2="80" y2="37.3" className="mn-faint" /><line x1="16" y1="58.6" x2="80" y2="58.6" className="mn-faint" />
        <path className="mn-line mn-strong" d="M16 80 C 37 59, 59 37, 80 16">
          <animate attributeName="d" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.35;0.65;1" keySplines=".6 0 .2 1;0 0 1 1;.6 0 .2 1"
            values="M16 80 C 37 59, 59 37, 80 16;M16 80 C 44 78, 52 18, 80 16;M16 80 C 44 78, 52 18, 80 16;M16 80 C 37 59, 59 37, 80 16" />
        </path>
        <circle r="2.6" className="mn-accent-fill"><animateMotion dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.35;0.65;1" keySplines=".6 0 .2 1;0 0 1 1;.6 0 .2 1" values="37,59;34,72;34,72;37,59" /></circle>
        <circle r="2.6" className="mn-accent-fill"><animateMotion dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.35;0.65;1" keySplines=".6 0 .2 1;0 0 1 1;.6 0 .2 1" values="59,37;62,24;62,24;59,37" /></circle>
      </g>;
    case 'conform':
      return <g>
        <g className="mn-cf-1"><rect x="14" y="28" width="30" height="9" rx="1.5" className="mn-line" /><rect x="50" y="28" width="32" height="9" rx="1.5" className="mn-faint" /></g>
        <g className="mn-cf-2"><rect x="14" y="43" width="30" height="9" rx="1.5" className="mn-line" /><rect x="50" y="43" width="32" height="9" rx="1.5" className="mn-faint" /></g>
        <g className="mn-cf-3"><rect x="14" y="58" width="30" height="9" rx="1.5" className="mn-line" /><rect x="50" y="58" width="32" height="9" rx="1.5" className="mn-faint" /></g>
        <line x1="47" y1="20" x2="47" y2="76" className="mn-accent" />
        <path d="M40 82 l5 4 l10 -9" className="mn-accent mn-cf-tick" />
      </g>;
    case 'generative':
      return <Generative />;
    case 'review':
      return <g>
        <rect x="12" y="22" width="72" height="50" rx="2" className="mn-line" />
        <g className="mn-rv-half"><path d="M12 72 L36 46 L48 58 L62 40 L84 64" className="mn-faint" /></g>
        <path d="M12 72 L36 46 L48 58 L62 40 L84 64" className="mn-line mn-rv-new" />
        <line x1="48" y1="22" x2="48" y2="72" className="mn-strong-line mn-rv-wipe" />
        <circle cx="62" cy="40" r="3" className="mn-accent-fill" /><circle cx="62" cy="40" r="3" className="mn-accent mn-pulse" />
        <line x1="12" y1="80" x2="84" y2="80" className="mn-faint" /><circle cx="40" cy="80" r="2" className="mn-accent-fill mn-rv-play" />
      </g>;
    case 'archive':
      return <g>
        <rect x="10" y="30" width="76" height="36" rx="2" className="mn-line" />
        <g className="mn-ar-strip">{Array.from({ length: 12 }, (_, i) => <g key={i}><rect x={8 + i * 12} y="33" width="4" height="3" className="mn-fill-faint" /><rect x={8 + i * 12} y="60" width="4" height="3" className="mn-fill-faint" /><rect x={4 + i * 12} y="40" width="10" height="16" rx="1" className={i === 5 ? 'mn-accent' : 'mn-faint'} /></g>)}</g>
      </g>;
    case 'contact':
      return <g>
        <circle cx="22" cy="58" r="5" className="mn-line" /><circle cx="74" cy="38" r="5" className="mn-line" />
        <path d="M27 56 C 44 50, 52 44, 69 40" className="mn-faint" />
        <path d="M27 56 C 44 50, 52 44, 69 40" className="mn-accent mn-ct-signal" pathLength={100} />
        <circle cx="74" cy="38" r="5" className="mn-accent mn-pulse mn-ct-ring" />
      </g>;
    default:
      return <g>
        <circle cx="48" cy="48" r="30" className="mn-line" />
        <circle cx="48" cy="48" r="20" className="mn-faint mn-st-focus" />
        <circle cx="48" cy="48" r="4" className="mn-accent-fill" />
        {Array.from({ length: 6 }, (_, i) => { const a = (i * Math.PI) / 3; return <line key={i} x1={48 + Math.sin(a) * 30} y1={48 - Math.cos(a) * 30} x2={48 + Math.sin(a) * 24} y2={48 - Math.cos(a) * 24} className="mn-faint" />; })}
      </g>;
  }
}

export function Mnemonic({ kind: requested, size = 72, className = '' }: { kind: MnemonicKind | string; size?: number; className?: string }) {
  const kind = mnemonicFor(requested);
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    const sync = () => { if (motion.matches || !visible || document.hidden) svg.pauseAnimations(); else svg.unpauseAnimations(); svg.classList.toggle('mn-paused', motion.matches || !visible); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); });
    io.observe(svg); motion.addEventListener('change', sync); document.addEventListener('visibilitychange', sync); sync();
    return () => { io.disconnect(); motion.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, []);
  return <svg ref={ref} className={`mnemonic mn-${kind} ${className}`} width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden="true" focusable="false"><Body kind={kind} /></svg>;
}
