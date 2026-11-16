import { useId } from 'react';

interface ProceduralTextureProps {
  variant?: 'grain' | 'dots' | 'mesh' | 'scan';
  className?: string;
  color?: string;
  density?: number;
  radialFade?: boolean;
  seed?: number;
}

// Local seeded generator: identical geometry on the server and during hydration.
function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function ProceduralTexture({ variant = 'grain', className = '', color = 'currentColor', density = 1, radialFade = true, seed = 17 }: ProceduralTextureProps) {
  const id = `texture-${useId().replace(/:/g, '')}`;
  const random = seeded(seed);
  const spacing = 16 / Math.max(0.25, Math.min(4, Number.isFinite(density) ? density : 1));
  return (
    <svg aria-hidden="true" focusable="false" color={color} className={`procedural-texture texture-${variant} ${className}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`${id}-noise`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" seed={seed} />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.333 0.333 0.333 0 0" result="noise" />
          <feFlood floodColor="currentColor" />
          <feComposite in2="noise" operator="in" />
        </filter>
        <radialGradient id={`${id}-fade`}><stop offset="0%" stopColor="white" /><stop offset="100%" stopColor="black" /></radialGradient>
        <mask id={`${id}-mask`}><rect width="100%" height="100%" fill={`url(#${id}-fade)`} /></mask>
        <pattern id={`${id}-pattern`} width={variant === 'scan' ? 4 : spacing} height={variant === 'scan' ? 4 : spacing} patternUnits="userSpaceOnUse">
          {variant === 'dots' && <circle cx={spacing / 2} cy={spacing / 2} r={0.65 + random() * 0.25} fill="currentColor" />}
          {variant === 'mesh' && <path d={`M0 ${spacing}L${spacing} 0 M0 0L${spacing} ${spacing} M0 ${spacing / 2}Q${spacing / 2} ${spacing * random()} ${spacing} ${spacing / 2}`} stroke="currentColor" strokeWidth="0.45" fill="none" />}
          {variant === 'scan' && <path d="M0 0.5H4" stroke="currentColor" strokeWidth="0.5" />}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={variant === 'grain' ? 'currentColor' : `url(#${id}-pattern)`} filter={variant === 'grain' ? `url(#${id}-noise)` : undefined} mask={variant !== 'grain' && radialFade ? `url(#${id}-mask)` : undefined} />
    </svg>
  );
}
