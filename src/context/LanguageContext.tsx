"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
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
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "zh-HK" : "en"));
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
