
import React, { useState, useLayoutEffect } from 'react';

// FIX: Export Ripple interface to be used in components
export interface Ripple {
  key: number;
  x: number;
  y: number;
  size: number;
}

export const useRipple = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useLayoutEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples([]);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples.length]);

  const addRipple = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rippleContainer.width, rippleContainer.height);
    const x = event.clientX - rippleContainer.left - size / 2;
    const y = event.clientY - rippleContainer.top - size / 2;

    const newRipple: Ripple = {
      key: Date.now(),
      x,
      y,
      size,
    };

    setRipples(prevRipples => [...prevRipples, newRipple]);
  };

  // FIX: Return ripple state instead of JSX elements to avoid JSX in a .ts file
  return { ripples, addRipple };
};
