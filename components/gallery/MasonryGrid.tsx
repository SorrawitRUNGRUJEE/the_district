"use client";

import MosaicCell from "@/components/gallery/MosaicCell";
import {
  GALLERY_PATTERNS,
  GalleryImages,
  PATTERN_SEQUENCE,
  PatternKey,
} from "@/components/gallery/types";

interface MasonryGridProps {
  images: GalleryImages;
  label: string;
  pattern?: PatternKey;
  index?: number; // Used to auto-select pattern if 'pattern' is not provided
}

export default function MasonryGrid({
  images,
  label,
  pattern,
  index = 0,
}: MasonryGridProps) {
  // Use provided pattern or cycle through the sequence
  const selectedPatternKey =
    pattern || PATTERN_SEQUENCE[index % PATTERN_SEQUENCE.length];
  const currentPattern = GALLERY_PATTERNS[selectedPatternKey];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
      {/* 0: Featured Slot - Slides through featured images */}
      <MosaicCell
        images={images.featured}
        label={label}
        className={currentPattern[0]}
        delay={0}
      />

      {/* 1-5: Gallery Slots - Each slot rotates through a UNIQUE subset of gallery images */}
      {Array.from({ length: 5 }).map((_, i) => {
        // Partition the 10 gallery images: 2 uniquely assigned per slot
        const startIdx = i * 2;
        const slotImages = images.gallery.slice(startIdx, startIdx + 2);

        return (
          <MosaicCell
            key={i}
            images={
              slotImages.length > 0
                ? slotImages
                : [images.gallery[i % images.gallery.length]]
            }
            label={label}
            className={currentPattern[i + 1]}
            delay={(i + 1) * 1200}
          />
        );
      })}
    </div>
  );
}
