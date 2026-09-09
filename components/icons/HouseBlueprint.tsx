"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HouseBlueprint({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reveal = revealRef.current;
    if (!reveal) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(reveal, { clipPath: "inset(0 0% 0 0)" });
        gsap.set(".bp-img", { scale: 1 });
        return;
      }

      gsap.set(reveal, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".bp-img", { scale: 1.08 });

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      })
        .to(reveal, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power3.inOut",
        })
        .to(
          ".bp-img",
          { scale: 1, duration: 1.4, ease: "power2.out" },
          "<"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <div ref={revealRef} className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src="/blueprint.png"
          alt="Architectural blueprint of a house"
          fill
          className="bp-img object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
      </div>
    </div>
  );
}