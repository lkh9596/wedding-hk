"use client";

import { useEffect, useRef, useState } from "react";
import { imageSizes } from "@/lib/imageSizes";
import { useLanguage } from "@/context/LanguageContext";
import Lightbox, { type LightboxPhoto } from "./Lightbox";
import ScrollAnimation from "./ScrollAnimation";

const directionIcons = [
  // Subway
  <svg key="subway" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M8 18l-2 2M16 18l2 2M12 2C8 2 5 3.5 5 6v8c0 2 2 4 4 4h6c2 0 4-2 4-4V6c0-2.5-3-4-7-4z" /><circle cx="9" cy="13" r="1.5" /><circle cx="15" cy="13" r="1.5" /><path d="M7 8h10" /></svg>,
  // Car
  <svg key="car" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17v2m14-2v2" /><circle cx="7.5" cy="13.5" r="1.5" /><circle cx="16.5" cy="13.5" r="1.5" /></svg>,
  // Entrance
  <svg key="entrance" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M3 21V5a2 2 0 012-2h8a2 2 0 012 2v16M15 12h6m0 0l-3-3m3 3l-3 3M9 12h.01" /></svg>,
];

export default function Venue() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  async function copyAddress() {
    const address = t.venue.koreanAddress;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(address);
    } catch {
      const previousFocus = document.activeElement as HTMLElement | null;
      const textarea = document.createElement("textarea");
      textarea.value = address;
      textarea.readOnly = true;
      textarea.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, address.length);
      try {
        if (!document.execCommand("copy")) return;
      } catch {
        return;
      } finally {
        textarea.remove();
        previousFocus?.focus({ preventScroll: true });
      }
    }
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  }

  const [showLine2, setShowLine2] = useState(false);
  const [showLine7, setShowLine7] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxPhoto | null>(null);

  return (
    <section id="venue" className="py-20 sm:py-28 bg-white relative">
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gold-dark mb-3">
              {t.venue.subtitle}
            </p>
            <h2
              className="text-3xl sm:text-5xl text-burgundy"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.venue.title}
            </h2>
            <div className="section-divider mt-6" />
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-16">
          {/* Venue Info */}
          <ScrollAnimation animation="animate-on-scroll animate-slide-left">
            <div className="bg-cream rounded-xl p-6 sm:p-8 border border-gold/15 h-full">
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-gold mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <h3
                  className="text-2xl text-burgundy mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t.venue.name}
                </h3>
                <p className="text-warm-gray leading-relaxed">
                  {t.venue.address}
                </p>
                <div className="mt-4 rounded-lg bg-white/70 p-3">
                  <p className="text-xs text-warm-gray mb-2">{t.venue.koreanAddressLabel}</p>
                  <p lang="ko" className="text-sm text-burgundy leading-relaxed">{t.venue.koreanAddress}</p>
                  <button type="button" onClick={copyAddress} className="mt-2 rounded-full border border-gold/40 px-3 py-1 text-sm text-burgundy hover:bg-cream cursor-pointer">
                    <span aria-live="polite">{copied ? t.venue.copied : t.venue.copyAddress}</span>
                  </button>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href="https://map.naver.com/p/search/KU컨벤션웨딩홀"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg border border-gold/40 text-burgundy text-sm font-medium hover:bg-gold hover:text-white transition-colors"
                  >
                    Naver Map
                  </a>
                  <a
                    href="https://map.kakao.com/link/to/KU컨벤션웨딩홀,37.5383,127.0746"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg border border-gold/40 text-burgundy text-sm font-medium hover:bg-gold hover:text-white transition-colors"
                  >
                    Kakao Map
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=KU+Convention+Wedding+Hall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg border border-gold/40 text-burgundy text-sm font-medium hover:bg-gold hover:text-white transition-colors"
                  >
                    Google Maps
                  </a>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Map Placeholder */}
          <ScrollAnimation animation="animate-on-scroll animate-slide-right">
            <div className="bg-cream rounded-xl border border-gold/15 overflow-hidden h-full min-h-[280px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.7113307966206!2d127.0746261!3d37.53830149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4e7ac7792b9%3A0xeaff884567b6775a!2sKU%20Convention%20Wedding%20Hall!5e0!3m2!1sen!2skr!4v1773741385700!5m2!1sen!2skr"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollAnimation>
        </div>

        {/* Directions */}
        <ScrollAnimation>
          <div className="text-center mb-10">
            <h3
              className="text-2xl sm:text-3xl text-burgundy"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.venue.directionsTitle}
            </h3>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {t.venue.directions.map((dir, index) => {
            const dirPhotos: Record<number, string[]> = {
              0: ['/line2-2.webp'],
              1: ['/line7-1.webp'],
              2: ['/dir-car1.webp'],
              3: ['/dir-car2.webp'],
              4: ['/dir-entrance.webp'],
            };
            const photos = dirPhotos[index];

            return (
              <ScrollAnimation
                key={index}
                animation="animate-on-scroll animate-scale-in"
              >
                <div className="bg-cream rounded-xl border border-gold/15 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  {photos ? (
                    <div>
                      {photos.map((src, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`${t.common.enlarge}: ${dir.label}`}
                          onClick={(event) => setLightbox({ trigger: event.currentTarget, src, alt: dir.label })}
                          className="block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy focus-visible:-outline-offset-2"
                        >
                          <img
                            src={src}
                            alt={dir.label}
                            className="w-full object-cover"
                            style={{ height: "180px" }}
                            {...imageSizes[src]}
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-burgundy/5 to-gold/10 flex flex-col items-center justify-center p-4">
                      <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center text-burgundy/60 mb-3">
                        {directionIcons[index]}
                      </div>
                      <span
                        className="text-sm font-semibold text-burgundy/70 tracking-wider uppercase"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {dir.label}
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-sm font-semibold text-burgundy mb-1 text-center" style={{ fontFamily: "var(--font-heading)" }}>
                      {dir.label}
                    </p>
                    <p className="text-sm text-warm-gray text-center leading-relaxed whitespace-pre-line">
                      {dir.caption}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* Walking Guide - Line 2 */}
        <ScrollAnimation>
          <div className="mt-16 max-w-md mx-auto">
            <button
              onClick={() => setShowLine2(!showLine2)}
              className="w-full bg-cream rounded-xl border border-gold/15 px-5 py-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-left">
                <h3
                  className="text-lg text-burgundy"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t.venue.walkingGuideTitle}
                </h3>
                <p className="text-xs text-warm-gray mt-1">{t.venue.walkingGuideSubtitle}</p>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gold shrink-0 ml-3 transition-transform duration-300"
                style={{ transform: showLine2 ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {showLine2 && (
              <div className="mt-4 space-y-4">
                {[
                  { src: "/line2-1.webp", step: 1 },
                  { src: "/line2-2.webp", step: 2 },
                  { src: "/line2-3.webp", step: 3 },
                  { src: "/line2-4.webp", step: 4 },
                  { src: "/line2-5.webp", step: 5 },
                  { src: "/line2-6.webp", step: 6 },
                ].map(({ src, step }) => (
                  <div key={step} className="bg-cream rounded-xl border border-gold/15 overflow-hidden">
                    <button type="button" aria-label={`${t.common.enlarge}: ${t.venue.line2Steps[step - 1]}`} onClick={(event) => setLightbox({ trigger: event.currentTarget, src, alt: t.venue.line2Steps[step - 1] })} className="block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy focus-visible:-outline-offset-2">
                      <img src={src} alt={`Step ${step}`} className="w-full object-cover" style={{ maxHeight: "250px" }} {...imageSizes[src]} loading="lazy" decoding="async" />
                    </button>
                    <div className="px-4 py-3 flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-burgundy text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {step}
                      </span>
                      <p className="text-sm text-warm-gray leading-relaxed">
                        {t.venue.line2Steps[step - 1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollAnimation>

        {/* Walking Guide - Line 7 */}
        <ScrollAnimation>
          <div className="mt-4 max-w-md mx-auto">
            <button
              onClick={() => setShowLine7(!showLine7)}
              className="w-full bg-cream rounded-xl border border-gold/15 px-5 py-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-left">
                <h3
                  className="text-lg text-burgundy"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t.venue.walkingGuideTitle7}
                </h3>
                <p className="text-xs text-warm-gray mt-1">{t.venue.walkingGuideSubtitle7}</p>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gold shrink-0 ml-3 transition-transform duration-300"
                style={{ transform: showLine7 ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {showLine7 && (
              <div className="mt-4 space-y-4">
                {[
                  { src: "/line7-1.webp", step: 1 },
                  { src: "/line7-2.webp", step: 2 },
                  { src: "/line7-3.webp", step: 3 },
                  { src: "/line7-4.webp", step: 4 },
                  { src: "/line7-5.webp", step: 5 },
                  { src: "/line7-6.webp", step: 6 },
                ].map(({ src, step }) => (
                  <div key={step} className="bg-cream rounded-xl border border-gold/15 overflow-hidden">
                    <button type="button" aria-label={`${t.common.enlarge}: ${t.venue.line7Steps[step - 1]}`} onClick={(event) => setLightbox({ trigger: event.currentTarget, src, alt: t.venue.line7Steps[step - 1] })} className="block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy focus-visible:-outline-offset-2">
                      <img src={src} alt={`Step ${step}`} className="w-full object-cover" style={{ maxHeight: "250px" }} {...imageSizes[src]} loading="lazy" decoding="async" />
                    </button>
                    <div className="px-4 py-3 flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-burgundy text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {step}
                      </span>
                      <p className="text-sm text-warm-gray leading-relaxed">
                        {t.venue.line7Steps[step - 1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="mt-10 text-center">
            <p className="text-sm text-warm-gray bg-cream rounded-lg px-6 py-4 inline-block border border-gold/15">
              📱 {t.venue.mapTip}
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
