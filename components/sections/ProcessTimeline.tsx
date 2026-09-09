"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-20 md:py-28 bg-[var(--color-concrete)] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono text-sm tracking-widest text-[var(--color-blueprint)] uppercase mb-3"
          >
            Our process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-charcoal)]"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-[var(--color-steel)] leading-relaxed"
          >
            A transparent, step-by-step process ensuring your home is built to exact specifications, on time and on budget.
          </motion.p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Desktop Progress Bar (Clean, Centered, Professional) */}
          <div className="hidden xl:block absolute left-8 right-8 top-[19px] h-[3px] bg-[var(--color-steel)]/15 rounded-full overflow-hidden z-0">
            <motion.div
              style={{ scaleX: lineScaleX }}
              className="h-full w-full bg-[var(--color-safety)] origin-left rounded-full"
            />
          </div>

          {/* Mobile/Tablet Vertical Progress Line */}
          <div className="xl:hidden absolute left-6 top-4 bottom-4 w-[2px] bg-[var(--color-steel)]/15 rounded-full overflow-hidden z-0">
            <motion.div
              style={{ scaleY: lineScaleY }}
              className="w-full h-full bg-[var(--color-safety)] origin-top rounded-full"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 md:gap-6 relative z-10"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="group relative pl-14 md:pl-14 xl:pl-0 xl:pt-12"
                >
                  {/* Step Marker Node */}
                  <div className="absolute left-[15px] xl:left-6 top-1 xl:top-2.5 w-6 h-6 rounded-full bg-[var(--color-concrete)] border-2 border-[var(--color-steel)]/30 group-hover:border-[var(--color-safety)] transition-colors duration-300 flex items-center justify-center z-10 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-steel)]/50 group-hover:bg-[var(--color-safety)] transition-colors duration-300" />
                  </div>

                  {/* Clean Card UI */}
                  <div className="bg-[var(--color-off-white)] p-6 rounded-xl border border-[var(--color-steel)]/10 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[var(--color-blueprint)]/30">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="p-2.5 bg-[var(--color-blueprint)]/10 text-[var(--color-blueprint)] rounded-lg inline-flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--color-blueprint)] group-hover:text-white">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs font-semibold tracking-wider text-[var(--color-steel)] bg-[var(--color-concrete)] px-2.5 py-1 rounded">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--color-steel)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}