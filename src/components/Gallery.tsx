"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "./ScrollAnimation";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const photos = [
  `${basePath}/1.jpg`,
  `${basePath}/2.jpg`,
  `${basePath}/3.jpg`,
  `${basePath}/4.jpg`,
  `${basePath}/5.JPG`,
  `${basePath}/6.JPG`,
  `${basePath}/7.JPG`,
  `${basePath}/8.JPG`,
  `${basePath}/9.JPG`,
  `${basePath}/10.JPG`,
];

export default function Gallery() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const cardWidth = el.querySelector("div")?.offsetWidth || 280;
    const gap = 16;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, photos.length - 1));
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth || 280;
    const gap = 16;
    const distance = cardWidth + gap;
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  }

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-cream relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gold mb-3">
              {t.gallery.subtitle}
            </p>
            <h2
              className="text-3xl sm:text-5xl text-burgundy"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.gallery.title}
            </h2>
            <div className="section-divider mt-6" />
          </div>
        </ScrollAnimation>

        <div className="relative">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="hidden sm:flex absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full shadow-md items-center justify-center text-burgundy hover:bg-gold hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="hidden sm:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full shadow-md items-center justify-center text-burgundy hover:bg-gold hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {t.gallery.photos.map((label, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[250px] sm:w-[280px] snap-center"
              >
                <div className="relative rounded-xl overflow-hidden border border-gold/10 hover:shadow-lg transition-shadow duration-300 group">
                  <div className="aspect-[3/4]">
                    <img
                      src={photos[index]}
                      alt={label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span
                      className="text-white text-sm tracking-wider"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {label}
                    </span>
                  </div>
                </div>
                <p
                  className="text-center text-sm text-warm-gray mt-3 tracking-wider"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const card = el.children[index] as HTMLElement;
                  card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeIndex ? "bg-gold w-6" : "bg-gold/30"
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
