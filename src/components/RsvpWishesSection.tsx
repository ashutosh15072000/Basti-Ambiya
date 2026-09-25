import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart,
  MessageSquareHeart,
  Sparkles,
  Send,
  CheckCircle2,
  Quote,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { FlowerDivider, FloralCornerAccents } from './Ornaments';
import { IslamicPatternOverlay } from './IslamicBackground';
import { AnimatedSection } from './AnimatedSection';

export interface WeddingWish {
  id: string;
  name: string;
  relationOrCity?: string;
  message: string;
  date: string;
  likes: number;
  attending?: 'yes' | 'no';
}

const AUTOPLAY_INTERVAL_MS = 5000;

export const RsvpWishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<WeddingWish[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHoveredOrTouching, setIsHoveredOrTouching] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Slide transition animation direction
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [animating, setAnimating] = useState(false);

  // Modal State for adding a new wish
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Touch & Drag state
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // Load RSVPs from localStorage and combine with user wishes (no default fake messages)
  const loadAllWishes = useCallback(() => {
    try {
      const storedRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      const storedWishes = JSON.parse(localStorage.getItem('wedding_guest_wishes') || '[]');
      const likesState = JSON.parse(localStorage.getItem('wedding_wishes_liked') || '{}');
      setLikedMap(likesState);

      const rsvpWishes: WeddingWish[] = storedRsvps
        .filter((r: any) => r.message && r.message.trim().length > 0)
        .map((r: any, idx: number) => ({
          id: `rsvp-${r.guest_name}-${idx}`,
          name: r.guest_name,
          relationOrCity: r.events && r.events.length > 0 ? 'Attending Guest' : undefined,
          message: r.message,
          date: r.timestamp
            ? new Date(r.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })
            : 'Recently',
          likes: (likesState[`rsvp-${r.guest_name}-${idx}`] ? 1 : 0) + 1,
          attending: r.attending || 'yes',
        }));

      // Only real messages from guests and RSVP responses (no default placeholder wishes)
      const combined = [...storedWishes, ...rsvpWishes];
      const uniqueWishes = Array.from(new Map(combined.map((w) => [w.id, w])).values());
      setWishes(uniqueWishes);
    } catch {
      setWishes([]);
    }
  }, []);

  useEffect(() => {
    loadAllWishes();

    const handleRsvpSubmitted = () => {
      loadAllWishes();
      // Jump to the newly added message
      setCurrentIndex(0);
    };

    window.addEventListener('wedding_rsvp_submitted', handleRsvpSubmitted);
    window.addEventListener('storage', handleRsvpSubmitted);

    return () => {
      window.removeEventListener('wedding_rsvp_submitted', handleRsvpSubmitted);
      window.removeEventListener('storage', handleRsvpSubmitted);
    };
  }, [loadAllWishes]);

  // Next Slide Handler
  const handleNext = useCallback(() => {
    if (wishes.length <= 1) return;
    setSlideDirection('left');
    setAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % wishes.length);
    setTimeout(() => setAnimating(false), 400);
  }, [wishes.length]);

  // Prev Slide Handler
  const handlePrev = useCallback(() => {
    if (wishes.length <= 1) return;
    setSlideDirection('right');
    setAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? wishes.length - 1 : prev - 1));
    setTimeout(() => setAnimating(false), 400);
  }, [wishes.length]);

  // Autoplay Effect (automatically changes the message)
  useEffect(() => {
    if (!isAutoPlaying || isHoveredOrTouching || wishes.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHoveredOrTouching, wishes.length, handleNext]);

  // Touch Swipe Handlers (Touching left moves to next message)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHoveredOrTouching(true);
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsHoveredOrTouching(false);
    const deltaX = touchStartX.current - touchCurrentX.current;
    // Swipe left (finger moved right-to-left -> deltaX > 40)
    if (deltaX > 40) {
      handleNext();
    }
    // Swipe right (finger moved left-to-right -> deltaX < -40)
    else if (deltaX < -40) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  // Mouse Drag Handlers (for desktop dragging)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsHoveredOrTouching(true);
    isDragging.current = true;
    touchStartX.current = e.clientX;
    touchCurrentX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchCurrentX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsHoveredOrTouching(false);
    const deltaX = touchStartX.current - touchCurrentX.current;
    if (deltaX > 40) {
      handleNext();
    } else if (deltaX < -40) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  const handleToggleLike = (wishId: string) => {
    const isLiked = !!likedMap[wishId];
    const newLikedMap = { ...likedMap, [wishId]: !isLiked };
    setLikedMap(newLikedMap);

    try {
      localStorage.setItem('wedding_wishes_liked', JSON.stringify(newLikedMap));
    } catch {
      // ignore
    }

    setWishes((prev) =>
      prev.map((item) => {
        if (item.id === wishId) {
          return {
            ...item,
            likes: isLiked ? Math.max(0, item.likes - 1) : item.likes + 1,
          };
        }
        return item;
      })
    );
  };

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newMessage.trim()) return;

    setSubmitting(true);
    const newWishItem: WeddingWish = {
      id: `wish-${Date.now()}`,
      name: newAuthor.trim(),
      relationOrCity: newCity.trim() || 'Well-wisher',
      message: newMessage.trim(),
      date: 'Just now',
      likes: 1,
      attending: 'yes',
    };

    try {
      const stored = JSON.parse(localStorage.getItem('wedding_guest_wishes') || '[]');
      stored.unshift(newWishItem);
      localStorage.setItem('wedding_guest_wishes', JSON.stringify(stored));
    } catch {
      // ignore
    }

    setWishes((prev) => [newWishItem, ...prev]);
    setCurrentIndex(0);
    setSubmitting(false);
    setSubmittedSuccess(true);
    setNewAuthor('');
    setNewCity('');
    setNewMessage('');

    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowAddModal(false);
    }, 1500);
  };

  const activeWish = wishes[currentIndex] || wishes[0];
  const isCurrentLiked = activeWish ? !!likedMap[activeWish.id] : false;

  return (
    <section
      id="guest-wishes"
      className="relative pt-12 pb-18 sm:pb-24 px-3 sm:px-6 bg-gradient-to-b from-[#faf6f0] via-white to-[#faf6f0] border-t border-gold-soft/40 overflow-hidden select-none"
    >
      <IslamicPatternOverlay opacity={0.03} />
      <FloralCornerAccents />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Section Header */}
        <AnimatedSection direction="up" durationMs={650}>
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-cinzel tracking-[0.25em] text-[#1b4332] font-bold uppercase bg-[#1b4332]/10 border border-[#1b4332]/25 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              GUEST BOOK &amp; PRAYERS
            </span>
            <h2 className="font-script text-5xl sm:text-6xl text-rose-deep mt-2 drop-shadow-xs">
              Wishes &amp; Duas for the Couple
            </h2>
            <FlowerDivider />
            <p className="font-serif-display italic text-foreground/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-2">
              Heartfelt prayers, blessings, and RSVP messages sent by our beloved guests.
            </p>
          </div>
        </AnimatedSection>

        {/* When there are no messages sent yet */}
        {wishes.length === 0 ? (
          <div className="relative w-full max-w-xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-white/95 border-2 border-gold-soft/80 shadow-xl backdrop-blur-md">
            <div className="w-14 h-14 rounded-full bg-[#1b4332]/10 border border-[#1b4332]/25 flex items-center justify-center text-[#93203c] mx-auto mb-4">
              <MessageSquareHeart className="w-7 h-7" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-foreground mb-2">
              No Messages Yet
            </h3>
            <p className="font-serif-display italic text-foreground/75 text-sm sm:text-base leading-relaxed mb-6">
              Be the first to share your warm prayers, Duas, and heartfelt wishes for Basti Ali and Ambiya Basher!
            </p>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-cinzel font-bold text-white bg-gradient-to-r from-[#93203c] via-[#a84c32] to-[#c89b3c] shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send the First Wish / Dua</span>
            </button>
          </div>
        ) : (
          /* Message Slider Box */
          <div
            className="relative w-full max-w-3xl mx-auto"
            onMouseEnter={() => setIsHoveredOrTouching(true)}
            onMouseLeave={() => {
              setIsHoveredOrTouching(false);
              if (isDragging.current) isDragging.current = false;
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* Decorative Outer Aura Glow */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-amber-200/25 via-[#c89b3c]/15 to-rose-200/25 rounded-3xl blur-xl pointer-events-none" />

            {/* Main Slide Card Container */}
            <div className="relative w-full min-h-[300px] sm:min-h-[340px] flex flex-col justify-between p-6 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-md border-2 sm:border-3 border-gold-soft/80 shadow-2xl transition-all duration-300">
              {/* Top Bar with Quote Icon, Counter, and Autoplay Status */}
              <div className="flex items-center justify-between pb-4 border-b border-gold-soft/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1b4332]/10 border border-[#1b4332]/25 flex items-center justify-center text-[#1b4332] shadow-xs">
                    <Quote className="w-5 h-5 fill-current rotate-180" />
                  </div>
                  <div>
                    <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-[#a84c32] block">
                      Wedding Wish {currentIndex + 1} of {wishes.length}
                    </span>
                    <span className="font-serif-display text-xs text-foreground/60 italic">
                      {activeWish?.date}
                    </span>
                  </div>
                </div>

                {/* Autoplay Indicator / Pause Toggle (shown when > 1 wish) */}
                {wishes.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-cinzel font-semibold bg-[#faf6f0] border border-gold-soft/60 text-foreground/70 hover:text-foreground transition-all cursor-pointer"
                      title={isAutoPlaying ? 'Pause automatic slideshow' : 'Resume automatic slideshow'}
                    >
                      {isAutoPlaying && !isHoveredOrTouching ? (
                        <>
                          <Pause className="w-3 h-3 text-[#a84c32]" />
                          <span className="hidden sm:inline">Auto</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 text-[#1b4332]" />
                          <span className="hidden sm:inline">Play</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Slide Content with Smooth Slide Animation */}
              <div
                className={`my-6 flex-1 flex flex-col justify-center transition-all duration-400 ease-out transform ${
                  animating
                    ? slideDirection === 'left'
                      ? 'opacity-0 translate-x-6'
                      : 'opacity-0 -translate-x-6'
                    : 'opacity-100 translate-x-0'
                }`}
              >
                <p className="font-serif-display italic text-[#2b1f1a] text-lg sm:text-2xl leading-relaxed text-center font-normal px-2 sm:px-6">
                  "{activeWish?.message}"
                </p>
              </div>

              {/* Bottom Card Footer: Author Name & Like / Ameen Action */}
              <div className="pt-4 border-t border-gold-soft/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="font-cinzel font-bold text-base sm:text-lg text-[#93203c] tracking-wide">
                    {activeWish?.name}
                  </h4>
                  {activeWish?.relationOrCity && (
                    <p className="font-serif-display text-xs sm:text-sm text-foreground/70 italic mt-0.5">
                      {activeWish.relationOrCity}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Heart / Ameen Reaction */}
                  <button
                    type="button"
                    onClick={() => activeWish && handleToggleLike(activeWish.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-cinzel transition-all duration-200 cursor-pointer shadow-xs ${
                      isCurrentLiked
                        ? 'bg-rose-50 text-[#93203c] border border-rose-300 font-bold'
                        : 'bg-[#faf6f0] text-foreground/70 border border-gold-soft/50 hover:bg-rose-50/50 hover:text-[#93203c]'
                    }`}
                    title={isCurrentLiked ? 'Blessed (Click to unlike)' : 'Send blessing / Ameen'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isCurrentLiked ? 'fill-[#93203c] text-[#93203c] scale-110' : 'text-foreground/50'
                      }`}
                    />
                    <span>{activeWish?.likes || 1} Blessings</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Left Arrow Button (shown when > 1 wish) */}
            {wishes.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 border-2 border-gold-soft/80 shadow-lg flex items-center justify-center text-[#93203c] hover:bg-gold-soft/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label="Previous wish"
                title="Previous wish"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Right Arrow Button (shown when > 1 wish) */}
            {wishes.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 border-2 border-gold-soft/80 shadow-lg flex items-center justify-center text-[#93203c] hover:bg-gold-soft/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label="Next wish"
                title="Next wish"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>
        )}

        {/* Slider Navigation Dots & Controls */}
        <div className="flex flex-col items-center justify-center gap-3 mt-6 sm:mt-8">
          {/* Dot Indicators (when > 1 wish) */}
          {wishes.length > 1 && (
            <div className="flex items-center gap-2">
              {wishes.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSlideDirection(idx > currentIndex ? 'left' : 'right');
                    setAnimating(true);
                    setCurrentIndex(idx);
                    setTimeout(() => setAnimating(false), 400);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-7 sm:w-8 h-2.5 bg-gradient-to-r from-[#93203c] to-[#c89b3c] shadow-xs'
                      : 'w-2.5 h-2.5 bg-gold-soft/50 hover:bg-gold-soft'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  title={`Go to message ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {wishes.length > 1 && (
            <p className="text-[11px] font-cinzel text-foreground/50 tracking-wider">
              Swipe left or right on mobile to change messages
            </p>
          )}

          {/* Action Button to post a wish */}
          {wishes.length > 0 && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-cinzel font-bold text-white bg-gradient-to-r from-[#93203c] via-[#a84c32] to-[#c89b3c] shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <MessageSquareHeart className="w-4 h-4 text-amber-200" />
                <span>Send a Warm Wish / Dua</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal to Send a Warm Wish directly */}
        {showAddModal && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setShowAddModal(false)}
          >
            <div
              className="relative w-full max-w-lg bg-[#fdfbf7] rounded-3xl p-6 sm:p-8 border-2 border-gold-soft/80 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <span className="font-cinzel text-xs text-[#a84c32] tracking-widest font-bold uppercase block mb-1">
                  Basti Ali and Ambiya Basher
                </span>
                <h3 className="font-script text-4xl text-rose-deep">
                  Share Your Duas &amp; Wishes
                </h3>
                <FlowerDivider />
              </div>

              {submittedSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#1b4332] mx-auto animate-bounce" />
                  <h4 className="font-cinzel text-base font-bold text-[#1b4332]">
                    JazakAllah Khair!
                  </h4>
                  <p className="font-serif-display italic text-foreground/80 text-sm">
                    Your beautiful wish has been added to the wedding slider.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePostWish} className="space-y-4">
                  <div>
                    <label className="font-cinzel text-[10px] tracking-widest text-[#a84c32] font-bold uppercase block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Tariq Khan &amp; Family"
                      className="w-full bg-white border border-gold-soft/70 rounded-xl px-4 py-2.5 font-serif-display text-sm focus:outline-none focus:ring-1 focus:ring-gold text-[#2b1f1a]"
                    />
                  </div>

                  <div>
                    <label className="font-cinzel text-[10px] tracking-widest text-[#a84c32] font-bold uppercase block mb-1.5">
                      City or Relationship (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength={60}
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="e.g. Lucknow / College Friend"
                      className="w-full bg-white border border-gold-soft/70 rounded-xl px-4 py-2.5 font-serif-display text-sm focus:outline-none focus:ring-1 focus:ring-gold text-[#2b1f1a]"
                    />
                  </div>

                  <div>
                    <label className="font-cinzel text-[10px] tracking-widest text-[#a84c32] font-bold uppercase block mb-1.5">
                      Your Message / Dua for the Couple *
                    </label>
                    <textarea
                      required
                      rows={4}
                      maxLength={600}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Write your prayers, warm blessings, and wishes..."
                      className="w-full bg-white border border-gold-soft/70 rounded-xl p-3.5 font-serif-display text-sm focus:outline-none focus:ring-1 focus:ring-gold text-[#2b1f1a]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-5 py-2 rounded-full font-cinzel text-xs text-foreground/70 hover:text-foreground cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-cinzel font-bold text-white bg-gradient-to-r from-[#93203c] to-[#a84c32] shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Posting...' : 'Post Blessing'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
