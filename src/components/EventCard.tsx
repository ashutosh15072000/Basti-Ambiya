import React, { useState, useEffect } from 'react';
import { Navigation, Clock, MapPin, Sparkles, Calendar, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import { IslamicPatternOverlay } from './IslamicBackground';
import { EventDetails } from '../types';

export const EventCard: React.FC<EventDetails> = ({
  title,
  arabicTitle,
  subtitle,
  dayOfWeek,
  dayOfMonth,
  monthName,
  year,
  time,
  venue,
  dressCode,
  directionsUrl,
  description,
  caricatureBadge,
  fullCardImage,
  cardImageCandidates,
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

  // Build ordered list of candidate image paths
  const candidateList = React.useMemo(() => {
    const list: string[] = [];
    if (fullCardImage) list.push(fullCardImage);
    if (cardImageCandidates && cardImageCandidates.length > 0) {
      cardImageCandidates.forEach((c) => {
        if (c && !list.includes(c)) list.push(c);
      });
    }
    return list;
  }, [fullCardImage, cardImageCandidates]);

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const currentImageSrc = candidateList[candidateIndex] || fullCardImage || '';

  // Synchronize when candidates or props change
  useEffect(() => {
    setCandidateIndex(0);
    setImageError(false);
    setImageLoaded(false);
  }, [fullCardImage, cardImageCandidates]);

  // Check if image is already cached/complete in memory
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, [currentImageSrc]);

  const handleImageError = () => {
    if (candidateIndex < candidateList.length - 1) {
      // Try next candidate
      setCandidateIndex((prev) => prev + 1);
      setImageLoaded(false);
    } else {
      // All candidates exhausted
      setImageError(true);
    }
  };

  const displayImage = !imageError ? currentImageSrc : undefined;

  // Event color scheme accents
  const isHaldi = title.toLowerCase().includes('haldi');
  const isMehndi = title.toLowerCase().includes('mehndi') || title.toLowerCase().includes('sangeet');
  const isRukhsita = title.toLowerCase().includes('rukhsita') || title.toLowerCase().includes('nikah') || title.toLowerCase().includes('wedding');
  const isReception = title.toLowerCase().includes('reception');

  const themeAccent = isHaldi
    ? {
        border: 'border-amber-400/60',
        badge: 'bg-amber-100/95 text-amber-950 border-amber-300',
        glow: 'from-amber-500/10 via-amber-200/5 to-transparent',
      }
    : isMehndi
    ? {
        border: 'border-emerald-500/60',
        badge: 'bg-emerald-100/95 text-emerald-950 border-emerald-300',
        glow: 'from-emerald-600/10 via-emerald-200/5 to-transparent',
      }
    : isRukhsita
    ? {
        border: 'border-[#93203c]/60',
        badge: 'bg-rose-100/95 text-[#93203c] border-rose-300',
        glow: 'from-rose-600/10 via-rose-200/5 to-transparent',
      }
    : isReception
    ? {
        border: 'border-[#1b4332]/60',
        badge: 'bg-[#1b4332]/10 text-[#1b4332] border-[#1b4332]/30',
        glow: 'from-[#1b4332]/15 via-gold-soft/10 to-transparent',
      }
    : {
        border: 'border-gold-soft/60',
        badge: 'bg-amber-50 text-amber-950 border-amber-300',
        glow: 'from-amber-600/10 via-amber-200/5 to-transparent',
      };

  const badgeText = caricatureBadge?.replace(/^(Ambiya & Basti Ali|Basti Ali and Ambiya Basher) ·\s*/, '') || title;

  return (
    <>
      <article className={`relative rounded-3xl overflow-hidden shadow-elegant border-2 ${themeAccent.border} bg-gradient-to-b from-[#fffefc] to-[#faf5ed] transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] w-full flex flex-col max-w-lg mx-auto`}>
        <IslamicPatternOverlay opacity={0.03} />

        {/* Visual Header: Official Ceremony Card Page - 100% Fully Visible */}
        {displayImage && (
          <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#fffbf4] via-[#f7f0e3] to-cream/70 border-b border-gold-soft/40 p-4 sm:p-5">
            {/* Header Badge */}
            <div className="flex flex-col items-center gap-2 mb-3.5">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-cinzel font-bold tracking-wider uppercase border shadow-sm backdrop-blur-md ${themeAccent.badge}`}>
                <Sparkles className="w-3 h-3 text-gold shrink-0" />
                {badgeText}
              </span>
            </div>

            {/* Framed Image Container - Engineered for 100% Full Visibility (Zero Cropping) */}
            <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-gold-soft/70 shadow-md bg-white group max-w-[420px]">
              {/* Subtle Ambient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-b ${themeAccent.glow} pointer-events-none z-10`} />

              {/* Card Page Display: w-full and object-contain ensures the entire ceremony card page is fully visible */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-full bg-[#fbf9f5] flex items-center justify-center p-1 sm:p-2 cursor-pointer transition-transform duration-300 group-hover:bg-[#f6f0e6] min-h-[220px]"
                title="Click to view full screen"
              >
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cream via-[#f5ede0] to-cream animate-pulse rounded-xl" />
                )}
                {!imageError ? (
                  <img
                    ref={imgRef}
                    src={currentImageSrc}
                    alt={`${title} - Official Ceremony Invitation`}
                    loading="eager"
                    decoding="async"
                    onLoad={() => setImageLoaded(true)}
                    onError={handleImageError}
                    className="w-full h-auto max-h-[540px] object-contain rounded-xl shadow-xs transition-opacity duration-300 group-hover:scale-[1.01]"
                  />
                ) : (
                  <div className="p-8 text-center bg-white/95 rounded-xl border border-gold-soft/60">
                    <Sparkles className="w-8 h-8 text-gold mx-auto mb-2" />
                    <p className="font-serif-display text-sm text-[#2b1f1a]">Official Ceremony Card</p>
                    <span className="font-cinzel text-xs text-[#a84c32] font-semibold">{title}</span>
                  </div>
                )}

                {/* Enlarge Hint Overlay */}
                <div className="absolute bottom-3 right-3 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-cinzel font-semibold bg-black/60 text-white backdrop-blur-md shadow-md border border-white/20 hover:bg-black/80 transition-all">
                    <Maximize2 className="w-3.5 h-3.5 text-gold-soft" />
                    <span>Enlarge</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Body with Ceremony Details */}
        <div className="p-6 sm:p-7 space-y-5 flex-1">
          {/* Ceremony Title and Arabic Title */}
          <div className="text-center pb-2">
            {arabicTitle && (
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-2xl sm:text-3xl text-rose-deep mb-1 font-bold select-none"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                {arabicTitle}
              </p>
            )}

            <h3 className="font-script text-4xl sm:text-5xl text-rose-deep font-semibold tracking-wide">
              {title}
            </h3>

            {subtitle && (
              <p className="font-serif-display italic text-sm sm:text-base text-foreground/75 mt-1">
                "{subtitle}"
              </p>
            )}
          </div>

          {/* Date Highlight Badge */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-cream border border-gold-soft/50 shadow-soft">
              <Calendar className="w-5 h-5 text-gold shrink-0" />
              <div className="text-center">
                <span className="font-cinzel text-xs uppercase tracking-widest text-[#a84c32] font-bold block">
                  {dayOfWeek}
                </span>
                <span className="font-serif-display text-xl sm:text-2xl font-bold text-foreground block">
                  {dayOfMonth} {monthName} {year}
                </span>
              </div>
            </div>
          </div>

          {description && (
            <p className="font-serif-display text-sm sm:text-base text-center italic text-foreground/80 max-w-md mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* Time, Venue, and Dress Code Details */}
          <div className="space-y-3.5 pt-2 border-t border-gold-soft/20">
            <div className="flex items-start gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-cream border border-gold-soft/40 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Clock className="w-4 h-4 text-[#a84c32]" />
              </div>
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#a84c32] font-bold">
                  Time
                </p>
                <p className="font-serif-display text-base font-semibold text-foreground">
                  {time}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-cream border border-gold-soft/40 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <MapPin className="w-4 h-4 text-[#a84c32]" />
              </div>
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#a84c32] font-bold">
                  Venue
                </p>
                <p className="font-serif-display text-base font-semibold text-foreground">
                  {venue}
                </p>
              </div>
            </div>

            {dressCode && (
              <div className="flex items-start gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-cream border border-gold-soft/40 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#a84c32]" />
                </div>
                <div>
                  <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#a84c32] font-bold">
                    Dress Code
                  </p>
                  <p className="font-serif-display text-base font-semibold text-foreground">
                    {dressCode}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer: Directions */}
        {directionsUrl && (
          <div className="w-full py-4 px-6 bg-cream/50 backdrop-blur-xs border-t border-gold-soft/30 flex justify-center">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              <button
                type="button"
                className="bg-[#a84c32] hover:bg-[#8e3c25] text-white border-0 rounded-full px-8 py-3 font-cinzel text-xs tracking-wider transition-all duration-300 w-full shadow-md flex items-center justify-center cursor-pointer uppercase font-semibold hover:scale-[1.01] active:scale-[0.99]"
              >
                <Navigation className="mr-2 h-4 w-4" /> Get Directions
              </button>
            </a>
          </div>
        )}
      </article>

      {/* Fullscreen Lightbox Modal for 100% Uncompressed Visibility */}
      {isLightboxOpen && displayImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image`}
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
                {title}
              </span>
              <span className="text-white/40 text-xs">•</span>
              <span className="text-white/80 text-xs font-serif-display">
                Official Ceremony Invitation Card
              </span>
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
