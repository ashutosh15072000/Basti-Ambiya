import React, { useRef, useState } from 'react';
import { IslamicPatternOverlay } from './IslamicBackground';

interface IntroVideoProps {
  onOpen: () => void;
  opening: boolean;
  onStartPlay?: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({
  onOpen,
  opening,
  onStartPlay,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

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
      className={`fixed inset-0 w-full h-full bg-[#0d1f16] flex items-center justify-center cursor-pointer overflow-hidden z-50 select-none transition-all duration-700 ${
        opening ? 'scale-95 opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        src="/assets/intro-BHGRpJmm.mp4#t=0.1"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          hasStarted ? 'opacity-100' : 'opacity-20'
        }`}
        playsInline
        muted
        onEnded={handleEnded}
        preload="auto"
      />

      {/* Islamic Theme Royal Envelope Presentation before click */}
      {!hasStarted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
          <IslamicPatternOverlay opacity={0.12} />

          {/* Royal Seal Card */}
          <div className="relative max-w-sm w-full bg-gradient-to-b from-[#143023]/90 to-[#0c1f16]/95 border-2 border-[#e4c88a]/60 rounded-3xl p-8 shadow-2xl backdrop-blur-md flex flex-col items-center space-y-4">
            {/* Islamic Crescent & Star Crest */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4a555] via-[#fcf6ba] to-[#aa771c] p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#12281d] flex items-center justify-center">
                <span className="text-2xl text-[#fcf6ba] select-none">🌙</span>
              </div>
            </div>

            {/* Sacred Bismillah */}
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl text-[#fcf6ba] leading-relaxed drop-shadow-sm select-none"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>

            <div className="space-y-1">
              <p className="font-cinzel text-[11px] tracking-[0.3em] text-gold-soft uppercase">
                WEDDING INVITATION
              </p>
              <h2 className="font-script text-4xl sm:text-5xl text-[#fffefc] drop-shadow-md">
                Ambiya &amp; Basti Ali
              </h2>
              <p className="font-serif-display text-xs text-[#e4c88a]/90 italic">
                Thursday, 29th October 2026
              </p>
            </div>

            <div className="pt-2 w-full">
              <div className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-[#2b1f1a] font-cinzel text-xs tracking-[0.25em] font-bold uppercase shadow-lg animate-pulse flex items-center justify-center gap-2">
                <span>✦</span> Open Blessed Invitation <span>✦</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
