"use client";

import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedCard({ children, className = "" }: AnimatedCardProps) {
  return (
    <div
      className={`transition-transform ease-[cubic-bezier(0.21,0.47,0.32,0.98)] duration-300 motion-reduce:transform-none motion-reduce:transition-none [@media(hover:hover)]:hover:[transform:scale(1.02)_translateY(-0.5rem)] active:[transform:scale(0.98)] active:duration-100 ${className}`}
    >
      {children}
    </div>
  );
}
