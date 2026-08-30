import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import type { Tier } from "@/lib/tiers";

// Static class maps per accent so Tailwind can see every class at build time.
const accentStyles: Record<
  Tier["accent"],
  { border: string; text: string; check: string; badge: string; button: string }
> = {
  "#02a0a0": {
    border: "border-primary/30 hover:border-primary/50",
    text: "text-primary",
    check: "text-primary",
    badge: "bg-primary/15 text-primary",
    button: "bg-primary hover:bg-primary/85 shadow-primary/20",
  },
  "#f5a94f": {
    border: "border-primary/30 hover:border-primary/50",
    text: "text-primary",
    check: "text-primary",
    badge: "bg-primary/20 text-primary",
    button: "bg-primary hover:bg-primary/85 shadow-primary/20",
  },
  "#ffbd65": {
    border: "border-primary/30 hover:border-primary/50",
    text: "text-primary",
    check: "text-primary",
    badge: "bg-primary/20 text-primary",
    button: "bg-primary hover:bg-primary shadow-primary/20",
  },
};

// Tier detail pages that exist today. /morning-brief and /business-os ship in Phase 3.
const liveDetailPages = new Set(["/private-ai-setup", "/agent-system"]);

export function tierCtaHref(tier: Tier) {
  return tier.stripeReady ? tier.href : `/contact?tier=${tier.id}`;
}

export function TierCard({ tier }: { tier: Tier }) {
  const accent = accentStyles[tier.accent];
  const ctaHref = tierCtaHref(tier);
  const showLearnMore = ctaHref !== tier.href && liveDetailPages.has(tier.href);

  return (
    <AnimatedCard className="h-full">
      <Card
        className={`relative h-full flex flex-col bg-card ${accent.border} transition-[color,border-color,background-color] duration-500 overflow-hidden group p-8`}
      >
        {tier.badge && (
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-none text-sm font-medium z-10 ${accent.badge}`}
          >
            {tier.badge}
          </div>
        )}
        <div className="absolute top-0 right-0 w-64 h-64 bg-background rounded-none blur-3xl" />

        <div className="relative flex flex-col flex-1 space-y-5">
          <div>
            <p className={`text-sm font-semibold mb-1 ${accent.text}`}>{tier.category}</p>
            <h3 className="text-2xl font-bold text-foreground font-mono">{tier.name}</h3>
          </div>

          <p className="text-foreground/80 leading-relaxed font-light">{tier.blurb}</p>

          <div className="space-y-3 flex-1">
            {tier.features.map((feature) => (
              <div key={feature} className="flex items-start">
                <CheckCircle
                  weight="duotone"
                  className={`h-6 w-6 mr-3 shrink-0 mt-0.5 ${accent.check}`}
                />
                <span className="text-foreground/80 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <Link href={ctaHref} className="block">
              <Button
                className={`w-full text-foreground rounded-none group/btn shadow-lg ${accent.button}`}
              >
                {tier.stripeReady ? "Get Started" : "Talk to Me About This"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {showLearnMore && (
              <p className="text-center text-sm">
                <Link href={tier.href} className={`hover:underline ${accent.text}`}>
                  Learn more about {tier.name} →
                </Link>
              </p>
            )}
          </div>
        </div>
      </Card>
    </AnimatedCard>
  );
}
