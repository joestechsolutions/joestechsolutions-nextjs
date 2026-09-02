import { FadeIn } from "@/components/animations/FadeIn";

// Approved positioning angle — verbatim copy, do not paraphrase.
export function AngleBand() {
  return (
    <section className="relative py-16 sm:py-20 border-y border-foreground/5 bg-card/40">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <FadeIn>
          <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed font-light text-center">
            I test everything on myself first. One orchestrator, 40+ automations, running 24/7 on my
            own hardware. If it doesn&apos;t survive me, it doesn&apos;t ship to you.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
