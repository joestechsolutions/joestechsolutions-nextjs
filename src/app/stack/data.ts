// Stack data — updated when the real tool stack changes.
// Source: ~/.hermes/config.yaml, ~/free-claude-code/.env, ollama list, ~/.gitnexus/registry.json
// Last updated: 2026-08-28

export const lastUpdated = "August 28, 2026";

export const models = [
  {
    name: "GLM 5.3 Flash",
    role: "Default — main conversation + cron fleet",
    provider: "Ollama Cloud",
    capabilities: ["tools", "thinking"],
  },
  {
    name: "GLM 5.3",
    role: "Heavy agentic coding — code-architect, debugger, security-auditor + FCC proxy",
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
    purpose: "Claude Code → cloud model routing",
    tech: "Python, uvicorn",
  },
  {
    name: "Ollama",
    port: "11434",
    purpose: "Local + cloud model inference (24 models)",
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
    items: ["Claude Code (via FCC proxy)", "GitNexus code graph", "Agent-Skills (24 SDLC skills)", "Cline CLI"],
  },
  {
    category: "Memory",
    items: ["MemPalace MCP", "Semantic search", "Knowledge graph", "Session diary"],
  },
  {
    category: "Models",
    items: ["24 Ollama Cloud models", "Ollama Cloud (primary)", "16-model fallback chain", "Granite 4.1 (local)"],
  },
  {
    category: "Infrastructure",
    items: ["WSL2 Ubuntu", "Systemd services", "16 Docker containers", "iptables firewall"],
  },
];

export const stats = [
  { label: "AI Agents", value: "25" },
  { label: "Scheduled Automations", value: "33" },
  { label: "Cloud Models", value: "24" },
  { label: "Indexed Code Nodes", value: "68K+" },
  { label: "Active Services", value: "9" },
  { label: "Skills Library", value: "100+" },
];