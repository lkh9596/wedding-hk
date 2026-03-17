"use client";

import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "./ScrollAnimation";

export default function OurStory() {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gold mb-3">
              {t.story.subtitle}
            </p>
            <h2
              className="text-3xl sm:text-5xl text-burgundy"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.story.title}
            </h2>
            <div className="section-divider mt-6" />
          </div>
        </ScrollAnimation>

        {/* Decorative heart */}
        <ScrollAnimation animation="animate-on-scroll animate-scale-in">
          <div className="flex justify-center mb-12">
            <div className="w-24 h-24 rounded-full bg-cream border-2 border-gold/30 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-burgundy/60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </ScrollAnimation>

        <div className="space-y-6 sm:space-y-8">
          {t.story.paragraphs.map((paragraph, index) => (
            <ScrollAnimation
              key={index}
              animation={`animate-on-scroll ${index % 2 === 0 ? "animate-slide-left" : "animate-slide-right"}`}
            >
              <p
                className="text-base sm:text-lg leading-relaxed text-warm-gray text-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {paragraph}
              </p>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
