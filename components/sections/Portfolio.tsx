"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from "lucide-react";

type Status = "Completed" | "Ongoing";

type PortfolioItem = {
  id: string;
  image: string;
  status: Status;
  title: string;
  plot?: string;
  location?: string;
  duration?: string;
};

// TODO: fill in real plot size / location / duration per project as you have them.
// Title/status are inferred from filename; everything else is optional and only
// renders if provided, so it's safe to leave blank until confirmed.
// TODO: fill in real plot size / duration per project as you have them.
// Location is set for all — every photo is from Gaur Yamuna City.
// Plot is intentionally left blank for now; the card only shows a "Plot"
// row/label when it has a value, so it stays hidden until you fill it in.
const portfolioItems: PortfolioItem[] = [
  { id: "finished-1", image: "/constructions/finished-1.jpeg", status: "Completed", title: "Completed Residence", location: "Gaur Yamuna City",plot: "57" },
  { id: "finished-2", image: "/constructions/finished-2.jpeg", status: "Completed", title: "Completed Residence", location: "Gaur Yamuna City",plot: "16" },
  { id: "finished-3", image: "/constructions/finished-3.jpeg", status: "Completed", title: "Completed Residence", location: "Gaur Yamuna City",plot: "21" },
  { id: "finished-4", image: "/constructions/finished-4.jpeg", status: "Completed", title: "Completed Residence", location: "Gaur Yamuna City",plot: "22" },
  { id: "underconstruction-1", image: "/constructions/underconstruction-1.jpeg", status: "Ongoing", title: "Under Construction", location: "Gaur Yamuna City",plot: "44" },
  { id: "underconstruction-2", image: "/constructions/underconstruction-2.jpeg", status: "Ongoing", title: "Under Construction", location: "Gaur Yamuna City",plot: "42" },
  { id: "underconstruction-3", image: "/constructions/underconstruction-3.jpeg", status: "Ongoing", title: "Under Construction", location: "Gaur Yamuna City",plot: "268" },
  { id: "underconstruction-4", image: "/constructions/underconstruction-4.jpeg", status: "Ongoing", title: "Under Construction", location: "Gaur Yamuna City",plot: "38" },
  { id: "underconstruction-5", image: "/constructions/underconstruction-5.jpeg", status: "Ongoing", title: "Under Construction", location: "Gaur Yamuna City",plot: "36" },
];

const filters: Array<"All" | Status> = ["All", "Completed", "Ongoing"];

