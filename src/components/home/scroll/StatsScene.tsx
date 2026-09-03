"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CountUp } from "@/components/animations/CountUp";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionLabel } from "./SectionLabel";

// The numbers, big. Each counts up on entry; the rule under them draws with scroll.
const STATS = [
  { to: 40, suffix: "+", label: "automations on schedule" },
  { to: 3, suffix: "", label: "live client deployments" },
  { to: 3, suffix: "", label: "watchdogs watching the watchers" },
  { to: 24, suffix: "/7", label: "self-hosted, always on" },
];

export function StatsScene() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rule = useTransform(scrollYProgress, [0.15, 0.55], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative border-b border-border bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <SectionLabel>status --verbose</SectionLabel>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            Currently operating.
          </h2>
          <p className="font-mono text-sm font-bold text-[var(--ok)]">● system operational</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <p className="font-mono text-[clamp(3rem,8vw,6.5rem)] font-bold leading-none tracking-tighter">
                <CountUp to={s.to} suffix={s.suffix} duration={1.6} />
              </p>
              <p className="mt-4 max-w-[220px] font-mono text-[12.5px] leading-snug text-muted-foreground">
                <span className="text-primary"># </span>
                {s.label}
              </p>
            </FadeIn>
          ))}
        </div>

        <motion.div
          className="mt-16 h-[3px] bg-primary"
          style={reduced ? { width: "100%" } : { width: rule }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
