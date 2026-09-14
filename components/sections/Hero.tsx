"use client";

import { useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

import { Button } from "@/components/ui/Button";
import { Navbar } from "@/app/components/Navbar";

const House3D = dynamic(
  () =>
    import("@/components/sections/House3D").then(
      (module) => module.House3D,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full" />
    ),
  },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const veil =
        sectionRef.current?.querySelector(".page-veil");

      if (reduceMotion) {
        gsap.set(".hero-fade, .hero-logo", {
          opacity: 1,
          y: 0,
        });

        if (veil) {
          gsap.set(veil, {
            opacity: 0,
            pointerEvents: "none",
          });
        }

        return;
      }

      /*
       * Initial states for hero content.
       */
      gsap.set(".hero-fade", {
        opacity: 0,
        y: 40,
      });

      gsap.set(".hero-logo", {
        opacity: 0,
        y: -20,
      });

      const tl = gsap.timeline();

      /*
       * Remove page loading veil.
       */
      if (veil) {
        tl.to(veil, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            (veil as HTMLElement).style.pointerEvents =
              "none";
          },
        });
      }

      /*
       * Logo / company identity entrance.
       */
      tl.to(
        ".hero-logo",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
        },
        "-=0.6",
      );

      /*
       * Main hero content entrance.
       */
      tl.to(
        ".hero-fade",
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.15,
        },
        "-=0.8",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-[var(--color-concrete)] selection:bg-[var(--color-blueprint)] selection:text-white"
    >
      <Navbar />

      {/* Full-page fade-in veil */}
      <div className="page-veil pointer-events-none absolute inset-0 z-50 bg-[var(--color-concrete)]" />

      {/* Architectural grid background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Desktop background gradient overlay for text contrast */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block bg-gradient-to-r from-[var(--color-concrete)] via-[var(--color-concrete)]/80 to-transparent w-[55%]" />

      {/* Hero Content Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 pt-28 pb-16 md:py-32">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Heading & Text */}
          <div className="space-y-8 lg:col-span-6 xl:col-span-6">
            <div className="space-y-5">
              <div className="hero-fade inline-flex items-center gap-3">
                <span className="h-[2px] w-8 rounded-full bg-[var(--color-blueprint)]" />
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-blueprint)] sm:text-sm md:text-base">
                  P.K.S. Construction
                </h2>
              </div>

              <h1 className="hero-fade bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text pb-1 text-4xl font-extrabold leading-[1.1] tracking-tighter text-transparent sm:text-6xl md:text-7xl">
                Building homes in{" "}
                <br className="hidden sm:inline" />
                Gaur Yamuna City.
              </h1>

              <p className="hero-fade max-w-xl text-base font-light leading-relaxed text-[var(--color-steel)] sm:text-lg md:text-xl">
                From foundation to handover, we build residential properties
                with uncompromising precision, premium quality, and enduring
                structural integrity.
              </p>
            </div>

            <div className="hero-fade flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
              <a href="tel:+919818171494" className="group">
                <Button
                  size="lg"
                  className="w-full text-base shadow-lg shadow-[var(--color-blueprint)]/20 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--color-blueprint)]/40 active:translate-y-0 sm:w-auto"
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
                  className="w-full border-gray-300 bg-transparent text-base transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:bg-gray-50 active:translate-y-0 sm:w-auto"
                >
                  Explore Our Work
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column (Desktop) / Below Text (Mobile): 3D Model */}
          <div className="hero-fade relative flex items-center justify-center lg:col-span-6 xl:col-span-6">
            <div className="relative h-[420px] w-full sm:h-[500px] md:h-[560px] lg:h-[700px] xl:h-[760px] lg:scale-105">
              <House3D />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}