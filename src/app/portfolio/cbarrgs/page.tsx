import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, CheckCircle, Globe, Zap, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cbarrgs Music Case Study | Joe's Tech Solutions",
  description: "Music artist portfolio website with streaming integrations, performance optimization, and SEO. Web development case study.",
  alternates: {
    canonical: '/portfolio/cbarrgs',
  },
  openGraph: {
    title: "Cbarrgs Music Case Study | Joe's Tech Solutions",
    description: "Music artist portfolio website with streaming integrations, performance optimization, and SEO.",
    url: 'https://www.joestechsolutions.com/portfolio/cbarrgs',
  },
};

export default function CbarrgsCaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-8">
        <Link href="/portfolio">
          <Button variant="outline" className="border-foreground/20 hover:bg-foreground/5">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pb-20">
        <div className="absolute inset-0 bg-linear-to-br from-card/20 via-background/20 to-background/20" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/20 border border-primary/30 rounded-none text-primary text-sm font-semibold">
                Artist Website • Performance Optimized
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-mono">
                Cbarrgs Music
              </h1>

              <p className="text-xl text-foreground/80 leading-relaxed">
                Electronic music artist portfolio with seamless streaming platform integrations,
                optimized performance, and SEO strategy for music discovery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://cbarrgs.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/85 rounded-none shadow-lg shadow-primary/20">
                    Visit Live Site
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-none overflow-hidden border border-foreground/10 bg-card flex items-center justify-center">
                <Image
                  src="/images/cbarrgs-logo.jpeg"
                  alt="Cbarrgs logo"
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="relative py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card border-foreground/10 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground font-mono">Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90">Next.js Web Platform</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-foreground/10 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground font-mono">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90">Optimized Font Loading</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-foreground/10 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground font-mono">SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90">Schema.org Structured Data</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-mono">The Challenge</h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Create a professional artist portfolio that serves as a central hub for music discovery
                across multiple streaming platforms while maintaining fast load times and strong SEO
                for organic discoverability.
              </p>
              <p className="text-foreground/70 text-lg leading-relaxed">
                The site needed to integrate with Spotify, Apple Music, YouTube, SoundCloud, and Instagram
                while providing an elegant, fast-loading experience that reflects the artist&apos;s brand.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-mono">The Solution</h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Built a performance-optimized Next.js website with advanced font loading strategies
                and structured data for SEO.
              </p>
              <div className="space-y-3">
                {[
                  "Next.js with server-side rendering for fast initial loads",
                  "Strategic font-display: swap for optimal performance",
                  "Schema.org markup for rich search results",
                  "Open Graph integration for social sharing",
                  "Direct links to all major streaming platforms",
                  "Responsive design optimized for all devices",
                  "Performance monitoring and optimization"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{item}</span>
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
              { category: "Framework", tech: ["Next.js", "React", "TypeScript"] },
              { category: "Styling", tech: ["Tailwind CSS", "Custom CSS", "Responsive Design"] },
              { category: "SEO", tech: ["Schema.org", "Open Graph", "Meta Tags"] },
              { category: "Performance", tech: ["Font Optimization", "Code Splitting", "CDN"] }
            ].map((stack, index) => (
              <Card key={index} className="bg-card border-foreground/10">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground font-mono">{stack.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stack.tech.map((item, i) => (
                      <li key={i} className="text-foreground/90 text-sm">{item}</li>
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
                title: "Streaming Platform Integration",
                description: "Seamless links to Spotify, Apple Music, YouTube, SoundCloud, and Instagram with clean, user-friendly interface.",
                icon: Globe
              },
              {
                title: "Performance Optimization",
                description: "Advanced font-loading strategies and code splitting ensure fast page loads and smooth user experience.",
                icon: Zap
              },
              {
                title: "SEO & Discoverability",
                description: "Schema.org structured data and Open Graph tags optimize search engine visibility and social sharing.",
                icon: TrendingUp
              },
              {
                title: "Artist Branding",
                description: "Clean, professional design that reflects the artist&apos;s electronic/ambient music aesthetic.",
                icon: Globe
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-card border-foreground/10 hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground font-mono">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{feature.description}</p>
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
              Professional online presence driving music discovery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Load Time", value: "< 2s", desc: "Optimized performance" },
              { label: "Platforms", value: "5+", desc: "Streaming integrations" },
              { label: "SEO", value: "Optimized", desc: "Schema & Open Graph" }
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
            Need a Professional Website?
          </h2>
          <p className="text-xl text-foreground/80 mb-10">
            Let&apos;s build your online presence
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
    </div>
  );
}
