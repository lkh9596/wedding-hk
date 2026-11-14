"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import { imageSizes } from "@/lib/imageSizes";

export interface LightboxPhoto {
  src: string;
  alt: string;
  trigger: HTMLButtonElement;
}

export default function Lightbox({ src, alt, trigger, onClose }: LightboxPhoto & { onClose: () => void }) {
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [trigger]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "Tab") {
        // The close button is the dialog's only focusable control.
        event.preventDefault();
        closeRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // A portal keeps the dialog outside animated ancestors and their stacking contexts.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t.common.enlarge}: ${alt}`}
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label={t.common.close}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/40 text-white text-3xl cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
        onClick={onClose}
      >
        &times;
      </button>
      <img
        src={src}
        alt={alt}
        {...imageSizes[src]}
        loading="lazy"
        decoding="async"
        className="max-w-full max-h-[85dvh] w-auto h-auto object-contain rounded-lg"
      />
    </div>,
    document.body,
  );
}
