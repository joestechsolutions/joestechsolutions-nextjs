"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  stagger?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
  stagger = 0,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.01, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  const offset = directionOffset[direction];

  if (stagger > 0) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, ...offset },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
              duration,
              ease: [0.21, 0.47, 0.32, 0.98],
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...offset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
