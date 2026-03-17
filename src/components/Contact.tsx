"use client";

import { useLanguage } from "@/context/LanguageContext";
import ScrollAnimation from "./ScrollAnimation";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-gold mb-3">
              {t.contact.subtitle}
            </p>
            <h2
              className="text-3xl sm:text-5xl text-burgundy"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.contact.title}
            </h2>
            <div className="section-divider mt-6" />
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <p className="text-center text-warm-gray mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.contact.description}
          </p>
        </ScrollAnimation>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Groom */}
          <ScrollAnimation animation="animate-on-scroll animate-slide-left">
            <div className="bg-cream rounded-xl p-6 sm:p-8 border border-gold/15 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-20 h-20 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-burgundy/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
                {t.contact.groom.label}
              </p>
              <h3
                className="text-xl text-burgundy mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t.contact.groom.name}
              </h3>
              <div className="space-y-2 text-sm text-warm-gray">
                <p className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {t.contact.groom.phone}
                </p>
                <p className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {t.contact.groom.email}
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Bride */}
          <ScrollAnimation animation="animate-on-scroll animate-slide-right">
            <div className="bg-cream rounded-xl p-6 sm:p-8 border border-gold/15 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-20 h-20 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-burgundy/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
                {t.contact.bride.label}
              </p>
              <h3
                className="text-xl text-burgundy mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t.contact.bride.name}
              </h3>
              <div className="space-y-2 text-sm text-warm-gray">
                <p className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {t.contact.bride.phone}
                </p>
                <p className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {t.contact.bride.email}
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
