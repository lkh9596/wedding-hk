"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "./ScrollAnimation";

const WEDDING_DATE = new Date("2027-04-03T16:20:00+09:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [hasPassed, setHasPassed] = useState(false);

  useEffect(() => {
    function calculate() {
      const now = Date.now();
      const diff = WEDDING_DATE - now;

      if (diff <= 0) {
        setHasPassed(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  const blocks = timeLeft
    ? [
        { value: timeLeft.days, label: t.countdown.days },
        { value: timeLeft.hours, label: t.countdown.hours },
        { value: timeLeft.minutes, label: t.countdown.minutes },
        { value: timeLeft.seconds, label: t.countdown.seconds },
      ]
    : [];

  return (
    <section className="py-20 sm:py-28 bg-cream relative overflow-hidden">
      {/* Decorative bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <ScrollAnimation>
          <h2
            className="text-3xl sm:text-4xl text-burgundy mb-12"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t.countdown.title}
          </h2>
        </ScrollAnimation>

        {hasPassed ? (
          <ScrollAnimation>
            <p
              className="text-2xl text-gold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.countdown.passed}
            </p>
          </ScrollAnimation>
        ) : timeLeft ? (
          <ScrollAnimation className="stagger-children">
            <div className="flex justify-center gap-4 sm:gap-8">
              {blocks.map((block) => (
                <div key={block.label}>
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-lg shadow-lg border border-gold/20 flex items-center justify-center mb-3">
                    <span
                      className="text-3xl sm:text-5xl text-burgundy font-light"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {String(block.value).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-warm-gray">
                    {block.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        ) : null}

        <div className="section-divider mt-16" />
      </div>
    </section>
  );
}
