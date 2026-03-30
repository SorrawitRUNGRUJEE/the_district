"use client";

import { GalleryImage } from "@/components/gallery/gallery-data";
import Image from "next/image";
import Lightbox, {
  isImageFitCover,
  isImageSlide,
  SlideImage,
  useLightboxProps,
} from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

/**
 * Custom Next.js Image wrapper for the lightbox
 * Optimizes image loading, LCP, and bandwidth.
 */
function NextJsImage({
  slide,
  rect,
}: {
  slide: SlideImage;
  rect: { width: number; height: number };
}) {
  const { carousel } = useLightboxProps();

  const imageFit =
    isImageSlide(slide) && isImageFitCover(slide, carousel.imageFit)
      ? "cover"
      : "contain";

  if (!isImageSlide(slide)) return undefined;

  const width =
    !rect.width || !rect.height
      ? rect.width
      : Math.min(
          rect.width,
          (rect.height / (slide.height || 1080)) * (slide.width || 1920),
        );

  const height =
    !rect.width || !rect.height
      ? rect.height
      : Math.min(
          rect.height,
          (rect.width / (slide.width || 1920)) * (slide.height || 1080),
        );

  return (
    <div
      style={{ position: "relative", width, height }}
      className="overflow-hidden rounded-xl shadow-2xl"
    >
      <Image
        fill
        alt={slide.alt || "Gallery Image"}
        src={slide.src}
        loading="eager"
        draggable={false}
        style={{ objectFit: imageFit }}
        sizes={`${Math.ceil((width / (typeof window !== "undefined" ? window.innerWidth : 1920)) * 100)}vw`}
        unoptimized
      />
    </div>
  );
}

interface GalleryLightboxProps {
  isOpen: boolean;
  close: () => void;
  slides: GalleryImage[];
  initialIndex: number;
}

export default function GalleryLightbox({
  isOpen,
  close,
  slides,
  initialIndex,
}: GalleryLightboxProps) {
  // Transform GalleryImage to yet-another-react-lightbox Slide format
  const formattedSlides = slides.map((img) => ({
    src: img.src,
    title: img.groupLabel ? (
      <span className="text-brand font-black italic tracking-tighter uppercase text-lg md:text-2xl drop-shadow-sm">
        {img.groupLabel}
      </span>
    ) : undefined,
    description: img.description ? (
      <span className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase italic">
        {img.description}
      </span>
    ) : undefined,
  }));

  return (
    <Lightbox
      open={isOpen}
      close={close}
      index={initialIndex}
      slides={formattedSlides}
      render={{ slide: NextJsImage }}
      plugins={[Zoom, Thumbnails, Captions]}
      carousel={{
        finite: false,
        preload: 3,
      }}
      captions={{
        showToggle: false,
        descriptionMaxLines: 1,
      }}
      zoom={{
        maxZoomPixelRatio: 3,
        scrollToZoom: true,
      }}
      thumbnails={{
        position: "bottom",
        width: 120,
        height: 80,
        border: 2,
        gap: 10,
        padding: 4,
      }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
        captionsTitle: {
          textAlign: "right",
          paddingRight: "2rem",
          paddingBottom: "1rem",
        },
        captionsDescription: {
          textAlign: "right",
          paddingRight: "2rem",
        },
      }}
      // Premium custom UI classes
      className="gallery-lightbox-premium"
    />
  );
}
