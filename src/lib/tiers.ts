// Marketing tier ladder — the canonical 3-tier model for homepage, /solutions, /services.
// NOT lib/pricing.ts — that's the live Stripe funnel for /private-ai-setup.
// Prices intentionally not shown on marketing pages — quote via /contact.

export type Tier = {
  id: "quick-start" | "back-office" | "custom-build";
  name: string;
  href: string;
  category: string;
  blurb: string;
  features: string[];
  badge?: "New" | "Most Popular" | "Most Impactful";
  accent: "#d4541e" | "#e8703f" | "#8B5CF6";
  stripeReady: boolean; // false → CTA routes to /contact until Stripe product exists
};

export const TIERS: Tier[] = [
  {
    id: "quick-start",
    name: "Setup",
    href: "/private-ai-setup",
    category: "One-time setup",
    blurb:
      "Private AI on your machine or server. A 75-minute session, live, one on one. When we're done, you own it — no subscriptions, no data leaving your setup.",
    features: [
      "Runs on your own machine or private server",
      "75-minute live setup session",
      "No data leaks, no subscriptions",
      "You own everything when we're done",
    ],
    badge: "Most Popular",
    accent: "#d4541e",
    stripeReady: true,
  },
  {
    id: "back-office",
    name: "Operations",
    href: "/services#back-office",
    category: "Monthly retainer",
    blurb:
      "An AI assistant running on your server, handling the stuff you don't want to think about — scheduling, outreach, reporting, daily briefings. I tune it every month so it gets better.",
    features: [
      "AI assistant running on your own server",
      "Handles outreach, scheduling, and reporting",
      "Tuned and maintained every month",
      "Your data never leaves your infrastructure",
    ],
    accent: "#d4541e",
    stripeReady: false,
  },
  {
    id: "custom-build",
    name: "Custom Build",
    href: "/services#custom-build",
    category: "Project-based",
    blurb:
      "Mobile apps, web apps, full agent systems — built with the stack I use daily. React Native, Next.js, AI-assisted development, human-verified.",
    features: [
      "React Native and Next.js — the stack I ship with daily",
      "AI-assisted development, human-verified",
      "Scoped and priced before I write a line",
      "You own the code and the repo",
    ],
    accent: "#d4541e",
    stripeReady: false,
  },
];
