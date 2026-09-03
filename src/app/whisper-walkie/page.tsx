import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadSimple, ArrowSquareOut, CheckCircle, Shield, Microphone, Lightning, Monitor, Globe, Lock, Cpu, Terminal, Gear, Play } from "@phosphor-icons/react/dist/ssr";
import { FAQ } from "./FAQ";
import { HeroDownloadButton, PlatformDownloadCards, CtaDownloadButton } from "./DownloadButton";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { PageHero, heroSecondaryBtn } from "@/components/home/scroll/PageHero";

export const metadata: Metadata = {
  title: "Whisper Walkie — Local Push-to-Talk Transcription | Joe's Tech Solutions",
  description:
    "Hold a key. Speak. Release. Your words appear in any app — instantly, privately, with no internet connection required. Free, open source (MIT), and maintained as an archive.",
  alternates: {
    canonical: "/whisper-walkie",
  },
  openGraph: {
    title: "Whisper Walkie — Local Push-to-Talk Transcription",
    description:
      "Hold a key. Speak. Release. Your words appear in any app — instantly, privately, with no internet connection required. Free, open source (MIT), and maintained as an archive.",
    url: "https://www.joestechsolutions.com/whisper-walkie",
  },
};

const GITHUB_REPO = "https://github.com/joestechsolutions/whisper-walkie";
const GITHUB_RELEASES = "https://github.com/joestechsolutions/whisper-walkie/releases/latest";

const otherToolsProblems = [
  "Cloud required — audio uploaded to their servers",
  "Monthly fees that add up over time",
  "Locked to a single application",
  "Account and login required",
  "Always listening in the background",
];

const whisperwalkieBenefits = [
  "100% local — audio never leaves your machine",
  "Free forever — no subscriptions, no fees",
  "Works in any application on your OS",
  "No account, no login, no tracking",
  "Push-to-talk — only records when you hold the key",
];

const features = [
  {
    icon: Lock,
    title: "100% Local",
    description: "Audio is transcribed entirely on your device using faster-whisper. Nothing is sent to any server, ever.",
    accent: "#02a0a0",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Browser, Slack, VS Code, Word, games — if your OS can focus it, Whisper Walkie can type into it.",
    accent: "#f5a94f",
  },
  {
    icon: Cpu,
    title: "GPU Accelerated",
    description: "CUDA support on Windows and Linux for near-instant transcription. Falls back to CPU automatically.",
    accent: "#02a0a0",
  },
  {
    icon: Monitor,
    title: "Cross-Platform",
    description: "Native support for Windows, macOS, and Linux. One codebase, three platforms, zero compromises.",
    accent: "#f5a94f",
  },
  {
    icon: Microphone,
    title: "Push-to-Talk",
    description: "Hold Right Alt (customizable), speak, release. It only records when you tell it to — total control.",
    accent: "#02a0a0",
  },
  {
    icon: Shield,
    title: "Open Source",
    description: "MIT licensed. Read every line of code. Fork it, modify it, ship it. Free now and always.",
    accent: "#f5a94f",
  },
];


