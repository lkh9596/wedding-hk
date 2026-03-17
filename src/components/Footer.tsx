"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-burgundy text-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Decorative heart */}
        <div className="mb-6">
          <svg
            className="w-8 h-8 mx-auto text-gold/60"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        <p
          className="text-xl sm:text-2xl mb-3 text-gold-light"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {t.footer.text}
        </p>

        <p className="text-xs tracking-[0.2em] uppercase text-white/40 mt-6">
          {t.footer.madeWith}
        </p>
      </div>
    </footer>
  );
}
