import { useState, useEffect } from 'react';
import { FloatingPetals } from './components/FloatingPetals';
import { MusicPlayer } from './components/MusicPlayer';
import { IntroVideo } from './components/IntroVideo';
import { ScratchCard } from './components/ScratchCard';
import { CountdownTimer } from './components/CountdownTimer';
import { WeddingVideoSection } from './components/WeddingVideoSection';
import { EventCard } from './components/EventCard';
import { RsvpWishesSection } from './components/RsvpWishesSection';
import { RsvpForm } from './components/RsvpForm';
import { FamilySection } from './components/FamilySection';
import { Footer } from './components/Footer';
import { FlowerDivider, FloralCornerAccents, BlossomingFlower } from './components/Ornaments';
import { IslamicPatternOverlay } from './components/IslamicBackground';
import { AnimatedSection } from './components/AnimatedSection';
import { FloatingRsvpButton } from './components/FloatingRsvpButton';
import { InvitationPageCard } from './components/InvitationPageCard';
import { getAssetPath } from './utils/assets';
import { EventDetails } from './types';

const EVENTS_SCHEDULE: EventDetails[] = [
  {
    title: 'The Sacred Wedding & Rukhsita',
    arabicTitle: 'رخصة الزفاف المباركة',
    description: 'The sacred Islamic marriage celebrations solemnized under the divine grace of Allah (SWT), followed by a celebratory royal dinner banquet.',
    day: 'THU',
    date: 'October 29, 2026',
    subtitle: 'Sacred Vows, Eternal Love & Divine Duas',
    dayOfWeek: 'Thursday',
    dayOfMonth: '29',
    monthName: 'October',
    year: '2026',
    time: 'Rukhsita at 06:30 PM | Royal Banquet at 08:00 PM',
    venue: 'Shimla Resort',
    dressCode: 'Royal Traditional / Modest Luxury',
    directionsUrl: 'https://maps.app.goo.gl/oNb7LC2ZuKpFT9b7A?g_st=ac',
    couplePhoto: getAssetPath('assets/SSG09645-C19LQ60y.webp'),
    caricatureImage: getAssetPath('assets/SSG09645-C19LQ60y.webp'),
    caricatureBadge: 'Basti Ali and Ambiya Basher · Sacred Rukhsita 🕊️',
    fullCardImage: getAssetPath('assets/Basti&Ambiya11.webp'),
    cardImageCandidates: [
      getAssetPath('assets/Basti&Ambiya11.webp'),
      getAssetPath('assets/opening-circle-logo.webp'),
      getAssetPath('assets/Basit&Ambiya11.webp'),
      getAssetPath('assets/Basit&Ambiya11.png'),
      getAssetPath('assets/basit-ambiya-card.webp'),
      getAssetPath('assets/basit-ambiya-card.png'),
      getAssetPath('assets/page2.webp'),
      getAssetPath('assets/page2.png'),
      getAssetPath('assets/page 2(oct 29).webp'),
      getAssetPath('assets/page 2(oct 29).png'),
    ],
  },
  {
    title: 'Wedding Reception',
    arabicTitle: 'وليمة العرس المباركة',
    description: 'The joyous feast and grand evening banquet honoring family and dear friends to celebrate the newlyweds.',
    day: 'FRI',
    date: 'October 30, 2026',
    subtitle: 'A Blessed Feast & Grand Celebration',
    dayOfWeek: 'Friday',
    dayOfMonth: '30',
    monthName: 'October',
    year: '2026',
    time: '07:30 PM Onwards',
    venue: 'Hotel Ramada',
    dressCode: 'Formal Evening Elegance',
    directionsUrl: 'https://maps.app.goo.gl/VC1HVfJNPzLf7CNy9',
    couplePhoto: getAssetPath('assets/SSG00440-Dz91S7X0.webp'),
    caricatureImage: getAssetPath('assets/SSG00440-Dz91S7X0.webp'),
    caricatureBadge: 'Basti Ali and Ambiya Basher · Wedding Reception 👑',
    fullCardImage: getAssetPath('assets/page3( 30 oct).webp'),
    cardImageCandidates: [
      getAssetPath('assets/page3( 30 oct).webp'),
      getAssetPath('assets/page3( 30 oct).png'),
    ],
  },
  {
    title: 'Wedding Reception',
    arabicTitle: 'وليمة العرس المباركة',
    description: 'The joyous feast and grand evening banquet honoring family and dear friends to celebrate the newlyweds.',
    day: 'MON',
    date: 'November 2, 2026',
    subtitle: 'A Blessed Feast & Grand Celebration',
    dayOfWeek: 'Monday',
    dayOfMonth: '2',
    monthName: 'November',
    year: '2026',
    time: '07:30 PM Onwards',
    venue: 'Radiant Resorts Gorakhpur',
    dressCode: 'Formal Evening Elegance',
    directionsUrl: 'https://maps.app.goo.gl/YeqWGNYWq3HWQegm9',
    couplePhoto: getAssetPath('assets/SSG00440-Dz91S7X0.webp'),
    caricatureImage: getAssetPath('assets/SSG00440-Dz91S7X0.webp'),
    caricatureBadge: 'Basti Ali and Ambiya Basher · Wedding Reception 👑',
    fullCardImage: getAssetPath('assets/page 4 (2 Nov).webp'),
    cardImageCandidates: [
      getAssetPath('assets/page 4 (2 Nov).webp'),
      getAssetPath('assets/page 4 (2 Nov).png'),
    ],
  }
];

