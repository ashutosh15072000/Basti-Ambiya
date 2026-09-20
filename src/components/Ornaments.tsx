import React, { useState } from 'react';

interface BlossomingFlowerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  colorTheme?: 'gold' | 'rose' | 'emerald';
  title?: string;
}

/**
 * Interactive Floral Accent that blossoms/grows when clicked
 */
export const BlossomingFlower: React.FC<BlossomingFlowerProps> = ({
  className = '',
  size = 'md',
  colorTheme = 'gold',
  title = 'Click to blossom 🌸',
}) => {
  const [isBlooming, setIsBlooming] = useState(false);
  const [bloomKey, setBloomKey] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBlooming(true);
    setBloomKey((prev) => prev + 1);
    setTimeout(() => {
      setIsBlooming(false);
    }, 1200);
  };

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
  }[size];

  // Palette configurations
  const themeColors = {
    gold: {
      outer: '#d4af37',
      inner: '#e6c875',
      center: '#fbf3d5',
      leaves: '#52796f',
      glow: 'rgba(212, 175, 55, 0.45)',
    },
    rose: {
      outer: '#93203c',
      inner: '#c85a73',
      center: '#fce4ec',
      leaves: '#2d6a4f',
      glow: 'rgba(147, 32, 60, 0.45)',
    },
    emerald: {
      outer: '#1b4332',
      inner: '#2d6a4f',
      center: '#d8f3dc',
      leaves: '#c89b3c',
      glow: 'rgba(27, 67, 50, 0.45)',
    },
  }[colorTheme];

  // 6 radial burst petal offsets
  const burstOffsets = [
    { x: '24px', y: '-28px', r: '45deg', delay: '0ms' },
    { x: '-24px', y: '-28px', r: '-45deg', delay: '40ms' },
    { x: '34px', y: '0px', r: '90deg', delay: '20ms' },
    { x: '-34px', y: '0px', r: '-90deg', delay: '60ms' },
    { x: '20px', y: '28px', r: '135deg', delay: '80ms' },
    { x: '-20px', y: '28px', r: '-135deg', delay: '30ms' },
  ];

  return (
    <button
      type="button"
      onClick={handleClick}
      title={title}
      aria-label="Click to blossom flower"
      className={`relative inline-flex items-center justify-center p-1 group cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none ${className}`}
    >
      {/* Bursting Petals when blossoming */}
      {isBlooming && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {burstOffsets.map((offset, idx) => (
            <span
              key={`${bloomKey}-${idx}`}
              className="absolute w-2 h-2 rounded-full"
              style={
                {
                  '--tx': offset.x,
                  '--ty': offset.y,
                  '--tr': offset.r,
                  animation: 'petal-burst 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                  animationDelay: offset.delay,
                  backgroundColor: idx % 2 === 0 ? themeColors.inner : themeColors.outer,
                  boxShadow: `0 0 6px ${themeColors.glow}`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* SVG Floral Accent */}
      <svg
        viewBox="0 0 100 100"
        className={`${sizeClasses} transition-all duration-500 ${
          isBlooming ? 'animate-bloom' : 'group-hover:rotate-12'
        }`}
        style={{
          filter: isBlooming
            ? `drop-shadow(0 0 10px ${themeColors.glow})`
            : undefined,
        }}
      >
        {/* Subtle leafy sepals */}
        <path
          d="M 50 50 C 30 20 20 5 15 2 C 5 20 20 30 50 50 Z"
          fill={themeColors.leaves}
          opacity="0.75"
        />
        <path
          d="M 50 50 C 70 20 80 5 85 2 C 95 20 80 30 50 50 Z"
          fill={themeColors.leaves}
          opacity="0.75"
        />

        {/* Outer Blossoming Petals (8-fold floral symmetry) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={angle}
            d="M 50 50 C 40 30 35 15 50 8 C 65 15 60 30 50 50 Z"
            fill={themeColors.outer}
            transform={`rotate(${angle} 50 50)`}
            opacity="0.9"
            className="transition-transform duration-300"
          />
        ))}

        {/* Inner Floral Rosette */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
          <path
            key={angle}
            d="M 50 50 C 44 38 42 26 50 22 C 58 26 56 38 50 50 Z"
            fill={themeColors.inner}
            transform={`rotate(${angle} 50 50)`}
          />
        ))}

        {/* Pistil / Core with golden center */}
        <circle cx="50" cy="50" r="8" fill={themeColors.center} stroke={themeColors.outer} strokeWidth="1.5" />
        <circle cx="50" cy="50" r="3.5" fill={themeColors.outer} />
      </svg>
    </button>
  );
};

export const FlowerDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`my-3 flex items-center justify-center gap-3 ${className}`}>
    <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold-soft to-gold" />
    <span className="text-gold text-xs tracking-widest select-none hidden xs:inline">✦</span>
    <BlossomingFlower size="md" colorTheme="gold" title="Click to blossom this floral accent 🌸" />
    <span className="text-gold text-xs tracking-widest select-none hidden xs:inline">✦</span>
    <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-gold-soft to-gold" />
  </div>
);

export const FloralCornerAccents: React.FC<{
  colorTheme?: 'gold' | 'rose' | 'emerald';
}> = ({ colorTheme = 'gold' }) => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
    {/* Top Left Blossoming Corner */}
    <div className="pointer-events-auto absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1">
      <BlossomingFlower size="md" colorTheme={colorTheme} title="Click to blossom flower 🌸" />
      <span className="text-xs text-gold/60 pointer-events-none select-none hidden sm:inline">🍃</span>
    </div>

    {/* Top Right Blossoming Corner */}
    <div className="pointer-events-auto absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1">
      <span className="text-xs text-gold/60 pointer-events-none select-none hidden sm:inline">🍃</span>
      <BlossomingFlower size="md" colorTheme={colorTheme} title="Click to blossom flower 🌸" />
    </div>

    {/* Bottom Left Blossoming Corner */}
    <div className="pointer-events-auto absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-1">
      <BlossomingFlower size="sm" colorTheme={colorTheme} title="Click to blossom flower 🌸" />
      <span className="text-xs text-gold/50 pointer-events-none select-none">✨</span>
    </div>

    {/* Bottom Right Blossoming Corner */}
    <div className="pointer-events-auto absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1">
      <span className="text-xs text-gold/50 pointer-events-none select-none">✨</span>
      <BlossomingFlower size="sm" colorTheme={colorTheme} title="Click to blossom flower 🌸" />
    </div>
  </div>
);

export const IslamicBismillah: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
    {/* Elegant Calligraphic Bismillah */}
    <p
      dir="rtl"
      lang="ar"
      className="font-arabic text-3xl sm:text-5xl text-[#8d1b3d] leading-relaxed tracking-wider drop-shadow-sm"
      style={{ fontFamily: "'Amiri', serif" }}
    >
      بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
    </p>
    <p className="font-serif-display text-xs sm:text-sm tracking-[0.2em] text-[#a84c32] uppercase mt-1 font-semibold">
      In the Name of Allah, the Most Gracious, the Most Merciful
    </p>
  </div>
);

export const IslamicArchEmblem: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg
      viewBox="0 0 120 40"
      className="w-28 h-10 text-gold fill-current opacity-80"
      aria-hidden="true"
    >
      <path d="M 60 2 C 50 15 35 24 10 26 C 30 28 45 30 55 38 C 58 35 62 35 65 38 C 75 30 90 28 110 26 C 85 24 70 15 60 2 Z" />
      <circle cx="60" cy="18" r="3" />
    </svg>
  </div>
);
