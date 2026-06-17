/* Inline SVG icon library — no external dependency needed */

export const PlayIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 5v14l11-7-11-7z" />
  </svg>
);

export const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22 8.2c0-1.7-1.3-3-3-3-2.4-.2-4.9-.2-7-.2s-4.6 0-7 .2c-1.7 0-3 1.4-3 3C1.8 9.8 1.8 11.4 1.8 12s0 2.2.2 3.8c0 1.7 1.3 3 3 3 2.4.2 4.9.2 7 .2s4.6 0 7-.2c1.7 0 3-1.3 3-3 .2-1.6.2-3.2.2-3.8s0-2.2-.2-3.8zM9.8 15.5v-7l6 3.5-6 3.5z" />
  </svg>
);

export const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1.5 8.5h3V21h-3V8.5zM8.5 8.5h2.9v1.7h.04c.4-.78 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v6.5h-3v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v5.9h-3V8.5z" />
  </svg>
);

export const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const ArrowIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ScissorsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
    <circle cx="6" cy="6"  r="2.2" />
    <circle cx="6" cy="18" r="2.2" />
    <path d="M8 7.5 19 18M8 16.5 19 6M7.5 12 11 12" />
  </svg>
);

export const PaletteIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
    <path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.9 1.9-1.9H17a4 4 0 0 0 4-4c0-4.4-4-7.5-9-7.5z" />
    <circle cx="7.5"  cy="10.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="9.5"  cy="7"    r="1" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="7"    r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const SparkleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2l1.8 5.6L19 9l-5.2 1.5L12 16l-1.8-5.5L5 9l5.2-1.4L12 2zM19 14l.9 2.8L23 17.5l-3.1.8L19 21l-.9-2.7-3-.8 3-.8.9-2.7z" />
  </svg>
);

export const WaveformIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...props}>
    <path d="M3 12v0M6 9v6M9 6v12M12 4v16M15 7v10M18 9v6M21 12v0" />
  </svg>
);

export const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" {...props}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

/* Map icon key → component (used by Services data) */
export const ICON_MAP = {
  Scissors: ScissorsIcon,
  Palette:  PaletteIcon,
  Sparkle:  SparkleIcon,
  Waveform: WaveformIcon,
};
