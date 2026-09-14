"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  HardHat,
  Sparkles,
} from "lucide-react";

interface ConstructionVideo {
  id: string;
  src: string;
  title: string;
  phase: string;
  plot: string;
  description: string;
  badge: string;
}

const VIDEOS: ConstructionVideo[] = [
  {
    id: "reel-1",
    src: "/constructions/construction-1.mp4",
    title: "Structural Slab & Column Casting",
    phase: "Superstructure Phase",
    plot: "Plot 38",
    description: "High-grade concrete pouring and column beam alignment under expert site supervision.",
    badge: "Active Pour",
  },
  {
    id: "reel-2",
    src: "/constructions/construction-2.mp4",
    title: "Reinforced Steel Bar Framework",
    phase: "Foundation & Framing",
    plot: "Plot 44",
    description: "Precision rebar binding and vibration compacting to guarantee earthquake resistance.",
    badge: "Steel Binding",
  },
  {
    id: "reel-3",
    src: "/constructions/construction-3.mp4",
    title: "Brickwork & Exterior Architecture",
    phase: "Masonry & Walling",
    plot: "Plot 268",
    description: "Level plumb-line masonry using premium fly-ash red brick mix for maximum thermal insulation.",
    badge: "Masonry",
  },
  {
    id: "reel-4",
    src: "/constructions/construction-4.mp4",
    title: "Finishing & Quality Inspection",
    phase: "Finishing Phase",
    plot: "Plot 21",
    description: "Plaster curing, lintel inspection, and surface preparation before turnkey handover.",
    badge: "QC Inspection",
  },
];

