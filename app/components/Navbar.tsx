"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#portfolio" },
  { label: "Site Reels", href: "#construction-videos" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`absolute top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled
          ? "bg-[var(--color-concrete)]/80 backdrop-blur-md border-b border-[var(--color-steel)]/20 shadow-sm"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between h-20">
        {/* <a href="#hero" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-[var(--color-safety)] transition-transform duration-300 group-hover:scale-125" />
          <span className="font-mono text-sm md:text-base tracking-[0.15em] uppercase font-semibold text-[var(--color-charcoal)]">
            P.K.S. <span className="text-[var(--color-blueprint)]">Construction</span>
          </span>
        </a> */}

        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative font-mono text-xs tracking-widest uppercase text-[var(--color-charcoal)]/80 hover:text-[var(--color-blueprint)] transition-colors duration-300 py-2
                  after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-[var(--color-blueprint)] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* <a href="tel:+919818171494" className="hidden md:block">
          <Button
            size="sm"
            variant="outline"
            className="border-[var(--color-charcoal)]/30 hover:border-[var(--color-blueprint)] hover:bg-[var(--color-blueprint)] hover:text-white transition-all duration-300"
          >
            Call Now
          </Button>
        </a> */}

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
        >
          <span className={`block h-[1.5px] w-6 bg-[var(--color-charcoal)] transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-[1.5px] w-6 bg-[var(--color-charcoal)] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-6 bg-[var(--color-charcoal)] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${open ? "max-h-80 border-t border-[var(--color-steel)]/20" : "max-h-0"
          } bg-[var(--color-concrete)]/95 backdrop-blur-md`}
      >
        <ul className="flex flex-col px-6 py-6 gap-5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm tracking-widest uppercase text-[var(--color-charcoal)]/80 hover:text-[var(--color-blueprint)] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          {/* <li>
            <a href="tel:+919818171494">
              <Button size="sm" className="w-full">Call Now</Button>
            </a>
          </li> */}
        </ul>
      </div>
    </header>
  );
}