'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook that returns a ref and a boolean indicating if the element is in view.
 * Attach the ref to the element you want to animate.
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -60px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

/**
 * Hook for animating a list of child items with stagger.
 * Returns a ref to attach to the parent container and an array of
 * visible-state booleans, one per child index.
 */
export function useStaggerAnimation<T extends HTMLElement>(
  count: number,
  options: UseScrollAnimationOptions = {}
): [RefObject<T | null>, boolean[]] {
  const [containerRef, containerVisible] = useScrollAnimation<T>(options);
  const [visibles, setVisibles] = useState<boolean[]>(Array(count).fill(false));

  useEffect(() => {
    if (!containerVisible) return;

    // Stagger each item's visibility
    const timers = Array.from({ length: count }, (_, i) =>
      setTimeout(() => {
        setVisibles(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 100)
    );

    return () => timers.forEach(clearTimeout);
  }, [containerVisible, count]);

  return [containerRef, visibles];
}
