import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Microphone, DownloadSimple, ArrowSquareOut, MapPin } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AngleBand } from "@/components/ui/AngleBand";
import { TierCard } from "@/components/ui/TierCard";
import { OfferCatalogSchema } from "@/components/seo/JsonLd";
import { TIERS } from "@/lib/tiers";
import { PageHero } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";
import { SITE_OG_IMAGE } from "@/lib/og-images";

export const metadata: Metadata = {
  title: "Services | Joe's Tech Solutions",
  description:
    "Three ways I work with you — from a one-time setup to a full operations layer to a custom build. Start where you need to, move up when you're ready.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    images: [SITE_OG_IMAGE],
    title: "Services | Joe's Tech Solutions",
    description:
      "Three ways I work with you — from a one-time setup to a full Custom Build. Start where you need to, move up when you're ready.",
    url: "https://www.joestechsolutions.com/services",
  },
};

export default function Services() {
  return (
    <div className="min-h-screen">
      <OfferCatalogSchema />

      {/* Hero */}
      <PageHero
        eyebrow="cat services.md"
        title="Three ways I work with you."
        highlight="work"
        subtitle="From a one-time setup to a full operations layer. Start where you need to, move up when you're ready."
        media={{ type: "video", src: "/generated/page-services-loop.mp4", poster: "/generated/page-services-loop-poster.jpg" }}
      />

      {/* One anchored section per tier */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TIERS.map((tier, index) => (
              <FadeIn key={tier.id} delay={0.1 + index * 0.05} className="h-full">
                {/* scroll-mt keeps anchor targets clear of the fixed header */}
                <div id={tier.id} className="h-full scroll-mt-24">
                  <TierCard tier={tier} />
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Google Maps Growth banner */}
          <FadeIn delay={0.3}>
            <Link href="/google-maps-growth" className="block mt-8">
              <Card className="bg-card/60 border-primary/20 hover:border-primary/50 transition-colors duration-500 group p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-14 h-14 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <MapPin weight="duotone" className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground font-mono mb-1">
                      Google Maps Growth
                    </h3>
                    <p className="text-foreground/70 font-light">
                      New: an AI agent runs your Google Business Profile — posts, review replies,
                      photos, keywords. For businesses that live on Map calls.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/85 text-foreground text-sm font-medium rounded-none shrink-0">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Card>
            </Link>
          </FadeIn>

          {/* Free Tools */}
          <FadeIn delay={0.35}>
            <div className="mt-20">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 font-mono">
                  Free & Open Source
                </h2>
                <p className="text-foreground/60 text-base font-light">
                  Free tools I built and still ship.
                </p>
              </div>

              <Link href="/whisper-walkie" className="block">
                <AnimatedCard>
                  <Card className="bg-card/60 border-foreground/10 hover:border-primary/40 transition-[color,border-color,background-color] duration-500 group overflow-hidden">
                    <div className="relative grid sm:grid-cols-[auto_1fr_auto] items-center gap-6 p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-none flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-[color,background-color,transform] duration-300 mx-auto sm:mx-0">
                        <Microphone weight="duotone" className="h-8 w-8 text-primary" />
                      </div>

                      <div className="text-center sm:text-left">
                        <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
                          <h3 className="text-xl font-bold text-foreground font-mono">
                            Whisper Walkie
                          </h3>
                          <span className="px-2.5 py-0.5 bg-primary/15 rounded-none text-primary text-xs font-medium">
                            Free
                          </span>
                        </div>
                        <p className="text-foreground/70 text-base leading-relaxed mb-3">
                          Push-to-talk voice typing for any app. Hold a key, speak, release — text
                          appears wherever your cursor is. 100% local, no cloud, no subscriptions.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          {["Windows", "macOS", "Linux", "GPU Accelerated", "Offline"].map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-foreground/5 rounded text-foreground/50 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 items-center">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/85 text-foreground text-sm font-medium rounded-none shadow-lg shadow-primary/20 transition-colors">
                          <DownloadSimple weight="duotone" className="h-4 w-4" />
                          Download Free
                        </span>
                        <span className="text-foreground/40 text-xs flex items-center gap-1">
                          <ArrowSquareOut className="h-3 w-3" />
                          MIT License
                        </span>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <AngleBand />

      {/* CTA */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-xl text-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Don&apos;t know which one you need? Tell me what&apos;s not working and I&apos;ll tell you.
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
