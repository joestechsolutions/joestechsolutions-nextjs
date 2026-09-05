"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

interface ScrollCountUpProps {
  to: number;
  from?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/**
 * Counts up as the element scrolls into view: the number tracks the
 * element's own progress through the viewport. It hits its final value
 * when the element is halfway up the screen — so fast scrollers always
 * see the true total, never a half-count.
 */
export function ScrollCountUp({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  className = "",
}: ScrollCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);
  const reducedMotion = useReducedMotion();
  const settledRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (settledRef.current) return;
    if (reducedMotion || p >= 1) {
      settledRef.current = true;
      setValue(to);
      return;
    }
    // ease-out: most of the count happens early so the number is
    // believable almost immediately, exact by halfway
    const t = Math.min(Math.max(p, 0), 1);
    const eased = t * (2 - t);
    const next = Math.round(from + (to - from) * eased);
    setValue((prev) => (next !== prev ? next : prev));
    if (t >= 1) settledRef.current = true;
  });

  useEffect(() => {
    if (reducedMotion) {
      setValue(to);
      settledRef.current = true;
    }
  }, [reducedMotion, to]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
