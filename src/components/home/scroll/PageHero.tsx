"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export type HeroMedia =
  | { type: "video"; src: string; poster: string; position?: string }
  | { type: "image"; src: string; alt?: string; position?: string };

// Cinematic hero for inner pages: full-bleed media graded into the brand, a
// `$ command` eyebrow, a headline that lands word by word, and a scroll push-in.
// `highlight` picks which title word turns turquoise.
export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  media,
  children,
  size = "default",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
  media: HeroMedia;
  children?: ReactNode;
  size?: "default" | "tall";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const words = title.split(" ");
  const pos = media.position ?? "50% 50%";

  return (
    <section
      ref={ref}
      className={`relative flex items-end overflow-hidden bg-[#071317] text-[#d9ece9] ${
        size === "tall" ? "min-h-[calc(100svh-4rem)]" : "min-h-[72svh]"
      }`}
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale: mediaScale, opacity: mediaOpacity }}
        aria-hidden="true"
      >
        {media.type === "video" ? (
          <video
            className="h-full w-full object-cover"
            style={{ objectPosition: pos }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={media.poster}
          >
            <source src={media.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={media.src}
            alt={media.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: pos }}
          />
        )}
        <div className="absolute inset-0 bg-[#02a0a0]/25 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071317] via-[#071317]/65 to-[#071317]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071317]/70 to-transparent" />
      </motion.div>

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-24 sm:pb-20"
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          className="mb-5 font-mono text-[13px] font-bold text-[#8fa8a5]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-primary">$ </span>
          {eyebrow}
        </motion.p>
        <h1 className="max-w-5xl font-mono text-[clamp(2.25rem,6vw,5.5rem)] font-bold leading-[1.0] tracking-tight">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pr-[0.28em] align-top">
              <motion.span
                className={`inline-block ${highlight && w.replace(/[.,!?]/g, "") === highlight ? "text-primary" : ""}`}
                initial={reduced ? false : { y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        {subtitle && (
          <motion.div
            className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-[#d9ece9]/80 sm:text-lg"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </motion.div>
        )}
        {children && (
          <motion.div
            className="mt-8 flex flex-wrap gap-3.5"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

// Button styles that sit on the dark hero regardless of theme.
export const heroPrimaryBtn =
  "inline-block border-2 border-[#d9ece9] bg-[#d9ece9] px-6 py-3 font-mono text-sm font-bold text-[#071317] transition-colors hover:border-primary hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
export const heroSecondaryBtn =
  "inline-block border-2 border-[#d9ece9]/70 px-6 py-3 font-mono text-sm font-bold text-[#d9ece9] backdrop-blur-sm transition-colors hover:bg-[#d9ece9] hover:text-[#071317] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
