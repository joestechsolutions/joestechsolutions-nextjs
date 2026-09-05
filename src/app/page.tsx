import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CinematicHero } from "@/components/home/scroll/CinematicHero";
import { ScrubScene } from "@/components/home/scroll/ScrubScene";
import { StatsScene } from "@/components/home/scroll/StatsScene";
import { HorizontalServices, type ServiceCard } from "@/components/home/scroll/HorizontalServices";
import { StackedPortfolio } from "@/components/home/scroll/StackedPortfolio";
import { StackMarquee } from "@/components/home/scroll/StackMarquee";
import { CtaScene } from "@/components/home/scroll/CtaScene";
import { TIERS, type Tier } from "@/lib/tiers";
import { SITE_OG_IMAGE } from "@/lib/og-images";

export const metadata: Metadata = {
  title: "Joe's Tech Solutions — Custom Software, Automation & AI for SMBs",
  description:
    "Custom software, automation, and AI — built for small businesses that just need things to work. I test everything on myself first. If it survives me, it'll survive you.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: [SITE_OG_IMAGE],
    title: "Joe's Tech Solutions — Custom Software, Automation & AI for SMBs",
    description:
      "Custom software, automation, and AI — built for small businesses that just need things to work. I test everything on myself first.",
    url: "https://www.joestechsolutions.com",
  },
};

// Stripe-blocked tiers route to /contact until their pages + price IDs exist.
const tierHref = (t: Tier) =>
  t.stripeReady ? t.href : `/contact?tier=${t.id}`;

const featuredSpecs = [
  { k: "privacy", v: "100%" },
  { k: "ongoing", v: "none" },
  { k: "session", v: "75 min" },
  { k: "models", v: "24" },
];

// Portfolio as `ls -la /proof_of_work/` — real screenshots, real routes.
const portfolio = [
  {
    status: "[IN_PROD]",
    live: true,
    name: "Hermes Agent System",
    desc: "My own 24/7 agent operations system — briefings, project stewards, watchdogs, content, ops. The system that runs my business.",
    href: "/stack",
    image: "/images/blog/22-agent-architecture.png",
    alt: "JTS agent architecture diagram",
  },
  {
    status: "[PAUSED]",
    live: false,
    name: "RenFaire Directory",
    desc: "The modern guide to Renaissance faires across America. 200+ listings, SEO-first architecture.",
    href: "/portfolio/renfaire-directory",
    image: "/images/renfaire-hero.jpg",
    alt: "RenFaire Directory homepage",
  },
  {
    status: "[IN_DEV]",
    live: true,
    name: "The Skate Workshop",
    desc: "Cross-platform coaching app. 400+ trick DB, video feedback, multiplayer.",
    href: "/portfolio/skate-workshop",
    image: "/images/skate-workshop-hero.png",
    alt: "The Skate Workshop app",
  },
  {
    status: "[CLIENT_WORK]",
    live: true,
    name: "Private AI Setup",
    desc: "Self-hosted AI for small businesses that don't want their data in someone else's cloud.",
    href: "/private-ai-setup",
    image: "/images/joe-launch-private-ai.png",
    alt: "Private AI setup session",
  },
  {
    status: "[ARCHIVE]",
    live: false,
    name: "Whisper Walkie",
    desc: "Push-to-talk voice typing that works in any app. Your voice never leaves your machine.",
    href: "/whisper-walkie",
    image: "/images/whisper-walkie-icon.png",
    alt: "Whisper Walkie app icon — a microphone over a soundwave field",
  },
];

// Stack as installed packages.
const stack = [
  { pkg: "ollama", desc: "local model inference", url: "https://ollama.com" },
  { pkg: "open_webui", desc: "chat interface", url: "https://openwebui.com" },
  { pkg: "replicate", desc: "cloud model api", url: "https://replicate.com" },
  { pkg: "flux", desc: "image generation", url: "https://blackforestlabs.ai" },
  { pkg: "n8n", desc: "workflow automation", url: "https://n8n.io" },
  { pkg: "cloudflare", desc: "dns, cdn, tunnels", url: "https://www.cloudflare.com" },
  { pkg: "anthropic", desc: "claude api", url: "https://anthropic.com" },
  { pkg: "openai", desc: "gpt api", url: "https://openai.com" },
  { pkg: "next_js", desc: "web framework", url: "https://nextjs.org" },
  { pkg: "react_native", desc: "mobile apps", url: "https://reactnative.dev" },
  { pkg: "supabase", desc: "database + auth", url: "https://supabase.com" },
  { pkg: "docker", desc: "containerization", url: "https://www.docker.com" },
];


// Tier data flattened into plain props (a server → client boundary sits between here
// and HorizontalServices, so no functions cross it).
const serviceCards: ServiceCard[] = TIERS.map((t) => ({
  id: t.id,
  name: t.name,
  category: t.category,
  blurb: t.blurb,
  features: t.features,
  badge: t.badge,
  href: tierHref(t),
  cta: t.stripeReady ? "get started →" : "learn more →",
  specs: t.id === "quick-start" ? featuredSpecs : undefined,
}));

// The homepage is a scroll journey: cinematic hero → pinned scrub scene → stats →
// sideways services → stacked portfolio → stack marquee → newsletter → CTA.
export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <CinematicHero />
      <ScrubScene />
      <StatsScene />
      <HorizontalServices cards={serviceCards} />
      <StackedPortfolio items={portfolio} />
      <StackMarquee items={stack} />

      {/* Newsletter — a dark console card so the signup form keeps its styling */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <FadeIn>
            <div className="border-2 border-foreground bg-[var(--panel)] p-8 shadow-[8px_8px_0_var(--foreground)] sm:p-10">
              <p className="mb-1.5 font-mono text-[13px] font-bold text-[var(--color-accent)]">
                <span className="text-[#8a919c]">joe@jts:~$ </span>
                subscribe --weekly
              </p>
              <h2 className="mb-2 font-mono text-xl font-bold text-[#f0f1ec]">
                The JTS Brief
              </h2>
              <p className="mb-6 text-sm text-[#8a919c]">
                Weekly notes from a builder actually shipping AI. 100% human. No
                slop. Unsubscribe anytime.
              </p>
              <NewsletterSignup />
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaScene />
    </div>
  );
}
