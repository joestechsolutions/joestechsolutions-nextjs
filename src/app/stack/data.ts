// Stack data — updated when the real tool stack changes.
// Source: ~/.hermes/config.yaml, ~/ai-stack/02-routing/fcc.env, Claude Code CLI (first-party), ollama list
// Last updated: 2026-09-05

export const lastUpdated = "September 5, 2026";

export const models = [
  {
    name: "Claude Opus 5",
    role: "Heavy reasoning — deep development at the desk via Claude Code",
    provider: "Claude (first-party subscription)",
    capabilities: ["tools", "thinking", "vision"],
  },
  {
    name: "Fable 5.1",
    role: "Frontier coding — deep dev at the desk + remote control from the phone",
    provider: "Claude (first-party subscription)",
    capabilities: ["tools", "thinking", "vision"],
  },
  {
    name: "Fable 5",
    role: "Agentic coding + client app builds (Archive Salon, beta loop) — desk and remote",
    provider: "Claude (first-party subscription)",
    capabilities: ["tools", "thinking", "vision"],
  },
  {
    name: "GLM 5.3 Flash",
    role: "Hermes default — desk conversations + Telegram on the phone + cron fleet",
    provider: "Ollama Cloud",
    capabilities: ["tools", "thinking"],
  },
  {
    name: "GLM 5.3",
    role: "FCC proxy Opus-tier mapping + heavy cloud coding",
    provider: "Ollama Cloud",
    capabilities: ["tools", "thinking"],
  },
  {
    name: "Kimi K2.7 Code",
    role: "Coding sub-agents + delegate tasks",
    provider: "Ollama Cloud",
    capabilities: ["vision", "tools", "thinking"],
  },
  {
    name: "DeepSeek V4 Flash",
    role: "Fallback — coding + robust tasks",
    provider: "Ollama Cloud",
    capabilities: ["tools", "thinking"],
  },
  {
    name: "Gemma 4",
    role: "Vision + image analysis + goal-mode judge",
    provider: "Ollama Cloud",
    capabilities: ["vision", "tools", "thinking", "audio"],
  },
  {
    name: "Minimax M3",
    role: "Content drafting + creative tasks",
    provider: "Ollama Cloud",
    capabilities: ["tools", "thinking"],
  },
  {
    name: "Granite 4.1",
    role: "Local — offline + emergency",
    provider: "Ollama Local",
    capabilities: ["tools", "thinking"],
  },
];

export const services = [
  {
    name: "Hermes Gateway",
    port: "8642",
    purpose: "AI orchestrator + Telegram bot",
    tech: "Python, systemd",
  },
  {
    name: "FCC Proxy",
    port: "8082",
    purpose: "Claude Code CLI → subscription + cloud model routing",
    tech: "Python, uvicorn",
  },
  {
    name: "Ollama",
    port: "11434",
    purpose: "Local + cloud model inference (20+ models)",
    tech: "Go, systemd",
  },
  {
    name: "MemPalace",
    port: "—",
    purpose: "Persistent memory + knowledge graph",
    tech: "Python, MCP",
  },
  {
    name: "GitNexus",
    port: "—",
    purpose: "Code knowledge graph (68K+ nodes indexed)",
    tech: "Node.js, CLI",
  },
  {
    name: "Open WebUI",
    port: "3000",
    purpose: "Browser-based chat interface",
    tech: "Docker",
  },
  {
    name: "Open Design",
    port: "4000",
    purpose: "Design AI stack + daemon",
    tech: "Node.js, systemd",
  },
  {
    name: "Penpot",
    port: "9001",
    purpose: "Self-hosted design platform (Figma alt)",
    tech: "Docker",
  },
  {
    name: "Postiz",
    port: "4007",
    purpose: "Social media scheduling (14 platforms)",
    tech: "Docker",
  },
];

export const tools = [
  {
    category: "Orchestration",
    items: ["Hermes Agent v0.20.1", "delegate_task subagents", "Loop + Goal Mode", "33 cron jobs"],
  },
  {
    category: "Coding",
    items: ["Claude Code (Opus 5 + Fable 5/5.1 first-party)", "GitNexus code graph", "Agent-Skills (24 SDLC skills)", "Cline CLI"],
  },
  {
    category: "Memory",
    items: ["MemPalace MCP", "Semantic search", "Knowledge graph", "Session diary"],
  },
  {
    category: "Models",
    items: ["Claude Opus 5 + Fable 5/5.1 (first-party)", "Ollama Cloud (primary)", "8-model fallback chain", "Granite 4.1 (local)"],
  },
  {
    category: "Infrastructure",
    items: ["WSL2 Ubuntu", "Systemd services", "19 Docker containers", "27 listening ports", "iptables firewall"],
  },
];

export const stats = [
  { label: "Live Client Deployments", value: "3" },
  { label: "Scheduled Automations", value: "40+" },
  { label: "Cloud Models", value: "24+" },
  { label: "Indexed Code Nodes", value: "68K+" },
  { label: "Active Services", value: "19" },
  { label: "Skills Library", value: "950+" },
];