"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CaretDown, Check, Briefcase, ShieldCheck, Rocket, HardDrive, GitBranch, CalendarCheck, CheckCircle, Robot, Desktop, CurrencyDollarSimple, Globe, Wrench } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useState, useRef, useLayoutEffect } from "react";
import { privateAiFaqs } from "./faqs";
import { twMerge } from 'tailwind-merge';
import { PageHero, heroPrimaryBtn, heroSecondaryBtn } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";

// FAQ data
const faqs = privateAiFaqs;

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

  const panelId = `faq-panel-${id}`;

  return (
    <div className="border-b border-foreground/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors font-mono">
          {question}
        </span>
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
        id={panelId}
        ref={contentRef}
        style={{
          height,
          opacity: height > 0 ? 1 : 0,
          overflow: "hidden",
          transition: "height 0.2s ease, opacity 0.2s ease",
        }}
      >
        <p className="pb-5 text-foreground/70 leading-relaxed text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}

const HeroBlob = ({ className }: { className?: string }) => (
  <div className={twMerge("absolute rounded-none blur-[130px] opacity-0 animate-blob-show pointer-events-none", className)}></div>
);

const StatCell = ({ value, label, note, colorClass, delay }: { value: string; label: string; note: string; colorClass: string; delay: number }) => (
  <FadeIn delay={delay} className="flex-1 text-center py-5 px-4 relative after:absolute after:top-[20%] after:right-0 after:h-[60%] after:w-[1px] after:bg-foreground/20 last:after:hidden md:after:block max-md:after:hidden even:max-md:after:hidden max-sm:after:block max-sm:even:after:hidden">
    <div className={twMerge("font-mono text-5xl font-bold leading-none tracking-[-0.03em] mb-1", colorClass)}>
      {value}
    </div>
    <div className="text-lg font-semibold text-foreground/80 mb-0.5">{label}</div>
    <div className="text-sm text-foreground/40">{note}</div>
  </FadeIn>
);

const PersonaCard = ({ icon: Icon, pillColorClass, pillText, title, role, description }: { icon: React.ElementType; pillColorClass: string; pillText: string; title: string; role: string; description: string }) => (
  <StaggerItem>
    <AnimatedCard>
      <Card className="bg-card border-foreground/10 rounded-none p-6 sm:p-8 relative overflow-hidden transition-transform duration-300 hover:translate-y-[-7px] hover:border-primary/30">
        <div className={twMerge("absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl", pillColorClass === 'pill-blue' ? 'bg-gradient-to-r from-primary to-primary' : pillColorClass === 'pill-cyan' ? 'bg-gradient-to-r from-primary to-primary' : 'bg-gradient-to-r from-primary to-primary')} />
        <div className="w-13 h-13 rounded-xl flex items-center justify-center text-xl mb-6" style={{ background: pillColorClass === 'pill-blue' ? 'rgba(2,160,160,0.08)' : pillColorClass === 'pill-cyan' ? 'rgba(2,160,160,0.08)' : 'rgba(255,189,101,0.08)', color: pillColorClass === 'pill-blue' ? '#02a0a0' : pillColorClass === 'pill-cyan' ? '#f5a94f' : '#ffbd65', border: pillColorClass === 'pill-blue' ? '1px solid rgba(2,160,160,0.2)' : pillColorClass === 'pill-cyan' ? '1px solid rgba(2,160,160,0.2)' : '1px solid rgba(255,189,101,0.2)' }}>
          <Icon weight="duotone" />
        </div>
        <div className={twMerge("inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider mb-3")}
          style={{ background: pillColorClass === 'pill-blue' ? 'rgba(2,160,160,0.12)' : pillColorClass === 'pill-cyan' ? 'rgba(2,160,160,0.12)' : 'rgba(255,189,101,0.12)', color: pillColorClass === 'pill-blue' ? '#02a0a0' : pillColorClass === 'pill-cyan' ? '#f5a94f' : '#ffbd65', border: pillColorClass === 'pill-blue' ? '1px solid rgba(2,160,160,0.25)' : pillColorClass === 'pill-cyan' ? '1px solid rgba(2,160,160,0.25)' : '1px solid rgba(255,189,101,0.25)' }}>
          {pillText}
        </div>
        <h3 className="text-xl font-bold text-foreground font-mono mb-0.5">{title}</h3>
        <p className="text-sm text-foreground/40 font-medium mb-4">{role}</p>
        <p className="text-base text-foreground/60 leading-relaxed">{description}</p>
      </Card>
    </AnimatedCard>
  </StaggerItem>
);

export default function PrivateAISetup() {
  const handleGetStarted = (type: "local" | "cloud" | "managed") => {
    // Checkout funnel paused — all inquiries go through contact until pricing returns.
    window.location.href = `/contact?interest=${type}`;
  };

  const calendlyLink = "/contact";

  const verticals = [
    { icon: ShieldCheck, title: "Healthcare", desc: "HIPAA-aware medical AI" },
    { icon: Briefcase, title: "Legal", desc: "Attorney-privilege safe" },
    { icon: CurrencyDollarSimple, title: "Financial", desc: "Client data protection" },
    { icon: Globe, title: "Real Estate", desc: "Listings & comps AI" },
    { icon: ShieldCheck, title: "Therapy", desc: "Clinical documentation" },
    { icon: Desktop, title: "Education", desc: "FERPA-safe learning AI" },
    { icon: Wrench, title: "Construction", desc: "Bids & specs AI" },
    { icon: Rocket, title: "Creative", desc: "IP-safe content AI" },
    { icon: Robot, title: "Small Business", desc: "Team productivity AI" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        eyebrow="ollama serve --private · built for your business"
        title="Your AI. Your Data. Your Rules."
        highlight="Rules"
        size="tall"
        subtitle="Deploy GPT-4 level intelligence on your own hardware. No monthly API fees, no data harvesting, no compromises."
        media={{ type: "image", src: "/images/blog/ollama-inside.png", position: "50% 50%" }}
      >
        <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className={heroPrimaryBtn}>get in touch →</a>
        <a href="#pricing" className={heroSecondaryBtn}>see options ↓</a>
      </PageHero>

      {/* Stats Strip */}
      <section className="bg-card border-y border-foreground/10 py-12 -mt-20 relative z-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-foreground/10 max-sm:divide-x-0 max-sm:divide-y">
            <StatCell value="100%" label="Private" note="Data never leaves your hardware" colorClass="text-primary" delay={0.1} />
            <StatCell value="$0" label="API Fees" note="No per-query charges ever" colorClass="text-primary" delay={0.2} />
            <StatCell value="1 cmd" label="Install" note="Running in under 5 minutes" colorClass="text-primary" delay={0.3} />
            <StatCell value="9" label="Industries" note="Tailored starter kits" colorClass="text-[var(--ok)]" delay={0.4} />
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

      {/* Who It's For Section */}
      <section className="relative py-24 sm:py-32" id="who-its-for">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">Who It&apos;s For</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono leading-tight">
                Built for People Who Value<br />
                <span className="bg-gradient-to-r from-primary via-primary to-primary text-transparent bg-clip-text">Real Ownership</span>
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                Whether you&apos;re protecting business data or just refusing to feed Big Tech — this is your solution.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            <PersonaCard
              icon={Briefcase}
              pillColorClass="pill-blue"
              pillText="Business Owner"
              title="Keep Your Edge Private"
              role="For small & mid-size businesses"
              description="Automate customer support, generate leads, and streamline documentation — without sharing sensitive business data with Big Tech platforms."
            />
            <PersonaCard
              icon={ShieldCheck}
              pillColorClass="pill-cyan"
              pillText="Privacy Advocate"
              title="Zero Data Collection"
              role="For privacy-conscious individuals"
              description="ChatGPT-level capability, directly on your hardware. No telemetry, no model training on your conversations. Your interactions are truly yours."
            />
            <PersonaCard
              icon={Rocket}
              pillColorClass="pill-violet"
              pillText="Early Adopter"
              title="Own the Revolution"
              role="For tech-forward builders"
              description="The AI era is unfolding now. Don&apos;t just rent access to someone else&apos;s intelligence — own it. Be at the forefront of private, self-hosted AI."
            />
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-16 relative mx-auto max-w-5xl rounded-none overflow-hidden border border-foreground/10">
              <Image
                src="/images/joe-presenting-ai.png"
                alt="Joe presenting AI analytics dashboard to a client"
                width={1024}
                height={1024}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

      {/* How It Works Section */}
      <section className="relative py-24 sm:py-32 bg-background" id="how-it-works">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">The Process</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono leading-tight">
                Up and Running in<br />
                <span className="bg-gradient-to-r from-primary via-primary to-primary text-transparent bg-clip-text">Three Simple Steps</span>
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                No technical experience required. We handle everything so you can focus on using your AI.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 relative" staggerDelay={0.15}>
            <div className="hidden md:block absolute top-[2rem] left-[calc(16.667%+1.5rem)] right-[calc(16.667%+1.5rem)] h-px bg-gradient-to-r from-primary/30 via-primary/30 to-transparent opacity-50 pointer-events-none" />

            {[
              {
                number: "01",
                title: "Choose Your Setup",
                description: "Local machine, cloud server, or fully managed — I walk you through which option best fits your needs, budget, and workflow."
              },
              {
                number: "02",
                title: "We Install & Configure",
                description: "One command installs everything. We handle model selection, security hardening, and fine-tuning for your exact use case and industry."
              },
              {
                number: "03",
                title: "You Own Your AI",
                description: "Walk away with powerful, private AI — no platform fees, no vendor lock-in, no data ever leaving your control."
              }
            ].map((step, index) => (
              <StaggerItem key={index}>
                <AnimatedCard>
                  <Card className="bg-card border-foreground/10 hover:border-primary/50 transition-[color,border-color,background-color] duration-500 text-center h-full p-6 sm:p-8 relative group">
                    <div className={twMerge(
                      "w-16 h-16 rounded-none flex items-center justify-center font-mono text-2xl font-bold mx-auto mb-7 relative z-10 transition-shadow duration-300",
                      index === 0 && "bg-primary/10 text-primary border-2 border-primary/30 shadow-[0_0_28px_rgba(2,160,160,0.18)] group-hover:shadow-[0_0_50px_#02a0a0]",
                      index === 1 && "bg-primary/10 text-primary border-2 border-primary/30 shadow-[0_0_28px_rgba(2,160,160,0.18)] group-hover:shadow-[0_0_50px_#f5a94f]",
                      index === 2 && "bg-primary/10 text-primary border-2 border-primary/30 shadow-[0_0_28px_rgba(255,189,101,0.18)] group-hover:shadow-[0_0_50px_#ffbd65]"
                    )}>
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-mono mb-3">{step.title}</h3>
                    <p className="text-base text-foreground/60 leading-relaxed max-w-[260px] mx-auto">{step.description}</p>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-16 relative mx-auto max-w-5xl rounded-none overflow-hidden border border-foreground/10">
              <Image
                src="/images/joe-deploying-server.png"
                alt="Joe installing and configuring a private AI server"
                width={1024}
                height={1024}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

      {/* One Command Install Section */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">Dead Simple</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono leading-tight">
                One Command.<br />
                <span className="bg-gradient-to-r from-primary via-primary to-primary text-transparent bg-clip-text">That&apos;s It.</span>
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                No Docker. No complex setup. Just paste one line and you&apos;re running private AI.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="bg-background border-primary/20 hover:border-primary/40 transition-[color,border-color,background-color,box-shadow] duration-300 overflow-hidden rounded-xl shadow-[0_0_40px_rgba(2,160,160,0.08)]">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-none bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-none bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-none bg-[#28c840]" />
                  <span className="ml-3 text-xs text-foreground/30 font-mono">terminal</span>
                </div>
                <code className="block text-primary font-mono text-sm sm:text-base leading-relaxed break-all">
                  <span className="text-foreground/40">$ </span>curl -fsSL https://www.joestechsolutions.com/install | bash
                </code>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["Mac & Linux", "Windows PowerShell", "Ubuntu VPS"].map((platform) => (
                <span key={platform} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-none text-xs font-semibold uppercase tracking-wider bg-foreground/5 text-foreground/50 border border-foreground/10">
                  <CheckCircle weight="fill" className="h-3.5 w-3.5 text-[var(--ok)]" />
                  {platform}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

      {/* Options — 3 Tiers */}
      <section className="relative py-24 sm:py-32" id="pricing">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">Options</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono leading-tight">Three Ways to Run Private AI</h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                Choose the setup that fits your needs. No hidden fees. No surprises.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto" staggerDelay={0.12}>
            {/* Tier 1: Local AI Setup */}
            <StaggerItem>
              <AnimatedCard>
                <Card className="bg-card border-foreground/10 hover:border-primary/30 transition-[color,border-color,background-color,transform] duration-300 overflow-hidden h-full p-8 relative flex flex-col hover:translate-y-[-5px]">
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-2">Local AI Setup</p>
                  <h3 className="text-5xl font-bold text-foreground font-mono tracking-[-0.03em] leading-none mb-1.5">
                    One-time <span className="text-lg font-light text-foreground/40">setup</span>
                  </h3>
                  <p className="text-sm text-foreground/40 mb-8">No recurring charges &middot; Yours forever</p>
                  <div className="h-px bg-foreground/10 mb-7" />
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      "Ollama + Open WebUI installed natively",
                      "No Docker required — runs on your hardware",
                      "Hardware auto-detection + optimal model",
                      "Industry-specific starter kit",
                      "Setup session",
                      "30 days email support"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-base text-foreground/60">
                        <div className="w-5 h-5 rounded-none flex items-center justify-center text-[9px] bg-primary/10 text-primary flex-shrink-0 mt-1">
                          <Check weight="bold" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <MagneticButton strength={0.2} className="w-full">
                    <Button
                      onClick={() => handleGetStarted("local")}
                      className="w-full bg-card/50 border border-foreground/20 hover:border-primary/50 text-foreground hover:text-primary rounded-none group shadow-lg shadow-transparent hover:shadow-primary/10 py-6 text-lg font-mono font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-300 backdrop-blur-sm"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </MagneticButton>
                </Card>
              </AnimatedCard>
            </StaggerItem>

            {/* Tier 2: Cloud AI Server */}
            <StaggerItem>
              <AnimatedCard>
                <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-foreground/10 hover:border-primary/40 transition-[color,border-color,background-color,transform] duration-300 overflow-hidden h-full p-8 relative flex flex-col hover:translate-y-[-5px]">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-primary" />
                  <div className="absolute top-5 right-5 px-3 py-1 bg-gradient-to-r from-primary/20 to-primary/20 rounded-none text-foreground text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-2">Cloud AI Server</p>
                  <h3 className="text-5xl font-bold text-foreground font-mono tracking-[-0.03em] leading-none mb-1.5">
                    One-time <span className="text-lg font-light text-foreground/40">setup</span>
                  </h3>
                  <p className="text-sm text-foreground/40 mb-8">Optional monthly plan &middot; Fully managed</p>
                  <div className="h-px bg-foreground/10 mb-7" />
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      "Everything in Local, plus:",
                      "Dedicated VPS with custom domain + HTTPS",
                      "Daily automated backups (7-day retention)",
                      "Monthly health checks & updates",
                      "Multi-user access (teams of 2–10)",
                      "Email support included"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-base text-foreground/60">
                        <div className="w-5 h-5 rounded-none flex items-center justify-center text-[9px] bg-primary/10 text-primary flex-shrink-0 mt-1">
                          <Check weight="bold" />
                        </div>
                        <span className={index === 0 ? "font-semibold text-foreground/80" : ""}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <MagneticButton strength={0.2} className="w-full">
                    <Button
                      onClick={() => handleGetStarted("cloud")}
                      className="w-full bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-foreground rounded-none group shadow-lg shadow-primary/20 py-6 text-lg font-mono font-semibold"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </MagneticButton>
                </Card>
              </AnimatedCard>
            </StaggerItem>

            {/* Tier 3: Managed AI + Automation */}
            <StaggerItem>
              <AnimatedCard>
                <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-foreground/10 hover:border-primary/40 transition-[color,border-color,background-color,transform] duration-300 overflow-hidden h-full p-8 relative flex flex-col hover:translate-y-[-5px]">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-primary" />
                  <div className="absolute top-5 right-5 px-3 py-1 bg-gradient-to-r from-primary/20 to-primary/20 rounded-none text-foreground text-xs font-bold uppercase tracking-wider">
                    Best Value
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-2">Managed AI + Automation</p>
                  <h3 className="text-5xl font-bold text-foreground font-mono tracking-[-0.03em] leading-none mb-1.5">
                    One-time <span className="text-lg font-light text-foreground/40">setup</span>
                  </h3>
                  <p className="text-sm text-foreground/40 mb-8">Optional monthly plan &middot; Full service</p>
                  <div className="h-px bg-foreground/10 mb-7" />
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      "Everything in Cloud, plus:",
                      "n8n workflow automation server",
                      "3 custom AI workflows included",
                      "RAG setup — ask your own documents",
                      "Private web search (SearXNG)",
                      "Quarterly strategy call",
                      "Priority same-day support"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-base text-foreground/60">
                        <div className="w-5 h-5 rounded-none flex items-center justify-center text-[9px] bg-primary/10 text-primary flex-shrink-0 mt-1">
                          <Check weight="bold" />
                        </div>
                        <span className={index === 0 ? "font-semibold text-foreground/80" : ""}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <MagneticButton strength={0.2} className="w-full">
                    <Button
                      onClick={() => handleGetStarted("managed")}
                      className="w-full bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-foreground rounded-none group shadow-lg shadow-primary/30 py-6 text-lg font-mono font-semibold"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </MagneticButton>
                </Card>
              </AnimatedCard>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.2} className="text-center mt-8 text-sm text-foreground/40">
            Not sure which plan is right?{" "}
            <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
              Get in touch →
            </a>{" "}
            — we&apos;ll figure it out together.
          </FadeIn>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

      {/* Trust / Privacy Section */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">Privacy First</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono leading-tight">
                Your Data Stays<br />
                <span className="bg-gradient-to-r from-primary via-primary to-primary text-transparent bg-clip-text">Yours. Always.</span>
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                No cloud. No OpenAI subscriptions. No data harvesting. Just powerful AI built on trust.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" staggerDelay={0.15}>
            <StaggerItem>
              <AnimatedCard>
                <Card className="bg-card border-foreground/10 hover:border-primary/20 transition-[color,border-color,background-color,transform] duration-300 text-center h-full p-6 sm:p-8 hover:translate-y-[-4px]">
                  <div className="w-15 h-15 bg-primary/10 border border-primary/18 rounded-lg flex items-center justify-center text-2xl text-primary mx-auto mb-5">
                    <HardDrive weight="duotone" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-mono mb-2">On-Premise Control</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">Your AI runs on your own hardware. No third-party servers ever touch your data or conversations.</p>
                </Card>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard>
                <Card className="bg-card border-foreground/10 hover:border-primary/20 transition-[color,border-color,background-color,transform] duration-300 text-center h-full p-6 sm:p-8 hover:translate-y-[-4px]">
                  <div className="w-15 h-15 bg-primary/10 border border-primary/18 rounded-lg flex items-center justify-center text-2xl text-primary mx-auto mb-5">
                    <ShieldCheck weight="duotone" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-mono mb-2">Zero Tracking</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">No usage telemetry, no training data collection, no analytics shared with anyone. Absolute zero.</p>
                </Card>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard>
                <Card className="bg-card border-foreground/10 hover:border-primary/20 transition-[color,border-color,background-color,transform] duration-300 text-center h-full p-6 sm:p-8 hover:translate-y-[-4px]">
                  <div className="w-15 h-15 bg-primary/10 border border-primary/18 rounded-lg flex items-center justify-center text-2xl text-primary mx-auto mb-5">
                    <GitBranch weight="duotone" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-mono mb-2">Open Source Models</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">Built on fully auditable, open-source AI. Inspect exactly what&apos;s running — no black boxes, ever.</p>
                </Card>
              </AnimatedCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

      {/* Industry Solutions Section */}
      <section className="relative py-24 sm:py-32 bg-background" id="industries">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">Industry Solutions</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono leading-tight">
                Built for<br />
                <span className="bg-gradient-to-r from-primary via-primary to-primary text-transparent bg-clip-text">Your Industry</span>
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                Every setup includes industry-specific AI prompts, model recommendations, and compliance guidance.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto" staggerDelay={0.08}>
            {verticals.map((v, i) => (
              <StaggerItem key={i}>
                <AnimatedCard>
                  <Card className="bg-card border-foreground/10 hover:border-primary/20 transition-[color,border-color,background-color,transform] duration-300 p-5 sm:p-6 text-center hover:translate-y-[-3px]">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/18 rounded-lg flex items-center justify-center text-lg text-primary mx-auto mb-3">
                      <v.icon weight="duotone" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground font-mono mb-1">{v.title}</h3>
                    <p className="text-xs text-foreground/50">{v.desc}</p>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3} className="text-center mt-8">
            <p className="text-sm text-foreground/40">
              Compliance verticals (Healthcare, Legal, Financial, Therapy) include additional security hardening — <span className="text-primary font-semibold">+$100 setup</span>
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

      {/* FAQ Section */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">Questions?</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                Everything you need to know about private AI for your business.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="bg-card border-foreground/10 overflow-hidden rounded-xl">
              <CardContent className="p-6 sm:p-8">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} id={String(index)} question={faq.question} answer={faq.answer} />
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <HeroBlob className="w-[520px] h-[520px] bg-gradient-to-br from-primary/20 to-transparent top-[-100px] left-[-80px] animate-blob-drift-a" />
          <HeroBlob className="w-[620px] h-[620px] bg-gradient-to-br from-primary/18 to-transparent top-[60px] right-[-200px] animate-blob-drift-b animation-delay-1000" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center z-10">
          <FadeIn>
            <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">Get Started Today</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-mono leading-tight">
              Ready to Own Your AI?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-foreground/60 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Get in touch →
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <MagneticButton strength={0.3}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-foreground text-lg px-10 py-7 rounded-none group shadow-2xl shadow-primary/20 font-mono font-semibold"
              >
                <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                  <CalendarCheck weight="duotone" className="mr-2 h-5 w-5" />
                  Get in touch →
                </a>
              </Button>
            </MagneticButton>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="mt-5 flex items-center justify-center gap-2 text-foreground/40 text-sm">
              <ShieldCheck weight="duotone" className="h-4 w-4" />
              <span className="text-sm">Free 30min call &nbsp;&middot;&nbsp; No commitment required</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaScene id="cta" />
    </div>
  );
}
