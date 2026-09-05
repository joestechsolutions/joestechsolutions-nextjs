import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, CheckCircle, ShieldCheck, Robot, ChatCircle, Cpu } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { VERTICALS_DATA, getAllVerticalSlugs } from "@/lib/verticals";
import type { Metadata } from "next";
import { SITE_OG_IMAGE, SECTION_OG_IMAGES } from "@/lib/og-images";

// Generate static params for all verticals
export function generateStaticParams() {
  return getAllVerticalSlugs().map((slug) => ({
    vertical: slug,
  }));
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical: slug } = await params;
  const vertical = VERTICALS_DATA[slug];

  if (!vertical) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${vertical.name} AI Assistant | Private AI Setup | Joe's Tech Solutions`,
    description: vertical.description,
    alternates: {
      canonical: `/private-ai-setup/industries/${slug}`,
    },
    openGraph: {
    images: [SECTION_OG_IMAGES.industries],
      title: `${vertical.name} AI Assistant | Joe's Tech Solutions`,
      description: vertical.tagline + " — " + vertical.description,
      url: `https://www.joestechsolutions.com/private-ai-setup/industries/${slug}`,
    },
  };
}

export default async function VerticalDetailPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical: slug } = await params;
  const vertical = VERTICALS_DATA[slug];

  if (!vertical) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-none blur-[120px] animate-glow" />
          {vertical.isPremium && (
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary rounded-none blur-[100px] animate-glow" style={{ animationDelay: '2s' }} />
          )}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/private-ai-setup/industries"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>All Industries</span>
            </Link>
          </FadeIn>

          <div className="max-w-4xl">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                {vertical.isPremium && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-none text-primary text-sm font-medium">
                    <ShieldCheck weight="fill" className="h-4 w-4" />
                    Compliance-Ready
                  </span>
                )}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-mono text-foreground mb-6">
                {vertical.name} AI
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl sm:text-2xl text-primary font-medium mb-4">
                {vertical.tagline}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="text-xl text-foreground/80 max-w-3xl leading-relaxed font-light">
                {vertical.description}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Private + Features */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Why Private AI */}
            <FadeIn delay={0.1}>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6 font-mono">
                  Why Private AI for {vertical.name}
                </h2>
                <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                  {vertical.whyPrivate}
                </p>

                {/* Welcome Message */}
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-none">
                  <div className="flex items-center gap-2 mb-3">
                    <Robot weight="duotone" className="h-5 w-5 text-primary" />
                    <span className="text-primary font-medium text-sm">What your AI says when you log in</span>
                  </div>
                  <p className="text-foreground/80 italic leading-relaxed">
                    &ldquo;{vertical.welcomeMessage}&rdquo;
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* What the AI Can Do */}
            <FadeIn delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6 font-mono">
                  What Your AI Can Do
                </h2>
                <div className="space-y-4">
                  {vertical.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-foreground/5">
                      <CheckCircle weight="duotone" className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sample Prompts */}
      <section className="relative py-16 sm:py-24 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-mono">
                Try These Prompts
              </h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                Here are example conversations to get you started with your {vertical.name.toLowerCase()} AI assistant.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {vertical.samplePrompts.map((prompt, index) => (
              <StaggerItem key={index}>
                <AnimatedCard>
                  <Card className="bg-card border-foreground/10 hover:border-primary/30 transition-[color,border-color,background-color] duration-300 h-full">
                    <CardContent className="p-6">
                      <ChatCircle weight="duotone" className="h-6 w-6 text-primary mb-3" />
                      <p className="text-foreground/80 leading-relaxed">&ldquo;{prompt}&rdquo;</p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Recommended Models */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-mono">
                Recommended Models
              </h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                The installer auto-detects your hardware and picks the best model. Here&apos;s what works best for {vertical.name.toLowerCase()}.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto" staggerDelay={0.1}>
            {vertical.recommendedModels.map((model, index) => (
              <StaggerItem key={index}>
                <AnimatedCard>
                  <Card className="bg-card border-foreground/10 hover:border-primary/30 transition-[color,border-color,background-color] duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <Cpu weight="duotone" className="h-8 w-8 text-primary mx-auto mb-3" />
                      <p className="text-primary font-semibold mb-1">{model.ram} RAM</p>
                      <p className="text-foreground font-mono text-sm mb-2">{model.model}</p>
                      <p className="text-foreground/50 text-sm">{model.why}</p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Compliance Checklist (premium verticals only) */}
      {vertical.isPremium && vertical.complianceNotes && (
        <section className="relative py-16 sm:py-24 bg-card/30">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <ShieldCheck weight="duotone" className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-mono">
                  Security &amp; Compliance Checklist
                </h2>
                <p className="text-foreground/60 max-w-2xl mx-auto">
                  I configure these security hardening steps during your setup session.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="bg-card border-primary/20">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {vertical.complianceNotes.map((note, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle weight="duotone" className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{note}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-none blur-[150px] animate-glow" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-mono">
              Get Your {vertical.name} AI Today
            </h2>
            <p className="text-xl text-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              {vertical.isPremium
                ? `The ${vertical.name} assistant is included with every tier. For compliance features, I recommend the Managed plan.`
                : `The ${vertical.name} assistant is included with every Private AI Setup.`}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/private-ai-setup">
                <MagneticButton strength={0.3}>
                  <Button size="lg" className={`text-foreground text-lg px-10 py-7 rounded-none group shadow-2xl ${
                    vertical.isPremium
                      ? "bg-primary hover:bg-primary shadow-primary/30"
                      : "bg-primary hover:bg-primary/85 shadow-primary/20"
                  }`}>
                    View Pricing
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </MagneticButton>
              </Link>
              <Link href="/private-ai-setup/industries">
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 rounded-none border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30 text-foreground">
                  Browse All Industries
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
