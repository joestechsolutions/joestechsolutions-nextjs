"use client";

import { motion } from "framer-motion";
import { ListBullets } from "@phosphor-icons/react";

interface TOCItem {
  id: string;
  label: string;
}

export function TableOfContents({ items }: { items: TOCItem[] }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border border-foreground/10 rounded-xl bg-foreground/[0.02] p-5 my-8"
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 mb-3">
        <ListBullets weight="duotone" className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="text-foreground/60 text-xs font-semibold uppercase tracking-wider">In this article</span>
      </div>
      <ol className="space-y-1.5 list-none p-0 m-0" role="list">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-center gap-2 text-foreground/50 hover:text-primary text-sm transition-colors group"
            >
              <span className="text-foreground/20 group-hover:text-primary/50 text-xs tabular-nums w-5">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </motion.nav>
  );
}
