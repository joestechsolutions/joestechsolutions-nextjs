"use client";

import { motion } from "framer-motion";
import { EnvelopeSimple, Users, FileText, Receipt, Pulse, MagnifyingGlass, SquaresFour, ShareNetwork, Compass, PenNib, X, Robot } from "@phosphor-icons/react";

const rows = [
  { need: "Email triage + drafts", oldTool: "Superhuman", cost: 30, agent: "Agent + Gmail API", icon: EnvelopeSimple },
  { need: "CRM / pipeline", oldTool: "HubSpot", cost: 50, agent: "Supabase + agent", icon: Users },
  { need: "Content calendar", oldTool: "Notion + Buffer", cost: 25, agent: "Muse agent + cron", icon: FileText },
  { need: "Invoice generation", oldTool: "FreshBooks", cost: 30, agent: "Stripe API + agent", icon: Receipt },
  { need: "Uptime monitoring", oldTool: "Better Uptime", cost: 20, agent: "Heartbeat agent", icon: Pulse },
  { need: "SEO monitoring", oldTool: "Ahrefs (lite)", cost: 99, agent: "Beacon + MagnifyingGlass Console", icon: MagnifyingGlass },
  { need: "Project management", oldTool: "Linear", cost: 16, agent: "GitHub Issues + agent", icon: SquaresFour },
  { need: "Social scheduling", oldTool: "Buffer", cost: 15, agent: "Draft queue + approval", icon: ShareNetwork },
  { need: "Competitive research", oldTool: "Manual (hours)", cost: 0, agent: "Radar + web search", icon: Compass },
  { need: "Client proposals", oldTool: "Google Docs", cost: 0, agent: "Template + gen script", icon: PenNib },
];

const totalOld = rows.reduce((s, r) => s + r.cost, 0);

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

export function SaasComparisonTable() {
  return (
    <div className="my-10">
      {/* Desktop / tablet */}
      <div className="hidden sm:block relative border border-foreground/10 rounded-none overflow-hidden bg-background/80 backdrop-blur-sm">
        {/* Header */}
        <div className="grid grid-cols-[1fr_140px_80px_1fr] gap-0 bg-foreground/[0.03] border-b border-foreground/10 px-6 py-4">
          <span className="text-foreground/50 text-xs font-semibold uppercase tracking-wider">What I Needed</span>
          <span className="text-foreground/50 text-xs font-semibold uppercase tracking-wider">Typical SaaS Tool</span>
          <span className="text-foreground/50 text-xs font-semibold uppercase tracking-wider text-right">Market Rate</span>
          <span className="text-foreground/50 text-xs font-semibold uppercase tracking-wider text-right">My Solution</span>
        </div>
        {/* Rows */}
        {rows.map((row, i) => {
          const Icon = row.icon;
          return (
            <motion.div
              key={row.need}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-[1fr_140px_80px_1fr] gap-0 px-6 py-4 border-b border-foreground/[0.05] hover:bg-foreground/[0.02] transition-colors"
            >
              <span className="flex items-center gap-3 text-gray-200 text-sm">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                {row.need}
              </span>
              <span className="flex items-center gap-2 text-foreground/50 text-sm">
                <X className="w-3 h-3 text-red-400/70" />
                {row.oldTool}
              </span>
              <span className="text-right text-foreground/50 text-sm tabular-nums">
                {row.cost > 0 ? `$${row.cost}` : <span className="text-foreground/30">—</span>}
              </span>
              <span className="flex items-center justify-end gap-2 text-primary text-sm font-medium">
                <Robot weight="duotone" className="w-3.5 h-3.5 shrink-0" />
                {row.agent}
              </span>
            </motion.div>
          );
        })}
        {/* Total */}
        <motion.div
          custom={rows.length}
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-[1fr_140px_80px_1fr] gap-0 px-6 py-4 bg-foreground/[0.03]"
        >
          <span className="text-foreground font-semibold text-sm">Total Market Cost</span>
          <span />
          <span className="text-right text-red-400 font-bold text-sm line-through decoration-red-400/50">${totalOld}</span>
          <span className="text-right text-emerald-400 font-bold text-sm">$0 extra*</span>
        </motion.div>
        {/* Footnote */}
        <div className="px-6 py-3 bg-foreground/[0.02] border-t border-foreground/[0.05]">
          <p className="text-foreground/40 text-xs">
            * Agent system runs on subscriptions already used for daily work — Claude Code (frontier: Opus 5 + Fable 5/5.1) plus Ollama Cloud routing — zero marginal cost per agent.
          </p>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {rows.map((row, i) => {
          const Icon = row.icon;
          return (
            <motion.div
              key={row.need}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border border-foreground/10 rounded-xl bg-background/80 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-gray-200 text-sm font-medium">{row.need}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground/50 flex items-center gap-1">
                  <X className="w-3 h-3 text-red-400/70" />
                  {row.oldTool} {row.cost > 0 && <span className="text-red-400/90">(${row.cost}/mo)</span>}
                </span>
                <span className="text-primary font-medium flex items-center gap-1">
                  <Robot weight="duotone" className="w-3 h-3" />
                  {row.agent}
                </span>
              </div>
            </motion.div>
          );
        })}
        {/* Mobile total */}
        <motion.div
          custom={rows.length}
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border border-foreground/10 rounded-xl bg-gradient-to-r from-primary/10 to-primary/10 p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-foreground/50 text-xs">Typical SaaS stack</p>
              <p className="text-red-400 font-bold text-lg line-through decoration-red-400/50">${totalOld}/mo</p>
            </div>
            <div className="text-right">
              <p className="text-foreground/50 text-xs">My AI agent system</p>
              <p className="text-emerald-400 font-bold text-lg">$0 extra*</p>
            </div>
          </div>
          <p className="text-foreground/40 text-xs border-t border-foreground/10 pt-2">
            * Runs on subscriptions already in use — Claude Code (Opus 5 + Fable 5/5.1) + Ollama Cloud routing
          </p>
        </motion.div>
      </div>
    </div>
  );
}
