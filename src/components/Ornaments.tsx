import React from 'react';

export const FlowerDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`my-3 flex items-center justify-center gap-3 text-primary-foreground ${className}`}>
    <span className="h-px w-16 bg-gold-soft" />
    <span className="text-gold text-base tracking-widest">✦ ۞ ✦</span>
    <span className="h-px w-16 bg-gold-soft" />
  </div>
);

export const FloralCornerAccents: React.FC = () => (
  <>
    <span className="pointer-events-none absolute top-6 left-4 text-3xl opacity-20">🌙</span>
    <span className="pointer-events-none absolute top-10 right-6 text-3xl opacity-20">✨</span>
    <span className="pointer-events-none absolute bottom-10 left-8 text-3xl opacity-20">✨</span>
    <span className="pointer-events-none absolute bottom-6 right-4 text-3xl opacity-20">🌙</span>
  </>
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
