import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Gear,
  ChartLineUp,
  PencilLine,
  Code,
  MagnifyingGlass,
  DownloadSimple,
} from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";
import { SITE_OG_IMAGE } from "@/lib/og-images";

export const metadata: Metadata = {
  title: "Free Prompt Library | Joe's Tech Solutions",
  description:
    "The prompt library I actually use — ops, sales, content, coding, and research prompts pulled straight from my daily agent workflows. Free download.",
  alternates: {
    canonical: "/prompt-library",
  },
  openGraph: {
    images: [SITE_OG_IMAGE],
    title: "Free Prompt Library | Joe's Tech Solutions",
    description:
      "The prompt library I actually use — ops, sales, content, coding, and research prompts. Free download.",
    url: "https://www.joestechsolutions.com/prompt-library",
  },
};

const categories = [
  {
    name: "Ops",
    icon: Gear,
    accent: "text-primary",
    iconBg: "bg-primary/10",
    description: "Daily briefings, meeting prep, and task triage — the prompts that run my mornings.",
    sample:
      "“Summarize my calendar, inbox, and open tasks for today. Flag anything blocking, anything overdue, and the one thing I should do first.”",
  },
  {
    name: "Sales",
    icon: ChartLineUp,
    accent: "text-primary",
    iconBg: "bg-primary/10",
    description: "Outreach drafts, follow-up sequences, and lead qualification that don't sound like a robot wrote them.",
    sample:
      "“Draft a follow-up to this thread. Reference what they actually said, keep it under 100 words, end with one concrete next step.”",
  },
  {
    name: "Content",
    icon: PencilLine,
    accent: "text-primary",
    iconBg: "bg-primary/10",
    description: "Blog outlines, social posts, and newsletter drafts in my voice — not generic AI filler.",
    sample:
      "“Turn these build notes into a blog post outline. Lead with the problem, show the real numbers, no hype words.”",
  },
  {
    name: "Coding",
    icon: Code,
    accent: "text-primary",
    iconBg: "bg-primary/10",
    description: "Code review, debugging, and refactoring prompts I use with my own agent stack every day.",
    sample:
      "“Review this diff for bugs only — no style nits. For each issue, show the exact failure case that triggers it.”",
  },
  {
    name: "Research",
    icon: MagnifyingGlass,
    accent: "text-primary",
    iconBg: "bg-primary/10",
    description: "Competitor scans, tool comparisons, and decision briefs that come back with sources, not vibes.",
    sample:
      "“Compare these three tools for my use case. Cite sources for every claim, and tell me what you'd pick and why.”",
  },
];

export default function PromptLibrary() {
  return (
    <div className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.joestechsolutions.com" },
          { name: "Prompt Library", url: "https://www.joestechsolutions.com/prompt-library" },
        ]}
      />

      {/* Hero */}
      <PageHero
        eyebrow="ls ~/prompts"
        title="The prompt library I actually use."
        highlight="actually"
        subtitle="Not scraped from Twitter. These are the prompts running my agents right now — ops, sales, content, coding, and research. Free, in exchange for your email."
        media={{ type: "video", src: "/generated/page-prompt-library-loop.mp4", poster: "/generated/page-prompt-library-loop-poster.jpg" }}
      />

      {/* Categories */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <StaggerItem key={category.name} className="h-full">
                  <AnimatedCard className="h-full">
                    <Card className="h-full bg-card border-foreground/10 hover:border-primary/40 transition-[color,border-color,background-color] duration-500 group p-8">
                      <div className="space-y-4">
                        <div
                          className={`w-14 h-14 ${category.iconBg} rounded-none flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <Icon weight="duotone" className={`h-8 w-8 ${category.accent}`} />
                        </div>
                        <h2 className="text-xl font-bold text-foreground font-mono">
                          {category.name}
                        </h2>
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {category.description}
                        </p>
                        <blockquote className="border-l-2 border-foreground/10 pl-4 text-foreground/50 text-sm italic leading-relaxed">
                          {category.sample}
                        </blockquote>
                      </div>
                    </Card>
                  </AnimatedCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Founder proof — one line, not an info dump */}
      <section className="relative py-12 border-y border-foreground/5 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-lg text-foreground/60 font-light">
              These prompts run my business — one orchestrator, 40+ scheduled automations, every day. I didn&apos;t
              curate them from a blog post. I wrote them because I needed them.{" "}
              <Link href="/stack" className="text-primary hover:underline">See the live stack</Link>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Lead Magnet Form */}
      <section className="relative py-24 sm:py-32 bg-card/30 border-y border-foreground/5">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-mono">
              Get the full library.
            </h2>
            <p className="text-lg text-foreground/70 mb-10 font-light">
              Drop your email and I&apos;ll send you the whole thing — plus the occasional note
              when I add new prompts. No spam, unsubscribe anytime.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <NewsletterSignup
              source="prompt-library"
              buttonLabel="Send Me the Library"
              successContent={
                <div className="bg-background border border-primary/30 rounded-none p-8 space-y-3">
                  <DownloadSimple
                    weight="duotone"
                    className="h-10 w-10 text-primary mx-auto"
                  />
                  <p className="text-foreground font-semibold font-mono">You&apos;re in.</p>
                  <p className="text-foreground/60 text-sm">
                    Download coming soon — I&apos;m packaging the PDF now. You&apos;ll get it in
                    your inbox the moment it&apos;s ready.
                  </p>
                </div>
              }
            />
          </FadeIn>
        </div>
      </section>

      <CtaScene id="cta" />
    </div>
  );
}
