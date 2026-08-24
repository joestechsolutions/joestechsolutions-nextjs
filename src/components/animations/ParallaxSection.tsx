"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const speedMultiplier = direction === "down" ? -1 : 1;
  const yRange = 100 * speed * speedMultiplier;
  const yValue = useTransform(scrollYProgress, [0, 1], [yRange, -yRange]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: yValue, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
