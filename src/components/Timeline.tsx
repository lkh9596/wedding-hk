"use client";

import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "./ScrollAnimation";

const icons = [
  // Arrival — clock
  <svg key="arrival" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  // Ceremony — rings
  <svg key="ceremony" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><circle cx="9" cy="12" r="5" /><circle cx="15" cy="12" r="5" /></svg>,
  // Dinner — fork and knife
  <svg key="dinner" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M4 3v5a3 3 0 006 0V3M7 3v18M17 13h3V3c-4 2-5 7-3 10zm0 0v8" /></svg>,
  // Closing — heart
  <svg key="closing" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0l-1 1-1-1a5.5 5.5 0 00-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 000-7.8z" /></svg>,
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
            <p className="text-sm uppercase tracking-[0.3em] text-gold-dark mb-3">
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
                          className="text-sm text-gold-dark font-semibold tracking-wider"
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
