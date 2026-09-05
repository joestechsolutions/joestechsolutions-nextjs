import { Metadata } from "next";
import { FAQSchema, SoftwareProductSchema } from "@/components/seo/JsonLd";
import { SITE_OG_IMAGE, SECTION_OG_IMAGES } from "@/lib/og-images";

export const metadata: Metadata = {
  title: "Agent System | Joe's Tech Solutions",
  description: "A multi-agent AI system that runs your business 24/7 — coding, content, research, ops sub-agents connected to Telegram, Gmail, Instagram, Stripe.",
  alternates: {
    canonical: "/agent-system",
  },
  openGraph: {
    images: [SECTION_OG_IMAGES.agentSystem],
    title: "Agent System | Joe's Tech Solutions",
    description: "Your own AI workforce. Multi-agent system connected to your tools, running 24/7.",
    url: "https://www.joestechsolutions.com/agent-system",
  },
};

const agentFaqs = [
  {
    question: "What's the difference between this and the Managed AI tier?",
    answer: "Managed AI gives you a private LLM with n8n workflows. The Agent System is a full multi-agent hierarchy — an orchestrator AI that delegates to specialized sub-agents (coding, content, research, ops), with a skills library, memory system, and 24/7 cron automation. It's the difference between a tool and an employee."
  },
  {
    question: "How does the model routing work?",
    answer: "Two layers. Frontier work — the hardest coding and reasoning — runs on Claude Opus 5 and Fable 5/5.1 through a first-party Claude Code subscription. Everything else (sub-agents, cron fleet, content, vision) routes across Ollama Cloud by task type. You get frontier capability where it counts and flat-rate economics everywhere else — no per-token metering on either layer."
  },
  {
    question: "What integrations are included?",
    answer: "Telegram (your AI talks to you via text/voice), Gmail (read, draft, send), Instagram (auto-reply, comment drafting, content scheduling), Stripe (payment monitoring), Postiz (multi-platform social scheduling), n8n (workflow automation), and Notion CRM (pipeline tracking). Custom integrations available on request."
  },
  {
    question: "What's in the skills library?",
    answer: "100+ custom skills across coding, content creation, DevOps, research, creative generation, MLOps, and business operations. Each skill is a reusable workflow — code review, TDD, debugging, content drafting, SEO audits, security scans, deployment, and more. New skills are added continuously."
  },
  {
    question: "Do I own the system or is it SaaS?",
    answer: "You own it. It runs on your VPS. Open source. Your data stays on your server. No context window limits, no rate limits, no UI changes you didn't ask for. You control the models, the tools, and the memory."
  },
  {
    question: "What does the memory system do?",
    answer: "Every conversation, decision, and fact is stored in a local semantic memory system (MemPalace). Your agent remembers past sessions, can search its own memory by meaning, and maintains a knowledge graph of people, projects, and relationships. It gets smarter the more you use it."
  },
  {
    question: "How long does setup take?",
    answer: "1-2 weeks for the full system. Server provisioning and base install takes 1-2 days. The rest is tuning — teaching the agent your preferences, wiring integrations, building custom skills for your workflow, and setting up the cron schedule. You're involved throughout but not blocked by it."
  },
];

export default function AgentSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQSchema faqs={agentFaqs} />
      <SoftwareProductSchema />
      {children}
    </>
  );
}