import React from 'react';
import { FlowerDivider, FloralCornerAccents } from './Ornaments';
import { IslamicPatternOverlay } from './IslamicBackground';
import { AnimatedSection } from './AnimatedSection';

interface FamilyCardProps {
  title: string;
  subtitle?: string;
  names: string[];
}

export const FamilyCard: React.FC<FamilyCardProps> = ({ title, subtitle, names }) => (
  <div className="bg-white/80 backdrop-blur-sm border-2 border-gold-soft/50 rounded-3xl p-8 shadow-soft relative overflow-hidden transition-all duration-300 hover:shadow-lg">
    {/* Subtle top arch accent */}
    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-soft via-gold to-gold-soft" />

    <p className="font-cinzel text-xs text-[#1b4332] tracking-widest font-bold">
      {title.toUpperCase()}
    </p>
    <div className="my-3 flex items-center justify-center gap-2">
      <span className="h-px w-8 bg-gold-soft" />
      <span className="text-gold text-sm select-none">✦ ۞ ✦</span>
      <span className="h-px w-8 bg-gold-soft" />
    </div>
    {subtitle && (
      <p className="font-serif-display italic text-sm text-[#1b4332]/80 mb-2">
        {subtitle}
      </p>
    )}
    {names.map((name) => (
      <p
        key={name}
        className="font-serif-display text-xl sm:text-2xl text-foreground font-semibold my-1"
      >
        {name}
      </p>
    ))}
  </div>
);

export const FamilySection: React.FC = () => {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-[#1b4332]/5 via-cream to-[#1b4332]/5 border-t border-gold-soft/30 overflow-hidden">
      <IslamicPatternOverlay opacity={0.04} />
      <FloralCornerAccents />
      <div className="relative max-w-5xl mx-auto text-center z-10">
        <AnimatedSection direction="up" durationMs={650}>
          <p className="font-cinzel text-xs text-[#1b4332] tracking-widest font-bold uppercase">
            HONORING OUR PARENTS &amp; ELDERS
          </p>
          <h2 className="font-script text-5xl sm:text-6xl text-rose-deep mt-2">
            The Families
          </h2>
          <FlowerDivider />
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          

          <AnimatedSection direction="left" delayMs={200} durationMs={750}>
            <FamilyCard
              title="Groom's Family"
              subtitle="Requesting your gracious presence and Duas for         Basit Ali"
              names={['The Family of Basit Ali']}
            />
          </AnimatedSection>
          <AnimatedSection direction="right" delayMs={100} durationMs={750}>
            <FamilyCard
              title="Bride's Family"
              subtitle="Requesting your heartfelt prayers and blessings for       Ambiya Basher"
              names={['The Family of Ambiya Basher']}
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
