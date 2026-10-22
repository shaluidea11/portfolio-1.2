// src/components/hero/RotatingBadge.tsx
// Rotating SVG textPath badge — aria-hidden since it's decorative.

import { profile } from '../../data/profile';

export function RotatingBadge() {
  const text = profile.badgeText;
  const size = 140;
  const radius = 52;

  return (
    <div
      className="rotating-badge"
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <defs>
          <path
            id="badge-circle"
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.12em',
            fill: 'var(--color-ink)',
          }}
        >
          <textPath href="#badge-circle" startOffset="0%">
            {text} {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
