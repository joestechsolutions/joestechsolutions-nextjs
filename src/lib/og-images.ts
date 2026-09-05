// Shared Open Graph image constants — single source of truth.
// The root layout ships /og-image.png (1200x630, verified 200), but Next.js
// REPLACES (not merges) openGraph when a page defines its own `openGraph`
// without an `images` key — which silently dropped og:image on most pages.
// Import SITE_OG_IMAGE into any page-level openGraph block to restore it.

export const SITE_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Joe's Tech Solutions — AI agents that run your backlog, your inbox, and your Google profile",
};

// Minimal shape for pages that only need the url string
export const SITE_OG_IMAGE_URL = "/og-image.png";

// Contextual images per page section (all verified present in /public/images).
// Dimensions recorded so we know which need resizing for 1200x630 later:
export const SECTION_OG_IMAGES = {
  about: "/images/joe-corporate-headshot.png", // 1024x1024 1.4MB
  agentSystem: "/images/blog/22-agent-architecture-og.png", // 2000x1776
  mapsGrowth: "/images/renfaire-hero.jpg", // 1280x720
  portfolio: "/images/client-collaboration.jpg", // 1920x1080
  privateAi: "/images/joe-launch-private-ai.png", // 1584x672
  stack: "/images/blog/22-agent-org-chart.png", // 2000x1776
  industries: "/images/joe-deploying-server.png", // 1024x1024
  contact: "/images/joe-profile.jpg", // 1920x1920
} as const;