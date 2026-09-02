"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

// The hero is a shell session that types itself:
// whoami → status → cat pitch.txt, then the pitch appears.
const STEPS = [
  { cmd: "whoami" },
  { cmd: "status" },
  { cmd: "cat pitch.txt" },
] as const;

const TYPE_MS = 55;
const PAUSE_MS = 350;
const OUT_MS = 180;

export function TerminalHero() {
  const reducedMotion = useReducedMotion();
  // typed[i] = chars of STEPS[i].cmd typed so far; shown = outputs revealed
  const [typed, setTyped] = useState<number[]>([0, 0, 0]);
  const [shown, setShown] = useState<boolean[]>([false, false, false]);
  const [started, setStarted] = useState(false);
  const done = shown[2];

  useEffect(() => {
    if (reducedMotion) {
      // Reduced motion: render the finished session immediately. The hook's
      // value is only reliable on the client, so this must live in an effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTyped(STEPS.map((s) => s.cmd.length));
      setShown([true, true, true]);
      return;
    }
    const t = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  useEffect(() => {
    if (!started) return;
    const step = shown.findIndex((s) => !s);
    if (step === -1) return;
    const cmd = STEPS[step].cmd;
    if (typed[step] < cmd.length) {
      const t = setTimeout(
        () =>
          setTyped((prev) => {
            const next = [...prev];
            next[step] = prev[step] + 1;
            return next;
          }),
        typed[step] === 0 ? PAUSE_MS : TYPE_MS
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () =>
        setShown((prev) => {
          const next = [...prev];
          next[step] = true;
          return next;
        }),
      OUT_MS
    );
    return () => clearTimeout(t);
  }, [started, typed, shown]);

  const line = (i: number) => (
    <div className="min-h-[22px] font-mono text-sm">
      <span className="font-bold text-primary">joe@jts:~$</span>{" "}
      <span className="font-bold text-foreground">
        {STEPS[i].cmd.slice(0, typed[i])}
      </span>
      {!done && shown.findIndex((s) => !s) === i && (
        <span className="ml-px inline-block h-[17px] w-[9px] animate-pulse bg-primary align-text-bottom" />
      )}
    </div>
  );

  const out = (visible: boolean) =>
    `ml-4 font-mono text-sm text-muted-foreground transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:gap-8">
          <div className="min-w-0 flex-1">
            {line(0)}
            <div className={out(shown[0])}>
              joe blas — ai developer, multi-agent systems builder
            </div>

            <div className="mt-3.5">{line(1)}</div>
            <div className={out(shown[1])}>
              currently operating —{" "}
              <em className="not-italic font-bold text-[var(--ok)]">
                40+ automations, 24/7
              </em>
            </div>

            <div className="mt-3.5">{line(2)}</div>
          </div>

          <figure
            className={`shrink-0 transition-opacity duration-500 ${shown[0] ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative h-[120px] w-[120px] border-2 border-foreground shadow-[6px_6px_0_var(--primary)] sm:h-[148px] sm:w-[148px]">
              <Image
                src="/images/joe-profile.jpg"
                alt="Joe at his desk, code on the monitors behind him"
                fill
                priority
                sizes="148px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 max-w-[148px] font-mono text-[11px] text-muted-foreground">
              <span className="text-primary"># </span>
              the guy who answers the email
            </figcaption>
          </figure>
        </div>

        <div
          className={`transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}
        >
          <h1 className="mb-5 mt-7 font-mono text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-[42px]">
            I build the tools
            <br />
            your <span className="text-primary">business</span> runs on.
          </h1>
          <p className="mb-2.5 max-w-[580px] text-[15px] text-foreground/80">
            Custom software, automation, and AI — built for small businesses
            that just need things to work. I test everything on myself first. If
            it survives me, it&apos;ll survive you.
          </p>
          <p className="mb-2.5 max-w-[580px] text-[15px] text-foreground/80">
            No discovery calls. No 40-page proposals. Tell me what&apos;s not
            working. I&apos;ll build the fix and leave it running.
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <Link
              href="/contact"
              className="border-2 border-foreground bg-foreground px-6 py-2.5 font-mono text-sm font-bold text-background transition-colors hover:border-primary hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              get in touch
            </Link>
            <Link
              href="/services"
              className="border-2 border-foreground px-6 py-2.5 font-mono text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              see what I do
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
