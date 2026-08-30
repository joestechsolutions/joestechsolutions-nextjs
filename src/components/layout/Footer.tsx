import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-foreground/10" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <h3 className="text-xl font-bold text-foreground mb-4 font-mono">Joe&apos;s Tech Solutions</h3>
            <p className="text-foreground/60 text-sm max-w-md leading-relaxed">
              Custom apps, automation, and AI tools. Built on the same stack I run for my own business.
            </p>
          </div>

          {/* Quick Links — mirrors the 3-tier ladder in lib/tiers.ts */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/private-ai-setup" className="text-foreground/60 hover:text-primary text-sm transition-colors">
                  Setup
                </Link>
              </li>
              <li>
                <Link href="/services#back-office" className="text-foreground/60 hover:text-primary text-sm transition-colors">
                  Operations
                </Link>
              </li>
              <li>
                <Link href="/google-maps-growth" className="text-foreground/60 hover:text-primary text-sm transition-colors">
                  Google Maps Growth
                </Link>
              </li>
              <li>
                <Link href="/services#custom-build" className="text-foreground/60 hover:text-primary text-sm transition-colors">
                  Custom Build
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-foreground/60 hover:text-primary text-sm transition-colors">
                  Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/portfolio" className="text-foreground/60 hover:text-primary text-sm transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/stack" className="text-foreground/60 hover:text-primary text-sm transition-colors">
                  The Stack
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/60 hover:text-primary text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/60 hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Free */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Free</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/prompt-library" className="text-foreground/60 hover:text-[#e8703f] text-sm transition-colors">
                  Prompt Library
                  <span className="ml-1.5 text-[10px] text-[#e8703f]/70">FREE</span>
                </Link>
              </li>
              <li>
                <Link href="/whisper-walkie" className="text-foreground/60 hover:text-[#e8703f] text-sm transition-colors">
                  Whisper Walkie
                  <span className="ml-1.5 text-[10px] text-foreground/40">ARCHIVE</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground/60 hover:text-primary text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-foreground/10">
          <p className="text-center text-foreground/50 text-sm">
            © {currentYear} Joe&apos;s Tech Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