export default function App() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);
  const [dateRevealed, setDateRevealed] = useState(false);

  useEffect(() => {
    document.title = 'Basti Ali and Ambiya Basher — Wedding Invitation · October 2026';
    const metaDesc =
      document.querySelector('meta[name="description"]') ||
      (() => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
        return m;
      })();
    metaDesc.setAttribute(
      'content',
      'Join Basti Ali and Ambiya Basher for their sacred Rukhsita & wedding celebrations on Thursday, 29 October 2026.'
    );
  }, []);

  const handleOpen = () => {
    setOpening(true);
    setShouldPlayAudio(true);
    setTimeout(() => {
      setOpened(true);
    }, 320);
  };

  return (
    <div className="relative min-h-screen bg-cream selection:bg-rose-100 selection:text-rose-900">
      {/* Floating Rose Petals Animation */}
      <FloatingPetals count={28} />

      {/* Background Audio with toggle control */}
      <MusicPlayer play={shouldPlayAudio || opening || opened} />

      {/* Main Wedding Invitation Page - pre-mounted for instant zero-latency display */}
      <main className="relative bg-cream">
        {/* Invitation Suite Section - Clean presentation without background distractions */}
        <section className="relative w-full pt-4 sm:pt-10 pb-12 sm:pb-16 flex flex-col items-center justify-center px-1 sm:px-4 md:px-6 select-none border-b border-gold-soft/30">
          {/* Page 1 (Prelude page before main invitation) */}
          <AnimatedSection direction="up" durationMs={700}>
            <InvitationPageCard
              pageLabel="Wedding Suite · Page 1"
              pageTitle="Sacred Prelude & Blessing"
              defaultFilename="page 0.png"
              candidateFilenames={[
                'page 0.png',
                'page0.png',
                'cover.png',
                'cover 1.png',
                'cover1.png',
                'intro.png',
                'intro 1.png',
                'page a.png',
                'page_a.png',
                'page 0.jpg',
                'page 0.jpeg',
                'cover.jpg',
              ]}
              altText="Basti Ali and Ambiya Basher — Wedding Suite Prelude Page"
              storageKey="suite_page_0"
            />
          </AnimatedSection>

          {/* Page 2 (Main Invitation - page 1.webp / page 1.png) - Fast WebP with fallback */}
          <AnimatedSection direction="up" durationMs={700} delayMs={150}>
            <InvitationPageCard
              pageLabel="Wedding Suite · Page 2 (Main Invitation)"
              pageTitle="Basti Ali and Ambiya Basher"
              defaultFilename="page 1.webp"
              candidateFilenames={[
                'page 1.webp',
                'page 1.png',
                'page 1(oct 29).png',
                'page1.png',
                'page 1.jpg',
                'page 1.jpeg',
              ]}
              altText="Basti Ali and Ambiya Basher — Sacred Wedding Invitation"
              storageKey="suite_page_1"
            />
          </AnimatedSection>
        </section>

          {/* Scratch Card & Countdown Section */}
          <section className="relative pt-10 pb-12 px-6 bg-[#faf6f0] border-t border-gold-soft/30 overflow-hidden">
            <IslamicPatternOverlay opacity={0.03} />
            <FloralCornerAccents />
            <div className="relative max-w-3xl mx-auto text-center z-10">
              <AnimatedSection direction="up" durationMs={650}>
                <FlowerDivider />
                <div className="mb-6">
                  <ScratchCard
                    revealed={dateRevealed}
                    onRevealed={() => setDateRevealed(true)}
                  />
                </div>
              </AnimatedSection>
              <div
                className={`transition-all duration-700 ${
                  dateRevealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden'
                }`}
                aria-hidden={!dateRevealed}
              >
                <CountdownTimer />
              </div>
            </div>
          </section>

          {/* Wedding Invitation Film Section (Before Event Schedule) */}
          <WeddingVideoSection />

          {/* Events Schedule Section */}
          <section className="relative pt-12 pb-16 px-6 bg-gradient-to-b from-[#1b4332]/5 via-[#faf6f0] to-[#1b4332]/5 border-y border-gold-soft/40 overflow-hidden">
            <IslamicPatternOverlay opacity={0.05} />
            <FloralCornerAccents />
            <div className="relative max-w-7xl mx-auto z-10">
              <AnimatedSection direction="up" durationMs={650}>
                <div className="text-center mb-10">
                  <p className="font-cinzel text-xs text-[#1b4332] tracking-widest font-bold uppercase">
                    SACRED CELEBRATIONS &amp; CEREMONIES
                  </p>
                  <h2 className="font-script text-5xl sm:text-6xl text-rose-deep mt-2">
                    Events Schedule
                  </h2>
                  <FlowerDivider />
                </div>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
                {EVENTS_SCHEDULE.map((event, idx) => (
                  <AnimatedSection
                    key={`${event.title}-${event.date}-${event.venue}`}
                    direction={idx === 1 ? 'up' : idx === 0 ? 'right' : 'left'}
                    delayMs={idx * 150}
                    durationMs={700}
                    className="w-full flex"
                  >
                    <EventCard {...event} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Guest Book & RSVP Wishes Section (Replaces Cherished Moments photo frames) */}
          <RsvpWishesSection />

          {/* Awaiting your noble presence Section */}
          <section className="relative py-24 px-6 bg-cream text-center overflow-hidden">
            <IslamicPatternOverlay opacity={0.03} />
            <FloralCornerAccents />
            <div className="relative max-w-2xl mx-auto z-10">
              <AnimatedSection direction="up" durationMs={700}>
                <h2 className="font-script text-5xl sm:text-6xl text-rose-deep">
                  <span className="font-script-capital-a">A</span>waiting your noble presence &amp; Duas
                </h2>
                <FlowerDivider />
                <p className="font-serif-display italic text-lg sm:text-xl text-foreground/80 leading-relaxed">
                  May Allah (SWT) shower His infinite blessings, love, and peace upon this blessed union.
                  <br />
                  We humbly look forward to sharing this momentous day in your gracious company.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* RSVP Section */}
          <section id="rsvp" className="relative py-20 px-6 bg-cream border-t border-gold-soft/30 overflow-hidden">
            <IslamicPatternOverlay opacity={0.04} />
            <FloralCornerAccents />
            <div className="relative max-w-2xl mx-auto z-10">
              <AnimatedSection direction="up" durationMs={650}>
                <div className="text-center">
                  <p className="font-cinzel text-xs text-[#1b4332] tracking-widest font-bold uppercase">
                    KINDLY RESPOND
                  </p>
                  <h2 className="font-script text-5xl sm:text-6xl text-rose-deep mt-2">
                    RSVP
                  </h2>
                  <FlowerDivider />
                  <p className="font-serif-display italic text-foreground/80 mb-8">
                    Please let us know by 15th October 2026.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="zoom" delayMs={150} durationMs={750}>
                <RsvpForm />
              </AnimatedSection>
            </div>
          </section>

          {/* The Families Section */}
          <FamilySection />

          {/* Footer Section */}
          <Footer />

          {/* Interactive Floating Blossom Prompt Widget */}
          <aside aria-label="Floral interaction prompt" className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2.5 bg-white/90 backdrop-blur-md border border-gold-soft/70 px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-white select-none">
            <BlossomingFlower size="sm" colorTheme="rose" title="Click to blossom flower 🌸" />
            <span className="font-cinzel text-[11px] text-[#1b4332] font-semibold tracking-wide">
              Tap any floral accent to blossom 🌸
            </span>
          </aside>

          {/* Floating RSVP Action Button at Bottom Right */}
          <FloatingRsvpButton targetId="rsvp" />
        </main>

      {/* Envelope / Video Intro Overlay */}
      {!opened && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-400 ease-out ${
            opening ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <IntroVideo
            onOpen={handleOpen}
            opening={opening}
            opened={opened}
            onStartPlay={() => setShouldPlayAudio(true)}
          />
        </div>
      )}
    </div>
  );
}
