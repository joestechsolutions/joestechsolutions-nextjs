"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  CaretDown,
  Robot,
  Brain,
  CalendarCheck,
  Plug,
  ShieldCheck,
  Lightning,
  Stack,
  ChatTeardropDots,
  EnvelopeSimple,
  InstagramLogo,
  StripeLogo,
  Clock,
  Cpu,
} from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useState, useRef, useLayoutEffect } from "react";
import { agentFaqs } from "./faqs";
import { PageHero, heroPrimaryBtn, heroSecondaryBtn } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";

const faqs = agentFaqs;

function FAQItem({ question, answer, id }: { question: string; answer: string; id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (contentRef.current) {
      requestAnimationFrame(() => {
        setHeight(isOpen ? contentRef.current!.scrollHeight : 0);
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-foreground/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors font-mono">
          {question}
        </h3>
        <div
          aria-hidden="true"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <CaretDown className="h-5 w-5 text-foreground/60" weight="bold" />
        </div>
      </button>
      <div
        id={`faq-panel-${id}`}
        ref={contentRef}
        style={{
          height,
          opacity: height > 0 ? 1 : 0,
          overflow: "hidden",
          transition: "height 0.2s ease, opacity 0.2s ease",
        }}
      >
        <p className="pb-5 text-foreground/70 leading-relaxed text-base">{answer}</p>
      </div>
    </div>
  );
}


export default function AgentSystem() {
  const calendlyLink = "/contact";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageHero
        eyebrow="systemctl status hermes --all · 24/7 autonomous"
        title="Your AI Workforce."
        highlight="Workforce"
        size="tall"
        subtitle="Not a chatbot. Not a tool. A multi-agent AI system that runs your business — coding, content, research, ops — connected to your tools, working while you sleep."
        media={{ type: "video", src: "/generated/page-agent-system-loop.mp4", poster: "/generated/page-agent-system-loop-poster.jpg" }}
      >
        <button type="button" onClick={() => (window.location.href = calendlyLink)} className={heroPrimaryBtn}>
          book a strategy call →
        </button>
        <button type="button" onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className={heroSecondaryBtn}>
          see what&apos;s included
        </button>
      </PageHero>

      {/* The Problem */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                The Problem
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-mono leading-tight">
                ChatGPT gives you answers.
                <br />
                <span className="text-foreground/40">Hermes gives you results.</span>
              </h2>
              <p className="text-xl text-foreground/60 max-w-3xl mx-auto font-light leading-relaxed">
                You can pay Anthropic $200/mo for a capped Claude plan and hit usage limits by lunch.
                I run frontier Claude models — Opus 5 and Fable 5/5.1 — on a first-party Claude Code
                subscription, layered over Ollama Cloud routing for the rest. Frontier capability
                without per-token metering — and an agent that actually does the work, not just talk about it.
              </p>
            </div>
          </FadeIn>

          {/* Model comparison table */}
          <FadeIn delay={0.2}>
            <Card className="bg-card border-foreground/10 overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-foreground/10">
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-2">Tier</p>
                  <p className="text-sm text-foreground/60">Workload type</p>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FBBF24] mb-2">Anthropic</p>
                  <p className="text-sm text-foreground/60">$200/mo · usage capped</p>
                </div>
                <div className="p-6 sm:p-8 bg-primary/5">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">JTS Agent Stack</p>
                  <p className="text-sm text-foreground/60">flat subscriptions · frontier + routed</p>
                </div>
              </div>
              <div className="divide-y divide-foreground/5">
                {[
                  { tier: "Heavy Reasoning", anthropic: "Claude Opus", ollama: "Claude Opus 5 (first-party)" },
                  { tier: "Frontier Coding", anthropic: "—", ollama: "Fable 5.1 / Fable 5 (first-party)" },
                  { tier: "Balanced Coding", anthropic: "—", ollama: "glm-5.3:cloud" },
                  { tier: "Sub-agents / Fleet", anthropic: "—", ollama: "kimi-k2.7-code:cloud" },
                  { tier: "Fast / Lightweight", anthropic: "Claude Haiku", ollama: "minimax-m3:cloud" },
                ].map((row) => (
                  <div key={row.tier} className="grid grid-cols-3 divide-x divide-foreground/10">
                    <div className="p-6 sm:p-8">
                      <p className="text-lg font-semibold text-foreground font-mono">{row.tier}</p>
                    </div>
                    <div className="p-6 sm:p-8">
                      <p className="text-lg text-foreground/70">{row.anthropic}</p>
                    </div>
                    <div className="p-6 sm:p-8 bg-primary/5">
                      <p className="text-lg text-primary font-medium">{row.ollama}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* What's Included */}
      <section className="relative py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                What&apos;s Included
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-mono leading-tight">
                Six layers. One system.
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {[
              {
                icon: Robot,
                title: "Agent Hierarchy",
                color: "#02a0a0",
                items: [
                  "Orchestrator AI (CTO-level)",
                  "Executive skills: Chief of Staff, CFO, COO, CMO",
                  "VPs for Engineering, Infrastructure, and Product",
                  "Specialized worker agents, spawned on demand",
                ],
              },
              {
                icon: Brain,
                title: "Memory System",
                color: "#ffbd65",
                items: [
                  "Semantic search across all sessions",
                  "Knowledge graph of people & projects",
                  "Verbatim recall — never forgets",
                  "Gets smarter the more you use it",
                ],
              },
              {
                icon: Stack,
                title: "Skills Library",
                color: "#C084FC",
                items: [
                  "100+ custom skills",
                  "Coding: TDD, review, debug, deploy",
                  "Content: drafting, SEO, social",
                  "Ops: security scans, health checks",
                ],
              },
              {
                icon: Plug,
                title: "Integrations",
                color: "#f5a94f",
                items: [
                  "Telegram — text & voice control",
                  "Gmail — read, draft, send emails",
                  "Instagram — auto-reply, content",
                  "Stripe — payment monitoring",
                ],
              },
              {
                icon: CalendarCheck,
                title: "24/7 Automation",
                color: "#F472B6",
                items: [
                  "40+ scheduled automations",
                  "Daily standups & briefings",
                  "Weekly reviews per department",
                  "Content posting on autopilot",
                ],
              },
              {
                icon: ShieldCheck,
                title: "You Own It",
                color: "#FBBF24",
                items: [
                  "Runs on your VPS — not SaaS",
                  "Open source, no lock-in",
                  "Data never leaves your server",
                  "No rate limits, no context caps",
                ],
              },
            ].map((layer, i) => (
              <StaggerItem key={i}>
                <AnimatedCard>
                  <Card className="bg-card border-foreground/10 hover:border-[color]/30 transition-[color,border-color,background-color,box-shadow] duration-300 h-full p-8 relative overflow-hidden group">
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(to right, ${layer.color}, transparent)` }}
                    />
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${layer.color}15` }}
                      >
                        <layer.icon weight="duotone" className="h-7 w-7" style={{ color: layer.color }} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground font-mono">{layer.title}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {layer.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-base text-foreground/60">
                          <div
                            className="w-4 h-4 rounded-none flex items-center justify-center text-[8px] flex-shrink-0 mt-1"
                            style={{ backgroundColor: `${layer.color}10`, color: layer.color }}
                          >
                            <Check weight="bold" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Integrations Strip */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground font-mono mb-2">
                Connected to the tools you already use
              </h3>
              <p className="text-foreground/50">No switching costs. Your AI meets you where you are.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Telegram", icon: ChatTeardropDots, desc: "Text & voice — from the phone" },
                { name: "Claude Code Remote", icon: Cpu, desc: "Frontier coding from anywhere" },
                { name: "Gmail", icon: EnvelopeSimple, desc: "Read · Draft · Send" },
                { name: "Instagram", icon: InstagramLogo, desc: "Reply · Post · Schedule" },
                { name: "Stripe", icon: StripeLogo, desc: "Payment monitoring" },
                { name: "Notion CRM", icon: Stack, desc: "Pipeline tracking" },
                { name: "n8n", icon: Lightning, desc: "Workflow automation" },
                { name: "Postiz", icon: CalendarCheck, desc: "Social scheduling" },
              ].map((tool, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-card border border-foreground/10 rounded-xl px-5 py-4 hover:border-primary/30 transition-colors"
                >
                  <tool.icon weight="duotone" className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-foreground font-medium text-sm font-mono">{tool.name}</p>
                    <p className="text-foreground/40 text-xs">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What's included */}
      <section className="relative py-24 sm:py-32" id="pricing">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                What&apos;s Included
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono leading-tight">
                Everything included. No tiers to navigate.
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                No upsells. The full system, configured for your business.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 hover:border-primary/40 transition-[color,border-color,background-color,box-shadow] duration-500 overflow-hidden relative max-w-2xl mx-auto">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary to-primary" />
              <div className="absolute top-5 right-5 px-3 py-1 bg-gradient-to-r from-primary/20 to-primary/20 rounded-none text-foreground text-xs font-bold uppercase tracking-wider">
                Full System
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-none flex items-center justify-center">
                    <Robot weight="duotone" className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground font-mono">Agent System</h3>
                    <p className="text-foreground/40 text-sm">Full multi-agent stack · 1-2 week setup</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-background rounded-xl p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1">Setup</p>
                    <p className="text-4xl font-bold text-foreground font-mono">
                      One-time
                    </p>
                    <p className="text-sm text-foreground/40 mt-1">Configured for your business</p>
                  </div>
                  <div className="bg-background rounded-xl p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-1">Monthly</p>
                    <p className="text-4xl font-bold text-foreground font-mono">
                      Optional
                    </p>
                    <p className="text-sm text-foreground/40 mt-1">Managed hosting + maintenance</p>
                  </div>
                </div>

                <div className="h-px bg-foreground/10 mb-6" />

                <ul className="space-y-3 mb-8">
                  {[
                    "Multi-agent hierarchy (orchestrator, executive skills, VPs, workers on demand)",
                    "100+ custom skills library",
                    "Memory system (semantic search + knowledge graph)",
                    "Telegram, Gmail, Instagram, Stripe integrations",
                    "24/7 cron automation (40+ scheduled jobs)",
                    "Frontier Claude models (Opus 5 + Fable 5/5.1)",
                    "Ollama Cloud routing for 24+ task-fit models",
                    "Dedicated VPS with daily backups",
                    "Weekly health checks + monthly updates",
                    "Priority same-day support",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-foreground/70">
                      <div className="w-5 h-5 rounded-none flex items-center justify-center text-[9px] bg-primary/10 text-primary flex-shrink-0 mt-1">
                        <Check weight="bold" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-foreground/40 mb-6">
                  Claude Code subscription + Ollama Cloud billed separately. VPS costs not included.
                </p>

                <MagneticButton strength={0.2} className="w-full">
                  <Button
                    onClick={() => (window.location.href = calendlyLink)}
                    className="w-full bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-foreground rounded-none group shadow-lg shadow-primary/20 py-6 text-lg font-mono font-semibold"
                  >
                    Book a Strategy Call
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </MagneticButton>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3} className="text-center mt-8 text-sm text-foreground/40">
            Not sure if this is the right fit?{" "}
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              Get in touch →
            </a>{" "}
            — we&apos;ll figure it out together.
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                How It Works
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-mono leading-tight">
                From zero to AI workforce in two weeks.
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-8" staggerDelay={0.15}>
            {[
              {
                step: "01",
                title: "Strategy Call",
                desc: "A quick call. We map your workflow, identify which tasks the agent takes over, and plan the integrations.",
                icon: ChatTeardropDots,
              },
              {
                step: "02",
                title: "Server + Base Install",
                desc: "I provision your VPS, install Hermes, configure Ollama Cloud model routing, and wire up Telegram. You're texting your agent by day 2.",
                icon: Cpu,
              },
              {
                step: "03",
                title: "Skills + Integrations",
                desc: "Gmail, Instagram, Stripe, CRM — each integration wired and tested. Custom skills built for your specific workflow. Agent hierarchy configured.",
                icon: Plug,
              },
              {
                step: "04",
                title: "Tuning + Automation",
                desc: "Teaching the agent your preferences, setting up cron schedules, loading memory with your business context. This is where it becomes yours.",
                icon: Clock,
              },
              {
                step: "05",
                title: "Live + Handoff",
                desc: "System goes live. You get a walkthrough of every agent, every cron job, every integration. Ongoing maintenance and updates included in monthly.",
                icon: Lightning,
              },
            ].map((phase, i) => (
              <StaggerItem key={i}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <phase.icon weight="duotone" className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-sm font-bold text-primary font-mono">{phase.step}</span>
                      <h3 className="text-xl font-bold text-foreground font-mono">{phase.title}</h3>
                    </div>
                    <p className="text-foreground/60 leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                FAQ
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-mono leading-tight">
                Questions, answered.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-card border border-foreground/10 rounded-none p-8 sm:p-10">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  id={`agent-${i}`}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-mono leading-tight">
              Stop renting AI.
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary text-transparent bg-clip-text">
                Own the workforce.
              </span>
            </h2>
            <p className="text-xl text-foreground/60 mb-10 font-light leading-relaxed">
              Get in touch →
            </p>
            <MagneticButton strength={0.2}>
              <Button
                onClick={() => (window.location.href = calendlyLink)}
                className="bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-foreground rounded-none group shadow-lg shadow-primary/20 px-10 py-6 text-lg font-mono font-semibold"
              >
                Get in touch →
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticButton>
          </FadeIn>
        </div>
      </section>

      <CtaScene id="cta" />
    </div>
  );
}