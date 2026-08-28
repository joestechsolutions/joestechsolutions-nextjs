import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Robot, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import {
  FirstAidKit, Scales, ChartLine, Heart, GraduationCap,
  Buildings, HardHat, PaintBrush, Storefront,
} from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { VERTICALS_DATA } from "@/lib/verticals";

// Map icon names to components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ComponentType<any>> = {
  FirstAidKit, Scales, ChartLine, Heart, GraduationCap,
  Buildings, HardHat, PaintBrush, Storefront,
};

export default function IndustriesPage() {
  const verticals = Object.values(VERTICALS_DATA);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-none blur-[120px] animate-glow" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary rounded-none blur-[100px] animate-glow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-primary/10 border border-primary/20 mb-6">
                <Robot weight="duotone" className="h-5 w-5 text-primary" />
                <span className="text-primary font-medium">9 Industry Assistants</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-mono">
                <span className="block text-foreground mb-3">Built for Your Industry</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl sm:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-light">
                Every Private AI Setup includes pre-configured assistants with industry-specific prompts,
                recommended models, and compliance features — ready to use from day one.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {verticals.map((vertical) => {
              const IconComponent = iconMap[vertical.icon];
              return (
                <StaggerItem key={vertical.slug}>
                  <AnimatedCard>
                    <Link href={`/private-ai-setup/industries/${vertical.slug}`} className="block h-full">
                      <Card className="bg-card border-foreground/10 hover:border-primary/50 transition-[color,border-color,background-color] duration-500 h-full group cursor-pointer overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-br from-primary/5 to-transparent rounded-none blur-3xl" />
                        <CardContent className="p-8 relative">
                          <div className="flex items-start justify-between mb-6">
                            <div className="w-14 h-14 bg-primary/10 rounded-none flex items-center justify-center group-hover:scale-110 transition-transform">
                              {IconComponent && <IconComponent weight="duotone" className="h-7 w-7 text-primary" />}
                            </div>
                            {vertical.isPremium && (
                              <span className="flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-none text-primary text-xs font-medium">
                                <ShieldCheck weight="fill" className="h-3.5 w-3.5" />
                                Compliance
                              </span>
                            )}
                          </div>

                          <h2 className="text-2xl font-bold text-foreground font-mono mb-2 group-hover:text-primary transition-colors">
                            {vertical.name}
                          </h2>
                          <p className="text-primary text-sm font-medium mb-3">{vertical.tagline}</p>
                          <p className="text-foreground/60 text-sm leading-relaxed mb-6 line-clamp-3">
                            {vertical.description}
                          </p>

                          <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-[gap]">
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-none blur-[150px] animate-glow" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-mono">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              All 9 industry assistants are included with every Private AI Setup.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/private-ai-setup">
              <MagneticButton strength={0.3}>
                <Button size="lg" className="bg-primary hover:bg-primary/85 text-foreground text-lg px-12 py-7 rounded-none group shadow-2xl shadow-primary/20">
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
