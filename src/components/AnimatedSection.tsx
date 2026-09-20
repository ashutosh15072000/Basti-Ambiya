import React, { ElementType } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  direction?: AnimationDirection;
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  as?: ElementType;
}

/**
 * Animated wrapper component that uses IntersectionObserver to slide
 * and fade children smoothly into view when scrolled to.
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  id,
  direction = 'up',
  delayMs = 0,
  durationMs = 700,
  threshold = 0.12,
  as: Component = 'div',
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  });

  // Calculate transformation based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translate3d(0, 36px, 0)';
      case 'down':
        return 'translate3d(0, -36px, 0)';
      case 'left':
        return 'translate3d(40px, 0, 0)';
      case 'right':
        return 'translate3d(-40px, 0, 0)';
      case 'zoom':
        return 'scale(0.94) translate3d(0, 20px, 0)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const style: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${durationMs}ms`,
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    transitionDelay: `${delayMs}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    willChange: 'opacity, transform',
  };

  return (
    <Component
      ref={ref as any}
      id={id}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
};
