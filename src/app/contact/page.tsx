import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { PageHero } from "@/components/home/scroll/PageHero";
import { SITE_OG_IMAGE, SECTION_OG_IMAGES } from "@/lib/og-images";

export const metadata: Metadata = {
  title: "Contact Joe — Custom Software & AI, San Diego | JTS",
  description: "No pitch, no pressure, no discovery call. Just tell me what you're dealing with and I'll tell you if I can help. If I can't, I'll tell you that too.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    images: [SECTION_OG_IMAGES.contact],
    title: "Contact | Joe's Tech Solutions",
    description: "No pitch, no pressure, no discovery call. Just tell me what you're dealing with and I'll tell you if I can help.",
    url: 'https://www.joestechsolutions.com/contact',
  },
};

// Pre-fill context when arriving from a service page (?interest=local|cloud|managed).
const INTEREST_COPY: Record<string, string> = {
  local: "Interested in Private AI on your own machine? Tell me about your setup and I'll take it from there.",
  cloud: "Interested in your own Private AI server? Tell me about your team and I'll take it from there.",
  managed: "Interested in Managed AI + automation? Tell me what you want off your plate and I'll take it from there.",
  gbp: "Free Google Business Profile audit — tell us your business name and city, plus the three competitors ranking above you on Maps. We'll send back what's broken, what's missing, and what we'd fix first.",
};

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const interest = typeof params.interest === "string" ? params.interest : "";
  const interestCopy = INTEREST_COPY[interest];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageHero
        eyebrow="mail joe --subject 'what is not working'"
        title="Tell me what's not working."
        highlight="working"
        subtitle={interestCopy ??
          "No pitch, no pressure, no \"discovery call.\" Just tell me what you're dealing with and I'll tell you if I can help. If I can't, I'll tell you that too."}
        media={{ type: "video", src: "/generated/page-contact-loop.mp4", poster: "/generated/page-contact-loop-poster.jpg" }}
      />

      {/* Contact Options */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-1 gap-8" staggerDelay={0.2}>
            {/* Email */}
            <StaggerItem>
              <AnimatedCard>
                <Card className="bg-card border-foreground/10 hover:border-primary/50 transition-[color,border-color,background-color] duration-500 group h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-none flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Image src="/icons/mail-dynamic/premium.png" alt="Email" width={32} height={32} className="object-contain" />
                    </div>
                    <CardTitle className="text-foreground text-2xl font-mono">Email</CardTitle>
                    <CardDescription className="text-foreground/70 text-base leading-relaxed">
                      Send me a message and I&apos;ll get back to you within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href="mailto:joe@joestechsolutions.com"
                      className="text-primary hover:text-primary text-lg font-medium transition-colors"
                    >
                      joe@joestechsolutions.com
                    </a>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </StaggerItem>
          </StaggerContainer>

          {/* Contact Form Alternative */}
          <FadeIn delay={0.4}>
            <div className="mt-12">
              <Card className="bg-card border-foreground/10">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-none flex items-center justify-center">
                      <Image src="/icons/chat-bubble-dynamic/premium.png" alt="Message" width={32} height={32} className="object-contain" />
                    </div>
                    <div>
                      <CardTitle className="text-foreground text-2xl font-mono">Quick Message</CardTitle>
                      <CardDescription className="text-foreground/70">
                        Tell me about your project
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-foreground/80 text-lg">
                    For now, please email me directly at{" "}
                    <a
                      href="mailto:joe@joestechsolutions.com"
                      className="text-primary hover:text-primary font-medium transition-colors"
                    >
                      joe@joestechsolutions.com
                    </a>
                    {" "}with:
                  </p>
                  <ul className="space-y-4 text-foreground/80">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 text-xl">•</span>
                      <span>Brief project description</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 text-xl">•</span>
                      <span>Timeline and budget (if known)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 text-xl">•</span>
                      <span>Any specific questions or requirements</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-primary hover:bg-primary/85 text-foreground mt-6 rounded-none shadow-lg shadow-primary/20">
                    <a href="mailto:joe@joestechsolutions.com?subject=Project%20Inquiry&body=Hi%20Joe%2C%0A%0AI%27m%20interested%20in%20discussing%20a%20project.%0A%0AProject%20description%3A%0A%0ATimeline%2Fbudget%3A%0A%0AQuestions%3A">
                      <Image src="/icons/mail-dynamic/premium.png" alt="Email" width={16} height={16} className="mr-2 object-contain" />
                      Send Email
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="relative py-24 bg-card/30">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-mono mb-10">
              What happens after you write.
            </h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            <StaggerItem>
              <AnimatedCard>
                <Card className="bg-card border-foreground/10 h-full">
                  <CardContent className="pt-6">
                    <p className="font-mono text-primary text-sm mb-3">1 — Same day</p>
                    <h3 className="text-lg font-bold text-foreground mb-2">I read it myself.</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      No intake form routing, no sales team. Your message lands in my inbox and
                      I reply with a straight answer — usually the same day.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </StaggerItem>
            <StaggerItem>
              <AnimatedCard>
                <Card className="bg-card border-foreground/10 h-full">
                  <CardContent className="pt-6">
                    <p className="font-mono text-primary text-sm mb-3">2 — If I can help</p>
                    <h3 className="text-lg font-bold text-foreground mb-2">One call, then a plan.</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      We talk for 20 minutes about what&apos;s broken and what it&apos;s costing you.
                      Then I send a fixed-scope plan with a real price — not a retainer trap.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </StaggerItem>
            <StaggerItem>
              <AnimatedCard>
                <Card className="bg-card border-foreground/10 h-full">
                  <CardContent className="pt-6">
                    <p className="font-mono text-primary text-sm mb-3">3 — If I can&apos;t</p>
                    <h3 className="text-lg font-bold text-foreground mb-2">I tell you that too.</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      If your problem isn&apos;t a fit — wrong budget, wrong problem, needs an agency —
                      I&apos;ll say so and point you at what would actually work. Free of charge.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Close */}
      <section className="relative py-24 sm:py-32 bg-card/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-xl text-foreground/80 mb-8 font-light">
              Not ready to talk yet? Browse the work first.
            </p>
            <Link href="/portfolio">
              <Button size="lg" className="bg-primary hover:bg-primary/85 text-foreground rounded-none group">
                See what I&apos;ve built
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
