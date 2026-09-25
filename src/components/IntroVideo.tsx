import React, { useRef, useState } from 'react';
import { IslamicPatternOverlay } from './IslamicBackground';
import { getAssetPath } from '../utils/assets';

interface IntroVideoProps {
  onOpen: () => void;
  opening: boolean;
  opened?: boolean;
  onStartPlay?: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({
  onOpen,
  opening,
  opened,
  onStartPlay,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  if (opened) return null;

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

      {/* Islamic Theme Presentation before click - Royal B & A Letter Monogram */}
      {!hasStarted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
          <IslamicPatternOverlay opacity={0.12} />

          {/* Royal B & A Letter Monogram Seal */}
          <div className="relative flex flex-col items-center justify-center group cursor-pointer">
            {/* Subtle outer breathing glow aura */}
            <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#c89b3c]/25 blur-2xl animate-pulse pointer-events-none" />

            {/* Pulsing ring aura */}
            <div className="absolute -inset-3 rounded-full border border-[#fcf6ba]/30 animate-ping duration-1000 opacity-30 pointer-events-none" />

            {/* Clickable Gilded B & A Medallion */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-[#bf953f] via-[#fcf6ba] to-[#aa771c] shadow-[0_0_35px_rgba(200,155,60,0.5)] transition-all duration-500 ease-out hover:scale-108 active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="Click B&A letter monogram to start wedding invitation"
            >
              {/* Inner Medallion Background with Islamic dark emerald richness */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#163828] via-[#0f241a] to-[#07130d] border-2 border-[#e4c88a]/80 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                {/* Subtle Islamic geometric star pattern overlay */}
                <IslamicPatternOverlay opacity={0.15} />

                {/* Delicate inner circular beaded line */}
                <div className="absolute inset-2 rounded-full border border-dashed border-[#e4c88a]/40 pointer-events-none" />

                {/* B & A Monogram Letters */}
                <div className="relative z-10 flex items-center justify-center">
                  <span className="font-script text-5xl sm:text-6xl text-[#fcf6ba] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wide select-none group-hover:scale-105 transition-transform duration-300">
                    B &amp; A
                  </span>
                </div>

                {/* Subtle tap label */}
                <span className="relative z-10 font-cinzel text-[9px] sm:text-[10px] tracking-[0.25em] text-[#e4c88a] uppercase font-semibold mt-0.5 select-none opacity-90 group-hover:opacity-100">
                  Tap to Open
                </span>
              </div>
            </button>
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
