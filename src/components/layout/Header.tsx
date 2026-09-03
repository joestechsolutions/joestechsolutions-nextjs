"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Solutions", href: "/solutions" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Stack", href: "/stack" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-foreground/10" role="banner">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo-icon.png"
                alt="Joe&apos;s Tech Solutions"
                width={56}
                height={56}
                className="transition-transform group-hover:scale-105"
              />
              <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors font-mono hidden sm:inline">
                Joe&apos;s Tech Solutions
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors text-sm font-medium ${
                      isActive
                        ? "text-primary"
                        : "text-foreground/70 hover:text-primary"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <ThemeToggle />
              <Link href="/contact">
                <Button size="sm" className="bg-primary hover:bg-primary/85 text-foreground rounded-none shadow-lg shadow-primary/20">
                  Get in touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground/70 hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="md:hidden py-4 space-y-2" role="navigation" aria-label="Mobile navigation menu">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded transition-colors min-h-[44px] ${
                    isActive
                      ? "text-primary bg-foreground/5"
                      : "text-foreground/70 hover:text-primary hover:bg-foreground/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="px-4 pt-2">
              <Link href="/contact" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/85 text-foreground rounded-none min-h-[44px] shadow-lg shadow-primary/20">
                  Get in touch
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
