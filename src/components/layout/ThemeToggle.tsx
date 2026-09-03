"use client";

import { Sun, Moon, CircleHalf } from "@phosphor-icons/react";

import { useEffect, useState } from "react";

// Toggles the `dark` class on <html>. Initial state is set before paint by
// the inline script in layout.tsx (localStorage "jts-theme", else system).
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    // One-time mount sync with the class the pre-paint script set on <html>.
    // Reading document during render would break SSR/hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("jts-theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex min-h-[36px] items-center gap-1.5 border-2 border-foreground px-2.5 py-1 font-mono text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Render both labels until mounted to avoid hydration mismatch */}
      {dark === null ? <CircleHalf weight="fill" className="h-4 w-4" /> : dark ? <><Sun weight="duotone" className="h-4 w-4" /> light</> : <><Moon weight="duotone" className="h-4 w-4" /> dark</>}
    </button>
  );
}
