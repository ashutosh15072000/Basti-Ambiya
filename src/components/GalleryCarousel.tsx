import React, { useState, useRef } from 'react';
import { FlowerDivider, FloralCornerAccents } from './Ornaments';
import { IslamicPatternOverlay } from './IslamicBackground';
import { getAssetPath } from '../utils/assets';
import { GalleryItem } from '../types';

export const GALLERY_ITEMS: GalleryItem[] = [
  { image: getAssetPath('assets/IMG_0034-24WZOV6N.jpeg'), caption: 'Sweet smiles & shared dreams' },
  { image: getAssetPath('assets/IMG_9318-CfLmeoUo.jpeg'), caption: 'Hand in hand, heart to heart' },
  { image: getAssetPath('assets/SSG00142-BZRauCC2.jpg'), caption: 'Love in every moment' },
  { image: getAssetPath('assets/SSG00440-Dz91S7X0.jpg'), caption: 'Together, our journey begins' },
  { image: getAssetPath('assets/SSG09645-C19LQ60y.jpg'), caption: 'Forever and always' },
];

export const GalleryCarousel: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const startX = useRef(0);
  const endX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    endX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!startX.current || !endX.current) return;
    const diff = startX.current - endX.current;
    if (diff > 50) {
      setActiveIdx((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
    } else if (diff < -50) {
      setActiveIdx((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
    }
    startX.current = 0;
    endX.current = 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      endX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - endX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 50) {
        setActiveIdx((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
      } else if (diff < -50) {
        setActiveIdx((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
      }
    }
    startX.current = 0;
    endX.current = 0;
  };

  return (
    <section className="relative pt-12 pb-16 px-6 bg-cream border-t border-gold-soft/30 overflow-hidden">
      <IslamicPatternOverlay opacity={0.03} />
      <FloralCornerAccents />
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="text-center mb-8">
          <p className="font-cinzel text-xs text-[#1b4332] tracking-widest font-bold uppercase">
            CHERISHED MOMENTS
          </p>
          <FlowerDivider />
        </div>

        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full max-w-lg mx-auto h-[320px] sm:h-[420px] flex items-center justify-center select-none"
        >
          {GALLERY_ITEMS.map((item, idx, arr) => {
            let offset = idx - activeIdx;
            if (offset < -1) offset += arr.length;
            if (offset > 1) offset -= arr.length;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            if (Math.abs(offset) > 1) return null;

            return (
              <div
                key={idx}
                onClick={() => {
                  if (isLeft) {
                    setActiveIdx((k) => (k === 0 ? arr.length - 1 : k - 1));
                  }
                  if (isRight) {
                    setActiveIdx((k) => (k === arr.length - 1 ? 0 : k + 1));
                  }
                }}
                className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${
                  isCenter
                    ? 'z-30 scale-100 opacity-100 translate-x-0'
                    : isLeft
                    ? 'z-10 scale-75 opacity-40 -translate-x-[65%] sm:-translate-x-[60%]'
                    : 'z-10 scale-75 opacity-40 translate-x-[65%] sm:translate-x-[60%]'
                }`}
              >
                <div
                  className={`w-[180px] sm:w-[260px] aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex items-center justify-center ${
                    isCenter
                      ? 'border-[8px] sm:border-[12px] border-white'
                      : 'border-[4px] sm:border-[6px] border-white'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6 min-h-[48px]">
          <p
            key={activeIdx}
            className="font-script text-2xl sm:text-3xl text-rose-deep tracking-wide animate-fade-in"
          >
            {GALLERY_ITEMS[activeIdx]?.caption}
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {GALLERY_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIdx ? 'bg-[#c2185b] w-4' : 'bg-gold-soft/60 w-2'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
