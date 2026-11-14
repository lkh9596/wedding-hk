"use client";

import { imageSizes } from "@/lib/imageSizes";
import { useLanguage } from "@/context/LanguageContext";

const googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE"
  + "&text=" + encodeURIComponent("Ken & Man Man's Wedding")
  + "&dates=" + encodeURIComponent("20270403T072000Z/20270403T085000Z")
  + "&location=" + encodeURIComponent("KU Convention Wedding Hall, 5 Achasan-ro 36-gil, Gwangjin-gu, Seoul, South Korea")
  + "&details=" + encodeURIComponent("Ceremony 4:20 PM (Korea time). Please arrive by 3:50 PM. https://kenkenandmanman.com");

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy via-burgundy-light to-burgundy">
        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #D4AF37 1px, transparent 1px), radial-gradient(circle at 75% 75%, #D4AF37 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto pt-24 pb-12">
        {/* Couple photo */}
        <div className="mx-auto mb-8 w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-gold/60 overflow-hidden animate-float">
          <img
            src="/hero.webp"
            alt="Ken & Man Man"
            className="w-full h-full object-cover"
            {...imageSizes["/hero.webp"]}
            fetchPriority="high"
          />
        </div>

        {/* Tagline */}
        <p
          className="text-sm sm:text-base tracking-[0.3em] uppercase text-gold-light mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {t.hero.tagline}
        </p>

        {/* Names */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl mb-4 leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="block">{t.hero.groom}</span>
          <span className="text-gold text-3xl sm:text-4xl md:text-5xl my-2 block">
            {t.hero.and}
          </span>
          <span className="block">{t.hero.bride}</span>
        </h1>

        {/* Date */}
        <div className="mt-6 mb-8">
          <div className="inline-block border border-gold/40 px-6 sm:px-10 py-3 rounded-sm">
            <p
              className="text-lg sm:text-xl tracking-[0.2em] text-gold-light"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.hero.date}
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-white/90">{t.hero.details}</p>
        <div className="mt-5">
          <p className="text-xs tracking-wider text-gold-light mb-3">{t.hero.addToCalendar}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold-light/70 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors">
              {t.hero.googleCalendar}
            </a>
            <a href="/wedding.ics" className="rounded-full border border-gold-light/70 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors">
              {t.hero.appleOutlook}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 motion-safe:animate-bounce">
          <p className="text-xs tracking-[0.2em] uppercase text-white/50 mb-3">
            {t.hero.scrollDown}
          </p>
          <svg
            className="w-5 h-5 mx-auto text-gold/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
