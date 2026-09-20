import React, { useMemo } from 'react';

interface FloatingPetalsProps {
  count?: number;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({ count = 28 }) => {
  const petals = useMemo(() => {
    const gradients = [
      'linear-gradient(135deg, #d90429, #8d0801)',
      'linear-gradient(135deg, #ef233c, #b7094c)',
      'linear-gradient(135deg, #ff4d6d, #c9184a)',
      'linear-gradient(135deg, #ff758f, #ff4d6d)',
      'linear-gradient(135deg, #ffb3c1, #ff758f)',
    ];

    return Array.from({ length: count }).map((_, r) => {
      const left = Math.random() * 100;
      const duration = 12 + Math.random() * 14;
      const delay = Math.random() * 10;
      const width = 6 + Math.random() * 10;
      const height = width * (1.1 + Math.random() * 0.3);
      const opacity = 0.55 + Math.random() * 0.35;
      const bg = gradients[r % gradients.length];
      const borderRadius = r % 2 === 0 ? '150% 0 150% 50%' : '50% 150% 50% 150%';
      return { left, duration, delay, width, height, opacity, bg, borderRadius };
    });
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map((p, r) => (
        <span
          key={r}
          className="absolute animate-float-petal"
          style={{
            left: `${p.left}%`,
            top: '-10vh',
            width: `${p.width}px`,
            height: `${p.height}px`,
            background: p.bg,
            opacity: p.opacity,
            borderRadius: p.borderRadius,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 1px 3px rgba(183, 9, 76, 0.2)',
          }}
        />
      ))}
    </div>
  );
};
