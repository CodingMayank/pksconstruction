"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight, X, ZoomIn } from "lucide-react";

export function Contact() {
  const [isCardZoomed, setIsCardZoomed] = useState(false);

  // lock scroll + allow Escape to close while zoomed
  useEffect(() => {
    if (!isCardZoomed) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCardZoomed(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isCardZoomed]);

  const mailtoHref =
    "mailto:pkmayank2002@gmail.com?subject=" +
    encodeURIComponent("Callback request — P.K.S. Construction") +
    "&body=" +
    encodeURIComponent(
      "Hi,\n\nI'd like to request a callback.\n\nName:\nPhone:\nPlot details:\n\nThanks."
    );

  return (
    <section className="py-20 md:py-24 bg-[var(--color-concrete)]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-sm tracking-widest text-[var(--color-blueprint)] uppercase mb-3">
                Contact
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-charcoal)] mb-4">
                Let&apos;s build something solid.
              </h2>
              <p className="text-lg text-[var(--color-steel)]">
                Contact us to discuss your plot, get a detailed estimate, or
                visit one of our ongoing sites.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              <p className="sm:col-span-2 font-mono text-xs tracking-[0.2em] text-[var(--color-steel)] uppercase">
                Direct contact
              </p>
              {[
                {
                  icon: Phone,
                  label: "Call / WhatsApp",
                  content: (
                    <>
                      <a
                        href="tel:+919871417306"
                        className="text-xl font-bold text-[var(--color-charcoal)] hover:text-[var(--color-safety)] transition-colors block"
                      >
                        +91 98714 17306
                      </a>
                      <a
                        href="https://wa.me/919871417306"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#25D366] hover:underline mt-1 inline-flex items-center gap-1 group"
                      >
                        Chat on WhatsApp
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                          →
                        </span>
                      </a>
                    </>
                  ),
                },
                {
                  icon: Mail,
                  label: "Email",
                  content: (
                    <a
                      href="mailto:pkmayank2002@gmail.com"
                      className="text-xl font-bold text-[var(--color-charcoal)] hover:text-[var(--color-safety)] transition-colors break-all"
                    >
                      pkmayank2002@gmail.com
                    </a>
                  ),
                },
                {
                  icon: MapPin,
                  label: "Office",
                  content: (
                    <>
                      <p className="text-lg font-medium text-[var(--color-charcoal)]">
                        P.K.S. Construction
                      </p>
                      <p className="text-[var(--color-steel)]">
                        57, 6th Park View GYC
                        <br />
                        Gaur Yamuna City, Uttar Pradesh
                      </p>
                    </>
                  ),
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group flex items-start gap-4 border border-[var(--color-steel)]/15 bg-[var(--color-off-white)]/45 p-4 transition-colors duration-200 hover:border-[var(--color-blueprint)]/40 hover:bg-[var(--color-off-white)]"
                  >
                    <div className="p-3 bg-[var(--color-off-white)] border border-[var(--color-steel)]/20 transition-all duration-300 group-hover:border-[var(--color-blueprint)]/50 group-hover:-translate-y-0.5">
                      <Icon className="w-6 h-6 text-[var(--color-blueprint)]" />
                    </div>
                    <div>
                      <p className="font-mono text-sm tracking-widest text-[var(--color-steel)] uppercase mb-1">
                        {item.label}
                      </p>
                      {item.content}
                    </div>
                  </motion.div>
                );
              })}

              {/* Visiting card — click to zoom */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: 0.24 }}
                className="sm:col-span-2 border-t border-[var(--color-steel)]/20 pt-6"
              >
                <div className="grid items-center gap-5 rounded-sm border border-[var(--color-blueprint)]/20 bg-[var(--color-blueprint)]/[0.06] p-4 sm:grid-cols-[minmax(0,1fr)_minmax(220px,360px)] sm:p-5">
                  <div>
                    <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-blueprint)] uppercase">
                      Visiting card
                    </p>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--color-charcoal)]">
                      Keep our details close.
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-steel)]">
                      Tap the card to view it clearly, then use the details above to call, WhatsApp, or email us directly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCardZoomed(true)}
                    className="group relative aspect-[16/10] w-full overflow-hidden border border-[var(--color-steel)]/20 bg-white p-3 transition-all duration-300 hover:border-[var(--color-blueprint)]/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blueprint)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-concrete)]"
                    aria-label="Zoom in on visiting card"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src="/contactcard.jpeg"
                        alt="P.K.S. Construction visiting card"
                        fill
                        className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 360px"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-charcoal)]/0 transition-colors duration-300 group-hover:bg-[var(--color-charcoal)]/10">
                      <span className="flex items-center gap-1.5 bg-[var(--color-charcoal)]/80 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-[var(--color-off-white)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <ZoomIn className="h-3.5 w-3.5" />
                        View card
                      </span>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Request a callback — opens the mail client directly, no form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="self-start border border-[var(--color-steel)]/10 bg-[var(--color-off-white)] p-6 shadow-sm sm:p-8 md:p-10 lg:sticky lg:top-24"
          >
            <h3 className="text-2xl font-bold text-[var(--color-charcoal)] mb-3">
              Request a callback
            </h3>
            <p className="text-[var(--color-steel)] leading-relaxed mb-8">
              Send us a quick email with your name, number, and plot details — we&apos;ll get back to you as soon as we can.
            </p>

            <a href={mailtoHref} className="group block">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between gap-4 bg-[var(--color-charcoal)] px-6 py-5 sm:px-8 sm:py-6 transition-colors duration-300 group-hover:bg-[var(--color-blueprint)]"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[var(--color-off-white)]/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Mail className="w-6 h-6 text-[var(--color-off-white)]" />
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-widest text-[var(--color-off-white)]/60 uppercase mb-1">
                      Tap to open mail
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-[var(--color-off-white)] break-all">
                      pkmayank2002@gmail.com
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-6 h-6 text-[var(--color-off-white)] flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.div>
            </a>

            <p className="mt-4 text-xs text-[var(--color-steel)]">
              Opens your default email app with the address and subject pre-filled.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isCardZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-charcoal)]/90 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setIsCardZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Visiting card, enlarged"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg aspect-[3/2]"
            >
              <Image
                src="/contactcard.jpeg"
                alt="P.K.S. Construction visiting card, enlarged"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 512px"
                priority
              />
            </motion.div>

            <button
              type="button"
              onClick={() => setIsCardZoomed(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 bg-[var(--color-off-white)]/10 hover:bg-[var(--color-off-white)]/20 text-[var(--color-off-white)] transition-colors duration-200 active:scale-90"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}