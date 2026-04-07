"use client";

import { GalleryImage } from "@/components/gallery/gallery-data";
import Image from "next/image";
import Lightbox, {
  isImageFitCover,
  isImageSlide,
  SlideImage,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";
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
          (rect.height / (slide.height || 2160)) * (slide.width || 3840),
        );

  const height =
    !rect.width || !rect.height
      ? rect.height
      : Math.min(
          rect.height,
          (rect.width / (slide.width || 3840)) * (slide.height || 2160),
        );

  return (
    <div style={{ position: "relative", width, height }} className="shadow-2xl">
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

interface CustomSlide extends SlideImage {
  groupLabel?: string;
  description?: string;
}

/**
 * Custom Floating Captions Overlay
 * Replaces the built-in yarl__captions plugin to get rid of the "black bar".
 */
function CustomCaptions() {
  const { slides, currentIndex } = useLightboxState();
  const slide = slides[currentIndex] as CustomSlide; // Define proper type for custom fields

  if (!slide?.groupLabel && !slide?.description) return null;

  return (
    <div className="absolute bottom-[100px] md:bottom-[120px] right-4 md:right-8 z-50 flex flex-col items-end gap-1.5 pointer-events-none select-none max-w-[280px] md:max-w-md">
      {slide.groupLabel && (
        <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-sm border-r-2 border-brand shadow-xl">
          <span className="text-brand font-black italic tracking-[0.2em] uppercase text-[10px] md:text-sm drop-shadow-md">
            {slide.groupLabel}
          </span>
        </div>
      )}
      {slide.description && (
        <div className="bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-sm shadow-lg text-right">
          <span className="text-white/80 text-[8px] md:text-[10px] font-bold tracking-widest uppercase italic leading-relaxed">
            {slide.description}
          </span>
        </div>
      )}
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
    width: 3840,
    height: 2560,
    groupLabel: img.groupLabel,
    description: img.description,
  }));

  return (
    <Lightbox
      open={isOpen}
      close={close}
      index={initialIndex}
      slides={formattedSlides}
      render={{
        slide: NextJsImage,
        controls: () => <CustomCaptions />,
      }}
      plugins={[Zoom, Thumbnails]}
      carousel={{
        finite: false,
        preload: 3,
      }}
      zoom={{
        maxZoomPixelRatio: 5,
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
        container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
      }}
      // Premium custom UI classes
      className="gallery-lightbox-premium"
    />
  );
}
