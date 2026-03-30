"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { GalleryImage } from "@/components/gallery/gallery-data";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

interface LightboxContextType {
  open: (slides: GalleryImage[], index?: number) => void;
  close: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [slides, setSlides] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((newSlides: GalleryImage[], index = 0) => {
    setSlides(newSlides);
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      <GalleryLightbox
        isOpen={isOpen}
        close={close}
        slides={slides}
        initialIndex={currentIndex}
      />
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return context;
}
