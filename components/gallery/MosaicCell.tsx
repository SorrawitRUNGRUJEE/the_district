"use client";

import SafeImage from "@/components/ui/SafeImage";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MosaicCellProps {
  images: string[];
  label: string;
  className: string;
  delay?: number;
}

export default function MosaicCell({
  images,
  label,
  className,
  delay = 0,
}: MosaicCellProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(
      () => {
        setIndex((prev) => (prev + 1) % images.length);
      },
      5000 + Math.random() * 2000 + delay,
    );

    return () => clearInterval(timer);
  }, [images, delay]);

  return (
    <div
      className={`relative group overflow-hidden rounded-xs bg-card shadow-sm transition-all duration-500 hover:z-10 hover:scale-[1.02] ${className}`}
    >
      <AnimatePresence>
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <SafeImage
            src={images[index]}
            alt={`${label} ${index + 1}`}
            className="transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
