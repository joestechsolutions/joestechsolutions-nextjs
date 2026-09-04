"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Full-bleed video hero. The headline lands word by word on load; on scroll the
// video pushes in and dims while the copy drifts up and out.
const WORDS = ["I", "build", "the", "tools", "your", "business", "runs", "on."];
const EASE = [0.22, 1, 0.36, 1] as const;

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-[#071317] text-[#d9ece9]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale: videoScale, opacity: videoOpacity }}
        aria-hidden="true"
      >
        <video
          className="h-full w-full object-cover object-[50%_35%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/generated/hero-loop-poster.jpg"
        >
          <source src="/generated/hero-loop.mp4" type="video/mp4" />
        </video>
        {/* Brand grade: pull the footage toward midnight + turquoise */}
        <div className="absolute inset-0 bg-[#02a0a0]/20 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071317] via-[#071317]/60 to-[#071317]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071317]/70 to-transparent" />
      </motion.div>

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-28 sm:pb-28"
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          className="mb-6 font-mono text-sm text-[#8fa8a5]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="font-bold text-primary">joe@jts:~$</span> whoami
          <br />
          <span className="text-[#d9ece9]">joe blas — ai developer, multi-agent systems builder</span>
        </motion.p>

        <h1 className="max-w-5xl font-mono text-[clamp(2.6rem,7.5vw,6.75rem)] font-bold leading-[0.98] tracking-tight">
          {WORDS.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pr-[0.28em] align-top">
              <motion.span
                className={`inline-block ${w === "business" ? "text-primary" : ""}`}
                initial={reduced ? false : { y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.25 + i * 0.07, ease: EASE }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-7 max-w-[560px] text-[15px] leading-relaxed text-[#d9ece9]/80 sm:text-lg"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
        >
          Custom software, automation, and AI — built for small businesses that
          just need things to work. I test everything on myself first. If it
          survives me, it&apos;ll survive you.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap gap-3.5"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
        >
          <Link
            href="/contact"
            className="border-2 border-[#d9ece9] bg-[#d9ece9] px-6 py-3 font-mono text-sm font-bold text-[#071317] transition-colors hover:border-primary hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            get in touch
          </Link>
          <Link
            href="/services"
            className="border-2 border-[#d9ece9]/70 px-6 py-3 font-mono text-sm font-bold text-[#d9ece9] backdrop-blur-sm transition-colors hover:bg-[#d9ece9] hover:text-[#071317] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            see what I do
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center font-mono text-[10px] tracking-[0.35em] text-[#8fa8a5] sm:flex"
        style={reduced ? undefined : { opacity: cueOpacity }}
        aria-hidden="true"
      >
        SCROLL
        <span className="mt-2 block h-9 w-px animate-pulse bg-primary" />
      </motion.div>
    </section>
  );
}
