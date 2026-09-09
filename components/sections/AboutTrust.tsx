"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const YEARS_ACTIVE = new Date().getFullYear() - 2021;

export function AboutTrust() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".at-fade", { opacity: 1, y: 0 });
        if (counterRef.current)
          counterRef.current.textContent = `${YEARS_ACTIVE}+`;
        return;
      }

      gsap.set(".at-fade", { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(".at-fade", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });

      const counter = { val: 0 };
      tl.to(
        counter,
        {
          val: YEARS_ACTIVE,
          duration: 1.2,
          ease: "power1.out",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(counter.val)}+`;
            }
          },
        },
        "-=0.5",
      );
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 500);

    return () => {
      ctx.revert();
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden pt-4 pb-20 md:pb-24 bg-[var(--color-charcoal)] text-[var(--color-off-white)]"
    >
      {/* Faint continuation of the Hero's grid, softens the seam */}
      <div className="absolute inset-x-0 top-0 h-72 z-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Floating connector */}
      <div className="at-fade relative z-20 mb-16 md:mb-20 mx-auto max-w-2xl px-8 shadow-black/40 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
        {/* <span className="font-mono text-xs tracking-widest uppercase text-[var(--color-safety)]">
          25+ Years
        </span>
        <span className="w-1 h-1 rounded-full bg-[var(--color-off-white)]/25 hidden sm:block" />
        <span className="font-mono text-xs tracking-widest uppercase text-[var(--color-off-white)]/60">
          Owner-Led Construction
        </span>
        <span className="w-1 h-1 rounded-full bg-[var(--color-off-white)]/25 hidden sm:block" />
        <span className="font-mono text-xs tracking-widest uppercase text-[var(--color-off-white)]/60">
          Gaur Yamuna City &amp; UP
        </span> */}
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-2 at-fade">
              <p className="font-mono text-sm tracking-widest text-[var(--color-gold)] uppercase">
                About us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Built on Trust and Concrete.
              </h2>
            </div>

            <div className="space-y-4 text-[var(--color-off-white)]/60 leading-relaxed at-fade">
              <p>
                At P.K.S. Construction, we don&apos;t just build houses; we
                construct homes designed to last generations. Operating
                primarily in Gaur Yamuna City and the surrounding Uttar Pradesh
                region, we bring structural expertise and meticulous finishing
                to every project.
              </p>
              <p>
                From the first excavation to the final coat of paint, our team
                manages the entire lifecycle of construction, ensuring
                transparency, durability, and on-time delivery.
              </p>
              <p>
                The company is led by{" "}
                <span className="text-[var(--color-off-white)] font-medium">
                  Mr. Pramod Kumar Sharma
                </span>
                , who brings over{" "}
                <span className="text-[var(--color-off-white)] font-medium">
                  25 years of experience in civil engineering and construction
                </span>
                , overseeing every project personally from groundwork to
                handover.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--color-off-white)]/15 at-fade">
              <p className="font-mono text-sm tracking-widest text-[var(--color-gold)] uppercase mb-2">
                Service area
              </p>
              <p className="font-medium">
                Gaur Yamuna City 57, 6th Park View GYC &amp; surrounding UP
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="at-fade group space-y-2 p-6 border border-[var(--color-off-white)]/15 bg-[var(--color-charcoal)] transition-all duration-300 hover:border-[var(--color-safety)]/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-safety)]/10">
              <p
                ref={counterRef}
                className="text-4xl md:text-5xl font-bold text-[var(--color-safety)] tabular-nums"
              >
                0+
              </p>
              <p className="font-mono text-xs tracking-wider text-[var(--color-off-white)]/50 uppercase">
                Years active
              </p>
            </div>

            <div className="at-fade group space-y-2 p-6 border border-[var(--color-off-white)]/15 bg-[var(--color-charcoal)] transition-all duration-300 hover:border-[var(--color-gold)]/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-gold)]/10">
              <p className="text-2xl md:text-3xl font-bold text-[var(--color-gold)] leading-tight">
                Owner-led
              </p>
              <p className="font-mono text-xs tracking-wider text-[var(--color-off-white)]/50 uppercase">
                Pramod Kumar Sharma
              </p>
            </div>

            <div className="at-fade group space-y-2 p-6 border border-[var(--color-off-white)]/15 bg-[var(--color-charcoal)] col-span-2 transition-all duration-300 hover:border-[var(--color-safety)]/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-safety)]/10">
              <p className="text-3xl font-bold text-[var(--color-safety)]">
                100%
              </p>
              <p className="font-mono text-xs tracking-wider text-[var(--color-off-white)]/50 uppercase">
                Commitment to quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}