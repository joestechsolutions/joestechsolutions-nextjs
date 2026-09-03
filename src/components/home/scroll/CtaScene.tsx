"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { TextReveal } from "@/components/animations/TextReveal";

// Closing scene: full-bleed loop with a slow parallax, one line, two buttons.
export function CtaScene({ id = "contact" }: { id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      id={id}
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#071317] text-[#d9ece9]"
    >
      <motion.div className="absolute -inset-y-[12%] inset-x-0" style={reduced ? undefined : { y }} aria-hidden="true">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/generated/cta-loop-poster.jpg"
        >
          <source src="/generated/cta-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#071317]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071317] via-transparent to-[#071317]" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 text-center">
        <TextReveal>
          <p className="mb-4 font-mono text-[13px] font-bold">
            <span className="text-primary">$ </span>
            echo &quot;ready?&quot;
          </p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h2 className="mx-auto max-w-4xl font-mono text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.02] tracking-tight">
            If you made it this far, you already know if you want to{" "}
            <span className="text-primary">talk</span>.
          </h2>
        </TextReveal>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-block border-2 border-[#d9ece9] bg-[#d9ece9] px-8 py-3.5 font-mono text-sm font-bold text-[#071317] transition-colors hover:border-primary hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              get in touch
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a
              href="mailto:joe@joestechsolutions.com"
              className="inline-block border-2 border-[#d9ece9]/70 px-8 py-3.5 font-mono text-sm font-bold text-[#d9ece9] backdrop-blur-sm transition-colors hover:bg-[#d9ece9] hover:text-[#071317] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              email me
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