export default function WhisperWalkiePage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="whisper-walkie --archive · open source (MIT) · privacy first"
        title="Whisper Walkie. Your voice, your machine."
        highlight="voice"
        size="tall"
        subtitle="Nothing leaves. Hold a hotkey, speak naturally, release. The transcribed text types directly into whatever window has focus — no clipboard, no cloud, no account. Whisper AI runs entirely on your machine."
        media={{ type: "image", src: "/generated/page-whisper-walkie.jpg" }}
      >
        <HeroDownloadButton />
        <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className={`${heroSecondaryBtn} self-start`}>view source ↗</a>
      </PageHero>

      {/* ── How It Works ──────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                Simple by design
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono">
                How It Works
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
                Three seconds from voice to text in any application on your computer.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 relative" staggerDelay={0.12}>
            {/* Connector line — visible on md+ */}
            <div className="hidden md:block absolute top-[2.75rem] left-[calc(16.667%+1.5rem)] right-[calc(16.667%+1.5rem)] h-px bg-gradient-to-r from-primary/40 via-primary/40 to-transparent pointer-events-none" />

            {[
              {
                step: "01",
                icon: Microphone,
                label: "Hold",
                description: "Press and hold the push-to-talk hotkey (default: Right Alt). The app starts recording immediately.",
                color: "#02a0a0",
                shadowColor: "rgba(2,160,160,0.25)",
              },
              {
                step: "02",
                icon: Lightning,
                label: "Speak",
                description: "Talk naturally into your microphone for as long as you need. No time limit, no wake word.",
                color: "#f5a94f",
                shadowColor: "rgba(2,160,160,0.25)",
              },
              {
                step: "03",
                icon: Monitor,
                label: "Done",
                description: "Release the key. Whisper transcribes locally and types the text directly into your focused window.",
                color: "#02a0a0",
                shadowColor: "rgba(2,160,160,0.25)",
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <AnimatedCard>
                  <Card className="bg-card border-foreground/10 hover:border-primary/40 transition-[color,border-color,background-color] duration-500 text-center h-full p-8 relative group">
                    {/* Step number circle */}
                    <div
                      className="w-16 h-16 rounded-none flex items-center justify-center font-mono text-xl font-bold mx-auto mb-6 border-2 transition-shadow duration-300 group-hover:shadow-[0_0_40px_var(--step-glow)]"
                      style={{
                        backgroundColor: `${item.color}18`,
                        color: item.color,
                        borderColor: `${item.color}50`,
                        // @ts-expect-error — css variable
                        "--step-glow": item.shadowColor,
                      }}
                    >
                      {item.step}
                    </div>
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-none flex items-center justify-center mx-auto mb-5"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon
                        className="w-6 h-6"
                        style={{ color: item.color }}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground font-mono mb-3">{item.label}</h3>
                    <p className="text-foreground/60 leading-relaxed max-w-[240px] mx-auto">{item.description}</p>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Quickstart Guide ──────────────────────────────────────── */}
      <section className="relative py-20 sm:py-32 bg-card/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                First time setup
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono">
                Quickstart Guide
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
                Up and running in under five minutes.
              </p>
            </FadeIn>
          </div>

          {/* Vertical timeline */}
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical connecting line */}
            <div className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent pointer-events-none hidden sm:block" aria-hidden="true" />

            <StaggerContainer className="space-y-6" staggerDelay={0.12}>

              {/* Step 1 — Download */}
              <StaggerItem>
                <div className="flex gap-6 items-start">
                  {/* Circle + icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-none bg-primary/15 border-2 border-primary/50 flex items-center justify-center z-10 relative">
                      <DownloadSimple weight="duotone" className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-none bg-primary text-foreground text-[10px] font-bold flex items-center justify-center z-20">
                      1
                    </span>
                  </div>
                  {/* Content */}
                  <AnimatedCard>
                    <Card className="bg-card border-foreground/10 hover:border-primary/40 transition-[color,border-color,background-color] duration-500 flex-1">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-foreground font-mono mb-2">Download</h3>
                        <p className="text-foreground/60 leading-relaxed text-sm">
                          Click Download, choose your platform. The installer handles everything.
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </div>
              </StaggerItem>

              {/* Step 2 — Install & Open */}
              <StaggerItem>
                <div className="flex gap-6 items-start">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-none bg-primary/15 border-2 border-primary/50 flex items-center justify-center z-10 relative">
                      <Monitor weight="duotone" className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-none bg-primary text-foreground text-[10px] font-bold flex items-center justify-center z-20">
                      2
                    </span>
                  </div>
                  <AnimatedCard>
                    <Card className="bg-card border-foreground/10 hover:border-primary/40 transition-[color,border-color,background-color] duration-500 flex-1">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-foreground font-mono mb-3">Install &amp; Open</h3>
                        <div className="space-y-3">
                          {/* Windows */}
                          <details className="group/detail">
                            <summary className="flex items-center gap-2 cursor-pointer list-none text-sm font-medium text-foreground/80 hover:text-foreground transition-colors select-none">
                              <span className="w-5 h-5 rounded bg-primary/15 flex items-center justify-center flex-shrink-0">
                                <Monitor weight="duotone" className="w-3 h-3 text-primary" aria-hidden="true" />
                              </span>
                              Windows
                              <svg className="w-3.5 h-3.5 text-foreground/40 ml-auto transition-transform group-open/detail:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </summary>
                            <p className="mt-2 ml-7 text-foreground/50 text-sm leading-relaxed">
                              Run the installer. If SmartScreen appears, click &ldquo;More info&rdquo; &rarr; &ldquo;Run anyway&rdquo; — the app is open source and safe.
                            </p>
                          </details>
                          {/* macOS */}
                          <details className="group/detail">
                            <summary className="flex items-center gap-2 cursor-pointer list-none text-sm font-medium text-foreground/80 hover:text-foreground transition-colors select-none">
                              <span className="w-5 h-5 rounded bg-primary/15 flex items-center justify-center flex-shrink-0">
                                <Globe weight="duotone" className="w-3 h-3 text-primary" aria-hidden="true" />
                              </span>
                              macOS
                              <svg className="w-3.5 h-3.5 text-foreground/40 ml-auto transition-transform group-open/detail:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </summary>
                            <div className="mt-2 ml-7 space-y-2">
                              <ol className="text-foreground/50 text-sm leading-relaxed space-y-1.5 list-decimal list-inside">
                                <li>Open the downloaded <code className="text-primary/80 bg-foreground/5 px-1 py-0.5 rounded text-xs">.zip</code> — it extracts automatically</li>
                                <li>Open the <span className="text-foreground/70">WhisperWalkie</span> folder</li>
                                <li>Right-click <span className="text-foreground/70">WhisperWalkie</span> &rarr; <span className="text-foreground/70">Open</span></li>
                                <li>Click <span className="text-foreground/70">&ldquo;Open&rdquo;</span> when macOS asks to confirm</li>
                              </ol>
                              <p className="text-foreground/40 text-xs">
                                Grant Accessibility permissions when prompted: System Gear &rarr; Privacy &amp; Security &rarr; Accessibility.
                              </p>
                            </div>
                          </details>
                          {/* Linux */}
                          <details className="group/detail">
                            <summary className="flex items-center gap-2 cursor-pointer list-none text-sm font-medium text-foreground/80 hover:text-foreground transition-colors select-none">
                              <span className="w-5 h-5 rounded bg-primary/15 flex items-center justify-center flex-shrink-0">
                                <Terminal weight="duotone" className="w-3 h-3 text-primary" aria-hidden="true" />
                              </span>
                              Linux
                              <svg className="w-3.5 h-3.5 text-foreground/40 ml-auto transition-transform group-open/detail:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </summary>
                            <div className="mt-2 ml-7 space-y-2">
                              <ol className="text-foreground/50 text-sm leading-relaxed space-y-1.5 list-decimal list-inside">
                                <li>Extract the downloaded <code className="text-primary/80 bg-foreground/5 px-1 py-0.5 rounded text-xs">.tar.gz</code> file</li>
                                <li>Open the <span className="text-foreground/70">WhisperWalkie</span> folder</li>
                                <li>Double-click <span className="text-foreground/70">WhisperWalkie</span> to launch</li>
                              </ol>
                              <p className="text-foreground/40 text-xs mt-1">
                                Optional: run <code className="text-primary/80 bg-foreground/5 px-1 py-0.5 rounded text-xs">./install-linux.sh</code> to add a desktop shortcut to your app menu.
                              </p>
                            </div>
                          </details>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </div>
              </StaggerItem>

              {/* Step 3 — Choose Your Microphone */}
              <StaggerItem>
                <div className="flex gap-6 items-start">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-none bg-primary/15 border-2 border-primary/50 flex items-center justify-center z-10 relative">
                      <Gear weight="duotone" className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-none bg-primary text-foreground text-[10px] font-bold flex items-center justify-center z-20">
                      3
                    </span>
                  </div>
                  <AnimatedCard>
                    <Card className="bg-card border-foreground/10 hover:border-primary/40 transition-[color,border-color,background-color] duration-500 flex-1">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-foreground font-mono mb-2">Choose Your Microphone</h3>
                        <p className="text-foreground/60 leading-relaxed text-sm">
                          Open Gear in the app and select your microphone from the dropdown.
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </div>
              </StaggerItem>

              {/* Step 4 — Try It! */}
              <StaggerItem>
                <div className="flex gap-6 items-start">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-none bg-primary/15 border-2 border-primary/50 flex items-center justify-center z-10 relative">
                      <Play weight="duotone" className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-none bg-primary text-foreground text-[10px] font-bold flex items-center justify-center z-20">
                      4
                    </span>
                  </div>
                  <AnimatedCard>
                    <Card className="bg-gradient-to-br from-primary/8 via-card to-primary/8 border-primary/25 hover:border-primary/50 transition-[color,border-color,background-color] duration-500 flex-1">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-foreground font-mono mb-2">Try It!</h3>
                        <p className="text-foreground/60 leading-relaxed text-sm">
                          Hold <kbd className="px-1.5 py-0.5 text-xs bg-primary/15 border border-primary/30 rounded text-primary font-mono">Right Alt</kbd> (or your chosen hotkey), speak naturally, release. Text appears wherever your cursor is!
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </div>
              </StaggerItem>

            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Comparison ────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                Why switch
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono">
                Why Whisper Walkie
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
                Most voice tools trade your privacy for convenience. You should not have to choose.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Other tools — muted/negative */}
            <FadeIn delay={0.1} direction="right">
              <Card className="bg-card/60 border-foreground/10 h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground/30">Other Voice Tools</span>
                    <h3 className="text-xl font-bold text-foreground/50 font-mono mt-1">The trade-offs you accept</h3>
                  </div>
                  <ul className="space-y-4" role="list">
                    {otherToolsProblems.map((problem) => (
                      <li key={problem} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 w-5 h-5 rounded-none flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-400/70 bg-red-500/10 border border-red-500/20"
                          aria-hidden="true"
                        >
                          ✕
                        </span>
                        <span className="text-foreground/40 leading-relaxed">{problem}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Whisper Walkie — positive */}
            <FadeIn delay={0.2} direction="left">
              <Card className="bg-gradient-to-br from-primary/8 via-card to-primary/8 border-primary/25 hover:border-primary/50 transition-[color,border-color,background-color] duration-500 h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Whisper Walkie</span>
                    <h3 className="text-xl font-bold text-foreground font-mono mt-1">What you actually get</h3>
                  </div>
                  <ul className="space-y-4" role="list">
                    {whisperwalkieBenefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle weight="duotone"
                          className="mt-0.5 w-5 h-5 flex-shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-foreground/80 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Features Grid ─────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-32 bg-card/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                What&apos;s inside
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono">
                Features
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
                Everything you need. Nothing you don&apos;t.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <AnimatedCard>
                  <Card className="bg-card border-foreground/10 hover:border-primary/40 transition-[color,border-color,background-color] duration-500 h-full group">
                    <CardContent className="p-6 sm:p-8 space-y-4">
                      <div
                        className="w-12 h-12 rounded-none flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${feature.accent}15` }}
                      >
                        <feature.icon
                          className="w-6 h-6"
                          style={{ color: feature.accent }}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-foreground font-mono">{feature.title}</h3>
                      <p className="text-foreground/60 leading-relaxed text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Why I Built This ─────────────────────────────────────── */}
      <section className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                The story
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono">
                Why I Built This
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-foreground/70 leading-relaxed text-lg">
              <p>
                I was using tools like{" "}
                <a href="https://heywillow.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Willow</a>
                {" "}and{" "}
                <a href="https://openwhispr.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenWhispr</a>
                {" "}for voice transcription. They worked — but every word I spoke was going to the cloud,
                where other companies could use it to train their models. That didn&apos;t sit right with me.
              </p>
              <p>
                I was already running{" "}
                <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ollama</a>
                {" "}and{" "}
                <a href="https://openwebui.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open WebUI</a>
                {" "}for local LLMs. I wanted the same thing for voice: fast, private, and completely offline.
                So I built it.
              </p>
              <p>
                Whisper Walkie was built entirely using the agentic AI workflow with{" "}
                <a href="https://claude.com/claude-code" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude Code</a>
                {" "}from Anthropic — proving that one developer with the right tools can ship production-quality,
                cross-platform software that stands up against anything built by a traditional dev team.
              </p>
              <p>
                I&apos;m giving it away for free because I built it for people like me who care about privacy.
                And because I want to contribute something real to the open source community — working software
                for Windows, macOS, and Linux that anyone can use, inspect, and build on.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="mt-8 text-center text-foreground/40 text-sm">
              &mdash; Joe, <Link href="/" className="text-primary hover:underline">Joe&apos;s Tech Solutions</Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Download ──────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-3">
                Get started
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-mono">
                Download
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
                Whisper AI model is bundled — no internet needed after download.
              </p>
            </FadeIn>
          </div>

          <PlatformDownloadCards />

          <FadeIn delay={0.3}>
            <p className="text-center text-sm text-foreground/40 mt-8">
              All downloads on{" "}
              <a
                href={GITHUB_RELEASES}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub Releases
              </a>
              . Whisper AI model bundled — no internet needed after download.
            </p>
            <div className="text-center text-sm text-foreground/50 mt-4 max-w-2xl mx-auto space-y-2">
              <p>
                <span className="text-primary font-medium">Windows:</span>{" "}
                If SmartScreen says &ldquo;Windows protected your PC,&rdquo; click{" "}
                <span className="text-foreground/80 font-medium">&ldquo;More info&rdquo;</span> &rarr;{" "}
                <span className="text-foreground/80 font-medium">&ldquo;Run anyway.&rdquo;</span>
              </p>
              <p>
                <span className="text-primary font-medium">macOS:</span>{" "}
                Right-click the app and choose &ldquo;Open&rdquo; on first launch. Grant Accessibility access when prompted.
              </p>
              <p>
                <span className="text-primary font-medium">Linux:</span>{" "}
                Extract the folder and double-click WhisperWalkie to launch.
              </p>
              <p className="text-foreground/40 text-xs pt-1">
                These warnings are normal for independent software. Whisper Walkie is fully open source — inspect every line on GitHub.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Built with AI ─────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-32 bg-card/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="block text-primary font-bold text-xs tracking-wider uppercase mb-6">
              Human + AI collaboration
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 font-mono">
              Built with AI
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-4 max-w-2xl mx-auto">
              This entire app was built through human-AI collaboration with Claude by Anthropic.
              The architecture, the cross-platform backend, the GUI — all designed and iterated through
              a tight loop between a developer who knew what the app needed to do and an AI that could
              help ship it faster without cutting corners.
            </p>
            <p className="text-base text-foreground/50 leading-relaxed max-w-2xl mx-auto mb-8">
              That is not a disclaimer — it is the point. AI-assisted development lets a single developer
              build and maintain production-quality, cross-platform software that would otherwise require
              a team. Whisper Walkie is a working proof of that model.
            </p>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary font-medium transition-colors"
            >
              <ArrowSquareOut className="w-4 h-4" aria-hidden="true" />
              Read the source on GitHub
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <FAQ />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        {/* Blobs */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary rounded-none blur-[130px] animate-glow" />
          <div
            className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-primary rounded-none blur-[110px] animate-glow"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-mono">
              Try Whisper Walkie Today
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-xl text-foreground/70 mb-10 font-light">
              Free. Private. Works in any app.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CtaDownloadButton />
              <a href={`${GITHUB_REPO}/stargazers`} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-7 rounded-none border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30 backdrop-blur-sm transition-[color,background-color,border-color]"
                >
                  Star on GitHub
                </Button>
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p className="mt-8 text-foreground/30 text-sm">
              MIT License &middot; No account required &middot; Audio never leaves your machine
            </p>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
