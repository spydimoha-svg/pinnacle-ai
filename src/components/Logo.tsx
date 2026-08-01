/**
 * Pinnacle AI logo — the gold peak.
 *
 * This is the mark from the landing page, used everywhere. It used to be a
 * different drawing inside the app (a ridgeline in a rounded tile), which meant
 * the first thing a student saw on the way in was not the thing they saw once
 * they were in. One mark, one brand.
 *
 * The gradient id is per-instance: several logos render on the same screen, and
 * a shared id makes every copy after the first inherit the first one's fill.
 */
let markSeq = 0;
export function LogoMark({ size = 32 }: { size?: number }) {
  const id = `pnz-peak-${++markSeq}`;
  return (
    <svg
      width={size}
      height={(size * 22) / 26}
      viewBox="0 0 26 22"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="22" x2="26" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-gold-dim)" />
          <stop offset="0.5" stopColor="var(--color-gold)" />
          <stop offset="1" stopColor="var(--color-gold-deep)" />
        </linearGradient>
      </defs>
      <path d="M13 1.6 L25 20.6 H16.6 L13 14.6 L9.4 20.6 H1 Z" fill={`url(#${id})`} />
      {/* The notch: reads as the light catching one face of the summit. */}
      <path d="M13 1.6 L16.9 7.8 L13 9.9 L9.1 7.8 Z" fill="var(--color-ink)" fillOpacity="0.35" />
    </svg>
  );
}

export function Logo({ size = 32, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <LogoMark size={size} />
      {wordmark && (
        <span
          className="font-display font-bold tracking-tight text-cream"
          style={{ fontSize: size * 0.62 }}
        >
          Pinnacle&nbsp;<span className="text-gold">AI</span>
        </span>
      )}
    </span>
  );
}

/** Decorative ascending ridgeline — the signature element. */
export function Ridgeline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 120"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M0 115 L90 96 L150 104 L235 74 L300 88 L390 52 L450 66 L545 34 L610 46 L700 14 L800 6"
        stroke="var(--color-gold-dim)"
        strokeWidth="1.5"
      />
      <path
        d="M0 115 L90 96 L150 104 L235 74 L300 88 L390 52 L450 66 L545 34 L610 46 L700 14 L800 6 L800 120 L0 120 Z"
        fill="url(#ridgefill)"
      />
      <circle cx="700" cy="14" r="4" fill="var(--color-gold)" />
      <defs>
        <linearGradient id="ridgefill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.10" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
