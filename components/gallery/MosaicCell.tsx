"use client";

import { GalleryImage } from "@/components/gallery/gallery-data";
import { useLightbox } from "@/components/ui/LightboxProvider";
import SafeImage from "@/components/ui/SafeImage";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface MosaicCellProps {
  images: GalleryImage[];
  label: string;
  className: string;
  delay?: number;
  allSlides?: GalleryImage[];
  globalOffset?: number;
  groupLabel?: string;
}

export default function MosaicCell({
  images,
  label,
  className,
  delay = 0,
  allSlides = [],
  globalOffset = 0,
  groupLabel,
}: MosaicCellProps) {
  const [index, setIndex] = useState(0);
  const { open } = useLightbox();
  const containerRef = useRef(null);

  // Only rotate images when the cell is in view to save resources
  const isInView = useInView(containerRef);

  useEffect(() => {
    if (images.length <= 1 || !isInView) return;

    const intervalBase = 5000;
    const intervalRandom = Math.random() * 2000;

    const timer = setInterval(
      () => {
        setIndex((prev) => (prev + 1) % images.length);
      },
      intervalBase + intervalRandom + delay,
    );

    return () => clearInterval(timer);
  }, [images, delay, isInView]);

  const handleOpenLightbox = () => {
    if (allSlides.length > 0) {
      // Calculate global index: start of this cell's group + current rotating index
      open(allSlides, globalOffset + index);
    }
  };

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label={`View ${label} gallery`}
      className={`relative group overflow-hidden rounded-xs bg-surface shadow-sm transition-all duration-500 hover:z-10 hover:shadow-brand/20 hover:shadow-xl hover:scale-[1.01] cursor-pointer ${className}`}
      onClick={handleOpenLightbox}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleOpenLightbox();
        }
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={images[index].src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <SafeImage
            src={images[index].src}
            alt={`${label} - Image ${index + 1}`}
            className="transition-transform duration-700 group-hover:scale-105"
            lightbox={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Elegant Group Label (e.g. District A) */}
      <AnimatePresence>
        {groupLabel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-20 px-3 md:px-4 h-7 md:h-8 flex items-center justify-center bg-surface/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg"
          >
            <span className="text-brand font-black uppercase text-[9px] md:text-[10px] tracking-[0.2em] whitespace-nowrap leading-none pb-px">
              {groupLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
