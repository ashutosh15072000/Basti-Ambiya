import React, { useState, useEffect } from 'react';
import { Navigation, Maximize2, X, ZoomIn, ZoomOut, Sparkles, MapPin, Calendar } from 'lucide-react';
import { IslamicPatternOverlay } from './IslamicBackground';
import { EventDetails } from '../types';

export const EventCard: React.FC<EventDetails> = ({
  title,
  dayOfWeek,
  dayOfMonth,
  monthName,
  venue,
  directionsUrl,
  caricatureBadge,
  fullCardImage,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(false);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setLightboxZoom(false);
      }
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Event card image is exclusively the official ceremony invitation card page where all details are presented
  const displayImage = fullCardImage;

  // Event color scheme accents
  const isNikah = title.toLowerCase().includes('nikah') || title.toLowerCase().includes('wedding');
  const isRamada = venue?.toLowerCase().includes('ramada');

  const themeAccent = isNikah && !title.toLowerCase().includes('reception')
    ? {
        border: 'border-[#93203c]/60',
        badge: 'bg-rose-100/95 text-[#93203c] border-rose-300',
        glow: 'from-rose-600/10 via-rose-200/5 to-transparent',
      }
    : isRamada
    ? {
        border: 'border-[#1b4332]/60',
        badge: 'bg-[#1b4332]/10 text-[#1b4332] border-[#1b4332]/30',
        glow: 'from-[#1b4332]/15 via-gold-soft/10 to-transparent',
      }
    : {
        border: 'border-gold-soft/70',
        badge: 'bg-amber-100/90 text-amber-950 border-amber-300',
        glow: 'from-amber-600/10 via-amber-200/5 to-transparent',
      };

  const badgeText = caricatureBadge?.replace(/^Ambiya & Basti Ali ·\s*/, '') || title;
  const dateLabel =
    dayOfWeek && dayOfMonth && monthName ? `${dayOfWeek}, ${dayOfMonth} ${monthName}` : undefined;

  return (
    <>
      <article
        className={`relative rounded-3xl overflow-hidden shadow-elegant border-2 ${themeAccent.border} bg-gradient-to-b from-[#fffefc] to-[#faf5ed] transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] w-full flex flex-col max-w-md mx-auto`}
      >
        <IslamicPatternOverlay opacity={0.03} />

        {/* Card Header: Ceremony Badge, Date & Venue */}
        <div className="pt-4 pb-3 px-4 text-center flex flex-col items-center gap-1.5 border-b border-gold-soft/30 bg-gradient-to-b from-white/95 to-cream/60">
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-cinzel font-bold tracking-wider uppercase border shadow-xs backdrop-blur-md ${themeAccent.badge}`}
          >
            <Sparkles className="w-3 h-3 text-gold shrink-0" />
            {badgeText}
          </span>
          <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-0.5 text-foreground/80 font-serif-display text-xs sm:text-sm mt-0.5">
            {dateLabel && (
              <span className="inline-flex items-center gap-1 font-semibold text-[#a84c32]">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                {dateLabel}
              </span>
            )}
            {dateLabel && venue && <span className="text-gold-soft">•</span>}
            {venue && (
              <span className="inline-flex items-center gap-1 text-foreground/85">
                <MapPin className="w-3.5 h-3.5 text-[#1b4332] shrink-0" />
                {venue}
              </span>
            )}
          </div>
        </div>

        {/* The Invitation Card Image: Centerpiece where all event details are presented */}
        {displayImage && (
          <div className="p-3 sm:p-4 bg-gradient-to-b from-[#fffbf4] via-[#f7f0e3] to-cream/70 flex-1 flex flex-col justify-center">
            <div
              className="relative mx-auto w-full rounded-2xl overflow-hidden border-2 border-gold-soft/70 shadow-md bg-white group cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
              title="Click to view full-size invitation"
            >
              {/* Subtle Ambient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${themeAccent.glow} pointer-events-none z-10`}
              />

              <div className="relative w-full bg-[#fbf9f5] flex items-center justify-center p-1">
                <img
                  src={displayImage}
                  alt={`${title} - Official Ceremony Invitation Card with all details`}
                  loading="lazy"
                  className="w-full h-auto object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                />

                {/* Enlarge Hint Overlay */}
                <div className="absolute bottom-3 right-3 z-20 opacity-85 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-cinzel font-semibold bg-black/65 text-white backdrop-blur-md shadow-md border border-white/20 hover:bg-black/85 transition-all">
                    <Maximize2 className="w-3.5 h-3.5 text-gold-soft" />
                    <span>Enlarge Card</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="text-center font-serif-display italic text-xs text-foreground/60 mt-2">
              All ceremony details are in the invitation above · Tap to view full size
            </p>
          </div>
        )}

        {/* Action Footer: Directions and Lightbox Enlarge */}
        <div className="p-3.5 sm:p-4 bg-cream/70 border-t border-gold-soft/30 flex items-center gap-2.5">
          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1"
            >
              <button
                type="button"
                className="bg-[#a84c32] hover:bg-[#8e3c25] text-white border-0 rounded-full px-4 py-2.5 font-cinzel text-xs tracking-wider transition-all duration-300 w-full shadow-md flex items-center justify-center cursor-pointer uppercase font-semibold hover:scale-[1.01] active:scale-[0.99]"
              >
                <Navigation className="mr-1.5 h-3.5 w-3.5 shrink-0" /> Get Directions
              </button>
            </a>
          )}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="px-4 py-2.5 rounded-full border border-gold-soft/60 bg-white/90 hover:bg-white text-foreground/80 font-cinzel text-xs font-semibold tracking-wider transition-all duration-300 shadow-xs flex items-center justify-center cursor-pointer uppercase hover:text-rose-deep shrink-0"
          >
            <Maximize2 className="mr-1.5 h-3.5 w-3.5 text-gold shrink-0" /> Full Card
          </button>
        </div>
      </article>

      {/* Fullscreen Lightbox Modal for 100% Uncompressed Visibility */}
      {isLightboxOpen && displayImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} invitation card`}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 transition-opacity animate-in fade-in duration-200"
          onClick={() => {
            setIsLightboxOpen(false);
            setLightboxZoom(false);
          }}
        >
          {/* Top Controls Bar */}
          <div
            className="w-full max-w-4xl flex items-center justify-between py-2 px-3 text-white mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-gold-soft">
                {badgeText}
              </span>
              {venue && (
                <>
                  <span className="text-white/40 text-xs">•</span>
                  <span className="text-white/80 text-xs font-serif-display">
                    {venue}
                  </span>
                </>
              )}
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
              src={displayImage}
              alt={`${title} - Official Ceremony Invitation`}
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
    </>
  );
};
