export function PitchForgeLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>
      
      {/* Shield */}
      <path
        d="M20 2L6 8V18C6 27 12 34 20 38C28 34 34 27 34 18V8L20 2Z"
        fill="url(#shieldGradient)"
        filter="url(#shadow)"
      />
      
      {/* Document */}
      <rect x="14" y="16" width="12" height="14" rx="1.5" fill="white" opacity="0.95" />
      <line x1="16" y1="19" x2="24" y2="19" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" />
      <line x1="16" y1="22" x2="24" y2="22" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" />
      <line x1="16" y1="25" x2="22" y2="25" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" />
      
      {/* Horizontal bar */}
      <rect x="12" y="14" width="16" height="2" rx="1" fill="white" opacity="0.9" />
      
      {/* Flame */}
      <path
        d="M20 8C20 8 18 10 18 12C18 13.1 18.9 14 20 14C21.1 14 22 13.1 22 12C22 10 20 8 20 8Z"
        fill="url(#flameGradient)"
        opacity="0.9"
      />
    </svg>
  );
}
