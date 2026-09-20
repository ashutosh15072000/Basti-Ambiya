import React, { useState } from 'react';
import { Navigation, Clock, MapPin, Sparkles, Calendar, Maximize2, X } from 'lucide-react';
import { IslamicPatternOverlay } from './IslamicBackground';
import { BlossomingFlower } from './Ornaments';
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
  caricatureImage,
  caricatureBadge,
  fullCardImage,
}) => {
  const [showFullCaricature, setShowFullCaricature] = useState(false);
  const [selectedViewImage, setSelectedViewImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'invitation' | 'caricature'>('invitation');

  // Primary image to display: default to the full invitation image
  const primaryInvitationImage = fullCardImage || caricatureImage;
  const activeDisplayImage = viewMode === 'invitation' ? primaryInvitationImage : (caricatureImage || primaryInvitationImage);

  // Event color scheme accents
  const isHaldi = title.toLowerCase().includes('haldi');
  const isMehndi = title.toLowerCase().includes('mehndi');
  const isNikah = title.toLowerCase().includes('nikah');

  const themeAccent = isHaldi
    ? { border: 'border-amber-400/60', badge: 'bg-amber-100/95 text-amber-900 border-amber-300', floral: 'gold' as const, glow: 'from-amber-500/10 via-amber-200/5 to-transparent' }
    : isMehndi
    ? { border: 'border-emerald-500/60', badge: 'bg-emerald-100/95 text-emerald-950 border-emerald-300', floral: 'emerald' as const, glow: 'from-emerald-600/10 via-emerald-200/5 to-transparent' }
    : isNikah
    ? { border: 'border-[#93203c]/60', badge: 'bg-rose-100/95 text-[#93203c] border-rose-300', floral: 'rose' as const, glow: 'from-rose-600/10 via-rose-200/5 to-transparent' }
    : { border: 'border-gold-soft/60', badge: 'bg-amber-50 text-amber-950 border-amber-300', floral: 'gold' as const, glow: 'from-amber-600/10 via-amber-200/5 to-transparent' };

  const handleOpenPreview = (imgUrl?: string) => {
    setSelectedViewImage(imgUrl || activeDisplayImage || null);
    setShowFullCaricature(true);
  };

  return (
    <>
      <article className={`relative rounded-3xl overflow-hidden shadow-elegant border-2 ${themeAccent.border} bg-gradient-to-b from-[#fffefc] to-[#faf5ed] transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] w-full flex flex-col max-w-lg mx-auto`}>
        <IslamicPatternOverlay opacity={0.03} />

        {/* Top Section: Full Invitation Card Image Showing Completely */}
        {activeDisplayImage && (
          <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#fffbf4] via-[#f7f0e3] to-cream/70 border-b border-gold-soft/40 p-3 sm:p-4">
            {/* Islamic Arch Framed Container for Full Invitation Card */}
            <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-gold-soft shadow-md bg-white/95 group">
              {/* Subtle Arch Peak Glow */}
              <div className={`absolute inset-0 bg-gradient-to-b ${themeAccent.glow} pointer-events-none z-10`} />

              {/* Event Badge */}
              <div className="absolute top-3 left-3 z-20">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-cinzel font-bold tracking-wider uppercase border shadow-sm backdrop-blur-md ${themeAccent.badge}`}>
                  <Sparkles className="w-3 h-3 text-gold shrink-0" />
                  {viewMode === 'invitation' ? 'Full Invitation Card' : (caricatureBadge || 'Couple Caricature')}
                </span>
              </div>

              {/* View Switcher: Toggle between Full Card and Caricature */}
              {fullCardImage && caricatureImage && (
                <div className="absolute top-3 right-3 z-30 flex items-center bg-black/60 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-md">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewMode('invitation');
                    }}
                    className={`px-2.5 py-1 text-[10px] sm:text-xs rounded-full font-cinzel font-bold tracking-wider transition-all uppercase cursor-pointer ${
                      viewMode === 'invitation'
                        ? 'bg-[#a84c32] text-white shadow-xs'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Full Card
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewMode('caricature');
                    }}
                    className={`px-2.5 py-1 text-[10px] sm:text-xs rounded-full font-cinzel font-bold tracking-wider transition-all uppercase cursor-pointer ${
                      viewMode === 'caricature'
                        ? 'bg-[#a84c32] text-white shadow-xs'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Caricature
                  </button>
                </div>
              )}

              {/* Full Invitation Card Image - Shown in Full with zero cropping */}
              <div 
                className="relative w-full cursor-pointer overflow-hidden flex items-center justify-center bg-[#faf7f0] p-2 sm:p-3"
                onClick={() => handleOpenPreview(activeDisplayImage)}
              >
                <img
                  src={activeDisplayImage}
                  alt={`${title} invitation card`}
                  loading="lazy"
                  className="w-full h-auto max-h-[580px] sm:max-h-[640px] object-contain rounded-xl shadow-xs transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />

                {/* Bottom Bar: Click to expand full card */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-foreground/85 shadow-md backdrop-blur-xs transition-transform duration-200 group-hover:scale-105 border border-gold-soft/50">
                  <Maximize2 className="w-3.5 h-3.5 text-[#a84c32]" />
                  <span className="font-cinzel text-[10px] font-bold tracking-wider text-[#a84c32] uppercase">
                    Tap to Enlarge
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

      {/* Full Caricature / Invitation Preview Modal */}
      {showFullCaricature && (selectedViewImage || caricatureImage) && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setShowFullCaricature(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#fdfbf7] rounded-3xl border-2 border-gold-soft p-4 sm:p-6 shadow-2xl overflow-hidden text-center max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <IslamicPatternOverlay opacity={0.04} />

            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowFullCaricature(false)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-foreground hover:text-rose-deep transition-all shadow-md cursor-pointer border border-gold-soft/40"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-3 shrink-0">
              <span className="font-cinzel text-xs tracking-widest text-[#a84c32] uppercase font-bold">
                {title}
              </span>
              <h4 className="font-script text-3xl sm:text-4xl text-rose-deep mt-0.5">
                Ceremony Illustration
              </h4>

              {/* Toggle switch between Portrait Caricature & Full E-Card if available */}
              {fullCardImage && caricatureImage && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedViewImage(caricatureImage)}
                    className={`px-3 py-1 text-xs rounded-full font-cinzel font-semibold transition-all cursor-pointer ${
                      selectedViewImage === caricatureImage
                        ? 'bg-[#a84c32] text-white shadow-xs'
                        : 'bg-cream text-foreground/70 hover:bg-white border border-gold-soft/50'
                    }`}
                  >
                    Caricature Focus
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedViewImage(fullCardImage)}
                    className={`px-3 py-1 text-xs rounded-full font-cinzel font-semibold transition-all cursor-pointer ${
                      selectedViewImage === fullCardImage
                        ? 'bg-[#a84c32] text-white shadow-xs'
                        : 'bg-cream text-foreground/70 hover:bg-white border border-gold-soft/50'
                    }`}
                  >
                    Full Invitation Card
                  </button>
                </div>
              )}
            </div>

            {/* Modal Image Container */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-soft/60 shadow-lg bg-black/5 flex-1 min-h-0 flex items-center justify-center p-1">
              <img
                src={selectedViewImage || caricatureImage}
                alt={`${title} artwork`}
                className="w-full h-full max-h-[62vh] object-contain rounded-xl"
              />
            </div>

            <p className="font-serif-display italic text-xs sm:text-sm text-foreground/80 mt-3 shrink-0">
              {subtitle || description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
