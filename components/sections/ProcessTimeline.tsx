"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  IconConsultation,
  IconDesign,
  IconFoundation,
  IconConstruction,
  IconFinishing,
  IconHandover,
} from "@/components/icons/ProcessIcons";

const steps = [
  {
    title: "Consultation",
    description: "Initial meeting to understand your requirements, plot size, and budget.",
    icon: IconConsultation,
  },
  {
    title: "Design & Estimate",
    description: "Creating architectural blueprints and providing a detailed cost estimate.",
    icon: IconDesign,
  },
  {
    title: "Foundation",
    description: "Site preparation, excavation, and laying a solid, reinforced foundation.",
    icon: IconFoundation,
  },
  {
    title: "Construction",
    description: "Erecting the superstructure with premium grade materials and strict quality control.",
    icon: IconConstruction,
  },
  {
    title: "Finishing",
    description: "Plumbing, electricals, flooring, painting, and detailed interior finishing.",
    icon: IconFinishing,
  },
  {
    title: "Handover",
    description: "Final walkthrough and handing over the keys to your new home.",
    icon: IconHandover,
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 40%"],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-20 md:py-24 bg-[var(--color-concrete)] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-14 md:mb-16 max-w-2xl">
          <p className="font-mono text-sm tracking-widest text-[var(--color-blueprint)] uppercase mb-3">
            Our process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-charcoal)]">
            How it works
          </h2>
          <p className="mt-4 text-lg text-[var(--color-steel)]">
            A transparent, step-by-step process ensuring your home is built to exact specifications, on time and on budget.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Base track */}
          <div className="absolute left-6 md:left-0 top-0 bottom-0 md:bottom-auto md:top-6 w-[2px] md:w-full md:h-[2px] bg-[var(--color-steel)]/20 z-0" />
          {/* Fill that draws in as you scroll — mirrors the "under construction" theme */}
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="hidden md:block absolute left-6 top-0 bottom-0 w-[2px] bg-[var(--color-safety)] z-0 origin-top md:hidden"
          />
          <motion.div
            style={{ scaleX: lineScaleX }}
            className="hidden md:block absolute left-0 right-0 top-6 h-[2px] bg-[var(--color-safety)] z-0 origin-left"
          />
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-[var(--color-safety)] z-0 origin-top"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  className="group relative pl-16 md:pl-0 pt-2 md:pt-16"
                >
                  {/* Marker */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 top-0 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[var(--color-safety)] shadow-[0_0_0_4px_var(--color-concrete)] z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", delay: (index % 3) * 0.1 + 0.3 }}
                  />

                  <div className="bg-[var(--color-off-white)] p-6 shadow-sm border border-[var(--color-steel)]/10 h-full transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-md group-hover:border-[var(--color-blueprint)]/30">
                    <div className="mb-4 p-3 bg-[var(--color-blueprint)]/10 text-[var(--color-blueprint)] inline-block transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="font-mono text-xs text-[var(--color-safety)] mb-2">
                      Step 0{index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--color-steel)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}