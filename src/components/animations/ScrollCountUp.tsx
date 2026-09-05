"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

interface ScrollCountUpProps {
  to: number;
  from?: number;
  suffix?: string;
  prefix?: string;
  /** Scroll progress (0-1) at which the count starts */
  startProgress?: number;
  /** Scroll progress (0-1) at which the count completes */
  endProgress?: number;
  className?: string;
}

/**
 * Counts up driven by page scroll position: the number advances as the
 * user scrolls down through [startProgress, endProgress] of the page,
 * rather than animating on a fixed timer after entry.
 */
export function ScrollCountUp({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  startProgress = 0.02,
  endProgress = 0.22,
  className = "",
}: ScrollCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const easedFor = (raw: number) => {
    // ease-out on the local window so most of the count happens early in the scroll band
    const t = Math.min(Math.max(raw, 0), 1);
    return t * (2 - t);
  };

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reducedMotion) {
      setValue(to);
      return;
    }
    const local = (progress - startProgress) / Math.max(endProgress - startProgress, 0.001);
    const eased = easedFor(local);
    const next = Math.round(from + (to - from) * eased);
    setValue((prev) => (next !== prev ? next : prev));
  });

  // Settle at the target once scrolled past the band (also covers reduced motion + initial below-band paint)
  useEffect(() => {
    if (reducedMotion) {
      setValue(to);
      return;
    }
    // If the page loads already scrolled past the band (refresh mid-page), jump to target
    const initial = scrollYProgress.get();
    if (initial >= endProgress) setValue(to);
  }, [reducedMotion, to, scrollYProgress, endProgress]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}