import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Joe's Tech Solutions — Custom Software, Automation & AI for SMBs",
  description:
    "Custom software, automation, and AI — built for small businesses that just need things to work. I test everything on myself first. If it survives me, it'll survive you.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Joe's Tech Solutions — Custom Software, Automation & AI for SMBs",
    description:
      "Custom software, automation, and AI — built for small businesses that just need things to work. I test everything on myself first.",
    url: "https://www.joestechsolutions.com",
  },
};
import { FadeIn } from "@/components/animations/FadeIn";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { TerminalHero } from "@/components/home/TerminalHero";
import { SmoothScroll } from "@/components/home/SmoothScroll";
import { TIERS, type Tier } from "@/lib/tiers";

// System stats rendered as terminal key/value output.
const stats = [
  { key: "agents_running", val: "14" },
  { key: "downtime_since_launch", val: "0" },
  { key: "automations_on_schedule", val: "32" },
  { key: "local_and_private", val: "100%" },
];

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
    desc: "My own 24/7 multi-agent system — coding, research, content, ops. The thing running this site.",
    href: "/stack",
    image: "/images/blog/22-agent-architecture.png",
    alt: "14-agent architecture diagram",
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

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-1.5 font-mono text-[13px] font-bold text-foreground">
      <span className="text-primary">$ </span>
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <SmoothScroll />

      <TerminalHero />

      {/* Stats — system output */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-7 font-mono text-sm">
          {stats.map((s) => (
            <div
              key={s.key}
              className="flex justify-between border-b border-dashed border-border/70 py-1.5"
            >
              <span className="text-muted-foreground">{s.key}</span>
              <span className="font-bold">{s.val}</span>
            </div>
          ))}
          <div className="flex justify-between py-1.5">
            <span className="text-muted-foreground">system</span>
            <span className="font-bold text-[var(--ok)]">● operational</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <SectionLabel>cat services.md</SectionLabel>
          <h2 className="mb-8 font-mono text-2xl font-bold tracking-tight">
            Three ways I work with you.
          </h2>
          <div className="flex flex-col gap-5">
            {TIERS.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.05}>
                <div
                  className={`border-2 border-foreground bg-card p-6 ${t.badge ? "shadow-[6px_6px_0_var(--primary)]" : ""}`}
                >
                  <p className="mb-2 font-mono text-[11px] tracking-wider text-muted-foreground">
                    {t.badge ? (
                      <>
                        [ <span className="font-bold text-primary">{t.badge.toUpperCase()}</span> ]{" "}
                        {t.category.toLowerCase()}
                      </>
                    ) : (
                      `[ ${t.category.toLowerCase()} ]`
                    )}
                  </p>
                  <h3 className="font-mono text-lg font-bold">
                    <span className="text-primary">▸ </span>
                    {t.name}
                  </h3>
                  <p className="mb-3 max-w-[600px] text-[13.5px] text-foreground/80">
                    {t.blurb}
                  </p>
                  {t.id === "quick-start" && (
                    <p className="mb-3.5 font-mono text-xs text-muted-foreground">
                      {featuredSpecs.map((m, j) => (
                        <span key={m.k}>
                          {m.k}: <span className="font-bold text-foreground">{m.v}</span>
                          {j < featuredSpecs.length - 1 ? " · " : ""}
                        </span>
                      ))}
                    </p>
                  )}
                  <Link
                    href={tierHref(t)}
                    className="border-b-2 border-primary font-mono text-[13px] font-bold text-foreground transition-colors hover:text-primary"
                  >
                    {t.stripeReady ? "get started →" : "learn more →"}
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio — ls output with real screenshots */}
      <section id="portfolio" className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <SectionLabel>ls -la /proof_of_work/</SectionLabel>
          <h2 className="mb-8 font-mono text-2xl font-bold tracking-tight">
            Real things I&apos;ve built.
          </h2>
          <div className="flex flex-col">
            {portfolio.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.04}>
                <Link
                  href={p.href}
                  className={`group flex flex-wrap items-start gap-5 py-4 ${i < portfolio.length - 1 ? "border-b border-dashed border-border" : ""}`}
                >
                  <div className="relative h-[88px] w-[132px] shrink-0 border-2 border-foreground">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="132px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-mono text-[11px] font-bold ${p.live ? "text-[var(--ok)]" : "text-muted-foreground/70"}`}
                    >
                      {p.status}
                    </p>
                    <h3 className="mb-1 mt-0.5 font-mono text-[15px] font-bold group-hover:text-primary">
                      {p.name}
                    </h3>
                    <p className="max-w-[460px] text-[12.5px] text-muted-foreground">
                      {p.desc}
                    </p>
                  </div>
                  <span className="whitespace-nowrap font-mono text-xs font-bold text-primary">
                    view →
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stack — installed packages */}
      <section id="stack" className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <SectionLabel>cat /etc/stack.txt</SectionLabel>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-mono text-2xl font-bold tracking-tight">
              What I actually run.
            </h2>
            <Link
              href="/stack"
              className="border-b-2 border-primary font-mono text-[13px] font-bold transition-colors hover:text-primary"
            >
              see the live stack →
            </Link>
          </div>
          <div className="font-mono text-[13.5px] leading-[2.1]">
            {stack.map((t) => (
              <div key={t.pkg}>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:underline"
                >
                  {t.pkg}
                </a>{" "}
                <span className="text-muted-foreground">— {t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter — a dark console card so the signup form keeps its styling */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14">
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

      {/* CTA */}
      <section id="contact">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="mb-1.5 font-mono text-[13px] font-bold">
            <span className="text-primary">$ </span>
            echo &quot;ready?&quot;
          </p>
          <h2 className="mx-auto mb-7 mt-2 max-w-xl font-mono text-[22px] font-bold leading-normal">
            If you made it this far, you probably already know if you want to{" "}
            <span className="text-primary">talk</span>.
          </h2>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link
              href="/contact"
              className="border-2 border-foreground bg-foreground px-6 py-2.5 font-mono text-sm font-bold text-background transition-colors hover:border-primary hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              get in touch
            </Link>
            <a
              href="mailto:joe@joestechsolutions.com"
              className="border-2 border-foreground px-6 py-2.5 font-mono text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              email me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
