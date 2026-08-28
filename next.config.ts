import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://vercel.live https://*.googletagmanager.com https://*.google-analytics.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net;
      font-src 'self' data:;
      connect-src 'self' https://vercel.live wss://ws-us3.pusher.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://stats.g.doubleclick.net;
      frame-src 'self' https://vercel.live;
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ai-infrastructure-checklist',
        destination: '/private-ai-setup',
        permanent: true,
      },
      // Stripe checkout funnel removed (pricing hidden Aug 2026) — route old links to contact.
      {
        source: '/private-ai-setup/qualify',
        destination: '/contact',
        permanent: false,
      },
      {
        source: '/private-ai-setup/checkout',
        destination: '/contact',
        permanent: false,
      },
      {
        source: '/private-ai-setup/success',
        destination: '/contact',
        permanent: false,
      },
      {
        source: '/checkout',
        destination: '/contact',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // Immutable cache for hashed static assets (JS, CSS, media)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Long cache for optimized images
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      // Cache public static files (icons, logos, images)
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/logos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // Enable gzip/brotli compression (Vercel does this at CDN layer, but explicit is better)
  compress: true,
  images: {
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Serve modern formats for smaller payloads
    formats: ['image/avif', 'image/webp'],
    // Match common device breakpoints to avoid generating unnecessary sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Reduce quality slightly for faster loads (default 75 is fine, 80 is a good balance)
    minimumCacheTTL: 2592000, // 30 days
  },
};

export default nextConfig;
