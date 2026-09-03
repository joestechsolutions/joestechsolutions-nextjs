import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArticleSchema } from "@/components/seo/JsonLd";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { BlogVideoPlayer } from "@/components/BlogVideoPlayer";
import { BlogImage } from "@/components/BlogImage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Joe's Tech Solutions" };
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      url: `https://www.joestechsolutions.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.seo.ogImage
        ? [{ url: post.seo.ogImage, width: 1200, height: 630, alt: post.title }]
        : [{ url: "/og-image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [post.seo.ogImage ?? "/og-image.png"],
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <ArticleSchema
        headline={post.title}
        description={post.seo.description}
        datePublished={post.date}
        image={post.seo.ogImage || "https://www.joestechsolutions.com/og-image.png"}
        url={`https://www.joestechsolutions.com/blog/${post.slug}`}
        keywords={post.tags}
      />
      <ScrollProgress />
      {/* Header */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-linear-to-br from-card via-background to-background" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-none blur-[160px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary rounded-none blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          {/* Back link */}
          <FadeIn delay={0}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-foreground/40 hover:text-foreground text-sm font-[family-name:var(--font-jetbrains-mono)] mb-10 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              cd ../blog
            </Link>
          </FadeIn>

          {/* Title */}
          <TextReveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-[family-name:var(--font-jetbrains-mono)] leading-tight mb-6">
              {post.title}
            </h1>
          </TextReveal>

          {/* Meta bar */}
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap items-center gap-4 text-foreground/40 text-sm font-[family-name:var(--font-jetbrains-mono)] border-t border-foreground/5 pt-4">
              <span>{post.author}</span>
              <span className="text-foreground/15">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="text-foreground/15">·</span>
              <span>{post.readTime} min read</span>
            </div>
          </FadeIn>

          {/* Tags */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-foreground/30 border border-foreground/10 rounded px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeIn delay={0.25}>
            <div className="prose-blog">
              {(() => {
                // Match <video> blocks and <img> tags so they can be replaced
                // with optimized React components instead of raw HTML.
                const tokenRegex =
                  /(<video[^>]*>[\s\S]*?<source\s+src="([^"]+)"[^>]*\/>[\s\S]*?<\/video>)|(<img\s[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>)/g;

                const parts: React.ReactNode[] = [];
                let lastIndex = 0;
                let match;
                let i = 0;

                while ((match = tokenRegex.exec(post.content)) !== null) {
                  // Flush any raw HTML before this token
                  if (match.index > lastIndex) {
                    parts.push(
                      <div
                        key={`html-${i}`}
                        dangerouslySetInnerHTML={{
                          __html: post.content.slice(lastIndex, match.index),
                        }}
                      />
                    );
                    i++;
                  }

                  if (match[1]) {
                    // <video> token — match[2] is the src
                    parts.push(
                      <BlogVideoPlayer key={`video-${i}`} src={match[2]} />
                    );
                  } else if (match[3]) {
                    // <img> token — match[4] is src, match[5] is alt
                    const src = match[4];
                    const alt = match[5] ?? "";
                    const dims = post.images?.[src];
                    if (dims) {
                      parts.push(
                        <BlogImage
                          key={`img-${i}`}
                          src={src}
                          alt={alt}
                          width={dims.width}
                          height={dims.height}
                        />
                      );
                    } else {
                      // No dimension metadata — fall back to raw HTML for this img
                      parts.push(
                        <div
                          key={`img-${i}`}
                          dangerouslySetInnerHTML={{ __html: match[3] }}
                        />
                      );
                    }
                  }

                  lastIndex = match.index + match[0].length;
                  i++;
                }

                if (parts.length === 0) {
                  return (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  );
                }

                if (lastIndex < post.content.length) {
                  parts.push(
                    <div
                      key={`html-${i}`}
                      dangerouslySetInnerHTML={{
                        __html: post.content.slice(lastIndex),
                      }}
                    />
                  );
                }

                return parts;
              })()}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeIn>
            <div className="relative bg-linear-to-br from-primary/10 via-card to-primary/10 border border-foreground/10 rounded-none p-10 sm:p-14 overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary rounded-none blur-[100px] opacity-10" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-primary rounded-none blur-[80px] opacity-10" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-none px-4 py-1.5 mb-6">
                  <span className="w-2 h-2 rounded-none bg-primary" />
                  <span className="text-primary text-sm font-medium">Private AI Setup Service</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-jetbrains-mono)]">
                  Keep Your Data Where It Belongs
                </h2>
                <p className="text-foreground/70 text-lg mb-8 max-w-xl leading-relaxed">
                  I&apos;ll set up a fully private AI on your hardware — Ollama, Open WebUI, model configuration, and team onboarding. One flat fee. No monthly subscriptions. Your data never leaves your building.
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
                    href="/blog"
                    className="inline-flex items-center justify-center gap-2 bg-foreground/5 hover:bg-foreground/10 text-foreground font-semibold px-8 py-4 rounded-none border border-foreground/10 transition-colors"
                  >
                    More Posts
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
