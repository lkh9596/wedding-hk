"use client";

import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "./ScrollAnimation";

export default function DressCode() {
  const { t } = useLanguage();

  return (
    <section
      id="dress-code"
      className="py-20 sm:py-28 bg-gradient-to-b from-burgundy to-burgundy-light relative overflow-hidden"
    >
      {/* Decorative overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #D4AF37 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
        <ScrollAnimation>
          <p className="text-sm uppercase tracking-[0.3em] text-gold-light mb-3">
            {t.dressCode.subtitle}
          </p>
          <h2
            className="text-3xl sm:text-5xl mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t.dressCode.title}
          </h2>
          <div className="w-20 h-px bg-gold mx-auto mb-10" />
        </ScrollAnimation>

        <ScrollAnimation animation="animate-on-scroll animate-scale-in">
          <div className="inline-block mb-8">
            <div className="border-2 border-gold/40 rounded-lg px-8 sm:px-12 py-5">
              <p
                className="text-xl sm:text-2xl text-gold-light tracking-wider"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t.dressCode.code}
              </p>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <p className="text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto text-base sm:text-lg">
            {t.dressCode.description}
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="animate-on-scroll animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gold/20 text-left max-w-xl mx-auto">
            <h4
              className="text-lg text-gold-light mb-4 text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.dressCode.suggestions.title}
            </h4>
            <ul className="space-y-3">
              {t.dressCode.suggestions.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gold mt-1 shrink-0">&#10047;</span>
                  <span className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollAnimation>

        {/* Dress code example photos */}
        <ScrollAnimation>
          <div className="mt-10 max-w-md mx-auto space-y-4">
            <p className="text-gold-light text-sm mb-2 tracking-wider text-center" style={{ fontFamily: "var(--font-heading)" }}>
              {t.dressCode.suggestions.items[0]?.split(":")[0]}
            </p>
            <div className="rounded-lg overflow-hidden border border-gold/20">
              <img src="/dress-f1.jpg" alt="Ladies example 1" className="w-full object-contain" />
            </div>
            <div className="rounded-lg overflow-hidden border border-gold/20">
              <img src="/dress-f2.jpg" alt="Ladies example 2" className="w-full object-contain" />
            </div>
            <p className="text-gold-light text-sm mb-2 mt-6 tracking-wider text-center" style={{ fontFamily: "var(--font-heading)" }}>
              {t.dressCode.suggestions.items[1]?.split(":")[0]}
            </p>
            <div className="rounded-lg overflow-hidden border border-gold/20">
              <img src="/dress-m1.jpg" alt="Gentlemen example 1" className="w-full object-contain" />
            </div>
            <div className="rounded-lg overflow-hidden border border-gold/20">
              <img src="/dress-m2.jpg" alt="Gentlemen example 2" className="w-full object-contain" />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
