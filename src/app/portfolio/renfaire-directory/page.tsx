import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, MagnifyingGlass, Globe, Lightning, TrendUp, MapPin, CurrencyDollar, ChartBar } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { PageHero, heroPrimaryBtn } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";

export const metadata: Metadata = {
  title: "RenFaire Directory Case Study | Joe's Tech Solutions",
  description: "SEO-first Renaissance faire directory with 200+ listings, structured data, affiliate revenue, and top search rankings. Full-stack Next.js case study.",
  alternates: {
    canonical: '/portfolio/renfaire-directory',
  },
  openGraph: {
    title: "RenFaire Directory Case Study | Joe's Tech Solutions",
    description: "SEO-first Renaissance faire directory with 200+ listings, structured data, affiliate revenue, and top search rankings.",
    url: 'https://www.joestechsolutions.com/portfolio/renfaire-directory',
  },
};

export default function RenFaireDirectoryCaseStudy() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <PageHero
        eyebrow="cat /proof_of_work/renfaire-directory · content platform · seo · directory"
        title="RenFaire Directory"
        highlight="RenFaire"
        subtitle="The modern guide to Renaissance faires across America. A revenue-generating directory featuring 200+ events, rich structured data, affiliate monetization, and top search engine rankings."
        media={{ type: "video", src: "/generated/page-case-renfaire-loop.mp4", poster: "/generated/page-case-renfaire-loop-poster.jpg" }}
      >
        <a href="https://www.renfaireguide.com" target="_blank" rel="noopener noreferrer" className={heroPrimaryBtn}>visit live site ↗</a>
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

      {/* Project Overview Stats */}
      <section className="relative py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card border-foreground/10 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin weight="duotone" className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground font-mono">Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">218 Faires Across 50 States</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-foreground/10 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendUp weight="duotone" className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground font-mono">SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">200+ Pages Indexed by Google</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-foreground/10 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CurrencyDollar weight="duotone" className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground font-mono">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">Live Affiliate + AdSense</p>
              </CardContent>
            </Card>
          </div>

          {/* Challenge & Solution */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-mono">The Challenge</h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Renaissance faire information was scattered across Facebook groups, outdated
                WordPress sites, and incomplete event listings. Faire-goers had no centralized,
                modern resource to discover events, check dates, read reviews, or plan trips.
              </p>
              <p className="text-foreground/70 text-lg leading-relaxed">
                The opportunity: build the definitive directory that Google would trust as the
                authority on Renaissance faires, while creating a sustainable revenue model
                through affiliate partnerships and advertising.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-mono">The Solution</h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Built an SEO-first content platform with automated data enrichment, rich
                structured data, and multiple revenue streams from day one.
              </p>
              <div className="space-y-3">
                {[
                  "218 faire listings with Google Places data enrichment",
                  "Event schema structured data on every listing page",
                  "State-by-state SEO blog content (19 posts live)",
                  "Near-me geolocation search with server-side rendering",
                  "Booking.com hotel & flight affiliate integration",
                  "ThredUp costume shopping affiliate links",
                  "Claim-your-listing system for faire owners",
                  "Newsletter signup and review system"
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

      {/* Faire Detail Screenshot */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-4 font-mono">Rich Faire Listings</h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            Every listing features Google Maps data, ratings, reviews, nearby hotels, costume shops, and structured data for rich search results.
          </p>
          <div className="relative aspect-[16/9] max-w-5xl mx-auto rounded-none overflow-hidden border border-foreground/10">
            <Image
              src="/images/renfaire-detail.jpg"
              alt="RenFaire Directory faire detail page"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12 font-mono">Technology Stack</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: "Frontend", tech: ["Next.js 16", "React", "Tailwind CSS", "TypeScript"] },
              { category: "Backend & Data", tech: ["Supabase (PostgreSQL)", "Google Places API", "Awin Affiliate API"] },
              { category: "SEO & Schema", tech: ["Event Schema (JSON-LD)", "FAQPage Schema", "Dynamic Sitemap", "SSR / ISR"] },
              { category: "Infrastructure", tech: ["Vercel", "Google Search Console", "AdSense", "Hostinger SMTP"] }
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
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12 font-mono">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Automated Data Enrichment",
                description: "Every faire listing is enriched with Google Places data including ratings, reviews, hours, addresses, and phone numbers. Data stays fresh through automated pipelines.",
                icon: Lightning
              },
              {
                title: "SEO-First Architecture",
                description: "Event schema structured data, FAQPage schema, dynamic sitemaps, canonical tags, and server-side rendering ensure every page is optimized for Google discovery.",
                icon: MagnifyingGlass
              },
              {
                title: "Near-Me Geolocation",
                description: "Server-rendered location-based search lets users find faires near them with distance calculations, state filtering, and mobile-optimized results.",
                icon: MapPin
              },
              {
                title: "Affiliate Revenue Engine",
                description: "Integrated Booking.com hotel/flight affiliates and ThredUp costume shopping links generate passive revenue from every faire listing page.",
                icon: CurrencyDollar
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
                  <p className="text-foreground/90">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Near-Me Screenshot */}
      <section className="relative py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-4 font-mono">Find Faires Near You</h2>
          <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
            Geolocation-powered search with server-side rendering for fast, SEO-friendly results.
          </p>
          <div className="relative aspect-[16/9] max-w-5xl mx-auto rounded-none overflow-hidden border border-foreground/10">
            <Image
              src="/images/renfaire-nearme.jpg"
              alt="RenFaire Directory near-me search feature"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 font-mono">Results &amp; Impact</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Live in production with growing organic traffic and active monetization
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Indexed Pages", value: "200+", desc: "Pages indexed by Google" },
              { label: "Faire Listings", value: "218", desc: "Across all 50 states" },
              { label: "Blog Posts", value: "19", desc: "State-specific SEO content" },
              { label: "Revenue", value: "Live", desc: "Affiliate partnerships active" }
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

      {/* SEO Strategy Breakdown */}
      <section className="relative py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12 font-mono">SEO Strategy That Ranks</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Structured Data",
                items: ["Event schema on 218 pages", "FAQPage schema per listing", "AggregateRating markup", "Organization + Place schemas"],
                icon: ChartBar
              },
              {
                title: "Content Strategy",
                items: ["19 state-specific blog posts", "Category landing pages", "Near-me location pages", "Dynamic meta descriptions"],
                icon: Globe
              },
              {
                title: "Technical SEO",
                items: ["270+ URL sitemap", "Proper canonical tags", "Server-side rendering", "Core Web Vitals optimized"],
                icon: Lightning
              }
            ].map((strategy, index) => (
              <Card key={index} className="bg-card border-foreground/10">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                    <strategy.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground font-mono">{strategy.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle weight="duotone" className="h-4 w-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
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
            Want a Directory That Ranks and Earns?
          </h2>
          <p className="text-xl text-foreground/90 mb-10">
            I build SEO-first content platforms with real revenue models — not just pretty pages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary rounded-none shadow-lg shadow-primary/20">
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
