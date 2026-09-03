import Link from "next/link";
import { SectionLabel } from "./SectionLabel";

export type StackItem = { pkg: string; desc: string; url: string };

// Two counter-scrolling rows of the stack. Pure CSS animation (see globals.css
// .marquee-track) — pauses on hover, static under reduced motion.
export function StackMarquee({ items }: { items: StackItem[] }) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <section id="stack" className="overflow-hidden border-b border-border bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <SectionLabel>cat /etc/stack.txt</SectionLabel>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">What I actually run.</h2>
          <Link
            href="/stack"
            className="border-b-2 border-primary font-mono text-[13px] font-bold transition-colors hover:text-primary"
          >
            see the live stack →
          </Link>
        </div>
      </div>

      <div className="space-y-4 pb-24">
        {rows.map((row, r) => (
          <div key={r} className="marquee border-y border-border/60 py-3">
            <div
              className="marquee-track flex w-max items-baseline gap-10 whitespace-nowrap px-5"
              data-reverse={r === 1}
              style={{ "--marquee-duration": `${34 + r * 10}s` } as React.CSSProperties}
            >
              {[...row, ...row].map((t, i) => (
                <a
                  key={`${t.pkg}-${i}`}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-mono"
                  aria-hidden={i >= row.length}
                  tabIndex={i >= row.length ? -1 : undefined}
                >
                  <span className="text-3xl font-bold tracking-tight transition-colors group-hover:text-primary sm:text-5xl">
                    {t.pkg}
                  </span>
                  <span className="ml-3 text-sm text-muted-foreground">— {t.desc}</span>
                  <span className="ml-10 text-primary" aria-hidden="true">·</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