export function VideoShowcase() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playingMap, setPlayingMap] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [modalPlaying, setModalPlaying] = useState<boolean>(true);
  const [modalMuted, setModalMuted] = useState<boolean>(false);
  const [modalProgress, setModalProgress] = useState<number>(0);

  const activeIndex = VIDEOS.findIndex((v) => v.id === activeModalId);
  const activeVideo = activeIndex >= 0 ? VIDEOS[activeIndex] : null;

  // Sync mute state to all inline video elements
  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video) video.muted = isMuted;
    });
  }, [isMuted]);

  // Handle keyboard shortcuts for modal viewer
  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModalId(null);
      if (e.key === "ArrowLeft") {
        setActiveModalId(VIDEOS[(activeIndex - 1 + VIDEOS.length) % VIDEOS.length].id);
      }
      if (e.key === "ArrowRight") {
        setActiveModalId(VIDEOS[(activeIndex + 1) % VIDEOS.length].id);
      }
      if (e.key === " ") {
        e.preventDefault();
        toggleModalPlay();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo, activeIndex]);

  const toggleInlinePlay = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setPlayingMap((prev) => ({ ...prev, [id]: true }));
    } else {
      video.pause();
      setPlayingMap((prev) => ({ ...prev, [id]: false }));
    }
  };

  const openModal = (id: string) => {
    setActiveModalId(id);
    setModalPlaying(true);
    setModalMuted(false);
    setModalProgress(0);
  };

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play().catch(() => {});
      setModalPlaying(true);
    } else {
      modalVideoRef.current.pause();
      setModalPlaying(false);
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    const nextMuted = !modalVideoRef.current.muted;
    modalVideoRef.current.muted = nextMuted;
    setModalMuted(nextMuted);
  };

  const handleModalTimeUpdate = () => {
    if (!modalVideoRef.current) return;
    const progress =
      (modalVideoRef.current.currentTime / (modalVideoRef.current.duration || 1)) * 100;
    setModalProgress(progress);
  };

  return (
    <section
      id="construction-videos"
      className="relative py-20 md:py-28 bg-[var(--color-concrete)] overflow-hidden border-t border-[var(--color-steel)]/10"
    >
      {/* Subtle blueprint grid overlay for architectural context */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[var(--color-blueprint)]/10 border border-[var(--color-blueprint)]/20 text-[var(--color-blueprint)] font-mono text-xs font-semibold tracking-wider uppercase">
              <HardHat className="w-3.5 h-3.5 text-[var(--color-safety)]" />
              <span>Live Site Work</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-charcoal)]">
              Construction in action
            </h2>
            <p className="mt-4 text-base md:text-lg text-[var(--color-steel)] leading-relaxed">
              Real-time progress reels straight from our residential project sites at Gaur Yamuna City. Watch the standard of craftsmanship we put into every foundation, pillar, and brick.
            </p>
          </div>

          {/* Audio toggle banner & Reel indicator */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setIsMuted((m) => !m)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--color-steel)]/30 bg-[var(--color-off-white)]/80 text-[var(--color-charcoal)] font-mono text-xs uppercase tracking-wider hover:border-[var(--color-charcoal)] hover:bg-white shadow-xs transition-all duration-200"
              title={isMuted ? "Unmute all preview reels" : "Mute preview reels"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-[var(--color-safety)]" />
                  <span>Unmute Preview</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[var(--color-blueprint)] animate-pulse" />
                  <span>Audio Playing</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 9:16 Video Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
          {VIDEOS.map((item, index) => {
            const isPlaying = playingMap[item.id] ?? false;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-[var(--color-charcoal)] shadow-lg hover:shadow-2xl transition-all duration-500 border border-[var(--color-steel)]/20 hover:border-[var(--color-safety)]/60 flex flex-col"
              >
                {/* 9:16 aspect ratio container */}
                <div
                  className="relative w-full aspect-[9/16] cursor-pointer overflow-hidden bg-black flex items-center justify-center"
                  onClick={() => openModal(item.id)}
                  onMouseEnter={() => {
                    const video = videoRefs.current[item.id];
                    if (video && video.paused) {
                      video.play().catch(() => {});
                      setPlayingMap((p) => ({ ...p, [item.id]: true }));
                    }
                  }}
                  onMouseLeave={() => {
                    const video = videoRefs.current[item.id];
                    if (video && !video.paused) {
                      video.pause();
                      setPlayingMap((p) => ({ ...p, [item.id]: false }));
                    }
                  }}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[item.id] = el;
                    }}
                    src={item.src}
                    playsInline
                    loop
                    muted={isMuted}
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle top & bottom shadow gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-black/20 to-black/60 pointer-events-none transition-opacity duration-300 group-hover:opacity-85" />

                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md font-mono text-[10px] tracking-widest text-[var(--color-off-white)] border border-white/10 uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-safety)] animate-ping" />
                      {item.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[var(--color-safety)] text-[var(--color-charcoal)] font-mono text-[10px] font-bold uppercase tracking-wider">
                      {item.plot}
                    </span>
                  </div>

                  {/* Central Play/Pause Watermark Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isPlaying ? 0.8 : 1,
                        opacity: isPlaying ? 0 : 0.9,
                      }}
                      transition={{ duration: 0.2 }}
                      className="w-14 h-14 rounded-full bg-[var(--color-charcoal)]/80 backdrop-blur-md border border-[var(--color-off-white)]/30 flex items-center justify-center text-white shadow-xl group-hover:border-[var(--color-safety)] group-hover:scale-110"
                    >
                      <Play className="w-6 h-6 fill-current text-[var(--color-off-white)] translate-x-0.5" />
                    </motion.div>
                  </div>

                  {/* Bottom Content / Info Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end z-20 pointer-events-auto">
                    <p className="font-mono text-[11px] tracking-wider uppercase text-[var(--color-safety)] font-semibold mb-1">
                      {item.phase}
                    </p>
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-2 drop-shadow-sm group-hover:text-[var(--color-gold)] transition-colors">
                      {item.title}
                    </h3>

                    {/* Micro buttons bar on card footer */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/15">
                      <button
                        type="button"
                        onClick={(e) => toggleInlinePlay(item.id, e)}
                        className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
                        aria-label={isPlaying ? "Pause reel" : "Play reel"}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 text-[var(--color-safety)]" />
                            <span className="font-mono text-[10px] uppercase">Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 text-[var(--color-safety)]" />
                            <span className="font-mono text-[10px] uppercase">Preview</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(item.id);
                        }}
                        className="p-1.5 rounded-md bg-white/10 hover:bg-[var(--color-safety)] hover:text-[var(--color-charcoal)] text-white transition-all duration-200"
                        title="Watch Full Reel"
                        aria-label="Expand reel"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen 9:16 Video Modal Viewer */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeVideo.title} reel viewer`}
            onClick={() => setActiveModalId(null)}
          >
            <div
              className="relative flex h-full w-full max-w-5xl flex-col lg:flex-row items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalId(null)}
                className="absolute top-0 right-0 z-30 p-2.5 rounded-full bg-[var(--color-charcoal)]/80 text-white hover:bg-[var(--color-safety)] hover:text-[var(--color-charcoal)] border border-white/20 transition-colors shadow-lg"
                aria-label="Close reel viewer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Buttons (Floating on desktop) */}
              <button
                type="button"
                onClick={() =>
                  setActiveModalId(
                    VIDEOS[(activeIndex - 1 + VIDEOS.length) % VIDEOS.length].id
                  )
                }
                className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[var(--color-charcoal)]/80 text-white hover:bg-[var(--color-safety)] hover:text-[var(--color-charcoal)] border border-white/20 transition-all shadow-xl hover:scale-110"
                aria-label="Previous reel"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveModalId(
                    VIDEOS[(activeIndex + 1) % VIDEOS.length].id
                  )
                }
                className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[var(--color-charcoal)]/80 text-white hover:bg-[var(--color-safety)] hover:text-[var(--color-charcoal)] border border-white/20 transition-all shadow-xl hover:scale-110"
                aria-label="Next reel"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* 9:16 Video Player Container */}
              <div className="relative h-[min(75vh,680px)] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/15 flex items-center justify-center">
                <video
                  ref={modalVideoRef}
                  key={activeVideo.id}
                  src={activeVideo.src}
                  autoPlay
                  playsInline
                  loop
                  muted={modalMuted}
                  onTimeUpdate={handleModalTimeUpdate}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={toggleModalPlay}
                />

                {/* Progress bar at top/bottom of the reel */}
                <div className="absolute top-0 inset-x-0 h-1 bg-white/20 z-20">
                  <div
                    className="h-full bg-[var(--color-safety)] transition-all duration-100 ease-linear"
                    style={{ width: `${modalProgress}%` }}
                  />
                </div>

                {/* Center overlay play icon when paused */}
                {!modalPlaying && (
                  <div
                    onClick={toggleModalPlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-[var(--color-charcoal)]/90 border border-white/30 flex items-center justify-center text-white shadow-2xl">
                      <Play className="w-7 h-7 fill-current translate-x-0.5 text-[var(--color-safety)]" />
                    </div>
                  </div>
                )}

                {/* Video controls bottom bar */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between z-20">
                  <button
                    type="button"
                    onClick={toggleModalPlay}
                    className="p-2 text-white hover:text-[var(--color-safety)] transition-colors"
                    aria-label={modalPlaying ? "Pause video" : "Play video"}
                  >
                    {modalPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleModalMute}
                      className="p-2 text-white hover:text-[var(--color-safety)] transition-colors"
                      aria-label={modalMuted ? "Unmute sound" : "Mute sound"}
                    >
                      {modalMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-[var(--color-safety)]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Reel Meta Sidebar */}
              <div className="w-full max-w-sm flex flex-col justify-center text-left bg-[var(--color-charcoal)]/90 p-6 rounded-2xl border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-safety)]">
                    Reel 0{activeIndex + 1} / 0{VIDEOS.length}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-blueprint)]/60 text-white font-mono text-[10px] tracking-wider uppercase">
                    {activeVideo.plot}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  {activeVideo.title}
                </h3>

                <p className="font-mono text-xs text-[var(--color-steel)] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-safety)]" />
                  {activeVideo.phase} • Gaur Yamuna City
                </p>

                <p className="text-sm text-[var(--color-off-white)]/80 leading-relaxed mb-6">
                  {activeVideo.description}
                </p>

                {/* Mobile Navigation Buttons */}
                <div className="flex lg:hidden items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveModalId(
                        VIDEOS[(activeIndex - 1 + VIDEOS.length) % VIDEOS.length].id
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-white/20 text-xs font-mono uppercase text-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveModalId(
                        VIDEOS[(activeIndex + 1) % VIDEOS.length].id
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[var(--color-safety)] text-[var(--color-charcoal)] text-xs font-mono uppercase font-bold hover:brightness-110 transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
