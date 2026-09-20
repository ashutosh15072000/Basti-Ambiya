import React from 'react';
import { Navigation, Clock, MapPin, Sparkles, Calendar } from 'lucide-react';
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
}) => {
  return (
    <article className="relative rounded-3xl overflow-hidden shadow-elegant border-2 border-gold-soft/60 bg-gradient-to-b from-[#fffefc] to-[#faf5ed] transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] w-full flex flex-col max-w-lg mx-auto">
      <IslamicPatternOverlay opacity={0.03} />
      {/* Decorative Islamic Arch Top Header */}
      <div className="relative pt-8 pb-6 px-6 text-center border-b border-gold-soft/30 bg-gradient-to-r from-[#93203c]/5 via-[#c89b3c]/10 to-[#93203c]/5">
        {/* Subtle Islamic Arch SVG Silhouette */}
        <div className="flex justify-center mb-2">
          <span className="text-gold text-xl tracking-widest select-none">✦ ۞ ✦</span>
        </div>

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

      {/* Card Body with Ceremony Details */}
      <div className="p-6 sm:p-8 space-y-6 flex-1">
        {/* Date Highlight Badge */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-cream border border-gold-soft/50 shadow-soft">
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
              className="bg-[#a84c32] hover:bg-[#8e3c25] text-white border-0 rounded-full px-8 py-3.5 font-cinzel text-xs tracking-wider transition-all duration-300 w-full shadow-md flex items-center justify-center cursor-pointer uppercase font-semibold hover:scale-[1.01] active:scale-[0.99]"
            >
              <Navigation className="mr-2 h-4 w-4" /> Get Directions
            </button>
          </a>
        </div>
      )}
    </article>
  );
};
