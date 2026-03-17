"use client";

import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "./ScrollAnimation";

const icons = [
  // Guest Arrival - champagne glass
  <svg key="arrival" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 13V6a1 1 0 011-1h12a1 1 0 011 1v7" /></svg>,
  // Ceremony - rings
  <svg key="ceremony" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><circle cx="9" cy="12" r="5" /><circle cx="15" cy="12" r="5" /></svg>,
  // Photos - camera
  <svg key="photos" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>,
  // Cocktails - glass
  <svg key="cocktails" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 5l9 8 9-8" /><path d="M12 13v4" /></svg>,
  // Dinner - utensils
  <svg key="dinner" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M12 3v18M3 12l4-4v8l-4-4zM21 12l-4-4v8l4-4z" /></svg>,
  // Dance - music
  <svg key="dance" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>,
];

export default function Timeline() {
  const { t } = useLanguage();

  return (
    <section
      id="schedule"
      className="py-20 sm:py-28 bg-cream relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gold mb-3">
              {t.timeline.subtitle}
            </p>
            <h2
              className="text-3xl sm:text-5xl text-burgundy"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.timeline.title}
            </h2>
            <div className="section-divider mt-6" />
          </div>
        </ScrollAnimation>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gold/30 sm:-translate-x-px" />

          <div className="space-y-8 sm:space-y-12">
            {t.timeline.events.map((event, index) => (
              <ScrollAnimation
                key={index}
                animation={`animate-on-scroll ${index % 2 === 0 ? "animate-slide-left" : "animate-slide-right"}`}
              >
                <div
                  className={`relative flex items-start gap-4 sm:gap-0 ${
                    index % 2 === 0
                      ? "sm:flex-row"
                      : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-6 sm:left-1/2 w-3 h-3 rounded-full bg-gold border-2 border-cream -translate-x-1.5 sm:-translate-x-1.5 mt-6 z-10" />

                  {/* Content card */}
                  <div className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${index % 2 === 0 ? "sm:pr-0" : "sm:pl-0"}`}>
                    <div className="bg-white rounded-lg p-5 sm:p-6 shadow-sm border border-gold/10 hover:shadow-md hover:border-gold/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-cream flex items-center justify-center text-burgundy shrink-0">
                          {icons[index]}
                        </div>
                        <span
                          className="text-sm text-gold font-semibold tracking-wider"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {event.time}
                        </span>
                      </div>
                      <h3
                        className="text-lg text-burgundy mb-1"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {event.title}
                      </h3>
                      <p className="text-sm text-warm-gray leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
