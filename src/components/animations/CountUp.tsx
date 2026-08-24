"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          if (prefersReducedMotion) {
            setValue(to);
            return;
          }
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / (duration * 1000), 1);
            // ease-out quad approximation of cubic-bezier(0.21, 0.47, 0.32, 0.98)
            const eased = t < 1 ? t * (2 - t) : 1;
            setValue(Math.round(from + (to - from) * eased));
            if (t < 1) rafRef.current = requestAnimationFrame(tick);
          };
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  );
}
