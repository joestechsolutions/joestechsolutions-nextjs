import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AngleBand } from "@/components/ui/AngleBand";
import { PageHero, heroPrimaryBtn, heroSecondaryBtn } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";
import { ArrowRight, MapPin, Star, ChatText, Camera, CalendarCheck, ListMagnifyingGlass, Robot, ShieldCheck, Flag, LinkSimple, ChartBar, FileText, Question } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Google Maps Growth | Joe's Tech Solutions",
  description:
    "Your Google Business Profile, run by an AI agent. Weekly posts, review replies, fresh photos, and keyword upkeep — the steady work that moves you up Google Maps. Month-to-month, Google-compliant, quoted to fit your business.",
  alternates: {
    canonical: "/google-maps-growth",
  },
  openGraph: {
    title: "Google Maps Growth | Joe's Tech Solutions",
    description:
      "An AI agent runs your Google Business Profile — weekly posts, review replies, photos, keywords. Month-to-month, policy-compliant, human-reviewed.",
    url: "https://www.joestechsolutions.com/google-maps-growth",
  },
};

const problems = [
  {
    icon: MapPin,
    title: "Buried on Maps",
    body: "The top 3 map results take the majority of every search. If you're below the fold, the call went to a competitor before they ever scrolled to you.",
  },
  {
    icon: Star,
    title: "Reviews go cold",
    body: "Every unanswered review — good or bad — reads as 'they stopped caring.' Responding within hours is one of the strongest signals your profile can send.",
  },
  {
    icon: CalendarCheck,
    title: "A stale profile",
    body: "No posts since spring, five photos, a services list from two owners ago. Google reads inactivity as decay, and so do customers.",
  },
];

const steps = [
  {
    num: "01",
    title: "Audit",
    body: "We crawl your profile, categories, keywords, citations, and the three competitors ranking above you. You get the fix list on day one.",
  },
  {
    num: "02",
    title: "Agent setup",
    body: "Your AI agent learns your business voice and service areas. High-stakes replies route through human review — everything is checked before it goes live.",
  },
  {
    num: "03",
    title: "Weekly operations",
    body: "Posts go out, every review gets a reply within hours, fresh photos and keyword tuning land on a schedule. Consistent, compliant, done.",
  },
  {
    num: "04",
    title: "Monthly report",
    body: "Search views, calls, direction requests, and where you moved — plus what we're doing next. Plain English, no dashboard to learn.",
  },
];

const included = [
  {
    icon: FileText,
    title: "Weekly GBP posts",
    body: "Offers, updates, and seasonal content written in your voice.",
  },
  {
    icon: ChatText,
    title: "Review replies, every one",
    body: "Positive or negative, answered within hours — human-reviewed.",
  },
  {
    icon: Camera,
    title: "Photo cadence",
    body: "Fresh, geotagged, service-relevant photos added on schedule.",
  },
  {
    icon: ListMagnifyingGlass,
    title: "Category & keyword tuning",
    body: "Services, attributes, and descriptions kept aligned with what people actually search.",
  },
  {
    icon: Question,
    title: "Q&A monitoring",
    body: "Questions on your listing answered before they cost you calls.",
  },
  {
    icon: LinkSimple,
    title: "Citation consistency",
    body: "Name, address, and phone checked across the directories Google cross-references.",
  },
  {
    icon: Flag,
    title: "Spam & fake-review flagging",
    body: "Competitor listings gaming the Map Pack, and junk reviews on yours — reported.",
  },
  {
    icon: ChartBar,
    title: "Monthly report",
    body: "Rankings, calls, and direction requests — with next month's plan attached.",
  },
];

const faqs = [
  {
    q: "Do you need my Google password?",
    a: "No. You grant manager access to your Business Profile — you stay the owner and can revoke access anytime. We never ask for credentials.",
  },
  {
    q: "What does it cost?",
    a: "It's quoted per business after a short call — pricing depends on your market, number of locations, and how much catch-up work your profile needs. Month-to-month, no long contract.",
  },
  {
    q: "How fast will I see results?",
    a: "Profile activity (posts, replies, photos) improves immediately — customers see it within days. Ranking movement on Maps typically builds over 4–8 weeks of consistent upkeep. Anyone promising 'top 3 in 14 days' is guessing or gaming your listing.",
  },
  {
    q: "Can my listing get suspended?",
    a: "We work strictly inside Google's published guidelines — no engagement farming, no bought reviews, no pay-to-rank schemes. That's exactly why our clients' listings stay healthy while shortcut operators get suspended.",
  },
  {
    q: "Why not just buy a cheap SEO tool?",
    a: "A tool gives you dashboards; you still do the work. This is a done-for-you service — an AI agent does the labor, a human reviews the judgment calls, and you get your hours back.",
  },
];

