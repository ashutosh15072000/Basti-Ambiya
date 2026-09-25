import React, { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { FlowerDivider } from './Ornaments';
import { RsvpData } from '../types';

const RSVP_EVENTS = [
  {
    id: 'The Sacred Wedding & Rukhsita',
    label: 'The Sacred Wedding & Rukhsita (Shimla Resort)',
    date: 'Thursday, 29th October 2026',
  },
  {
    id: 'Wedding Reception - Hotel Ramada',
    label: 'Wedding Reception (Hotel Ramada)',
    date: 'Friday, 30th October 2026',
  },
  {
    id: 'Wedding Reception - Radiant Resorts',
    label: 'Wedding Reception (Radiant Resorts Gorakhpur)',
    date: 'Monday, 2nd November 2026',
  },
];

export const RsvpForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<RsvpData>({
    guest_name: '',
    phone: '',
    attending: 'yes',
    guest_count: 1,
    events: [],
    dietary: '',
    message: '',
  });

  const toggleEvent = (eventId: string, isChecked: boolean) => {
    setForm((prev) => ({
      ...prev,
      events: isChecked
        ? [...prev.events, eventId]
        : prev.events.filter((id) => id !== eventId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.guest_name.trim()) {
      setError('Please enter your name');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      guest_name: form.guest_name.trim(),
      phone: form.phone.trim() || null,
      attending: form.attending,
      guest_count: form.attending === 'yes' ? Math.max(1, Math.min(10, form.guest_count)) : 0,
      events: form.attending === 'yes' ? form.events : [],
      message: form.message?.trim() || null,
      submitted_at: new Date().toISOString(),
    };

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existing.push(payload);
      localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
      window.dispatchEvent(new CustomEvent('wedding_rsvp_submitted', { detail: payload }));
    } catch {
      // Ignore storage quota error
    }

    // Simulate network delay for natural feel
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-[#faf8f5]/90 backdrop-blur-sm border border-gold-soft/60 rounded-2xl p-10 shadow-soft text-center max-w-xl mx-auto">
        <Heart className="mx-auto h-10 w-10 text-rose-deep mb-4 animate-pulse" fill="currentColor" />
        <h3 className="font-script text-4xl text-rose-deep font-semibold">Thank you!</h3>
        <FlowerDivider />
        <p className="font-serif-display italic text-foreground/80 text-base leading-relaxed">
          Your response has been received. We look forward to celebrating with you!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#faf8f5]/90 backdrop-blur-sm border border-gold-soft/60 rounded-2xl p-6 sm:p-10 shadow-soft text-left space-y-6 max-w-xl mx-auto"
    >
      <div className="relative border-b border-gold-soft/30 pb-4 mb-2">
        <h3 className="font-cinzel text-xs tracking-[0.25em] text-rose-deep font-bold text-center uppercase">
          Guest Details
        </h3>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-xs rounded-xl text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="guest_name"
            className="font-cinzel text-[10px] tracking-widest text-[#a84c32] font-bold uppercase block"
          >
            Your name *
          </label>
          <input
            id="guest_name"
            required
            maxLength={100}
            value={form.guest_name}
            onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
            placeholder="Full name"
            className="w-full bg-white/80 border border-gold-soft/60 rounded-xl px-4 py-3 font-serif-display text-base focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold h-12 text-[#2b1f1a]"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="font-cinzel text-[10px] tracking-widest text-[#a84c32] font-bold uppercase block"
          >
            Contact number
          </label>
          <input
            id="phone"
            type="tel"
            maxLength={20}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Contact number"
            className="w-full bg-white/80 border border-gold-soft/60 rounded-xl px-4 py-3 font-serif-display text-base focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold h-12 text-[#2b1f1a]"
          />
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <label className="font-cinzel text-[10px] tracking-widest text-[#a84c32] font-bold uppercase block text-center">
          Will you join us?
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, attending: 'yes' })}
            className={`py-3 px-4 rounded-full font-serif-display text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 font-bold border cursor-pointer ${
              form.attending === 'yes'
                ? 'bg-[#a84c32] border-[#a84c32] text-white shadow-md'
                : 'bg-white border-gold-soft/40 text-[#a84c32] hover:bg-[#faf6f0]'
            }`}
          >
            Joyfully Accept 🎉
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, attending: 'no' })}
            className={`py-3 px-4 rounded-full font-serif-display text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 font-bold border cursor-pointer ${
              form.attending === 'no'
                ? 'bg-[#a84c32] border-[#a84c32] text-white shadow-md'
                : 'bg-white border-gold-soft/40 text-[#a84c32] hover:bg-[#faf6f0]'
            }`}
          >
            Regretfully Decline
          </button>
        </div>
      </div>

      {form.attending === 'yes' && (
        <div className="space-y-5 pt-2 animate-fade-in duration-300">
          <div className="space-y-2">
            <label
              htmlFor="guest_count"
              className="font-cinzel text-[10px] tracking-widest text-[#a84c32] font-bold uppercase block"
            >
              Party Size
            </label>
            <div className="relative">
              <select
                id="guest_count"
                value={form.guest_count}
                onChange={(e) =>
                  setForm({ ...form, guest_count: Number(e.target.value) || 1 })
                }
                className="w-full bg-white/80 border border-gold-soft/60 rounded-xl px-4 py-3 font-serif-display text-base appearance-none focus:outline-none focus:ring-1 focus:ring-gold h-12 text-[#2b1f1a]"
              >
                <option value={1}>1 (Just me)</option>
                <option value={2}>2 (Me + 1 guest)</option>
                <option value={3}>3 (Me + 2 guests)</option>
                <option value={4}>4 (Me + 3 guests)</option>
                <option value={5}>5 (Me + 4 guests)</option>
                <option value={6}>6 (Me + 5 guests)</option>
                <option value={7}>7 (Me + 6 guests)</option>
                <option value={8}>8 (Me + 7 guests)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold text-xs">
                ▼
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="font-cinzel text-[10px] tracking-widest text-[#a84c32] font-bold uppercase block">
              Events You'll Attend
            </label>
            <div className="grid grid-cols-1 gap-3">
              {RSVP_EVENTS.map((event, idx) => {
                const isSelected = form.events.includes(event.id);
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => toggleEvent(event.id, !isSelected)}
                    className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-300 w-full cursor-pointer ${
                      isSelected
                        ? 'bg-[#faf0e1] border-gold text-foreground shadow-sm'
                        : 'bg-white/60 border-gold-soft/40 text-foreground/80 hover:bg-[#faf6f0]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-serif-display font-semibold text-sm sm:text-base text-rose-deep">
                        Day {idx + 1}: {event.label}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-4 ${
                          isSelected
                            ? 'bg-[#a84c32] border-[#a84c32] text-white'
                            : 'border-gold-soft bg-white'
                        }`}
                      >
                        {isSelected && <span className="text-[10px] font-bold">✓</span>}
                      </div>
                    </div>
                    <span className="font-serif-display text-xs text-[#2b1f1a]/60 mt-1">
                      {event.date}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="font-cinzel text-[10px] tracking-widest text-[#a84c32] font-bold uppercase block"
        >
          A message for the couple
        </label>
        <textarea
          id="message"
          maxLength={1000}
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Leave a warm wish or note..."
          className="w-full bg-white/80 border border-gold-soft/60 rounded-xl px-4 py-3 font-serif-display text-base focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold text-[#2b1f1a]"
        />
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="gradient-gold text-white border-0 hover:opacity-90 rounded-full px-12 py-5 shadow-gold font-cinzel text-xs tracking-wider uppercase font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center justify-center"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
            </>
          ) : (
            'Send RSVP'
          )}
        </button>
      </div>
    </form>
  );
};
