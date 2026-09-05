"use client";

import { motion } from "framer-motion";

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: i * 0.1 + 0.3, duration: 0.6, ease: "easeInOut" as const },
  }),
};

function Node({
  x,
  y,
  label,
  sublabel,
  color,
  index,
  size = "md",
}: {
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  color: string;
  index: number;
  size?: "sm" | "md" | "lg";
}) {
  const dims = size === "lg" ? { w: 160, h: 52, r: 14 } : size === "md" ? { w: 140, h: 44, r: 12 } : { w: 120, h: 38, r: 10 };
  return (
    <motion.g
      custom={index}
      variants={nodeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
    >
      <rect
        x={x - dims.w / 2}
        y={y - dims.h / 2}
        width={dims.w}
        height={dims.h}
        rx={dims.r}
        fill={`${color}15`}
        stroke={color}
        strokeWidth={1.5}
      />
      <text x={x} y={sublabel ? y - 4 : y + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={size === "lg" ? 14 : 12} fontWeight={600} fontFamily="var(--font-mono), system-ui">
        {label}
      </text>
      {sublabel && (
        <text x={x} y={y + 12} textAnchor="middle" dominantBaseline="middle" fill={`${color}cc`} fontSize={10} fontFamily="system-ui">
          {sublabel}
        </text>
      )}
    </motion.g>
  );
}

function Connection({ x1, y1, x2, y2, index }: { x1: number; y1: number; x2: number; y2: number; index: number }) {
  const midY = (y1 + y2) / 2;
  return (
    <motion.path
      d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
      fill="none"
      stroke="rgba(255,255,255,0.15)"
      strokeWidth={1.5}
      strokeDasharray="4 4"
      custom={index}
      variants={lineVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  );
}

export function ArchitectureDiagram() {
  const W = 800;
  const H = 420;

  return (
    <div className="relative my-10">
      {/* Glow backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-none" />
      <div className="relative border border-foreground/10 rounded-none bg-background/80 backdrop-blur-sm p-4 sm:p-8 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[600px]" preserveAspectRatio="xMidYMid meet">
          {/* Connections */}
          <Connection x1={400} y1={56} x2={400} y2={120} index={0} />
          <Connection x1={400} y1={164} x2={400} y2={228} index={1} />
          <Connection x1={400} y1={272} x2={400} y2={330} index={2} />
          {/* Lurkr to sub-agents fan */}
          <Connection x1={400} y1={164} x2={160} y2={228} index={3} />
          <Connection x1={400} y1={164} x2={640} y2={228} index={4} />
          {/* Memory to external */}
          <Connection x1={400} y1={358} x2={160} y2={392} index={5} />
          <Connection x1={400} y1={358} x2={320} y2={392} index={6} />
          <Connection x1={400} y1={358} x2={480} y2={392} index={7} />
          <Connection x1={400} y1={358} x2={640} y2={392} index={8} />

          {/* Top: Joe */}
          <Node x={400} y={36} label="Joe" sublabel="Telegram" color="#02a0a0" index={0} size="lg" />

          {/* Orchestrator */}
          <Node x={400} y={142} label="Lurkr" sublabel="Orchestrator · Opus" color="#ffbd65" index={1} size="lg" />

          {/* Sub-agents row */}
          <Node x={120} y={248} label="Forge" sublabel="Code" color="#f5a94f" index={2} size="sm" />
          <Node x={260} y={248} label="Radar" sublabel="Leads" color="#f5a94f" index={3} size="sm" />
          <Node x={400} y={248} label="Muse" sublabel="Content" color="#f5a94f" index={4} size="sm" />
          <Node x={540} y={248} label="Helm" sublabel="Infra" color="#f5a94f" index={5} size="sm" />
          <Node x={680} y={248} label="Ledger" sublabel="Finance" color="#f5a94f" index={6} size="sm" />

          {/* Memory layer */}
          <Node x={400} y={338} label="Memory + Cron" sublabel="Files · Supabase · Schedules" color="#F59E0B" index={7} size="lg" />

          {/* External APIs */}
          <Node x={160} y={400} label="Gmail" color="#64748B" index={8} size="sm" />
          <Node x={320} y={400} label="GitHub" color="#64748B" index={9} size="sm" />
          <Node x={480} y={400} label="Stripe" color="#64748B" index={10} size="sm" />
          <Node x={640} y={400} label="Search" color="#64748B" index={11} size="sm" />
        </svg>
      </div>
      <p className="text-center text-foreground/40 text-sm mt-3">System architecture — one VPS, a team of agents, zero Kubernetes</p>
    </div>
  );
}
