// Centralized pricing data — single source of truth for all pages
// Update prices here and they propagate everywhere

// ── Stripe Price IDs (LIVE MODE) ──
// Override via env vars for different environments
export const LOCAL_PRICE_ID = process.env.STRIPE_LOCAL_PRICE_ID || "price_1T1xVpCc9Mv5B9O0n6C6Muyd";
export const CLOUD_SETUP_PRICE_ID = process.env.STRIPE_CLOUD_SETUP_PRICE_ID || "price_1T1xVpCc9Mv5B9O0Iqbu5SKA";
export const CLOUD_MONTHLY_PRICE_ID = process.env.STRIPE_CLOUD_MONTHLY_PRICE_ID || "price_1T1xVqCc9Mv5B9O0mLu8Mnsa";
export const MANAGED_SETUP_PRICE_ID = process.env.STRIPE_MANAGED_SETUP_PRICE_ID || "price_1T1xVqCc9Mv5B9O0u2nknZJF";
export const MANAGED_MONTHLY_PRICE_ID = process.env.STRIPE_MANAGED_MONTHLY_PRICE_ID || "price_1T1xVrCc9Mv5B9O0nXzPcsxd";
export const COMPLIANCE_ADDON_PRICE_ID = process.env.STRIPE_COMPLIANCE_ADDON_PRICE_ID || "price_1T1xVrCc9Mv5B9O061tH3Tpo";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.joestechsolutions.com");

// Setup type used across client and server
export type SetupType = "local" | "cloud" | "managed";

export const TIER_LABELS: Record<SetupType, string> = {
  local: "Local AI Setup",
  cloud: "Cloud AI Server",
  managed: "Managed AI + Automation",
};

export const TIER_PRICES: Record<SetupType, { setup: string; monthly?: string }> = {
  local: { setup: "$199" },
  cloud: { setup: "$499", monthly: "$29/mo" },
  managed: { setup: "$999", monthly: "$79/mo" },
};

export const PRICING = {
  local: {
    name: "Local Install",
    slug: "local",
    setup: 199,
    monthly: 0,
    setupLabel: "$199 one-time",
    ctaLabel: "Get Started — $199",
    color: "#02a0a0",
    hoverColor: "#b8451a",
    description:
      "Runs entirely on your computer — your data never leaves your machine. Perfect for professionals who want AI without subscriptions or data concerns.",
    features: [
      "ChatGPT-like interface, runs 100% locally",
      "Auto-detects your hardware and picks the best model",
      "9 industry-specific AI assistants included",
      "Automatic updates via built-in updater",
      "75-min session: 15 min overview, 45 min install, 15 min demo",
      "7 days email support after setup",
      "Pay once — no subscriptions, ever",
    ],
  },
  cloud: {
    name: "Cloud Server",
    slug: "vps",
    setup: 499,
    monthly: 29,
    setupLabel: "$499 setup + $29/mo",
    ctaLabel: "Get Started — $499 + $29/mo",
    color: "#f5a94f",
    hoverColor: "#02a0a0",
    recommended: true,
    description:
      "Your own private AI server, accessible from anywhere. I handle the hosting, updates, and maintenance so you can just use it.",
    features: [
      "Everything in Local, plus:",
      "Dedicated server (8GB RAM, 80GB SSD)",
      "Your own domain (myai.yourdomain.com)",
      "Secure HTTPS access from any device",
      "I monitor and update it monthly",
      "Cancel anytime — no contracts",
    ],
  },
  enterprise: {
    name: "Enterprise",
    slug: "enterprise",
    setup: 999,
    monthly: 79,
    setupLabel: "$999 setup + $79/mo",
    ctaLabel: "Get Started — $999 + $79/mo",
    color: "#02a0a0",
    hoverColor: "#b8451a",
    description:
      "Full-service AI deployment for teams with compliance needs. Priority support, custom integrations, and dedicated infrastructure.",
    features: [
      "Everything in Cloud, plus:",
      "Priority support with 4-hour SLA",
      "Custom system prompt engineering",
      "Multi-user setup with role-based access",
      "Compliance-ready (HIPAA, legal, financial)",
      "Custom integrations (EHR, CRM, document systems)",
      "Quarterly strategy review calls",
    ],
  },
} as const;

export type PricingTier = keyof typeof PRICING;

export const VERTICALS = [
  "healthcare",
  "legal",
  "financial",
  "therapy",
  "education",
  "realestate",
  "construction",
  "creative",
  "smallbusiness",
] as const;

export type Vertical = (typeof VERTICALS)[number];

// Models we currently ship
export const AI_MODELS = [
  { name: "Qwen3", sizes: ["4B", "8B", "32B"], description: "Excellent all-rounder with strong reasoning" },
  { name: "Gemma3", sizes: ["4B", "12B", "27B"], description: "Great for creative writing and conversation" },
  { name: "DeepSeek-R1", sizes: ["8B", "14B", "32B"], description: "Best-in-class reasoning and math" },
] as const;
