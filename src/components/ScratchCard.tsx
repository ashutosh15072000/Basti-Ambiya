import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ScratchCardProps {
  onRevealed: () => void;
  revealed: boolean;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  onRevealed,
  revealed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || revealed) return;

    const dpr = window.devicePixelRatio || 1;

    const draw = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#bf953f');
      gradient.addColorStop(0.25, '#fcf6ba');
      gradient.addColorStop(0.5, '#b38728');
      gradient.addColorStop(0.75, '#fbf5b7');
      gradient.addColorStop(1, '#aa771c');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = '#4a2f0f';
      ctx.font = '600 15px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦  SCRATCH TO REVEAL  ✦', rect.width / 2, rect.height / 2);
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [revealed]);

  const fireConfetti = () => {
    const launch = (origin: { x: number; y: number }) =>
      confetti({
        particleCount: 120,
        spread: 90,
        startVelocity: 45,
        origin,
        colors: ['#d4a574', '#f5d199', '#c75a6b', '#7a8a6a', '#ffffff'],
        scalar: 1.1,
      });

    launch({ x: 0.2, y: 0.4 });
    launch({ x: 0.5, y: 0.3 });
    launch({ x: 0.8, y: 0.4 });
    setTimeout(() => launch({ x: 0.5, y: 0.5 }), 250);
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const imgData = ctx.getImageData(0, 0, width, height).data;
    let transparentPixels = 0;

    for (let i = 3; i < imgData.length; i += 160) {
      if (imgData[i] < 60) transparentPixels++;
    }

    const totalSamples = imgData.length / 160;
    if (transparentPixels / totalSamples > 0.45) {
      setIsRevealed(true);
      ctx.clearRect(0, 0, width, height);
      fireConfetti();
      onRevealed();
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 28, 0, Math.PI * 2);
    ctx.fill();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDrawing.current) {
      e.preventDefault();
      scratch(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    checkScratchPercentage();
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-md h-32 rounded-2xl overflow-hidden border-2 border-gold-soft shadow-elegant select-none"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#fbf8f2] to-[#f4ebe1] px-4">
        {/* Subtle Islamic Arch Border in Reveal */}
        <div className="absolute inset-2 border border-gold-soft/40 rounded-xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs text-gold">✦</span>
          <p className="font-cinzel tracking-[0.35em] text-[#a84c32] text-xs sm:text-sm font-bold uppercase">
            SAVE THE SACRED DATE
          </p>
          <span className="text-xs text-gold">✦</span>
        </div>
        <p className="font-script text-4xl sm:text-5xl text-[#93203c] font-semibold">
          29th October 2026
        </p>
        <p className="font-serif-display italic text-xs text-foreground/75 mt-0.5">
          Rukhsati Mubarak · Thursday
        </p>
      </div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
        />
      )}
    </div>
  );
};
