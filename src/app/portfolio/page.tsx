import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCard } from "@/components/animations/AnimatedCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { PageHero } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";

export const metadata: Metadata = {
  title: "Portfolio | Joe's Tech Solutions",
  description: "Not a portfolio of pitch decks. Real apps, real sites, real people using them.",
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: "Portfolio | Joe's Tech Solutions",
    description: "Not a portfolio of pitch decks. Real apps, real sites, real people using them.",
    url: 'https://www.joestechsolutions.com/portfolio',
  },
};

export default function Portfolio() {
  const projects = [
    {
      id: "skate-workshop",
      title: "The Skate Workshop",
      category: "Mobile App • Web Platform",
      tag: "In Development",
      description: "Olympic-level skate coaching — video feedback, 400+ trick database, multiplayer sessions. Built for a coach who trained Olympic athletes. React Native, Stripe, real-time video.",
      image: "/images/skate-workshop-hero.png",
      imageContain: true,
      tags: ["React Native", "Next.js", "Stripe", "Real-time"],
      color: "blue",
      href: "/portfolio/skate-workshop",
      liveUrl: "https://www.theskateworkshop.app"
    },
    {
      id: "renfaire-directory",
      title: "RenFaire Directory",
      category: "Content Platform • SEO • Directory",
      tag: "Paused",
      description: "848 pages, 200+ Renaissance faire listings, top search rankings. A directory that actually makes money. Next.js, Supabase, structured data done right.",
      image: "/images/renfaire-hero.jpg",
      tags: ["Next.js", "TypeScript", "Supabase", "SEO"],
      color: "blue",
      href: "/portfolio/renfaire-directory",
      liveUrl: "https://www.renfaireguide.com"
    },
    {
      id: "cbarrgs",
      title: "Cbarrgs Music",
      category: "Artist Website",
      tag: "Live",
      description: "Music artist portfolio with streaming integrations and performance optimization. Fast, discoverable, built for an artist who needed to be found.",
      image: "/images/cbarrgs-logo.jpeg",
      tags: ["Next.js", "SEO", "Performance"],
      color: "blue",
      href: "/portfolio/cbarrgs",
      liveUrl: "https://cbarrgs.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-card via-background to-background">
      {/* Hero */}
      <PageHero
        eyebrow="ls -la /proof_of_work/"
        title="Things I've built."
        highlight="built"
        subtitle="Not a portfolio of pitch decks. Real apps, real sites, real people using them."
        media={{ type: "video", src: "/generated/page-portfolio-loop.mp4", poster: "/generated/page-portfolio-loop-poster.jpg" }}
      />

      {/* Projects Grid */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer className="grid lg:grid-cols-2 gap-8" staggerDelay={0.2}>
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <AnimatedCard>
                  <Card className="bg-card border-foreground/10 hover:border-primary/50 transition-[color,border-color,background-color,transform] duration-300 overflow-hidden group h-full">
                <div className={`relative aspect-video overflow-hidden ${project.imageContain ? 'bg-card' : ''}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`${project.imageContain ? 'object-contain p-8' : 'object-cover'} group-hover:scale-105 transition-transform duration-300`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-primary/15 text-primary backdrop-blur-sm rounded-none text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  {project.tag && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 bg-card/80 text-foreground/80 backdrop-blur-sm rounded-none text-sm font-medium">
                        {project.tag}
                      </span>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground mb-2 font-mono">{project.title}</CardTitle>
                  <CardDescription className="text-foreground/70 text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-card border border-foreground/10 rounded-none text-foreground/80 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={project.href} className="flex-1">
                      <Button className="w-full bg-primary hover:bg-primary/85 group/btn">
                        View Case Study
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full border-foreground/20 hover:bg-foreground/5">
                        Live Site
                        <ArrowSquareOut className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* More Projects Coming */}
          <FadeIn delay={0.4}>
            <div className="mt-16">
              <Card className="bg-card/30 border-foreground/10 border-dashed">
                <CardContent className="py-12">
                  <p className="text-foreground/70 text-lg mb-6">
                    Working on a salon management app, a golf + skate course directory, and a few things
                    I can&apos;t talk about yet. Want to be next?
                  </p>
                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/85">
                      Get in touch
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-32 bg-card/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-xl text-foreground/80 mb-8 font-light">
              Don&apos;t see your industry here? Doesn&apos;t matter. I build for the problem, not the vertical.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/contact">
              <MagneticButton strength={0.3}>
                <Button size="lg" className="bg-primary hover:bg-primary/85 text-lg px-10 py-6 group">
                  Tell me what you need
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
