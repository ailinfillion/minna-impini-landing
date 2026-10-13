const base = {
  viewBox: '0 0 100 100',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const Flower = (p) => (
  <svg {...base} {...p}>
    {[0, 60, 120, 180, 240, 300].map((r) => (
      <ellipse key={r} cx="50" cy="29" rx="10" ry="19" transform={`rotate(${r} 50 50)`} />
    ))}
    <circle cx="50" cy="50" r="5" />
  </svg>
)

export const Squiggle = ({ draw, ...p }) => (
  <svg {...base} viewBox="0 0 120 40" {...p}>
    <path
      className={draw ? 'draw' : undefined}
      pathLength="1"
      d="M6 22 Q 20 0 34 20 T 62 20 T 90 20 T 116 18"
    />
  </svg>
)

export const Wave = ({ draw, ...p }) => (
  <svg {...base} viewBox="0 0 120 40" {...p}>
    <path className={draw ? 'draw' : undefined} pathLength="1" d="M6 14 Q 30 -2 60 14 T 114 14" />
    <path className={draw ? 'draw' : undefined} pathLength="1" d="M6 30 Q 30 14 60 30 T 114 30" />
  </svg>
)

export const Spiral = (p) => (
  <svg {...base} {...p}>
    <path d="M10 72 C 28 8, 92 8, 72 50 C 58 80, 18 62, 46 40 C 66 26, 96 56, 80 90" />
  </svg>
)

export const Star = (p) => (
  <svg {...base} {...p}>
    <path d="M50 8 L61 38 L92 40 L67 59 L76 90 L50 72 L24 90 L33 59 L8 40 L39 38 Z" />
  </svg>
)

export const Heart = (p) => (
  <svg {...base} {...p}>
    <path d="M50 86 C 8 56 10 18 32 18 C 44 18 50 28 50 36 C 50 28 56 18 68 18 C 90 18 92 56 50 86 Z" />
  </svg>
)

export const Camera = (p) => (
  <svg {...base} {...p}>
    <rect x="10" y="30" width="80" height="52" rx="10" />
    <circle cx="50" cy="56" r="17" />
    <path d="M32 30 L38 18 H62 L68 30" />
    <circle cx="78" cy="42" r="2" />
  </svg>
)

export const Chart = (p) => (
  <svg {...base} {...p}>
    <path d="M10 90 H90" />
    <rect x="16" y="64" width="12" height="26" />
    <rect x="36" y="50" width="12" height="40" />
    <rect x="56" y="36" width="12" height="54" />
    <path d="M14 38 L46 12 M30 12 H46 V28" />
  </svg>
)

export const Arrow = (p) => (
  <svg {...base} {...p}>
    <path d="M14 50 H84 M60 26 L86 50 L60 74" />
  </svg>
)
