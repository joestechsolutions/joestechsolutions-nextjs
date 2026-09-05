"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Check } from "@phosphor-icons/react";
import { useMediaQuery } from "./useMediaQuery";
import { SectionLabel } from "./SectionLabel";

// 3dicons renders (CC0) that live in public/icons — one per tier.
const tierIcon: Record<string, string> = {
  "quick-start": "/icons/computer-dynamic/premium.png",
  "back-office": "/icons/tools-dynamic/premium.png",
  "custom-build": "/icons/rocket-dynamic/premium.png",
};

export type ServiceCard = {
  id: string;
  name: string;
  category: string;
  blurb: string;
  features: string[];
  badge?: string;
  href: string;
  cta: string;
  specs?: { k: string; v: string }[];
};

// Pinned section that scrolls sideways: the page keeps scrolling down while the
// three tiers slide across. Falls back to a vertical stack on small screens and
// under reduced motion.
export function HorizontalServices({ cards }: { cards: ServiceCard[] }) {
  const wide = useMediaQuery("(min-width: 768px)");
  const reduced = useReducedMotion();
  const pinned = wide && !reduced;

  return pinned ? <Pinned cards={cards} /> : <Stacked cards={cards} />;
}

function Pinned({ cards }: { cards: ServiceCard[] }) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const range = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(() => -range.get() * scrollYProgress.get());

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (t) range.set(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [range]);

  return (
    <section ref={ref} id="services" className="relative h-[320vh] border-b border-border bg-background text-foreground">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden">
        <motion.div ref={trackRef} className="flex items-stretch gap-8 pl-6 pr-[12vw] sm:pl-[max(1.5rem,calc((100vw-72rem)/2))]" style={{ x }}>
          <Intro />
          {cards.map((c, i) => (
            <Card key={c.id} card={c} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stacked({ cards }: { cards: ServiceCard[] }) {
  return (
    <section id="services" className="border-b border-border bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Intro />
        <div className="mt-10 flex flex-col gap-6">
          {cards.map((c, i) => (
            <Card key={c.id} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <div className="flex w-[min(80vw,26rem)] shrink-0 flex-col justify-center">
      <SectionLabel>cat services.md</SectionLabel>
      <h2 className="font-mono text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
        Three ways
        <br />I work with you.
      </h2>
      <p className="mt-5 max-w-[360px] text-[15px] text-foreground/75">
        No discovery calls. No 40-page proposals. Tell me what&apos;s not working.
        I&apos;ll build the fix and leave it running.
      </p>
      <p className="mt-8 hidden font-mono text-[11px] tracking-[0.3em] text-muted-foreground md:block" aria-hidden="true">
        SCROLL →
      </p>
    </div>
  );
}

function Card({ card, index }: { card: ServiceCard; index: number }) {
  return (
    <article
      className={`relative flex w-[min(86vw,40rem)] shrink-0 flex-col border-2 border-foreground bg-card p-7 sm:p-10 ${
        card.badge ? "shadow-[10px_10px_0_var(--primary)]" : "shadow-[10px_10px_0_var(--border)]"
      }`}
    >
      <p className="mb-6 flex items-center justify-between font-mono text-[11px] tracking-wider text-muted-foreground">
        <span>
          {card.badge ? (
            <>
              [ <span className="font-bold text-primary">{card.badge.toUpperCase()}</span> ]{" "}
              {card.category.toLowerCase()}
            </>
          ) : (
            `[ ${card.category.toLowerCase()} ]`
          )}
        </span>
        <span className="font-bold">0{index + 1}</span>
      </p>
      {tierIcon[card.id] && (
        <Image
          src={tierIcon[card.id]}
          alt={`${card.name} tier icon`}
          width={112}
          height={112}
          className="pointer-events-none absolute right-7 top-14 h-24 w-24 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] sm:h-28 sm:w-28"
        />
      )}
      <h3 className="font-mono text-3xl font-bold leading-none tracking-tight sm:text-5xl">
        <span className="text-primary">▸ </span>
        {card.name}
      </h3>
      <p className="mt-5 max-w-[520px] text-[15px] text-foreground/80">{card.blurb}</p>
      {card.specs && (
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {card.specs.map((m, j) => (
            <span key={m.k}>
              {m.k}: <span className="font-bold text-foreground">{m.v}</span>
              {j < card.specs!.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      )}
      <ul className="mt-6 grid gap-2 font-mono text-[13px] text-foreground/85 sm:grid-cols-2">
        {card.features.map((f) => (
          <li key={f} className="flex gap-2">
            <Check weight="bold" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Link
          href={card.href}
          className="inline-block border-2 border-foreground bg-foreground px-5 py-2.5 font-mono text-sm font-bold text-background transition-colors hover:border-primary hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {card.cta}
        </Link>
      </div>
    </article>
  );
}
