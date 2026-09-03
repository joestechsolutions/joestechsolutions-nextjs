import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, DeviceMobile, Globe, Lightning, Users } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { PageHero, heroPrimaryBtn } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";

export const metadata: Metadata = {
  title: "The Skate Workshop Case Study | Joe's Tech Solutions",
  description: "Olympic-level skateboarding coaching platform built with React Native, Next.js, and real-time features. Mobile app development case study.",
  alternates: {
    canonical: '/portfolio/skate-workshop',
  },
  openGraph: {
    title: "The Skate Workshop Case Study | Joe's Tech Solutions",
    description: "Olympic-level skateboarding coaching platform built with React Native, Next.js, and real-time features.",
    url: 'https://www.joestechsolutions.com/portfolio/skate-workshop',
  },
};

export default function SkateWorkshopCaseStudy() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <PageHero
        eyebrow="cat /proof_of_work/skate-workshop · mobile app · web platform · subscription saas"
        title="The Skate Workshop"
        highlight="Skate"
        subtitle="Olympic-level skateboarding coaching delivered through a mobile-first platform with video feedback, comprehensive trick database, and multiplayer features."
        media={{ type: "video", src: "/generated/page-case-skate-loop.mp4", poster: "/generated/page-case-skate-loop-poster.jpg" }}
      >
        <a href="https://www.theskateworkshop.app/" target="_blank" rel="noopener noreferrer" className={heroPrimaryBtn}>visit live site ↗</a>
      </PageHero>

      {/* Back Button */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-8 pb-0">
        <Link href="/portfolio">
          <Button variant="outline" className="border-foreground/20 hover:bg-foreground/5">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>
      </div>

      {/* Project Overview */}
      <section className="relative py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card border-foreground/10 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <DeviceMobile weight="duotone" className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground font-mono">Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">iOS, Android, Web</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-foreground/10 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users weight="duotone" className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground font-mono">Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">Paused</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-foreground/10 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Lightning weight="duotone" className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground font-mono">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">400+ Tricks, Video Feedback, Multiplayer</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-mono">The Challenge</h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Create a comprehensive skateboarding coaching platform that brings Olympic-level
                instruction to skaters of all skill levels. The platform needed to handle video
                uploads, provide personalized feedback, track progression through hundreds of tricks,
                and facilitate community engagement through multiplayer features.
              </p>
              <p className="text-foreground/70 text-lg leading-relaxed">
                The solution required both mobile apps (iOS & Android) and a web platform, with
                real-time features, subscription billing, and seamless content delivery.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-mono">The Solution</h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Built a cross-platform solution using React Native for mobile and Next.js for web,
                ensuring consistent experience across all devices while maintaining native performance.
              </p>
              <div className="space-y-3">
                {[
                  "React Native mobile apps for iOS and Android",
                  "Next.js web platform with server-side rendering",
                  "Video upload and feedback system",
                  "400+ trick database with detailed tutorials",
                  "Real-time multiplayer SKATE game mode",
                  "Stripe subscription billing integration",
                  "Progress tracking and analytics"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle weight="duotone" className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12 font-mono">Technology Stack</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: "Mobile", tech: ["React Native", "Expo", "TypeScript"] },
              { category: "Web", tech: ["Next.js", "React", "Tailwind CSS"] },
              { category: "Backend", tech: ["Supabase", "PostgreSQL", "Real-time DB"] },
              { category: "Integrations", tech: ["Stripe", "Video Processing", "Analytics"] }
            ].map((stack, index) => (
              <Card key={index} className="bg-card border-foreground/10">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground font-mono">{stack.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stack.tech.map((item, i) => (
                      <li key={i} className="text-foreground/80 text-sm">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="relative py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12 font-mono">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Video Feedback System",
                description: "Users upload their skateboarding videos and receive personalized coaching feedback from Olympic-level instructors.",
                icon: Globe
              },
              {
                title: "400+ Trick Database",
                description: "Comprehensive library of skateboarding tricks with video tutorials, difficulty ratings, and step-by-step instructions.",
                icon: DeviceMobile
              },
              {
                title: "Progress Tracking",
                description: "Track learning progression, completed tricks, and skill development over time with detailed analytics.",
                icon: Lightning
              },
              {
                title: "Multiplayer SKATE Game",
                description: "Challenge friends to classic SKATE competitions with real-time gameplay and scoring.",
                icon: Users
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-card border-foreground/10 hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground font-mono">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 font-mono">Results & Impact</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Development is paused — beta testing drew positive feedback from early users
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Project Status", value: "Paused", desc: "iOS, Android & Web" },
              { label: "Trick Database", value: "400+", desc: "Comprehensive tutorials" },
              { label: "Features", value: "Real-time", desc: "Multiplayer & Feedback" }
            ].map((stat, index) => (
              <Card key={index} className="bg-linear-to-br from-primary/10 to-primary/10 border-primary/30 text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-foreground font-semibold mb-1">{stat.label}</div>
                  <div className="text-foreground/60 text-sm">{stat.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-32 bg-linear-to-r from-primary/10 via-background to-primary/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 font-mono">
            Ready to Build Your App?
          </h2>
          <p className="text-xl text-foreground/90 mb-10">
            Let&apos;s discuss your mobile or web platform project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/85 rounded-none shadow-lg shadow-primary/20">
                Get in touch →
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/5">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CtaScene id="cta" />
    </div>
  );
}
