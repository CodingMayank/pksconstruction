"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { HouseBlueprint } from "@/components/icons/HouseBlueprint";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const veil = sectionRef.current?.querySelector(".page-veil");

      if (reduceMotion) {
        gsap.set(".hero-fade, .hero-logo", { opacity: 1, y: 0 });
        if (veil) gsap.set(veil, { opacity: 0, pointerEvents: "none" });
        return;
      }

      // Initial state for animation
      gsap.set(".hero-fade", { opacity: 0, y: 40 });
      gsap.set(".hero-logo", { opacity: 0, y: -20 });

      const tl = gsap.timeline();

      // Whole-page fade-in veil
      if (veil) {
        tl.to(veil, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            (veil as HTMLElement).style.pointerEvents = "none";
          },
        });
      }

      // Staggered professional fade-in
      tl.to(
        ".hero-logo",
        { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
        "-=0.6"
      ).to(
        ".hero-fade",
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.15,
        },
        "-=0.8"
      );

      // Subtle parallax drift on the blueprint as the mouse moves
      const section = sectionRef.current;
      const blueprint = section?.querySelector(".hero-blueprint");
      if (!section || !blueprint) return;

      const onMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 24;
        const y = (e.clientY / innerHeight - 0.5) * 24;
        gsap.to(blueprint, {
          x,
          y,
          duration: 1.5,
          ease: "power3.out",
        });
      };

      section.addEventListener("mousemove", onMove);
      return () => section.removeEventListener("mousemove", onMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[var(--color-concrete)] selection:bg-[var(--color-blueprint)] selection:text-white"
    >
      {/* Full-page fade-in veil, dissolves on load */}
      <div className="page-veil absolute inset-0 z-50 bg-[var(--color-concrete)]" />

      {/* Subtle Architectural Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Background blueprint graphic */}
      <div className="absolute inset-0 z-0 flex items-center justify-center lg:justify-end lg:pr-24 mix-blend-multiply">
        <HouseBlueprint className="hero-blueprint w-full max-w-3xl h-auto opacity-30 brightness-[0.7] contrast-125 saturate-150 drop-shadow-xl" />
      </div>
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--color-concrete)] via-[var(--color-concrete)]/80 to-transparent" />

      {/* Main Content Container */}
      <div className="container relative z-10 mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl space-y-10">
          <div className="space-y-6">
            <div className="hero-fade inline-flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[var(--color-blueprint)] rounded-full"></span>
              <h2 className="font-mono text-sm md:text-base tracking-[0.2em] text-[var(--color-blueprint)] uppercase font-semibold">
                P.K.S. Construction
              </h2>
            </div>
            
            <h1 className="hero-fade text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 leading-[1.1] pb-2">
              Building homes in <br className="hidden md:block" />
              Gaur Yamuna City.
            </h1>
            
            <p className="hero-fade text-lg sm:text-xl text-[var(--color-steel)] max-w-xl leading-relaxed font-light">
              From foundation to handover, we build residential properties with uncompromising precision, premium quality, and enduring structural integrity.
            </p>
          </div>

          <div className="hero-fade flex flex-col sm:flex-row gap-5 pt-4">
            <a href="tel:+919818171494" className="group">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base shadow-lg shadow-[var(--color-blueprint)]/20 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--color-blueprint)]/40 active:translate-y-0"
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:rotate-12"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call Now
                </span>
              </Button>
            </a>
            <a href="#portfolio" className="group">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base border-gray-300 hover:border-gray-400 bg-transparent transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-gray-50 active:translate-y-0"
              >
                Explore Our Work
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Modern Mouse Scroll Indicator */}
      <div className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 transition-opacity hover:opacity-100 cursor-pointer">
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Scroll</span>
        <div className="w-[26px] h-[40px] rounded-full border-2 border-gray-400 flex justify-center p-1">
          <div className="w-1 h-2 bg-gray-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}