export function Portfolio() {
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");

  const visibleItems = useMemo(
    () =>
      filter === "All"
        ? portfolioItems
        : portfolioItems.filter((item) => item.status === filter),
    [filter]
  );

  const selectedIndex = visibleItems.findIndex((item) => item.id === selectedId);
  const selectedItem = selectedIndex >= 0 ? visibleItems[selectedIndex] : null;

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
      if (event.key === "ArrowLeft") {
        setSelectedId(visibleItems[(selectedIndex - 1 + visibleItems.length) % visibleItems.length].id);
      }
      if (event.key === "ArrowRight") {
        setSelectedId(visibleItems[(selectedIndex + 1) % visibleItems.length].id);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId, selectedIndex, selectedItem, visibleItems]);

  const openViewer = (id: string) => {
    setSelectedId(id);
    setZoom(1);
    setZoomOrigin("50% 50%");
  };

  const changeImage = (direction: -1 | 1) => {
    if (selectedIndex < 0) return;
    const nextIndex = (selectedIndex + direction + visibleItems.length) % visibleItems.length;
    setSelectedId(visibleItems[nextIndex].id);
    setZoom(1);
    setZoomOrigin("50% 50%");
  };

  const updateZoomOrigin = (event: Pick<React.PointerEvent<HTMLDivElement>, "clientX" | "clientY" | "currentTarget">) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  return (
    <section id="portfolio" className="py-20 md:py-24 bg-[var(--color-concrete)]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-sm tracking-widest text-[var(--color-blueprint)] uppercase mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-charcoal)]">
              Built projects
            </h2>
            <p className="mt-4 text-lg text-[var(--color-steel)]">
              A selection of our completed and in-progress residential constructions.
            </p>
          </div>

          <div className="flex gap-2 self-start md:self-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-mono uppercase tracking-wide border transition-all duration-200 ${
                  filter === f
                    ? "bg-[var(--color-charcoal)] text-[var(--color-off-white)] border-[var(--color-charcoal)]"
                    : "bg-transparent text-[var(--color-steel)] border-[var(--color-steel)]/30 hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.button
                key={item.id}
                layout
                type="button"
                onClick={() => openViewer(item.id)}
                aria-label={`Open ${item.title} image`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                className="group relative overflow-hidden bg-[var(--color-charcoal)] text-left aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-safety)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-concrete)]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <span
                  className={`absolute top-4 left-4 z-10 px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase ${
                    item.status === "Ongoing"
                      ? "bg-[var(--color-safety)] text-[var(--color-charcoal)]"
                      : "bg-[var(--color-off-white)]/90 text-[var(--color-charcoal)]"
                  }`}
                >
                  {item.status}
                </span>

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                <div
                  className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--color-off-white)] mb-4">
                    {item.title}
                  </h3>

                  {(item.plot || item.duration || item.location) && (
                    <div className="grid grid-cols-2 gap-4 font-mono text-xs text-[var(--color-off-white)]/80 uppercase">
                      {item.plot && (
                        <div>
                          <span className="block text-[var(--color-safety)] mb-1">Plot No.</span>
                          {item.plot}
                        </div>
                      )}
                      {item.duration && (
                        <div>
                          <span className="block text-[var(--color-safety)] mb-1">Duration</span>
                          {item.duration}
                        </div>
                      )}
                      {item.location && (
                        <div className="col-span-2">
                          <span className="block text-[var(--color-safety)] mb-1">Location</span>
                          {item.location}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-charcoal)]/95 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedItem.title} image viewer`}
            onClick={() => setSelectedId(null)}
          >
            <div
              className="relative flex h-full w-full max-w-7xl flex-col items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-safety)]">
                    {selectedItem.status} / {selectedIndex + 1} of {visibleItems.length}
                  </p>
                  <h3 className="mt-1 truncate text-lg font-bold text-[var(--color-off-white)] sm:text-2xl">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="shrink-0 border border-[var(--color-off-white)]/30 p-2 text-[var(--color-off-white)] transition-colors hover:border-[var(--color-safety)] hover:text-[var(--color-safety)]"
                  aria-label="Close image viewer"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <div
                className={`relative flex h-[min(72vh,680px)] w-full items-center justify-center overflow-hidden ${zoom > 1 ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                onPointerMove={updateZoomOrigin}
                onWheel={(event) => {
                  event.preventDefault();
                  updateZoomOrigin(event);
                  setZoom((current) => Math.min(3, Math.max(1, current + (event.deltaY < 0 ? 0.2 : -0.2))));
                }}
              >
                <motion.div
                  key={selectedItem.id}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    priority
                    className="object-contain"
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: zoomOrigin,
                      transition: "transform 180ms ease-out",
                    }}
                    sizes="100vw"
                  />
                </motion.div>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="grid grid-cols-2 gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wide text-[var(--color-off-white)]/70">
                  {selectedItem.location && (
                    <div className="col-span-2">
                      <span className="mr-2 text-[var(--color-safety)]">Location</span>
                      {selectedItem.location}
                    </div>
                  )}
                  {selectedItem.plot && <div><span className="mr-2 text-[var(--color-safety)]">Plot</span>{selectedItem.plot}</div>}
                  {selectedItem.duration && <div><span className="mr-2 text-[var(--color-safety)]">Duration</span>{selectedItem.duration}</div>}
                </div>

                <div className="flex shrink-0 items-center gap-1 self-end border border-[var(--color-off-white)]/20 bg-[var(--color-charcoal)]/70 p-1 backdrop-blur-sm">
                  <button type="button" onClick={() => changeImage(-1)} className="p-2 text-[var(--color-off-white)] hover:text-[var(--color-safety)]" aria-label="Previous image"><ChevronLeft size={18} aria-hidden="true" /></button>
                  <button type="button" onClick={() => setZoom((current) => Math.max(1, current - 0.25))} className="p-2 text-[var(--color-off-white)] hover:text-[var(--color-safety)]" aria-label="Zoom out"><Minus size={16} aria-hidden="true" /></button>
                  <button type="button" onClick={() => setZoom(1)} className="p-2 text-[var(--color-off-white)] hover:text-[var(--color-safety)]" aria-label="Reset zoom"><RotateCcw size={16} aria-hidden="true" /></button>
                  <span className="min-w-12 text-center font-mono text-[10px] text-[var(--color-off-white)]">{Math.round(zoom * 100)}%</span>
                  <button type="button" onClick={() => setZoom((current) => Math.min(3, current + 0.25))} className="p-2 text-[var(--color-off-white)] hover:text-[var(--color-safety)]" aria-label="Zoom in"><Plus size={16} aria-hidden="true" /></button>
                  <button type="button" onClick={() => changeImage(1)} className="p-2 text-[var(--color-off-white)] hover:text-[var(--color-safety)]" aria-label="Next image"><ChevronRight size={18} aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}