"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Handing over the construction of my house to P.K.S. was a great decision. They didn't compromise on material quality, and the regular site updates kept my mind at ease even when I couldn't visit.",
    name: "Sanjay Prasad",
    location: "Plot No. 38, Gaur Yamuna City",
  },
  {
    id: 2,
    quote: "Building a house while managing a full-time job is tough, but the team handled everything beautifully. They were totally transparent with the billing and delivered exactly what was promised on the 3D elevation.",
    name: "Amit Chaudhary",
    location: "Plot No. 268, Gaur Yamuna City",
  },
  {
    id: 3,
    quote: "Very professional behavior from day one. The finishing work, especially the tiling and plumbing, is excellent. They are definitely some of the most reliable contractors in the area.",
    name: "Sachin",
    location: "Plot No. 44, Gaur Yamuna City",
  },
  {
    id: 4,
    quote: "What impressed me most was their project management. They completed my home well within the promised timeline without any sudden cost escalations. The entire team is very approachable and listens to feedback.",
    name: "Rajat Dixit",
    location: "Plot No. 21, Gaur Yamuna City",
  },
  {
    id: 5,
    quote: "A genuinely honest construction team. They guided me really well on where we could save money and where we needed to invest for better durability. The house feels incredibly solid.",
    name: "Harsh",
    location: "Plot No. 36, Gaur Yamuna City",
  }
];

const AUTOPLAY_MS = 5000;

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    loop: false,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = requestAnimationFrame(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // autoplay — stops naturally at the end since loop is off, restarts from 0 on next hover-out cycle
  useEffect(() => {
    if (!emblaApi) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || isPaused) return;

    autoplayRef.current = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaApi, isPaused]);

  return (
    <section className="py-20 md:py-24 bg-[var(--color-blueprint)] text-[var(--color-off-white)]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 md:mb-16 gap-6">
          <div>
            <p className="font-mono text-sm tracking-widest text-[var(--color-off-white)]/60 uppercase mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Client feedback
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="p-3 border border-[var(--color-steel)]/30 hover:bg-[var(--color-charcoal)] hover:border-[var(--color-charcoal)] transition-all duration-200 active:scale-90 disabled:opacity-30 disabled:pointer-events-none disabled:hover:bg-transparent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="p-3 border border-[var(--color-steel)]/30 hover:bg-[var(--color-charcoal)] hover:border-[var(--color-charcoal)] transition-all duration-200 active:scale-90 disabled:opacity-30 disabled:pointer-events-none disabled:hover:bg-transparent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden"
          ref={emblaRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] px-4"
              >
                <div
                  className={`bg-[var(--color-charcoal)] p-8 h-full flex flex-col border-t-4 transition-all duration-500 ${
                    selectedIndex === index
                      ? "border-[var(--color-safety)] opacity-100 scale-100"
                      : "border-[var(--color-safety)]/30 opacity-60 scale-[0.97]"
                  }`}
                >
                  <Quote className="w-8 h-8 text-[var(--color-steel)] mb-6 opacity-50" />
                  <p className="text-lg leading-relaxed flex-grow mb-8">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="font-mono text-xs text-[var(--color-steel)] uppercase mt-1">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {scrollSnaps.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={selectedIndex === index}
                className="p-2 group"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? "w-8 bg-[var(--color-safety)]"
                      : "w-1.5 bg-[var(--color-off-white)]/30 group-hover:bg-[var(--color-off-white)]/60"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}