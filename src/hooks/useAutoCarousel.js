import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function useAutoCarousel(length, { delay = 3000 } = {}) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % length);
      }, delay);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused, prefersReducedMotion, delay, length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + length) % length);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % length);
      if (e.key === ' ' || e.key === 'Spacebar') setIsPaused((p) => !p);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [length]);

  return {
    index,
    setIndex,
    isPaused,
    setIsPaused,
    prev: () => setIndex((i) => (i - 1 + length) % length),
    next: () => setIndex((i) => (i + 1) % length),
    prefersReducedMotion,
  };
}
