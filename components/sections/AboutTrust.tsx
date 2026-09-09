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

    // recalc trigger positions after everything (fonts/images) has settled
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
      className="py-20 md:py-24 bg-[var(--color-charcoal)] text-[var(--color-off-white)]"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-2 at-fade">
              <p className="font-mono text-sm tracking-widest text-[var(--color-blueprint)] uppercase">
                About us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Built on Trust and Concrete.
              </h2>
            </div>

            <div className="space-y-4 text-[var(--color-steel)] leading-relaxed at-fade">
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

            <div className="pt-4 border-t border-[var(--color-steel)]/30 at-fade">
              <p className="font-mono text-sm tracking-widest text-[var(--color-blueprint)] uppercase mb-2">
                Service area
              </p>
              <p className="font-medium">
                Gaur Yamuna City, 16th Park View GYC &amp; surrounding UP
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="at-fade group space-y-2 p-6 border border-[var(--color-steel)]/30 bg-[var(--color-charcoal)] transition-all duration-300 hover:border-[var(--color-safety)]/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-safety)]/10">
              <p
                ref={counterRef}
                className="text-4xl md:text-5xl font-bold text-[var(--color-safety)] tabular-nums"
              >
                0+
              </p>
              <p className="font-mono text-xs tracking-wider text-[var(--color-steel)] uppercase">
                Years active
              </p>
            </div>

            <div className="at-fade group space-y-2 p-6 border border-[var(--color-steel)]/30 bg-[var(--color-charcoal)] transition-all duration-300 hover:border-[var(--color-blueprint)]/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-blueprint)]/10">
              <p className="text-2xl md:text-3xl font-bold text-[var(--color-blueprint)] leading-tight">
                Owner-led
              </p>
              <p className="font-mono text-xs tracking-wider text-[var(--color-steel)] uppercase">
                Pramod Kumar Sharma
              </p>
            </div>

            <div className="at-fade group space-y-2 p-6 border border-[var(--color-steel)]/30 bg-[var(--color-charcoal)] col-span-2 transition-all duration-300 hover:border-[var(--color-safety)]/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-safety)]/10">
              <p className="text-3xl font-bold text-[var(--color-blueprint)]">
                100%
              </p>
              <p className="font-mono text-xs tracking-wider text-[var(--color-steel)] uppercase">
                Commitment to quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
