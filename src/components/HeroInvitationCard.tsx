import React, { useState, useEffect } from 'react';
import { Maximize2, ZoomIn, ZoomOut, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { getAssetPath } from '../utils/assets';

interface HeroInvitationCardProps {
  imageSrc?: string;
  altText?: string;
}

export const HeroInvitationCard: React.FC<HeroInvitationCardProps> = ({
  imageSrc = getAssetPath('assets/page 1.png'),
  altText = 'Ambiya & Basti Ali — Sacred Wedding Invitation Page 1',
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(imageSrc);

  // Fallback candidate paths in case the user named it slightly differently
  const candidatePaths = [
    getAssetPath('assets/page 1.png'),
    getAssetPath('assets/page 1(oct 29).png'),
    getAssetPath('assets/page1.png'),
    getAssetPath('assets/page 1.jpg'),
    getAssetPath('assets/page 1.jpeg'),
  ];

  const handleImageError = () => {
    const currentIndex = candidatePaths.indexOf(currentSrc);
    if (currentIndex >= 0 && currentIndex < candidatePaths.length - 1) {
      setCurrentSrc(candidatePaths[currentIndex + 1]);
    } else {
      setImageError(true);
    }
  };

  // Keyboard shortcut (Escape) to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
        setLightboxZoom(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div className="relative z-10 w-full max-w-3xl sm:max-w-4xl mx-auto flex flex-col items-center justify-center">
      {/* Decorative Outer Aura Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-amber-200/30 via-[#c89b3c]/20 to-rose-200/30 rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Framed Invitation Card Presentation - Full Size */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-3 border-gold-soft/80 shadow-2xl bg-white/95 backdrop-blur-md group transition-all duration-300 hover:shadow-gold-soft/20">
        {/* Subtle Ambient Golden Sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-[#1b4332]/5 pointer-events-none z-10" />

        {!imageError ? (
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="relative w-full bg-[#fcfaf7] flex items-center justify-center p-0 cursor-pointer group"
            title="Click to view full screen"
          >
            <img
              src={currentSrc}
              alt={altText}
              onError={handleImageError}
              className="w-full h-auto object-contain rounded-2xl sm:rounded-3xl shadow-sm transition-transform duration-500 group-hover:scale-[1.008]"
            />

            {/* Enlarge Hint Overlay Badge */}
            <div className="absolute bottom-4 right-4 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-cinzel font-semibold bg-black/65 text-white backdrop-blur-md shadow-lg border border-white/20 hover:bg-black/85 transition-all">
                <Maximize2 className="w-3.5 h-3.5 text-gold-soft" />
                <span>Enlarge</span>
              </span>
            </div>
          </div>
        ) : (
          /* Placeholder display when waiting for image upload */
          <div className="relative w-full min-h-[460px] sm:min-h-[580px] bg-gradient-to-b from-[#faf6f0] to-[#f4ede0] flex flex-col items-center justify-center p-8 text-center border border-dashed border-gold-soft/60 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-gold-soft/20 border border-gold-soft/50 flex items-center justify-center mb-4 text-[#a84c32]">
              <ImageIcon className="w-8 h-8" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-cinzel font-bold tracking-widest text-[#1b4332] uppercase bg-[#1b4332]/10 border border-[#1b4332]/25 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              Main Invitation Card · Page 1
            </span>

            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-foreground mb-2">
              Ready for Your Uploaded Image
            </h3>

            <p className="font-serif-display italic text-sm text-foreground/70 max-w-sm mb-4">
              Place your main wedding invitation graphic as <code className="bg-white/80 px-2 py-0.5 rounded text-xs text-[#a84c32] font-mono">public/assets/page 1.png</code> to display it here seamlessly.
            </p>

            <span className="text-xs font-cinzel tracking-wider text-[#a84c32] font-semibold">
              ✦ Ambiya &amp; Basti Ali ✦
            </span>
          </div>
        )}
      </div>

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && !imageError && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => {
            setIsLightboxOpen(false);
            setLightboxZoom(false);
          }}
        >
          {/* Top Bar with Title and Controls */}
          <div
            className="w-full max-w-5xl flex items-center justify-between pb-4 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="font-cinzel text-xs text-gold-soft tracking-widest uppercase">
                Wedding Invitation Page 1
              </p>
              <h4 className="font-serif-display text-lg sm:text-xl font-bold">
                Ambiya &amp; Basti Ali
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightboxZoom(!lightboxZoom)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={lightboxZoom ? 'Zoom out' : 'Zoom in'}
              >
                {lightboxZoom ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setLightboxZoom(false);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Centered High-Res Image Display */}
          <div
            className="relative flex items-center justify-center max-w-5xl max-h-[85vh] w-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSrc}
              alt={altText}
              className={`max-h-[82vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300 ${
                lightboxZoom ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setLightboxZoom(!lightboxZoom)}
            />
          </div>

          {/* Bottom Hint */}
          <p className="text-white/60 text-xs font-serif-display mt-3 select-none">
            Click image or use controls to zoom • Press ESC or click outside to close
          </p>
        </div>
      )}
    </div>
  );
};
