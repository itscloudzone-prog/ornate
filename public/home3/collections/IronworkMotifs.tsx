import React from 'react';

/**
 * Subtle wrought-iron scrollwork corner motif derived from Ornate Iron Decor's
 * arched double-leaf driveway gate geometry. Used sparingly to frame the outer
 * hero vignette without encroaching on typography or photography.
 */
export const HeroScrollworkCorner: React.FC<{
  className?: string;
  flipX?: boolean;
}> = ({ className = '', flipX = false }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 220 220"
    fill="none"
    className={className}
    style={flipX ? { transform: 'scaleX(-1)' } : undefined}
  >
    <path
      d="M8 212V36C8 20.536 20.536 8 36 8H212"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeOpacity="0.42"
    />
    <path
      d="M22 192V56C22 37.222 37.222 22 56 22H192"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeOpacity="0.24"
    />
    {/* Forged C-scroll volute */}
    <path
      d="M22 104C22 68 50 40 86 40C106 40 120 53 120 70C120 84 109 94 96 94C85 94 78 86 78 77C78 70 83 65 89 65"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <path
      d="M104 22C68 22 40 50 40 86C40 106 53 120 70 120C84 120 94 109 94 96C94 85 86 78 77 78"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.3"
    />
    {/* Forged collar rings */}
    <circle cx="52" cy="52" r="3.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
    <circle cx="22" cy="138" r="2.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    <circle cx="138" cy="22" r="2.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
  </svg>
);

/**
 * Cropped horizontal repeating scrollwork frieze motif used as an architectural
 * divider in the collections showcase.
 */
export const CollectionFriezeRule: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
    <svg viewBox="0 0 1200 28" fill="none" className="w-full h-7 text-[#C4CED8]" preserveAspectRatio="none">
      <line x1="0" y1="4" x2="1200" y2="4" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.16" />
      <line x1="0" y1="24" x2="1200" y2="24" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.16" />
      <defs>
        <pattern id="iron-frieze-repeat" width="80" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M4 14C12 6 28 6 36 14C44 22 60 22 68 14C72 10 76 10 80 14"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.28"
            fill="none"
          />
          <circle cx="20" cy="14" r="2.2" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.3" />
          <circle cx="60" cy="14" r="2.2" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.3" />
          <line x1="40" y1="6" x2="40" y2="22" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.22" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="1200" height="28" fill="url(#iron-frieze-repeat)" />
    </svg>
  </div>
);

/**
 * Faint architectural ironwork lattice shadow resting behind the enquiry section.
 * Intentionally low opacity so form controls and verified contact details remain effortless to read.
 */
export const EnquiryLatticeShadow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 800 600"
    fill="none"
    preserveAspectRatio="xMidYMid slice"
    className={`pointer-events-none select-none ${className}`}
  >
    <defs>
      <pattern id="iron-lattice-shadow" width="96" height="96" patternUnits="userSpaceOnUse">
        <path
          d="M0 48L48 0L96 48L48 96Z"
          stroke="#D6DCE2"
          strokeWidth="1"
          strokeOpacity="0.065"
        />
        <path
          d="M24 48C24 34.745 34.745 24 48 24C61.255 24 72 34.745 72 48C72 61.255 61.255 72 48 72C34.745 72 24 61.255 24 48Z"
          stroke="#D6DCE2"
          strokeWidth="0.85"
          strokeOpacity="0.045"
        />
        <line x1="48" y1="0" x2="48" y2="96" stroke="#D6DCE2" strokeWidth="0.7" strokeOpacity="0.04" />
        <line x1="0" y1="48" x2="96" y2="48" stroke="#D6DCE2" strokeWidth="0.7" strokeOpacity="0.04" />
      </pattern>
      <radialGradient id="lattice-vignette" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
      <mask id="lattice-fade-mask">
        <rect width="800" height="600" fill="url(#lattice-vignette)" />
      </mask>
    </defs>
    <rect width="800" height="600" fill="url(#iron-lattice-shadow)" mask="url(#lattice-fade-mask)" />
  </svg>
);
