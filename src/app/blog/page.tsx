import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getAllPosts } from "@/lib/blog";
import { FadeIn } from "@/components/animations/FadeIn";
import { PageHero } from "@/components/home/scroll/PageHero";
import { CtaScene } from "@/components/home/scroll/CtaScene";


export const metadata: Metadata = {
  title: "Blog | Joe's Tech Solutions",
  description:
    "Practical guides and straight talk on private AI, web development, and technology for small businesses. No hype — just things that actually work.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Joe's Tech Solutions",
    description:
      "Practical guides and straight talk on private AI, web development, and technology for small businesses.",
    url: "https://www.joestechsolutions.com/blog",
  },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageHero
        eyebrow="tail -f engineering-notes.log"
        title="Building with AI, in the open."
        highlight="open"
        subtitle="How I build private AI systems, ship real products, and automate the boring stuff. Field notes from the trenches of modern development."
        media={{ type: "image", src: "/images/joe-ai-typing.png", position: "50% 35%" }}
      />

      {/* Posts List */}
      <section className="relative py-8 sm:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <FadeIn>
              <p className="text-foreground/50 text-center text-lg font-[family-name:var(--font-jetbrains-mono)]">
                No posts yet. Check back soon.
              </p>
            </FadeIn>
          ) : (
            <>
              <FadeIn>
                <p className="text-foreground/30 text-sm font-[family-name:var(--font-jetbrains-mono)] mb-8">
                  {posts.length} post{posts.length !== 1 ? "s" : ""}
                </p>
              </FadeIn>

              <div className="flex flex-col">
                {posts.map((post, i) => (
                  <FadeIn key={post.slug} delay={i * 0.1} direction="left">
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <article className="py-6 border-b border-foreground/5 hover:border-primary/30 transition-[border-color,transform] duration-300 hover:pl-2">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                          <time dateTime={post.date} className="text-sm text-foreground/30 font-[family-name:var(--font-jetbrains-mono)] shrink-0 tabular-nums">
                            {formatDate(post.date)}
                          </time>
                          <div className="flex items-baseline gap-3 min-w-0">
                            <h2 className="text-lg font-semibold text-foreground font-[family-name:var(--font-jetbrains-mono)] leading-snug group-hover:text-primary transition-colors truncate">
                              {post.title}
                            </h2>
                            <span className="text-foreground/20 text-xs font-[family-name:var(--font-jetbrains-mono)] shrink-0 hidden sm:inline">
                              {post.readTime}m
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-foreground/40 text-sm leading-relaxed sm:pl-[calc(theme(spacing.6)+7ch)] line-clamp-2">
                          {post.excerpt}
                        </p>
                      </article>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-card via-background to-background" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary rounded-none blur-[150px] animate-glow" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-jetbrains-mono)]">
              Ready to Keep Your Data Private?
            </h2>
            <p className="text-foreground/70 text-lg mb-8 max-w-xl mx-auto">
              Get your own private AI running on your hardware — no monthly subscriptions, no data leaving your building.
            </p>
            <Link
              href="/private-ai-setup"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-foreground font-semibold px-8 py-4 rounded-none transition-colors shadow-lg shadow-primary/20"
            >
              Learn About Private AI Setup
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <CtaScene id="cta" />
    </div>
  );
}
