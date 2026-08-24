import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import {
  Robot,
  Gear,
  Rocket,
} from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AngleBand } from "@/components/ui/AngleBand";
import { PricingLadder } from "@/components/ui/PricingLadder";
import { OfferCatalogSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Solutions | Joe's Tech Solutions",
  description:
    "What I can build for you. Three entry points: Setup, Operations, Custom Build. Start small, go big, or skip straight to custom.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "Solutions | Joe's Tech Solutions",
    description:
      "What I can build for you. Three entry points: Setup, Operations, Custom Build.",
    url: "https://www.joestechsolutions.com/solutions",
  },
};

const solutions = [
  {
    name: "Setup",
    price: "$199",
    icon: Robot,
    accent: "#d4541e",
    description:
      "Private AI on your machine or server. A 75-minute session, live, one on one. When we're done, you own it — no subscriptions, no data leaving your setup.",
    href: "/private-ai-setup",
    cta: "Get setup",
  },
  {
    name: "Operations",
    price: "$499/mo",
    icon: Gear,
    accent: "#d4541e",
    description:
      "An AI assistant running on your server, handling the stuff you don't want to think about — scheduling, outreach, reporting, daily briefings. I tune it every month so it gets better.",
    href: "/services#back-office",
    cta: "See Operations",
  },
  {
    name: "Custom Build",
    price: "from $2,500",
    icon: Rocket,
    accent: "#d4541e",
    description:
      "Mobile apps, web apps, full agent systems — built with the stack I use daily. React Native, Next.js, AI-assisted development, human-verified.",
    href: "/services#custom-build",
    cta: "Start a build",
  },
] as const;

const solutionAccent: Record<string, { iconBg: string; iconText: string; border: string; link: string }> = {
  "#d4541e": {
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    border: "border-foreground/10 hover:border-primary/50",
    link: "text-primary",
  },
  "#e8703f": {
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    border: "border-foreground/10 hover:border-primary/50",
    link: "text-primary",
  },
  "#8B5CF6": {
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    border: "border-foreground/10 hover:border-primary/50",
    link: "text-primary",
  },
};

export default function Solutions() {
  return (
    <div className="min-h-screen">
      <OfferCatalogSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.joestechsolutions.com" },
          { name: "Solutions", url: "https://www.joestechsolutions.com/solutions" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="absolute inset-0 bg-background" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-mono">
                <span className="block text-foreground mb-3">What I can build for you.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl sm:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-light">
                Three entry points. Start small, go big, or skip straight to custom. You don&apos;t have
                to know which one you need — that&apos;s what the first conversation is for.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3-Solution Grid */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {solutions.map((solution) => {
              const accent = solutionAccent[solution.accent];
              const Icon = solution.icon;
              return (
                <StaggerItem key={solution.name} className="h-full">
                  <AnimatedCard className="h-full">
                    <Card
                      className={`relative h-full bg-card ${accent.border} transition-[color,border-color,background-color] duration-500 overflow-hidden group p-8`}
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-background rounded-none blur-3xl" />
                      <div className="relative space-y-5">
                        <div
                          className={`w-16 h-16 ${accent.iconBg} rounded-none flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <Icon weight="duotone" className={`h-10 w-10 ${accent.iconText}`} />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground font-mono">
                          {solution.name}
                        </h2>
                        <p className={`font-semibold text-lg ${accent.iconText}`}>{solution.price}</p>
                        <p className="text-foreground/70 leading-relaxed">{solution.description}</p>
                        <Link
                          href={solution.href}
                          className={`inline-flex items-center gap-2 font-medium hover:underline ${accent.link}`}
                        >
                          {solution.cta}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </Card>
                  </AnimatedCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Full 3-Tier Ladder */}
      <PricingLadder />

      <AngleBand />

      {/* CTA */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-xl text-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Not sure which fits? Tell me what&apos;s not working and I&apos;ll tell you.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/contact">
              <MagneticButton strength={0.3}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/85 text-foreground text-lg px-12 py-7 rounded-none group shadow-2xl shadow-primary/20"
                >
                  Get in touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
