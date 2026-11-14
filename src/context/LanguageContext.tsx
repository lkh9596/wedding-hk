"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import en from "@/translations/en.json";
import zhHK from "@/translations/zh-HK.json";

type Locale = "en" | "zh-HK";

type Translations = typeof en;

const translationMap: Record<Locale, Translations> = {
  en,
  "zh-HK": zhHK as unknown as Translations,
};

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [{ locale, initialized }, setLanguage] = useState<{ locale: Locale; initialized: boolean }>({
    locale: "en",
    initialized: false,
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("lang");
    let selected: Locale | undefined;
    if (query && ["zh", "zh-HK", "zh-hk", "hk"].includes(query)) selected = "zh-HK";
    if (query === "en") selected = "en";
    if (!selected) {
      try {
        const saved = localStorage.getItem("locale");
        if (saved === "en" || saved === "zh-HK") selected = saved;
      } catch {
        // Storage can be unavailable in in-app browsers.
      }
    }
    selected ??= navigator.language.toLowerCase().startsWith("zh") ? "zh-HK" : "en";
    // Browser preferences must be read after hydration to match the English static HTML.
    setLanguage({ locale: selected, initialized: true });
  }, []);

  useEffect(() => {
    if (!initialized) return;
    document.documentElement.lang = locale;
    try {
      localStorage.setItem("locale", locale);
    } catch {
      // The language still works when storage is blocked.
    }
  }, [locale, initialized]);

  const toggleLocale = useCallback(() => {
    setLanguage((prev) => ({ locale: prev.locale === "en" ? "zh-HK" : "en", initialized: true }));
  }, []);

  const value: LanguageContextType = {
    locale,
    t: translationMap[locale],
    toggleLocale,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
