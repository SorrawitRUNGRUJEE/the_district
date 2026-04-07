"use client";

import MasonryGrid from "@/components/gallery/MasonryGrid";
import { ALL_SLIDES, GALLERY_CONTENT } from "@/components/gallery/gallery-data";
import PageHeader from "@/components/layout/PageHeader";
import { LAYOUT_CONFIG } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function GalleryPage() {
  const t = useTranslations("GalleryPage");
  const containerClass = LAYOUT_CONFIG.containerClass;

  // Split gallery content into chunks for MasonryGrid (max 6 groups per grid block)
  const chunkSize = 6;
  const contentChunks = [];
  for (let i = 0; i < GALLERY_CONTENT.length; i += chunkSize) {
    contentChunks.push(GALLERY_CONTENT.slice(i, i + chunkSize));
  }

  // Calculate the starting global index for each chunk of images
  let totalProcessedImages = 0;
  const chunkOffsets = contentChunks.map((chunk) => {
    const offset = totalProcessedImages;
    totalProcessedImages += chunk.reduce(
      (sum, group) => sum + group.images.length,
      0,
    );
    return offset;
  });

  return (
    <main className="bg-soft text-foreground min-h-screen">
      <PageHeader title={t("header")} containerClass={containerClass} />

      <section className="py-8 md:py-16">
        <div className={containerClass}>
          <div className="flex flex-col gap-3 md:gap-4">
            {contentChunks.map((chunk, index) => (
              <MasonryGrid
                key={index}
                groups={chunk}
                label={t("header")}
                index={index}
                allSlides={ALL_SLIDES}
                startOffset={chunkOffsets[index]}
              />
            ))}
          </div>

          {/* Branding Footer */}
          <div className="pt-10 md:pt-16 border-t border-border/50 text-center">
            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-foreground/20 italic">
              The District / {t("curated")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
