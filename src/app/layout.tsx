import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/home/SmoothScroll";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/JsonLd";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.joestechsolutions.com'),
  title: "Joe's Tech Solutions | Boutique Development Studio",
  description: "Mobile apps, web platforms, and private AI infrastructure for ambitious SMBs. From Olympic-level coaching apps to custom web solutions.",
  keywords: ["mobile app development", "web development", "AI infrastructure", "React Native", "Next.js", "consulting", "private AI", "custom software development", "boutique development studio"],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Joe's Tech Solutions | Boutique Development Studio",
    description: "Mobile apps, web platforms, and private AI infrastructure for ambitious SMBs.",
    url: 'https://www.joestechsolutions.com',
    siteName: "Joe's Tech Solutions",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Joe's Tech Solutions — AI agents that run your backlog, your inbox, and your Google profile",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Joe's Tech Solutions | Boutique Development Studio",
    description: "Mobile apps, web platforms, and private AI infrastructure for ambitious SMBs.",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set theme before paint: stored preference, else system */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var q=new URLSearchParams(location.search).get("theme");var s=localStorage.getItem("jts-theme");var d=q?q==="dark":s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans bg-background text-foreground overflow-x-hidden`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-foreground focus:rounded"
        >
          Skip to main content
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main id="main-content" className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
            <Script id="_next-ga-init" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}')`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
