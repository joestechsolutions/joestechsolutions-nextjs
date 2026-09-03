"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

// Pinned scene: scrolling scrubs the background video frame by frame while
// three beats of the pitch swap in place. The encode is all-keyframe so every
// seek lands instantly.
const BEATS = [
  {
    k: "01",
    h: "Not a chatbot.",
    p: "A multi-agent system that runs my business — briefings, project stewards, watchdogs, content, ops. Coding, research, outreach.",
  },
  {
    k: "02",
    h: "16 agents. 24/7. My own hardware.",
    p: "Self-hosted orchestration. No data leaves the building. I ran it on myself for a year before I let it near a client.",
  },
  {
    k: "03",
    h: "Now running for clients.",
    p: "The same system, tuned to your business. Set up in an afternoon, maintained every month, owned by you.",
  },
];

export function ScrubScene() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // Force the buffer so seeks don't stall on first scroll.
    videoRef.current?.load();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || reduced || !Number.isFinite(v.duration)) return;
    const t = p * Math.max(v.duration - 0.05, 0);
    if (Math.abs(v.currentTime - t) > 0.015) v.currentTime = t;
  });

  if (reduced) {
    return (
      <section className="bg-[#071317] text-[#d9ece9]">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-24">
          {BEATS.map((b) => (
            <BeatCopy key={b.k} {...b} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[340vh] bg-[#071317] text-[#d9ece9]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster="/videos/scrub-system-poster.jpg"
          aria-hidden="true"
        >
          <source src="/videos/scrub-system.mp4" type="video/mp4" />
        </video>
        {/* Recolor the footage into the brand: teal grade, then midnight falloff */}
        <div className="absolute inset-0 bg-[#02a0a0] opacity-80 mix-blend-color" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071317] via-[#071317]/75 to-[#071317]/35" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#071317]/35" aria-hidden="true" />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-[2rem_1fr] gap-6 px-6 sm:grid-cols-[3rem_1fr] sm:gap-10">
          <Rail progress={scrollYProgress} />
          <div className="relative min-h-[46vh]">
            {BEATS.map((b, i) => (
              <Beat key={b.k} i={i} n={BEATS.length} beat={b} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Rail({ progress }: { progress: MotionValue<number> }) {
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="relative h-[46vh] w-px bg-[#d9ece9]/15" aria-hidden="true">
      <motion.div className="absolute left-0 top-0 w-px bg-primary" style={{ height: fill }} />
      {BEATS.map((b, i) => (
        <span
          key={b.k}
          className="absolute -left-[3px] h-[7px] w-[7px] bg-[#071317] ring-1 ring-[#d9ece9]/40"
          style={{ top: `${(i / (BEATS.length - 1)) * 100}%` }}
        />
      ))}
    </div>
  );
}

function Beat({
  i,
  n,
  beat,
  progress,
}: {
  i: number;
  n: number;
  beat: (typeof BEATS)[number];
  progress: MotionValue<number>;
}) {
  // Active beat = which third of the pinned range we're in. Framer tweens the
  // swap so a fast scroll still reads as a cut, not a flicker.
  const [state, setState] = useState<"before" | "active" | "after">(i === 0 ? "active" : "before");
  useMotionValueEvent(progress, "change", (p) => {
    const idx = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    const next = idx === i ? "active" : idx < i ? "before" : "after";
    if (next !== state) setState(next);
  });

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      initial={false}
      animate={{
        opacity: state === "active" ? 1 : 0,
        y: state === "active" ? 0 : state === "before" ? 48 : -48,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: state === "active" ? "auto" : "none" }}
      aria-hidden={state !== "active"}
    >
      <BeatCopy {...beat} />
    </motion.div>
  );
}

function BeatCopy({ k, h, p }: (typeof BEATS)[number]) {
  return (
    <>
      <p className="mb-4 font-mono text-[12px] font-bold tracking-[0.3em] text-primary">
        {k} / {String(BEATS.length).padStart(2, "0")}
      </p>
      <h2 className="max-w-4xl font-mono text-[clamp(2rem,6vw,5.25rem)] font-bold leading-[1.02] tracking-tight">
        {h}
      </h2>
      <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-[#d9ece9]/80 sm:text-lg">
        {p}
      </p>
    </>
  );
}
