import type { Metadata } from "next";
import { lastUpdated, models, services, tools, stats } from "./data";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Database, Wrench, GitBranch, Brain, Cloud, Desktop, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";

export const metadata: Metadata = {
  title: "The Stack | Joe's Tech Solutions",
  description: "The actual AI infrastructure powering Joe's Tech Solutions — 14 AI agents, Claude Opus 5 + Fable 5/5.1 + 24 cloud models, 10 services, 68K+ indexed code nodes. Updated live.",
  alternates: {
    canonical: '/stack',
  },
  openGraph: {
    title: "The Stack | Joe's Tech Solutions",
    description: "The actual AI infrastructure powering JTS — 14 AI agents, Claude Opus 5 + Fable 5/5.1 + 24 cloud models, 10 services, 68K+ indexed code nodes.",
    url: 'https://www.joestechsolutions.com/stack',
  },
};

export default function StackPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageHero
        eyebrow={`uptime --live · updated ${lastUpdated}`}
        title="The Stack. No Smoke."
        highlight="Smoke"
        subtitle="This isn't a list of tools I read about. This is what's running right now — the models, services, and infrastructure I use to build everything you see on this site."
        media={{ type: "video", src: "/generated/page-stack-loop.mp4", poster: "/generated/page-stack-loop-poster.jpg" }}
      />

      {/* Stats Bar */}
      <section className="relative py-12 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <Card className="bg-card border-foreground/10 text-center">
                  <CardContent className="pt-6 pb-6">
                    <div className="text-4xl font-bold text-primary font-mono">{stat.value}</div>
                    <div className="text-sm text-foreground/60 mt-2">{stat.label}</div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Models */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary/10 rounded-none flex items-center justify-center">
                <Cpu weight="duotone" className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-mono">Models</h2>
                <p className="text-foreground/60 mt-1">Claude Opus 5 + Fable 5/5.1 lead; 24+ models routed by task type</p>
              </div>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {models.map((model) => (
              <StaggerItem key={model.name}>
                <AnimatedCard>
                  <Card className="bg-card border-foreground/10 hover:border-primary/50 transition-[color,border-color,background-color] duration-500 h-full">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground font-mono">{model.name}</h3>
                          <p className="text-sm text-primary mt-1">{model.provider}</p>
                        </div>
                        <Cloud weight="duotone" className="h-6 w-6 text-foreground/30 flex-shrink-0" />
                      </div>
                      <p className="text-foreground/70 text-sm mb-4">{model.role}</p>
                      <div className="flex flex-wrap gap-2">
                        {model.capabilities.map((cap) => (
                          <span key={cap} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-none text-xs text-primary font-mono">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-24 sm:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary/10 rounded-none flex items-center justify-center">
                <Desktop weight="duotone" className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-mono">Services</h2>
                <p className="text-foreground/60 mt-1">All running on a single WSL2 box, 127.0.0.1 only</p>
              </div>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.name}>
                <Card className="bg-card border-foreground/10 hover:border-primary/50 transition-[color,border-color,background-color] duration-500 h-full">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-foreground font-mono">{service.name}</h3>
                      {service.port !== "—" && (
                        <span className="px-2.5 py-1 bg-background border border-foreground/10 rounded font-mono text-xs text-primary">
                          :{service.port}
                        </span>
                      )}
                    </div>
                    <p className="text-foreground/70 text-sm mb-3">{service.purpose}</p>
                    <p className="text-foreground/40 text-xs font-mono">{service.tech}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-primary/10 rounded-none flex items-center justify-center">
                <Wrench weight="duotone" className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-mono">Toolchain</h2>
                <p className="text-foreground/60 mt-1">What each layer does</p>
              </div>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {tools.map((tool) => (
              <StaggerItem key={tool.category}>
                <Card className="bg-card border-foreground/10 hover:border-primary/50 transition-[color,border-color,background-color] duration-500 h-full">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-lg font-bold text-primary mb-4 font-mono">{tool.category}</h3>
                    <ul className="space-y-2">
                      {tool.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                          <span className="text-primary mt-0.5">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 sm:py-32 bg-card/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <Brain weight="duotone" className="h-10 w-10 text-primary" />
                <GitBranch weight="duotone" className="h-10 w-10 text-primary" />
                <Database weight="duotone" className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-mono mb-6">
                How It Actually Works
              </h2>
              <p className="text-xl text-foreground/70 font-light leading-relaxed">
                A message comes in via Telegram. Hermes (the orchestrator) reads it, decides what to do,
                and either handles it directly or delegates to a coding subagent. Frontier work runs on
                Claude Opus 5 and Fable 5/5.1 through a first-party Claude Code subscription; everything else
                routes across 24+ cloud models by task type.
                MemPalace remembers everything across sessions. GitNexus maps the codebase so changes are
                surgical, not guesswork. Flat subscriptions — no per-token costs.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-32 bg-card/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-xl text-foreground/80 mb-8 font-light">
              This is what&apos;s running right now. Want to see what it can do for your business?
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/85 text-foreground rounded-none group">
                Get in touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Footer note */}
      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-sm text-foreground/40 font-mono">
              Config auto-backed up weekly to a private GitHub repo · Stack data updated: {lastUpdated}
            </p>
          </FadeIn>
        </div>
      </section>

      <CtaScene id="cta" />
    </div>
  );
}