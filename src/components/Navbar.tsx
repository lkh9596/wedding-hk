"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { t, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: t.nav.home },
    { href: "#story", label: t.nav.story },
    { href: "#schedule", label: t.nav.schedule },
    { href: "#venue", label: t.nav.venue },
    { href: "#dress-code", label: t.nav.dressCode },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className={`font-[var(--font-heading)] text-lg sm:text-xl tracking-wide transition-colors duration-300 ${
            scrolled ? "text-burgundy" : "text-white"
          }`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          K & M
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wider uppercase transition-colors duration-300 hover:text-gold ${
                scrolled ? "text-warm-gray" : "text-white/90"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleLocale}
            className={`ml-2 px-3 py-1.5 rounded-full text-sm border transition-all duration-300 cursor-pointer ${
              scrolled
                ? "border-gold text-gold hover:bg-gold hover:text-white"
                : "border-white/60 text-white hover:bg-white/20"
            }`}
          >
            {t.lang.switch}
          </button>
        </div>

        {/* Mobile: language toggle + hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleLocale}
            className={`px-3 py-1 rounded-full text-xs border transition-all duration-300 cursor-pointer ${
              scrolled
                ? "border-gold text-gold"
                : "border-white/60 text-white"
            }`}
          >
            {t.lang.switch}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-1 cursor-pointer ${scrolled ? "text-burgundy" : "text-white"}`}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md shadow-lg border-t border-gold/20">
          <div className="flex flex-col py-4 px-6 gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-warm-gray text-sm tracking-wider uppercase py-2 border-b border-cream hover:text-burgundy transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
