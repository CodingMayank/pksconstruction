"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Phone,
  Mail,
  X,
  ZoomIn,
  Download,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

export function Contact() {
  const [isCardZoomed, setIsCardZoomed] = useState(false);

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

  return (
    <section id="contact" className="w-full relative overflow-hidden bg-[var(--color-concrete)]">
      {/* 1. HERO BANNER WITH ARCHITECTURAL BACKDROP */}
      <div className="relative w-full min-h-[380px] md:min-h-[420px] flex items-center justify-center text-center px-6 py-20 bg-[var(--color-charcoal)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/constructions/building.png"
            alt="P.K.S Construction Projects"
            fill
            priority
            className="object-cover object-center grayscale contrast-150 brightness-200 opacity-200 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#18181b]/85 via-[#18181b]/90 to-[#121214]/95" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--color-safety)] uppercase"
          >
            CONTACT US
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex justify-center items-center gap-1.5 py-1"
          >
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-off-white)]/40"
              />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-lg md:text-xl font-medium text-[var(--color-off-white)]/90 leading-relaxed max-w-xl mx-auto"
          >
            Need an expert? You are more than welcomed to leave your contact
            info and we will be in touch shortly.
          </motion.p>
        </div>
      </div>

      {/* 2. THREE CONTACT INFO CARDS */}
      <div className="bg-[var(--color-off-white)] py-16 md:py-20 border-b border-[var(--color-steel)]/15">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-steel)]/20">
            {/* Visit Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="px-6 py-8 md:py-4 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-[var(--color-safety)] transition-transform duration-300 group-hover:scale-110 mb-4">
                <Home className="w-10 h-10 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-[var(--color-charcoal)] mb-2">
                VISIT US
              </h3>
              <p className="text-sm text-[var(--color-steel)] max-w-xs leading-relaxed mb-4">
                Site visits &amp; blueprint consultation available 7 days a week.
              </p>
              <a
                href="https://maps.google.com/?q=Gaur+Yamuna+City+Yamuna+Expressway"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-[var(--color-safety)] hover:underline inline-flex items-center gap-1.5"
              >
                57, 6th Park View, Gaur Yamuna City, UP
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Call Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="px-6 py-8 md:py-4 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-[var(--color-safety)] transition-transform duration-300 group-hover:scale-110 mb-4">
                <Phone className="w-10 h-10 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-[var(--color-charcoal)] mb-2">
                CALL US
              </h3>
              <p className="text-sm text-[var(--color-steel)] max-w-xs leading-relaxed mb-4">
                Direct phone &amp; WhatsApp support for quotes and immediate site enquiries.
              </p>
              <div className="flex flex-col items-center gap-1">
                <a
                  href="tel:+919871417306"
                  className="text-base font-bold text-[var(--color-safety)] hover:underline"
                >
                  +91 98714 17306
                </a>
                <a
                  href="https://wa.me/919871417306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#25D366] hover:underline inline-flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="px-6 py-8 md:py-4 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-[var(--color-safety)] transition-transform duration-300 group-hover:scale-110 mb-4">
                <Mail className="w-10 h-10 stroke-[2.2]" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-[var(--color-charcoal)] mb-2">
                CONTACT US
              </h3>
              <p className="text-sm text-[var(--color-steel)] max-w-xs leading-relaxed mb-4">
                Send us your layout details, plot dimensions, or queries anytime.
              </p>
              <a
                href="mailto:pkmayank2002@gmail.com"
                className="text-base font-bold text-[var(--color-safety)] hover:underline break-all"
              >
                pkmayank2002@gmail.com
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. VISITING CARD SHOWCASE SECTION (Center Aligned, Zoomable & Downloadable) */}
      <div className="py-20 md:py-24 bg-[var(--color-concrete)]">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--color-off-white)] rounded-2xl border border-[var(--color-steel)]/20 shadow-md p-8 md:p-12 text-center flex flex-col items-center"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-[var(--color-safety)] uppercase font-semibold mb-2">
              Official Business Identity
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-charcoal)] mb-3">
              P.K.S. Construction Visiting Card
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-steel)] max-w-lg mx-auto mb-8 leading-relaxed">
              Keep our verified contact and site credentials handy. Click the card preview to enlarge it in high definition, or download a copy directly.
            </p>

            {/* Interactive Card Container */}
            <div className="relative group w-full max-w-md aspect-[16/10] overflow-hidden rounded-xl border-2 border-[var(--color-steel)]/25 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-safety)]/60">
              <Image
                src="/contactcard.jpeg"
                alt="P.K.S. Construction Visiting Card"
                fill
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 448px"
              />

              {/* Hover Overlay with Quick Zoom Button */}
              <button
                type="button"
                onClick={() => setIsCardZoomed(true)}
                className="absolute inset-0 bg-[var(--color-charcoal)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-[var(--color-off-white)] gap-2 cursor-pointer focus:outline-none"
                aria-label="Click to enlarge visiting card"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-safety)] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Click To Enlarge
                </span>
              </button>
            </div>

            {/* Action Buttons: Zoom & Download */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsCardZoomed(true)}
                className="px-6 py-3 rounded-lg bg-[var(--color-charcoal)] text-[var(--color-off-white)] text-sm font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:bg-[var(--color-blueprint)] shadow-sm hover:shadow active:scale-95"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Zoom Card</span>
              </button>

              <a
                href="/contactcard.jpeg"
                download="PKS_Construction_Visiting_Card.jpeg"
                className="px-6 py-3 rounded-lg bg-[var(--color-safety)] text-white text-sm font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:bg-[#d04a1f] shadow-sm hover:shadow active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Card</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. FOOTER SOCIAL ICONS BAR */}
      <div className="w-full bg-[var(--color-charcoal)] py-8 px-6 border-t border-[var(--color-steel)]/20">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl text-center sm:text-left">
          <p className="text-xs text-[var(--color-steel)] font-mono">
            &copy; {new Date().getFullYear()} P.K.S. Construction. All Rights Reserved.
          </p>

          <div className="flex items-center justify-center gap-3">
            <a
              href="tel:+919871417306"
              aria-label="Phone"
              className="w-10 h-10 rounded-full bg-[#1e293b] hover:bg-[var(--color-safety)] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919871417306"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-[#1e293b] hover:bg-[#25D366] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="mailto:pkmayank2002@gmail.com"
              aria-label="Email"
              className="w-10 h-10 rounded-full bg-[#1e293b] hover:bg-[var(--color-safety)] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 5. MODAL LIGHTBOX FOR VISITING CARD (HD ZOOM + DIRECT DOWNLOAD) */}
      <AnimatePresence>
        {isCardZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setIsCardZoomed(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div>
                  <h4 className="text-base font-bold text-gray-800">
                    P.K.S. Construction
                  </h4>
                  <p className="text-xs text-gray-500">
                    Official Registered Visiting Card
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/contactcard.jpeg"
                    download="PKS_Construction_Visiting_Card.jpeg"
                    className="p-2 rounded-lg bg-[var(--color-safety)] text-white hover:bg-[#d04a1f] transition-colors flex items-center gap-1.5 text-xs font-semibold px-3"
                    title="Download card"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsCardZoomed(false)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative w-full aspect-[16/10] bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                <Image
                  src="/contactcard.jpeg"
                  alt="P.K.S. Construction visiting card enlarged"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>

              <p className="mt-4 text-center text-xs text-gray-400 font-mono">
                Press ESC or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}