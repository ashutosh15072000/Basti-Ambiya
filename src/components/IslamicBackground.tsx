import React from 'react';

/**
 * Ornate Islamic Brass Lantern (Fanous) with glowing candle light
 */
export const IslamicLantern: React.FC<{
  className?: string;
  chainLength?: number;
  glowColor?: string;
}> = ({ className = '', chainLength = 60, glowColor = '#fef3c7' }) => {
  return (
    <div className={`relative flex flex-col items-center pointer-events-none ${className}`}>
      {/* Lantern Chain */}
      <svg
        width="8"
        height={chainLength}
        viewBox={`0 0 8 ${chainLength}`}
        className="text-gold/70 fill-none stroke-current"
        strokeWidth="1.5"
      >
        <line x1="4" y1="0" x2="4" y2={chainLength} strokeDasharray="3 3" />
        <circle cx="4" cy={chainLength - 2} r="2.5" fill="#c89b3c" />
      </svg>

      {/* Lantern Body */}
      <div className="relative -mt-1 group">
        {/* Ambient Candle Glow */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-70 animate-pulse"
          style={{ backgroundColor: glowColor, transform: 'scale(1.4)' }}
        />

        <svg
          width="44"
          height="72"
          viewBox="0 0 44 72"
          className="relative z-10 drop-shadow-md text-gold fill-none"
        >
          {/* Top Hanging Ring */}
          <circle cx="22" cy="5" r="4" stroke="#c89b3c" strokeWidth="1.5" fill="none" />

          {/* Dome Top Cap with crescent finial */}
          <path
            d="M 22 8 L 22 12 M 16 16 C 18 12 26 12 28 16 L 34 22 L 10 22 Z"
            fill="#c89b3c"
            stroke="#aa771c"
            strokeWidth="1"
          />

          {/* Glass Chamber */}
          <path
            d="M 10 22 L 34 22 L 30 52 L 14 52 Z"
            fill="#fffbeb"
            fillOpacity="0.85"
            stroke="#c89b3c"
            strokeWidth="1.5"
          />

          {/* Glass Lattice Lines */}
          <line x1="22" y1="22" x2="22" y2="52" stroke="#c89b3c" strokeWidth="1" />
          <line x1="16" y1="22" x2="18" y2="52" stroke="#c89b3c" strokeWidth="0.8" />
          <line x1="28" y1="22" x2="26" y2="52" stroke="#c89b3c" strokeWidth="0.8" />
          <line x1="12" y1="36" x2="32" y2="36" stroke="#c89b3c" strokeWidth="0.8" />

          {/* Inner Candle Flame */}
          <ellipse cx="22" cy="38" rx="2.5" ry="5" fill="#f59e0b" />
          <ellipse cx="22" cy="39" rx="1.2" ry="2.5" fill="#fef08a" />

          {/* Bottom Base */}
          <path
            d="M 14 52 L 30 52 L 28 58 L 16 58 Z"
            fill="#c89b3c"
            stroke="#aa771c"
            strokeWidth="1"
          />

          {/* Bottom Drop Finial */}
          <circle cx="22" cy="62" r="2.5" fill="#c89b3c" />
          <path d="M 22 64 L 22 70" stroke="#aa771c" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

/**
 * Islamic Grand Architectural Archway (Mihrab) & Arabesque backdrop
 */
export const IslamicHeroArch: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Background radial gradient illuminating the center arch */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbf8f2] via-[#faf4ea] to-[#f4ebe1]" />

      {/* Sacred Islamic Archway SVG Silhouette */}
      <svg
        className="absolute inset-0 w-full h-full text-gold opacity-35"
        viewBox="0 0 1000 1200"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle gold gradient for lines */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bf953f" />
            <stop offset="50%" stopColor="#fcf6ba" />
            <stop offset="100%" stopColor="#aa771c" />
          </linearGradient>

          {/* Islamic Star Pattern for Arch Border */}
          <pattern id="islamicStarPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 25 15 L 40 20 L 25 25 L 20 40 L 15 25 L 0 20 L 15 15 Z"
              fill="none"
              stroke="#c89b3c"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
            <rect x="18" y="18" width="4" height="4" fill="#c89b3c" fillOpacity="0.25" />
          </pattern>
        </defs>

        {/* Outer Rectangular Border */}
        <rect
          x="30"
          y="25"
          width="940"
          height="1150"
          rx="12"
          stroke="url(#goldGradient)"
          strokeWidth="2.5"
        />
        <rect
          x="45"
          y="40"
          width="910"
          height="1120"
          rx="8"
          stroke="#c89b3c"
          strokeWidth="1"
          strokeDasharray="6 4"
        />

        {/* Top Spandrels Arabesque Texture */}
        <rect x="45" y="40" width="910" height="350" fill="url(#islamicStarPattern)" opacity="0.3" />

        {/* Outer Grand Pointed Moorish Arch */}
        <path
          d="M 120 1160 L 120 450 C 120 280 320 140 500 70 C 680 140 880 280 880 450 L 880 1160"
          stroke="url(#goldGradient)"
          strokeWidth="4"
          fill="none"
        />

        {/* Inner Scalloped Multi-foil Arch */}
        <path
          d="M 150 1160 L 150 480 
             C 150 430 170 390 200 370
             C 230 350 260 320 300 300
             C 340 280 370 240 420 210
             C 460 180 480 150 500 120
             C 520 150 540 180 580 210
             C 630 240 660 280 700 300
             C 740 320 770 350 800 370
             C 830 390 850 430 850 480
             L 850 1160"
          stroke="#c89b3c"
          strokeWidth="2"
          strokeDasharray="4 2"
          fill="none"
        />

        {/* Arch Apex Finial - Islamic Crescent & Star */}
        <g transform="translate(500, 50)">
          {/* Crescent */}
          <path
            d="M 0 -22 A 16 16 0 1 0 14 6 A 13 13 0 1 1 0 -22 Z"
            fill="#c89b3c"
          />
          {/* 8-pointed star */}
          <polygon
            points="6,-10 8,-6 13,-6 9,-3 11,2 6,-1 2,2 4,-3 0,-6 5,-6"
            fill="#aa771c"
          />
        </g>

        {/* Decorative Arabesque Corner Medallions */}
        {/* Top Left */}
        <g transform="translate(90, 85)">
          <circle cx="0" cy="0" r="28" stroke="#c89b3c" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="22" stroke="#c89b3c" strokeWidth="0.8" strokeDasharray="3 3" />
          <path d="M -15 0 L 15 0 M 0 -15 L 0 15 M -10 -10 L 10 10 M -10 10 L 10 -10" stroke="#c89b3c" strokeWidth="1" />
          <circle cx="0" cy="0" r="5" fill="#c89b3c" />
        </g>

        {/* Top Right */}
        <g transform="translate(910, 85)">
          <circle cx="0" cy="0" r="28" stroke="#c89b3c" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="22" stroke="#c89b3c" strokeWidth="0.8" strokeDasharray="3 3" />
          <path d="M -15 0 L 15 0 M 0 -15 L 0 15 M -10 -10 L 10 10 M -10 10 L 10 -10" stroke="#c89b3c" strokeWidth="1" />
          <circle cx="0" cy="0" r="5" fill="#c89b3c" />
        </g>
      </svg>

      {/* Hanging Golden Lanterns at different heights */}
      <div className="absolute top-0 left-6 sm:left-14 hidden xs:block">
        <IslamicLantern chainLength={75} />
      </div>
      <div className="absolute top-0 left-16 sm:left-28">
        <IslamicLantern chainLength={115} />
      </div>

      <div className="absolute top-0 right-16 sm:right-28">
        <IslamicLantern chainLength={115} />
      </div>
      <div className="absolute top-0 right-6 sm:right-14 hidden xs:block">
        <IslamicLantern chainLength={75} />
      </div>

      {/* Soft Islamic Domes & Minarets Silhouette at Base */}
      <div className="absolute bottom-0 inset-x-0 h-32 opacity-15 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-full fill-[#1b4332]"
          preserveAspectRatio="none"
        >
          {/* Minaret Left */}
          <rect x="80" y="20" width="14" height="100" />
          <path d="M 87 0 L 80 20 L 94 20 Z" />
          <rect x="76" y="45" width="22" height="6" rx="2" />
          
          {/* Small Dome Left */}
          <path d="M 120 120 C 120 70 170 60 170 50 C 170 60 220 70 220 120 Z" />

          {/* Grand Mosque Central Dome */}
          <path d="M 460 120 C 460 50 550 35 600 10 C 650 35 740 50 740 120 Z" />
          <line x1="600" y1="10" x2="600" y2="0" stroke="#1b4332" strokeWidth="2" />
          <circle cx="600" cy="0" r="3" fill="#1b4332" />

          {/* Small Dome Right */}
          <path d="M 980 120 C 980 70 1030 60 1030 50 C 1030 60 1080 70 1080 120 Z" />

          {/* Minaret Right */}
          <rect x="1106" y="20" width="14" height="100" />
          <path d="M 1113 0 L 1106 20 L 1120 20 Z" />
          <rect x="1102" y="45" width="22" height="6" rx="2" />
        </svg>
      </div>
    </div>
  );
};

/**
 * Full page Islamic repeating wallpaper backdrop
 */
export const IslamicPatternOverlay: React.FC<{
  opacity?: number;
  className?: string;
  variant?: 'gold' | 'emerald' | 'subtle';
}> = ({ opacity = 0.05, className = '', variant = 'gold' }) => {
  const strokeColor = variant === 'emerald' ? '%231b4332' : variant === 'subtle' ? '%23c89b3c' : '%23aa771c';
  const fillColor = variant === 'emerald' ? '%232d6a4f' : '%23c89b3c';

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='${strokeColor}' stroke-width='1'%3E%3Cpath d='M40 0 L50 20 L70 20 L55 35 L60 55 L40 45 L20 55 L25 35 L10 20 L30 20 Z'/%3E%3Ccircle cx='40' cy='40' r='12' stroke-dasharray='2 2'/%3E%3Cpath d='M0 40 L20 40 M60 40 L80 40 M40 0 L40 20 M40 60 L40 80'/%3E%3Cpath d='M0 0 L15 15 M65 65 L80 80 M80 0 L65 15 M15 65 L0 80'/%3E%3Crect x='36' y='36' width='8' height='8' fill='${fillColor}' fill-opacity='0.35'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

/**
 * Modern Islamic Theme Background Component used across the site
 */
export const ModernMuslimBackground: React.FC<{
  variant?: 'light' | 'emerald' | 'evening';
  children?: React.ReactNode;
  showLanterns?: boolean;
  className?: string;
}> = ({ variant = 'light', children, showLanterns = false, className = '' }) => {
  const bgStyles = {
    light: 'bg-gradient-to-b from-[#fefcf8] via-[#faf5eb] to-[#f4ebe1]',
    emerald: 'bg-gradient-to-b from-[#0e271c] via-[#143828] to-[#0a1e15] text-cream',
    evening: 'bg-gradient-to-b from-[#1b1c2b] via-[#24263e] to-[#12131e] text-cream',
  }[variant];

  return (
    <div className={`relative overflow-hidden ${bgStyles} ${className}`}>
      {/* Repeating Islamic geometric tessellation overlay */}
      <IslamicPatternOverlay
        opacity={variant === 'light' ? 0.045 : 0.08}
        variant={variant === 'light' ? 'gold' : 'subtle'}
      />

      {/* Decorative Modern Arch Silhouette in backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full object-cover text-gold max-w-5xl"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 100 600 L 100 300 C 100 120 300 20 500 0 C 700 20 900 120 900 300 L 900 600"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <circle cx="500" cy="15" r="5" fill="currentColor" />
          <path d="M 490 30 L 510 30 M 500 20 L 500 40" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Optional Hanging Lanterns at top corners */}
      {showLanterns && (
        <>
          <div className="absolute top-0 left-6 sm:left-12 pointer-events-none z-10 hidden sm:block">
            <IslamicLantern chainLength={65} />
          </div>
          <div className="absolute top-0 right-6 sm:right-12 pointer-events-none z-10 hidden sm:block">
            <IslamicLantern chainLength={65} />
          </div>
        </>
      )}

      {children}
    </div>
  );
};
