import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Github, Linkedin, Globe } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
import { BlogContent } from "./BlogContent";
import { post } from "@/content/blog/replace-saas-with-ai-agents";

const POST = {
  title: post.title,
  date: post.date,
  readTime: post.readTime,
  author: post.author,
  tags: post.tags,
};

export const metadata: Metadata = {
  title: "How 24 AI Agents Run My Entire Business — No SaaS Required | Joe's Tech Solutions",
  description:
    "Instead of paying $285/mo for 10+ SaaS tools, I built an AI agent system that handles everything — running on a Claude subscription I already use for development.",
  alternates: { canonical: "/blog/replace-saas-with-ai-agents" },
  openGraph: {
    title: "How 24 AI Agents Run My Entire Business — No SaaS Required",
    description: "Instead of paying $285/mo for 10+ SaaS tools, I built an AI agent system that handles everything — running on a Claude subscription I already use for development.",
    url: "https://www.joestechsolutions.com/blog/replace-saas-with-ai-agents",
    type: "article",
    publishedTime: POST.date,
    authors: [POST.author],
    tags: POST.tags,
    images: [{ url: "/images/blog/replace-saas-og.png", width: 1200, height: 630, alt: POST.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How 24 AI Agents Run My Entire Business — No SaaS Required",
    description: "Instead of paying $285/mo for 10+ SaaS tools, I built an AI agent system that handles everything — running on a Claude subscription I already use for development.",
    images: ["/images/blog/replace-saas-og.png"],
  },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function ReplaceSaasPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: POST.title,
            description: "Instead of paying $285/mo for 10+ SaaS tools, one developer built an AI agent system that handles everything — running on a Claude subscription already used for development.",
            image: "https://www.joestechsolutions.com/images/blog/replace-saas-og.png",
            author: {
              "@type": "Person",
              name: "Joe Blas",
              url: "https://www.joestechsolutions.com",
              jobTitle: "Generative AI Full-Stack Developer",
            },
            publisher: {
              "@type": "Organization",
              name: "Joe's Tech Solutions",
              url: "https://www.joestechsolutions.com",
              logo: { "@type": "ImageObject", url: "https://www.joestechsolutions.com/og-image.png" },
            },
            datePublished: POST.date,
            dateModified: POST.date,
            mainEntityOfPage: "https://www.joestechsolutions.com/blog/replace-saas-with-ai-agents",
            keywords: POST.tags.join(", "),
            wordCount: 1500,
            timeRequired: `PT${POST.readTime}M`,
          }),
        }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-background" />
        <div className="absolute inset-0 opacity-20">
          <ParallaxSection speed={0.3}>
            <div className="absolute top-[-100px] right-[-100px] w-[700px] h-[700px] bg-primary rounded-none blur-[200px]" />
          </ParallaxSection>
          <ParallaxSection speed={0.2} direction="down">
            <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-primary rounded-none blur-[180px]" />
          </ParallaxSection>
        </div>
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <FadeIn delay={0}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground text-sm mb-10 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Posts
            </Link>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-6">
              {POST.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-none px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-mono leading-[1.1] mb-6">
              How 24{" "}
              <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                AI Agents
              </span>{" "}
              Run My Entire Business — No SaaS Required
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-foreground/60 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
              Instead of paying $285/mo for 10+ SaaS tools, I built agents that handle everything — running on a Claude subscription I already use for development.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center gap-5 text-foreground/50 text-sm border-t border-foreground/10 pt-5">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {POST.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(POST.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {POST.readTime} min read
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ CONTENT (client component) ═══════════ */}
      <BlogContent />

      {/* ═══════════ AUTHOR BIO ═══════════ */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeIn>
            <div className="relative border border-foreground/10 rounded-none bg-card/50 overflow-hidden">
              {/* Photo strip */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src="/images/blog/joe-hot-tub-multitask.jpg"
                  alt="Joe cleaning his hot tub in San Diego while his AI agents handle business operations"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <p className="text-foreground/70 text-xs italic drop-shadow-lg">
                    While my AI agents built this blog post, I was cleaning my hot tub in San Diego. That&apos;s the point.
                  </p>
                </div>
              </div>
              {/* Bio content */}
              <div className="p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">About the Author</p>
                    <h3 className="text-xl font-bold text-foreground font-mono mb-4">Joe Blas</h3>
                    <p className="text-gray-200 text-sm leading-loose mb-5">
                      Generative AI Full-Stack Developer based in San Diego and founder of Joe&apos;s Tech Solutions LLC. He builds AI-powered applications and private AI systems for businesses that want to own their intelligence stack — not rent it.
                    </p>
                    <div className="flex items-center gap-4">
                      <Link
                        href="/"
                        className="flex items-center gap-1.5 text-foreground/50 hover:text-primary text-sm transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </Link>
                      <a
                        href="https://github.com/joblas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-foreground/50 hover:text-primary text-sm transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                      <a
                        href="https://linkedin.com/in/joe-blas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-foreground/50 hover:text-primary text-sm transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-primary/10 via-card to-primary/10 border border-foreground/10 rounded-none p-10 sm:p-14 overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary rounded-none blur-[100px] opacity-10" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-primary rounded-none blur-[80px] opacity-10" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-none px-4 py-1.5 mb-6">
                  <span className="w-2 h-2 rounded-none bg-primary animate-pulse" />
                  <span className="text-primary text-sm font-medium">Want This For Your Business?</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-mono">
                  Stop Renting Intelligence. Start Owning It.
                </h2>
                <p className="text-foreground/70 text-lg mb-8 max-w-xl leading-relaxed">
                  I build private AI systems and agent architectures for businesses that want the same competitive edge. One setup. Your hardware. Your data. No monthly SaaS drain.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/private-ai-setup"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-foreground font-semibold px-8 py-4 rounded-none transition-colors shadow-lg shadow-primary/20"
                  >
                    See the Setup Package
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-foreground/5 hover:bg-foreground/10 text-foreground font-semibold px-8 py-4 rounded-none border border-foreground/10 transition-colors"
                  >
                    Let&apos;s Talk
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
