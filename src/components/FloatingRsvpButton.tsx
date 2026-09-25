import React from 'react';
import { Mail, Sparkles } from 'lucide-react';

interface FloatingRsvpButtonProps {
  targetId?: string;
  className?: string;
}

/**
 * Floating RSVP button that stays fixed at the bottom right corner of the screen
 * and smoothly scrolls to the RSVP form section when clicked.
 */
export const FloatingRsvpButton: React.FC<FloatingRsvpButtonProps> = ({
  targetId = 'rsvp',
  className = '',
}) => {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      const navOffset = 24;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      type="button"
      id="floating-rsvp-button"
      onClick={handleClick}
      aria-label="Scroll smoothly to RSVP form"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#93203c] via-[#a84c32] to-[#c89b3c] text-white shadow-[0_6px_25px_rgba(147,32,60,0.4)] hover:shadow-[0_8px_30px_rgba(147,32,60,0.6)] border-2 border-[#fcf6ba]/70 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none backdrop-blur-md ${className}`}
    >
      {/* Subtle pulsing gold aura behind the button */}
      <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#c89b3c] to-[#93203c] opacity-40 blur-xs -z-10 group-hover:opacity-75 transition-opacity" />

      {/* Decorative Envelope Icon with Gold Accent */}
      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[#fcf6ba] shrink-0 border border-white/30 group-hover:rotate-12 transition-transform duration-300">
        <Mail className="w-3.5 h-3.5" />
      </span>

      {/* Elegant Typography Label */}
      <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-[#fffefc] uppercase drop-shadow-xs flex items-center gap-1.5">
        RSVP
        <span className="text-[#fcf6ba] text-[10px] sm:text-xs group-hover:translate-x-0.5 transition-transform">
          ✦
        </span>
      </span>
    </button>
  );
};
