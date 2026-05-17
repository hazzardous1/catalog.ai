const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function CircuitIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="2" />
      <circle cx="4" cy="6" r="1.5" />
      <circle cx="20" cy="6" r="1.5" />
      <circle cx="4" cy="18" r="1.5" />
      <circle cx="20" cy="18" r="1.5" />
      <line x1="5.5" y1="6" x2="10" y2="11" />
      <line x1="18.5" y1="6" x2="14" y2="11" />
      <line x1="5.5" y1="18" x2="10" y2="13" />
      <line x1="18.5" y1="18" x2="14" y2="13" />
    </svg>
  )
}

export function ChartIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  )
}

export function AtomIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  )
}

export function FlowIcon() {
  return (
    <svg {...iconProps}>
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <rect x="9" y="16" width="6" height="6" rx="1" />
      <rect x="17" y="9" width="6" height="6" rx="1" />
      <line x1="7" y1="12" x2="9" y2="5" />
      <line x1="7" y1="12" x2="9" y2="19" />
      <line x1="15" y1="5" x2="17" y2="12" />
      <line x1="15" y1="19" x2="17" y2="12" />
    </svg>
  )
}

export function ShieldIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2l8 3v6c0 5-3.5 9.1-8 10.5C7.5 20.1 4 16 4 11V5l8-3z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

export function OrgIcon() {
  return (
    <svg {...iconProps}>
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <rect x="2" y="15" width="6" height="4" rx="1" />
      <rect x="9" y="15" width="6" height="4" rx="1" />
      <rect x="16" y="15" width="6" height="4" rx="1" />
      <line x1="12" y1="6" x2="12" y2="10" />
      <line x1="5" y1="10" x2="19" y2="10" />
      <line x1="5" y1="10" x2="5" y2="15" />
      <line x1="12" y1="10" x2="12" y2="15" />
      <line x1="19" y1="10" x2="19" y2="15" />
    </svg>
  )
}

export function StarIcon() {
  return (
    <svg {...iconProps}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function PeopleIcon() {
  return (
    <svg {...iconProps}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export const domainIconMap = {
  circuit: CircuitIcon,
  chart:   ChartIcon,
  atom:    AtomIcon,
  flow:    FlowIcon,
  shield:  ShieldIcon,
  org:     OrgIcon,
  star:    StarIcon,
  people:  PeopleIcon,
}
