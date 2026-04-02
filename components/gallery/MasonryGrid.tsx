"use client";

import { GalleryGroup, GalleryImage } from "@/components/gallery/gallery-data";
import MosaicCell from "@/components/gallery/MosaicCell";
import {
  GALLERY_PATTERNS,
  PATTERN_SEQUENCE,
  PatternKey,
} from "@/components/gallery/types";

interface MasonryGridProps {
  /** Groups assigned to THIS specific grid block (max 6 typically) */
  groups: GalleryGroup[];
  label: string;
  pattern?: PatternKey;
  index?: number;
  /** The full list of all images on the page for the lightbox */
  allSlides: GalleryImage[];
  /** The global index start for the FIRST group in this grid */
  startOffset: number;
}

export default function MasonryGrid({
  groups,
  label,
  pattern,
  index = 0,
  allSlides,
  startOffset,
}: MasonryGridProps) {
  // Cycle through patterns if none explicitly provided
  const selectedPatternKey =
    pattern || PATTERN_SEQUENCE[index % PATTERN_SEQUENCE.length];
  const currentPattern = GALLERY_PATTERNS[selectedPatternKey];

  // Calculate absolute offsets for each group within this grid block
  const groupOffsets = groups.reduce((acc, group, i) => {
    const prevOffset =
      i === 0 ? startOffset : acc[i - 1] + groups[i - 1].images.length;
    acc.push(prevOffset);
    return acc;
  }, [] as number[]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
      {groups.map((group, i) => {
        const cellOffset = groupOffsets[i];

        return (
          <MosaicCell
            key={group.id}
            images={group.images}
            label={label}
            className={currentPattern[i % currentPattern.length]}
            delay={i * 1200}
            allSlides={allSlides}
            globalOffset={cellOffset}
            groupLabel={group.label}
          />
        );
      })}
    </div>
  );
}
