import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — No such page | Joe's Tech Solutions",
  robots: { index: false },
};

const places = [
  { href: "/", label: "~/", note: "home" },
  { href: "/solutions", label: "solutions/", note: "setup · operations · custom builds" },
  { href: "/google-maps-growth", label: "google-maps-growth/", note: "your Google profile, run by an agent" },
  { href: "/portfolio", label: "portfolio/", note: "real client work" },
  { href: "/blog", label: "blog/", note: "notes from the build" },
  { href: "/contact", label: "contact/", note: "tell me what's not working" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center">
      <div className="mx-auto w-full max-w-2xl px-6 py-24">
        <div className="border-2 border-foreground bg-[var(--panel)] p-8 shadow-[8px_8px_0_var(--primary)] sm:p-10">
          <p className="mb-2 font-mono text-[13px] font-bold text-[var(--color-accent)]">
            <span className="text-[#8a919c]">joe@jts:~$ </span>cat ./that-page
          </p>
          <h1 className="mb-3 font-mono text-2xl font-bold text-[#f0f1ec] sm:text-3xl">
            404: No such file or directory
          </h1>
          <p className="mb-8 text-sm text-[#8a919c]">
            The page moved, never existed, or got renamed in a redesign. Everything below is real:
          </p>
          <ul className="grid gap-2 font-mono text-sm sm:grid-cols-2">
            {places.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group flex flex-col border border-[#8a919c]/30 px-3 py-2 transition-colors hover:border-primary"
                >
                  <span className="font-bold text-primary group-hover:underline">{p.label}</span>
                  <span className="text-[12px] text-[#8a919c]">{p.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
