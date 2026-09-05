import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AngleBand } from "@/components/ui/AngleBand";
import { PricingLadder } from "@/components/ui/PricingLadder";
import { OfferCatalogSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";
import { SITE_OG_IMAGE } from "@/lib/og-images";

export const metadata: Metadata = {
  title: "Solutions | Joe's Tech Solutions",
  description:
    "What I can build for you. Three entry points: Setup, Operations, Custom Build. Start small, go big, or skip straight to custom.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    images: [SITE_OG_IMAGE],
    title: "Solutions | Joe's Tech Solutions",
    description:
      "What I can build for you. Three entry points: Setup, Operations, Custom Build.",
    url: "https://www.joestechsolutions.com/solutions",
  },
};

const solutions = [
  {
    name: "Setup",
    accent: "#02a0a0",
    description:
      "Private AI on your machine or server. A 75-minute session, live, one on one. When we're done, you own it — no subscriptions, no data leaving your setup.",
    href: "/private-ai-setup",
    cta: "Get setup",
  },
  {
    name: "Operations",
    accent: "#02a0a0",
    description:
      "An AI assistant running on your server, handling the stuff you don't want to think about — scheduling, outreach, reporting, daily briefings. I tune it every month so it gets better.",
    href: "/services#back-office",
    cta: "See Operations",
  },
  {
    name: "Custom Build",
    accent: "#02a0a0",
    description:
      "Mobile apps, web apps, full agent systems — built with the stack I use daily. React Native, Next.js, AI-assisted development, human-verified.",
    href: "/services#custom-build",
    cta: "Start a build",
  },
] as const;

const solutionAccent: Record<string, { iconBg: string; iconText: string; border: string; link: string }> = {
  "#02a0a0": {
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    border: "border-foreground/10 hover:border-primary/50",
    link: "text-primary",
  },
  "#f5a94f": {
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    border: "border-foreground/10 hover:border-primary/50",
    link: "text-primary",
  },
  "#ffbd65": {
    iconBg: "bg-primary/10",
    iconText: "text-primary",
    border: "border-foreground/10 hover:border-primary/50",
    link: "text-primary",
  },
};

// 3dicons renders (CC0) in public/icons — one per tier.
const solutionIcon: Record<string, string> = {
  Setup: "/icons/computer-dynamic/premium.png",
  Operations: "/icons/tools-dynamic/premium.png",
  "Custom Build": "/icons/rocket-dynamic/premium.png",
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
      <PageHero
        eyebrow="cat solutions.md"
        title="What I can build for you."
        highlight="build"
        subtitle="Three entry points. Start small, go big, or skip straight to custom. You don't have to know which one you need — that's what the first conversation is for."
        media={{ type: "video", src: "/generated/page-solutions-loop.mp4", poster: "/generated/page-solutions-loop-poster.jpg" }}
      />

      {/* 3-Solution Grid */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {solutions.map((solution) => {
              const accent = solutionAccent[solution.accent];
              return (
                <StaggerItem key={solution.name} className="h-full">
                  <AnimatedCard className="h-full">
                    <Card
                      className={`relative h-full bg-card ${accent.border} transition-[color,border-color,background-color] duration-500 overflow-hidden group p-8`}
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-background rounded-none blur-3xl" />
                      <div className="relative space-y-5">
                        <Image
                          src={solutionIcon[solution.name]}
                          alt={`${solution.name} solution icon`}
                          width={96}
                          height={96}
                          className="h-24 w-24 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
                        />
                        <h2 className="text-2xl font-bold text-foreground font-mono">
                          {solution.name}
                        </h2>
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

      <CtaScene id="cta" />
    </div>
  );
}
