import React, { useRef, useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { IslamicPatternOverlay } from './IslamicBackground';
import { getAssetPath } from '../utils/assets';

interface IntroVideoProps {
  onOpen: () => void;
  opening: boolean;
  opened?: boolean;
  onStartPlay?: () => void;
}

const LOGO_CANDIDATES = [
  getAssetPath('assets/Basti&Ambiya11.webp'),
  getAssetPath('assets/opening-circle-logo.webp'),
  getAssetPath('assets/Basit&Ambiya11.webp'),
  getAssetPath('assets/basit-ambiya-card.webp'),
];

export const IntroVideo: React.FC<IntroVideoProps> = ({
  onOpen,
  opening,
  opened,
  onStartPlay,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [logoCandidateIndex, setLogoCandidateIndex] = useState(0);

  if (opened) return null;

  const currentLogoSrc = LOGO_CANDIDATES[logoCandidateIndex];

  const handleLogoError = () => {
    if (logoCandidateIndex < LOGO_CANDIDATES.length - 1) {
      setLogoCandidateIndex((prev) => prev + 1);
    }
  };

  const handleClick = () => {
    if (videoRef.current) {
      if (hasStarted) {
        onOpen();
      } else {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .then(() => {
            setHasStarted(true);
            onStartPlay?.();
          })
          .catch((err) => {
            console.error('Play failed:', err);
            // Fallback directly to opening
            onOpen();
          });
      }
    } else {
      onOpen();
    }
  };

  const handleEnded = () => {
    onOpen();
  };

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 w-full h-full bg-[#0d1f16] flex items-center justify-center cursor-pointer overflow-hidden z-50 select-none transition-all duration-400 ease-out ${
        opening ? 'scale-95 opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        src={`${getAssetPath('assets/intro-BHGRpJmm.mp4')}#t=0.1`}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          hasStarted ? 'opacity-100' : 'opacity-20'
        }`}
        playsInline
        muted
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Islamic Theme Presentation before click - Royal Circular Logo Medallion */}
      {!hasStarted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
          <IslamicPatternOverlay opacity={0.12} />

          {/* Royal Circle Logo Presentation */}
          <div className="relative flex flex-col items-center justify-center group cursor-pointer">
            {/* Subtle outer breathing glow aura */}
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#c89b3c]/30 blur-2xl animate-pulse pointer-events-none" />

            {/* Pulsing ring aura */}
            <div className="absolute -inset-4 rounded-full border border-[#fcf6ba]/40 animate-ping duration-1000 opacity-25 pointer-events-none" />

            {/* Clickable Gilded Circular Medallion */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 rounded-full p-2 bg-gradient-to-tr from-[#bf953f] via-[#fcf6ba] to-[#aa771c] shadow-[0_0_45px_rgba(200,155,60,0.65)] transition-all duration-500 ease-out hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="Click Basit & Ambiya wedding seal to open invitation"
            >
              {/* Inner Circle Frame with elegant gold border and luxury shadow */}
              <div className="w-full h-full rounded-full border-2 sm:border-3 border-[#e4c88a]/90 relative overflow-hidden shadow-2xl bg-[#fefdfb] flex items-center justify-center">
                {/* Circular Artwork Image */}
                <img
                  ref={logoImgRef}
                  src={currentLogoSrc}
                  alt="Basit & Ambiya - #BasitGotAmbitious"
                  loading="eager"
                  decoding="async"
                  onError={handleLogoError}
                  className="w-full h-full object-cover object-[center_34%] transition-transform duration-500 group-hover:scale-108 select-none"
                />

                {/* Subtle Luxury Gloss Overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />

                {/* Inner gold hairline border */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#e4c88a]/60 pointer-events-none" />
              </div>
            </button>

            {/* Opulent "Tap to Open" Call to Action Badge */}
            <div className="mt-5 sm:mt-6 flex flex-col items-center gap-1.5 transition-transform duration-300 group-hover:scale-105">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#163828]/95 via-[#1d4d37]/95 to-[#163828]/95 border border-[#e4c88a]/80 shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#fcf6ba] animate-spin shrink-0" />
                <span className="font-cinzel text-xs sm:text-sm tracking-[0.22em] text-[#fcf6ba] uppercase font-bold drop-shadow-sm">
                  Tap to Open
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#fcf6ba] animate-spin shrink-0" />
              </div>
              <span className="font-serif-display text-xs sm:text-sm text-[#fcf6ba]/90 italic tracking-wider drop-shadow-md">
                Basit &amp; Ambiya
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Skip button while intro video is playing */}
      {hasStarted && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="absolute bottom-6 right-6 z-30 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white/90 font-cinzel text-xs tracking-wider uppercase backdrop-blur-md border border-white/20 transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          Skip Intro ➔
        </button>
      )}
    </div>
  );
};
