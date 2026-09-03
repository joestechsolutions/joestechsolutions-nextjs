"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

export type PortfolioItem = {
  status: string;
  live: boolean;
  name: string;
  desc: string;
  href: string;
  image: string;
  alt: string;
};

// Cards pin at the same top offset and stack: each new one slides over the last,
// which eases back and dims like a deck being dealt.
export function StackedPortfolio({ items }: { items: PortfolioItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="portfolio" className="border-b border-border bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <SectionLabel>ls -la /proof_of_work/</SectionLabel>
        <h2 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
          Real things I&apos;ve built.
        </h2>
      </div>
      <div ref={ref} className="relative mx-auto max-w-6xl px-6 pb-24">
        {items.map((item, i) => (
          <Card key={item.name} item={item} i={i} n={items.length} progress={scrollYProgress} reduced={!!reduced} />
        ))}
      </div>
    </section>
  );
}

function Card({
  item,
  i,
  n,
  progress,
  reduced,
}: {
  item: PortfolioItem;
  i: number;
  n: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const seg = 1 / n;
  const scale = useTransform(progress, [i * seg, (i + 1) * seg], [1, 0.92]);
  const dim = useTransform(progress, [i * seg, (i + 1) * seg], [1, 0.55]);
  const brightness = useTransform(dim, (b) => `brightness(${b})`);
  const last = i === n - 1;
  const isIcon = item.image.includes("icon");

  return (
    <div className="sticky top-24 mt-8 pb-[8vh] sm:mt-10">
      <motion.article
        className="grid overflow-hidden border-2 border-foreground bg-card shadow-[10px_10px_0_var(--primary)] md:grid-cols-[1.15fr_1fr]"
        style={reduced || last ? undefined : { scale, filter: brightness, transformOrigin: "top center" }}
      >
        <Link href={item.href} className="group relative block min-h-[40vh] bg-[var(--panel)] md:min-h-[58vh]">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            className={`transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${
              isIcon ? "object-contain p-16" : "object-cover object-top"
            }`}
          />
        </Link>
        <div className="flex flex-col p-7 sm:p-10">
          <p className={`font-mono text-[11px] font-bold ${item.live ? "text-[var(--ok)]" : "text-muted-foreground/70"}`}>
            {item.status}
          </p>
          <h3 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-4xl">{item.name}</h3>
          <p className="mt-4 max-w-[440px] text-[15px] text-muted-foreground">{item.desc}</p>
          <div className="mt-auto pt-8">
            <Link
              href={item.href}
              className="border-b-2 border-primary font-mono text-sm font-bold transition-colors hover:text-primary"
            >
              view →
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
