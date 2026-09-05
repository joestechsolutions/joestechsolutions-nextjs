import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { PageHero, heroPrimaryBtn } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";
import { SITE_OG_IMAGE, SECTION_OG_IMAGES } from "@/lib/og-images";

export const metadata: Metadata = {
  title: "About | Joe's Tech Solutions",
  description: "I'm what you get when you skip the agency, skip the discovery sprint, and just hire the person who's going to build your thing. Forward Deployed Engineer — I show up where the work is.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    images: [SECTION_OG_IMAGES.about],
    title: "About | Joe's Tech Solutions",
    description: "I'm what you get when you skip the agency and hire the person who's going to build your thing.",
    url: 'https://www.joestechsolutions.com/about',
  },
};

const proofPoints = [
  "One orchestrator running 40+ scheduled automations — daily briefings, a steward agent per project, health watchdogs, weekly executive reviews",
  "Three clients with live deployments I built and left running, watched around the clock by my own monitoring",
  "Local-first: orchestration, memory, and state on my own hardware; heavy inference on cloud models I choose deliberately",
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageHero
        eyebrow="whoami"
        title="I'm Joe. I build the tools your business runs on."
        highlight="business"
        size="tall"
        subtitle={
          <>
            <p>
              I&apos;m what you get when you skip the agency, skip the discovery sprint, and just hire
              the person who&apos;s going to build your thing. Forward Deployed Engineer — I show up
              where the work is, figure out what&apos;s broken, and leave it running.
            </p>
            <p className="mt-3 text-[15px] text-[#d9ece9]/60">
              I run the same stack for my own business that I build for clients. If it doesn&apos;t
              survive me, it doesn&apos;t ship to you.
            </p>
          </>
        }
        media={{ type: "video", src: "/generated/page-about-loop.mp4", poster: "/generated/page-about-loop-poster.jpg" }}
      >
        <Link href="/contact" className={heroPrimaryBtn}>get in touch</Link>
      </PageHero>

      {/* Why I do this */}
      <section className="relative py-24 sm:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-mono">
                Why I do this
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed font-light">
                <p>
                  I spent years watching small businesses get sold &quot;AI solutions&quot; by people who&apos;d
                  never run a business. Strategy decks. Retainers. &quot;Alignment sessions.&quot; Six weeks in,
                  the client has a PowerPoint and no working software.
                </p>
                <p>
                  I started JTS because I wanted to build the thing I wish existed when I needed help
                  running my own operation. No deck. No theater. Just someone who knows what they&apos;re
                  doing, building the fix and leaving it running.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The proof */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-mono">
                The proof
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-6">
                <p className="text-lg text-foreground/70 leading-relaxed font-light">
                  Here&apos;s what I run for myself right now:
                </p>
                <ul className="space-y-4">
                  {proofPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-foreground/80">
                      <CheckCircle weight="duotone" className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-foreground/70 leading-relaxed font-light pt-2">
                  I don&apos;t read about this stuff. I use it. Every day. The same stack I build for clients
                  is the stack that runs my business. That&apos;s why it works.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Who I am */}
      <section className="relative py-24 sm:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-mono">
                Who I am
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed font-light">
                <p className="text-foreground font-medium">
                  I&apos;m not a consultant. I&apos;m not an agency. I&apos;m a builder who deploys forward.
                </p>
                <p>
                  My background is in large-scale operations — autonomous vehicles, robotics, field
                  deployments. I learned to make complex systems work in the real world, not just in a
                  lab. Now I bring that to small businesses that need someone who can actually ship.
                </p>
                <p>
                  I&apos;m also a lifelong skater, a golfer who doesn&apos;t take himself seriously, and someone
                  who believes the best tools are the ones you forget about because they just work.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-background" />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-mono">
              If you&apos;ve read this far and you&apos;re thinking &quot;yeah, this guy gets it&quot; — let&apos;s talk.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/contact">
              <MagneticButton strength={0.3}>
                <Button size="lg" className="bg-primary hover:bg-primary/85 text-foreground text-lg px-12 py-7 rounded-none group shadow-2xl shadow-primary/20">
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
