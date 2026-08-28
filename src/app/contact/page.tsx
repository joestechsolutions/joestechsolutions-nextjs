import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

export const metadata: Metadata = {
  title: "Contact | Joe's Tech Solutions",
  description: "No pitch, no pressure, no discovery call. Just tell me what you're dealing with and I'll tell you if I can help. If I can't, I'll tell you that too.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
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
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-background" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-mono">
                <span className="block text-foreground mb-3">Tell me what&apos;s not working.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed font-light">
                {interestCopy ??
                  "No pitch, no pressure, no \"discovery call.\" Just tell me what you're dealing with and I'll tell you if I can help. If I can't, I'll tell you that too."}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

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
                      <Image src="/icons/mail-dynamic/premium.png" alt="" width={16} height={16} className="mr-2 object-contain" />
                      Send Email
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
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
