// Industry vertical content for Private AI Setup
// Sourced from joes-ai-server/verticals/ markdown and prompt files

export interface VerticalData {
  slug: string;
  name: string;
  tagline: string;
  icon: string; // Phosphor icon name
  description: string;
  whyPrivate: string;
  samplePrompts: string[];
  features: string[];
  complianceNotes?: string[];
  isPremium: boolean; // Compliance-sensitive verticals
  recommendedModels: {
    ram: string;
    model: string;
    why: string;
  }[];
  welcomeMessage: string;
  systemPromptSummary: string;
}

export const VERTICALS_DATA: Record<string, VerticalData> = {
  healthcare: {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "HIPAA-ready AI for clinics and providers",
    icon: "FirstAidKit",
    description:
      "Private AI for healthcare practices, clinics, and providers. Patient data and medical information never leave your organization's control — no HIPAA compliance risk from third-party AI services.",
    whyPrivate:
      "Patient data and medical information must never leave your organization's control. Cloud-based AI services process data on external servers — a HIPAA compliance risk. This private AI server keeps everything on YOUR hardware.",
    samplePrompts: [
      "Summarize this patient visit note into a structured SOAP format",
      "Draft a referral letter to a cardiologist based on these findings",
      "Explain the drug interactions between metformin and lisinopril",
      "Review this treatment plan and flag any potential concerns",
      "Convert this clinical note into patient-friendly language",
    ],
    features: [
      "Summarize clinical notes and patient records",
      "Draft referral letters and correspondence",
      "Explain medical terminology in plain language",
      "Review treatment plans and suggest considerations",
      "Organize patient information and visit summaries",
    ],
    complianceNotes: [
      "ENABLE_SIGNUP set to false after admin account created",
      "Strong password on admin account (12+ characters)",
      "Server URL not shared publicly",
      "No patient identifiers in system prompts",
      "Staff trained on appropriate use (support tool, not diagnostic)",
    ],
    isPremium: true,
    recommendedModels: [
      { ram: "8 GB", model: "qwen3:4b", why: "Fast note summarization, good medical vocabulary" },
      { ram: "16 GB", model: "deepseek-r1:8b", why: "Strong reasoning for clinical analysis" },
      { ram: "32+ GB", model: "qwen3:32b", why: "Near-frontier quality for complex medical questions" },
    ],
    welcomeMessage:
      "Welcome to your private medical AI assistant. Everything you type here stays on YOUR server — no data is sent to OpenAI, Google, or anyone else.",
    systemPromptSummary:
      "Private medical assistant that summarizes clinical notes, drafts referral letters, explains medical terminology, and reviews treatment plans. A support tool — NOT a diagnostic system.",
  },

  legal: {
    slug: "legal",
    name: "Legal",
    tagline: "Privilege-protected AI for law firms",
    icon: "Scales",
    description:
      "Private AI for law firms, solo attorneys, and legal professionals. Attorney-client privilege requires that confidential communications and case materials remain protected.",
    whyPrivate:
      "Attorney-client privilege requires that confidential communications and case materials remain protected. Uploading contracts, case files, or client information to cloud AI services risks privilege waiver.",
    samplePrompts: [
      "Review this contract and identify any unusual or concerning clauses",
      "Summarize the key terms of this lease agreement",
      "Draft a demand letter based on these facts",
      "What are the typical provisions missing from this NDA?",
      "Create a timeline of events from these case documents",
      "Compare these two contract versions and highlight the differences",
    ],
    features: [
      "Analyze and summarize contracts and legal documents",
      "Draft legal correspondence, briefs, and memoranda",
      "Identify risks and ambiguities in contracts",
      "Organize case information and create timelines",
      "Compare document versions and highlight changes",
    ],
    complianceNotes: [
      "ENABLE_SIGNUP set to false after all firm accounts created",
      "Strong passwords on all accounts (12+ characters)",
      "Server URL restricted to firm personnel only",
      "Staff trained that AI outputs require attorney review",
      "No privileged information stored in system prompts",
    ],
    isPremium: true,
    recommendedModels: [
      { ram: "8 GB", model: "qwen3:4b", why: "Fast contract summarization" },
      { ram: "16 GB", model: "deepseek-r1:8b", why: "Strong reasoning for legal analysis" },
      { ram: "32+ GB", model: "qwen3:32b", why: "Complex legal reasoning, long document analysis" },
    ],
    welcomeMessage:
      "Welcome to your private legal AI assistant. This server is completely under your firm's control — no data leaves your network.",
    systemPromptSummary:
      "Private legal research assistant that analyzes contracts, drafts correspondence, identifies risks, and organizes case information. A research and drafting tool — NOT a substitute for legal counsel.",
  },

  financial: {
    slug: "financial",
    name: "Financial",
    tagline: "Confidential AI for advisors and accountants",
    icon: "ChartLine",
    description:
      "Private AI for financial advisors, accountants, and bookkeepers. Client financial data stays completely under your control — no compliance or confidentiality risks.",
    whyPrivate:
      "Client financial data — tax returns, account statements, investment portfolios — is highly sensitive. Cloud AI services process data on external servers, creating compliance and confidentiality risks.",
    samplePrompts: [
      "Summarize the key figures from this financial statement",
      "Compare this quarter's P&L to last quarter and highlight changes",
      "Draft a client letter explaining their tax situation",
      "Review this expense report and flag anything unusual",
      "What tax deductions might apply to a home-based business?",
      "Create a summary of this client's financial position",
    ],
    features: [
      "Analyze financial statements and reports",
      "Summarize tax documents and identify key figures",
      "Draft client correspondence and financial summaries",
      "Review invoices, expense reports, and budgets",
      "Identify discrepancies or unusual patterns",
    ],
    complianceNotes: [
      "ENABLE_SIGNUP set to false after all staff accounts created",
      "Strong passwords on all accounts (12+ characters)",
      "Server access restricted to authorized staff only",
      "No client identifiers stored in system prompts",
      "Staff trained on appropriate use (analysis tool, not advisory)",
    ],
    isPremium: true,
    recommendedModels: [
      { ram: "8 GB", model: "qwen3:4b", why: "Fast document summarization" },
      { ram: "16 GB", model: "deepseek-r1:8b", why: "Strong math and reasoning for financial analysis" },
      { ram: "32+ GB", model: "qwen3:32b", why: "Complex financial modeling and analysis" },
    ],
    welcomeMessage:
      "Welcome to your private financial AI assistant. All client financial data stays on YOUR server — nothing is sent to external services.",
    systemPromptSummary:
      "Private financial assistant that analyzes statements, summarizes tax documents, drafts correspondence, and reviews budgets. A productivity tool — NOT a licensed financial advisor.",
  },

  therapy: {
    slug: "therapy",
    name: "Therapy",
    tagline: "Private AI for mental health professionals",
    icon: "Heart",
    description:
      "Private AI for therapists, counselors, and mental health professionals. Session notes, treatment plans, and client information are among the most sensitive data in any profession.",
    whyPrivate:
      "Session notes, treatment plans, and client information are among the most sensitive data in any profession. Cloud AI services are a non-starter for mental health documentation. Private AI keeps all clinical data completely under your control.",
    samplePrompts: [
      "Format these session notes into SOAP format",
      "Draft a progress note based on today's session observations",
      "Summarize this intake assessment into a clinical overview",
      "Create a treatment plan template for generalized anxiety",
      "Draft a referral letter to a psychiatrist",
      "Create a psychoeducational handout on coping strategies for anxiety",
    ],
    features: [
      "Organize and format session notes (SOAP, DAP)",
      "Draft treatment plan summaries and progress notes",
      "Summarize intake assessments and clinical information",
      "Draft referral letters and correspondence",
      "Create psychoeducational materials and handouts",
    ],
    complianceNotes: [
      "ENABLE_SIGNUP set to false (clinician access only)",
      "Strong password (12+ characters)",
      "Server not accessible from public internet (local install preferred)",
      "No client identifying information in system prompts",
      "Clinician trained on appropriate use (documentation tool only)",
    ],
    isPremium: true,
    recommendedModels: [
      { ram: "8 GB", model: "qwen3:4b", why: "Fast note formatting and organization" },
      { ram: "16 GB", model: "deepseek-r1:8b", why: "Better clinical reasoning and summaries" },
      { ram: "32+ GB", model: "qwen3:32b", why: "Complex treatment plan analysis" },
    ],
    welcomeMessage:
      "Welcome to your private clinical documentation assistant. All session notes and client information stay completely on YOUR server — no data leaves your network.",
    systemPromptSummary:
      "Private clinical documentation assistant that organizes session notes, drafts treatment plans, and creates clinical materials. A documentation tool — NOT a clinical advisor.",
  },

  education: {
    slug: "education",
    name: "Education",
    tagline: "FERPA-safe AI for schools and tutors",
    icon: "GraduationCap",
    description:
      "Private AI for schools, tutors, and educational institutions. Student data is protected under FERPA — private AI gives educators a powerful teaching tool without data privacy concerns.",
    whyPrivate:
      "Student data is protected under FERPA. Cloud AI services may use inputs for training, exposing student information. Private AI gives educators a powerful teaching tool without data privacy concerns.",
    samplePrompts: [
      "Explain photosynthesis to a 7th grader",
      "Create 10 practice problems for two-digit multiplication",
      "Help me understand the causes of the American Revolution",
      "Walk me through solving this quadratic equation step by step",
      "Create a study guide for a biology exam on cell structure",
      "Draft a lesson plan for teaching fractions to 4th graders",
    ],
    features: [
      "Explain concepts across all subjects clearly",
      "Create practice problems and study guides",
      "Provide step-by-step solutions with explanations",
      "Draft lesson plans and learning objectives",
      "Create quizzes and assessment questions",
    ],
    isPremium: false,
    recommendedModels: [
      { ram: "8 GB", model: "qwen3:4b", why: "Good for tutoring, explanations, study guides" },
      { ram: "16 GB", model: "qwen3:8b", why: "Better math reasoning, more detailed explanations" },
      { ram: "32+ GB", model: "deepseek-r1:14b", why: "Strong math/science reasoning, complex problems" },
    ],
    welcomeMessage:
      "Welcome to your private learning assistant. Your conversations are completely private. Nothing you type here is sent to any external service or used for training.",
    systemPromptSummary:
      "Private educational AI assistant that explains concepts, creates practice problems, provides step-by-step solutions, and drafts lesson plans. Encourages learning by guiding rather than giving direct answers.",
  },

  realestate: {
    slug: "realestate",
    name: "Real Estate",
    tagline: "AI-powered listings and client management",
    icon: "Buildings",
    description:
      "Private AI for realtors, brokers, and property managers. Client information, property data, and competitive market analysis stay completely under your control.",
    whyPrivate:
      "Client information, property data, and competitive market analysis shouldn't flow through third-party AI services. Private AI gives you a powerful assistant without exposing client details or deal information.",
    samplePrompts: [
      "Write a listing description for a 3BR/2BA ranch in a quiet cul-de-sac",
      "Draft a follow-up email to buyers after their second showing",
      "Create a social media post highlighting this property's best features",
      "Summarize these comparable sales into a market analysis",
      "Write a neighborhood guide for the Oak Park area",
      "Draft talking points for a price reduction conversation with my seller",
    ],
    features: [
      "Write compelling property descriptions and listings",
      "Draft client emails and follow-up communications",
      "Analyze comparable sales data and market trends",
      "Create property feature summaries and highlight sheets",
      "Generate social media content for listings",
    ],
    isPremium: false,
    recommendedModels: [
      { ram: "8 GB", model: "qwen3:4b", why: "Fast listing descriptions, email drafting" },
      { ram: "16 GB", model: "qwen3:8b", why: "Better creative writing for marketing" },
      { ram: "32+ GB", model: "qwen3:32b", why: "Complex market analysis, long documents" },
    ],
    welcomeMessage:
      "Welcome to your private real estate AI assistant. Write listings, draft emails, analyze comps, and create marketing content — all without your client data leaving your control.",
    systemPromptSummary:
      "Private real estate assistant that writes property descriptions, drafts client communications, analyzes market data, and generates marketing content.",
  },

  construction: {
    slug: "construction",
    name: "Construction",
    tagline: "Bids, specs, and safety docs — privately",
    icon: "HardHat",
    description:
      "Private AI for contractors, builders, and tradespeople. Bid estimates, job specs, and client project details are competitively sensitive — keep them private.",
    whyPrivate:
      "Bid estimates, job specs, and client project details are competitively sensitive. Private AI helps you work faster without exposing your pricing strategies or client information.",
    samplePrompts: [
      "Create a scope of work for a kitchen remodel",
      "Draft a bid proposal for a commercial fencing project",
      "Write a project update email for my client on the Smith renovation",
      "Create a safety checklist for a roofing project",
      "Help me write a subcontractor agreement template",
      "Generate a material list for framing a 24x30 garage",
    ],
    features: [
      "Create and review bid estimates and proposals",
      "Write project specifications and scope of work",
      "Draft client communications and project updates",
      "Create safety checklists and compliance documentation",
      "Generate material lists and quantity estimates",
    ],
    isPremium: false,
    recommendedModels: [
      { ram: "8 GB", model: "qwen3:4b", why: "Fast document drafting, checklists" },
      { ram: "16 GB", model: "qwen3:8b", why: "Better estimates, detailed specs" },
      { ram: "32+ GB", model: "deepseek-r1:14b", why: "Math-heavy estimating, complex projects" },
    ],
    welcomeMessage:
      "Welcome to your private construction AI assistant. Create bids, write specs, draft proposals, and organize projects — without exposing your pricing or client info.",
    systemPromptSummary:
      "Private construction assistant that creates bid estimates, writes project specs, drafts communications, and generates material lists. Precise with measurements and industry-standard terminology.",
  },

  creative: {
    slug: "creative",
    name: "Creative",
    tagline: "Your ideas stay yours — no data harvesting",
    icon: "PaintBrush",
    description:
      "Private AI for writers, marketers, and content creators. Your writing, ideas, and creative work are your intellectual property — keep them private.",
    whyPrivate:
      "Your writing, ideas, and creative work are your intellectual property. Cloud AI services may use your inputs for training — meaning your original work could influence outputs for others. Private AI keeps your creative process completely private.",
    samplePrompts: [
      "Help me brainstorm 10 blog post ideas about sustainable living",
      "Edit this draft for clarity and flow — keep my voice",
      "Write 3 different hooks for this article opening",
      "Create a content calendar for Instagram for the next 2 weeks",
      "Rewrite this product description to be more compelling",
      "Give me honest feedback on this essay — what works, what doesn't?",
    ],
    features: [
      "Brainstorm ideas, outlines, and story concepts",
      "Write and edit blog posts, articles, and essays",
      "Create social media content and captions",
      "Draft email newsletters and marketing copy",
      "Generate headlines, taglines, and hooks",
    ],
    isPremium: false,
    recommendedModels: [
      { ram: "8 GB", model: "qwen3:4b", why: "Good creative writing, fast iteration" },
      { ram: "16 GB", model: "qwen3:8b", why: "Better nuance, longer-form content" },
      { ram: "32+ GB", model: "qwen3:32b", why: "Best creative quality, complex narratives" },
    ],
    welcomeMessage:
      "Welcome to your private creative AI assistant. Write, brainstorm, edit, and create — without your work being used to train AI models.",
    systemPromptSummary:
      "Private creative writing and content assistant that brainstorms ideas, writes and edits content, and generates marketing copy. Matches the writer's voice and style.",
  },

  smallbusiness: {
    slug: "smallbusiness",
    name: "Small Business",
    tagline: "Team AI with no per-user fees",
    icon: "Storefront",
    description:
      "Private AI for small businesses and teams. Skip the per-seat ChatGPT fees — get the same capability for your whole team with a one-time setup.",
    whyPrivate:
      "Skip the per-seat ChatGPT fees. Get the same capability for your whole team with a one-time setup — no per-user fees, no data leaving your control, no monthly AI subscriptions.",
    samplePrompts: [
      "Draft a professional email responding to this customer complaint",
      "Write 5 social media posts promoting our spring sale",
      "Summarize these meeting notes into action items with owners",
      "Create an SOP for our employee onboarding process",
      "Proofread this proposal and suggest improvements",
      "Help me write a job listing for a part-time marketing coordinator",
    ],
    features: [
      "Draft professional emails and correspondence",
      "Write social media posts and marketing content",
      "Summarize meeting notes and create action items",
      "Create SOPs and training materials",
      "Proofread and edit business documents",
    ],
    isPremium: false,
    recommendedModels: [
      { ram: "8 GB", model: "qwen3:4b", why: "Fast email drafting, content creation" },
      { ram: "16 GB", model: "qwen3:8b", why: "Better writing quality, longer documents" },
      { ram: "32+ GB", model: "qwen3:32b", why: "Complex proposals, detailed analysis" },
    ],
    welcomeMessage:
      "Welcome to your private business AI assistant. Your whole team can use this — no per-user fees, no data leaving your control.",
    systemPromptSummary:
      "Private small business assistant that drafts emails, creates marketing content, summarizes meetings, and produces business documents. Concise and actionable.",
  },
};

// Helper: get vertical display info for cards
export function getVerticalDisplayInfo() {
  return Object.values(VERTICALS_DATA).map((v) => ({
    slug: v.slug,
    name: v.name,
    tagline: v.tagline,
    icon: v.icon,
    description: v.description,
    isPremium: v.isPremium,
  }));
}

// Helper: get all vertical slugs (for generateStaticParams)
export function getAllVerticalSlugs() {
  return Object.keys(VERTICALS_DATA);
}