export default function GoogleMapsGrowth() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Google Maps Growth — AI-Managed Google Business Profile",
            provider: {
              "@type": "Organization",
              name: "Joe's Tech Solutions",
              url: "https://www.joestechsolutions.com",
            },
            description:
              "AI-managed Google Business Profile service: weekly posts, review replies, photo optimization, keyword tuning, and monthly reporting for local businesses.",
            areaServed: "US",
            serviceType: "Local SEO / Google Business Profile management",
          }),
        }}
      />

      {/* Hero */}
      <PageHero
        eyebrow="gbp-agent --weekly · for local businesses that live on Map calls"
        title="Your Google profile, run by an AI agent."
        highlight="agent"
        size="tall"
        subtitle="Weekly posts. Every review answered. Photos and keywords kept fresh — the steady upkeep that moves you up Google Maps, handled for you while you run the business."
        media={{ type: "image", src: "/generated/page-google-maps.jpg" }}
      >
        <Link href="/contact?interest=gbp" className={heroPrimaryBtn}>get a quote →</Link>
        <Link href="#how" className={heroSecondaryBtn}>see how it works</Link>
      </PageHero>

      {/* The problem */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-mono mb-4">
                Why good businesses rank badly
              </h2>
              <p className="text-foreground/60 text-lg font-light max-w-2xl mx-auto">
                It&apos;s rarely one big mistake. It&apos;s a thousand small lapses
                that add up to invisible.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((p, i) => (
              <FadeIn key={p.title} delay={0.1 + i * 0.08}>
                <Card className="bg-card/60 border-foreground/10 h-full p-8 hover:border-primary/40 transition-colors duration-500">
                  <p.icon className="h-8 w-8 text-primary mb-5" />
                  <h3 className="text-xl font-bold text-foreground font-mono mb-3">{p.title}</h3>
                  <p className="text-foreground/70 leading-relaxed font-light">{p.body}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <AngleBand />

      {/* How it works */}
      <section id="how" className="relative py-20 sm:py-28 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                <Robot weight="duotone" className="h-4 w-4" />
                How it works
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-mono">
                Four steps. Then it runs.
              </h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={0.1 + i * 0.08}>
                <div className="h-full border border-foreground/10 bg-card/40 p-7 hover:border-primary/40 transition-colors duration-500">
                  <div className="text-5xl font-bold font-mono text-primary/25 mb-5">{s.num}</div>
                  <h3 className="text-lg font-bold text-foreground font-mono mb-3">{s.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed font-light">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="relative py-20 sm:py-28 bg-card/30 border-y border-foreground/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-mono mb-4">
                What&apos;s included
              </h2>
              <p className="text-foreground/60 text-lg font-light max-w-2xl mx-auto">
                Everything a well-run profile needs, on a schedule you never think about.
              </p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {included.map((f, i) => (
              <FadeIn key={f.title} delay={0.05 + (i % 4) * 0.05}>
                <div className="h-full bg-background border border-foreground/10 p-6 hover:border-primary/40 transition-colors duration-500">
                  <f.icon className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-bold text-foreground font-mono text-sm mb-2">{f.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed font-light">{f.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Honest expectations */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeIn>
            <Card className="border-primary/30 bg-primary/5 p-10 sm:p-12">
              <div className="flex items-start gap-5">
                <ShieldCheck weight="duotone" className="h-10 w-10 text-primary shrink-0" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-mono mb-4">
                    Our one promise: no magic
                  </h2>
                  <p className="text-foreground/80 leading-relaxed font-light mb-4">
                    We won&apos;t promise &quot;top 3 in 14 days.&quot; Anyone who does is either
                    guessing or gaming your listing — and Google suspends listings for the second one.
                    A suspension costs you every call you were getting, plus some.
                  </p>
                  <p className="text-foreground/80 leading-relaxed font-light mb-6">
                    What we do is the steady, policy-compliant upkeep Google&apos;s own guidance
                    asks for. Profiles that get it consistently tend to climb, and the ones we
                    keep climbing stay climbed. We&apos;ll show you exactly what changed, every month.
                  </p>
                  <ul className="space-y-2 text-foreground/70 text-sm font-light">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-primary inline-block" />
                      Month-to-month — cancel anytime, no cancellation fee
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-primary inline-block" />
                      Every asset we create stays yours
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-primary inline-block" />
                      Google&apos;s published guidelines, never against them
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Who it's for */}
      <section className="relative pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-mono mb-4">
                Built for businesses that live on the Map
              </h2>
              <p className="text-foreground/60 text-lg font-light">
                Best fit: home services, trades, clinics, studios, and shops with a
                physical location — 4+ star rating, already spending on ads, tired of
                ranking under someone else.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 sm:py-24 border-t border-foreground/10">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                <Question weight="duotone" className="h-4 w-4" />
                Straight answers
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-mono">
                Questions, answered
              </h2>
            </div>
          </FadeIn>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <FadeIn key={f.q} delay={0.05 + i * 0.05}>
                <details className="group border border-foreground/10 bg-card/40 hover:border-primary/30 transition-colors open:border-primary/40">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-6 font-mono font-bold text-foreground">
                    {f.q}
                    <span className="text-primary text-2xl leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-foreground/70 leading-relaxed font-light">{f.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-xl text-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Tell us your business and the three competitors ranking above you.
              We&apos;ll send back a free profile audit — what&apos;s broken, what&apos;s
              missing, and what we&apos;d do about it.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/contact?interest=gbp">
              <MagneticButton strength={0.3}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/85 text-foreground text-lg px-12 py-7 rounded-none group shadow-2xl shadow-primary/20"
                >
                  <ChartBar weight="duotone" className="mr-2 h-5 w-5" />
                  Get my free audit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
            </Link>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="mt-6 text-foreground/40 text-sm font-light flex items-center justify-center gap-2">
              <ChartBar weight="duotone" className="h-3.5 w-3.5" />
              Free audit · no commitment · month-to-month after
            </p>
          </FadeIn>
        </div>
      </section>

      <CtaScene id="cta" />
    </div>
  );
}