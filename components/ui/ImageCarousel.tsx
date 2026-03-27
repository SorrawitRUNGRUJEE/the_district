"use client";

import SafeImage from "@/components/ui/SafeImage";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ImageCarouselProps {
  images: string[];
  aspectRatio?: string;
  mdAspectRatio?: string;
  objectFit?: "cover" | "contain";
  showNav?: boolean;
  showPagination?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  effect?: "slide" | "fade";
  className?: string;
  rounded?: string;
}

export default function ImageCarousel({
  images,
  aspectRatio = "aspect-16/10",
  mdAspectRatio = "md:aspect-video",
  objectFit = "cover",
  showNav = true,
  showPagination = true,
  autoplay = true,
  loop = true,
  effect = "fade",
  className = "",
  rounded = "rounded-4xl",
}: ImageCarouselProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div className={`not-prose image-carousel group relative ${className}`}>
      {isClient && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          slidesPerView={1}
          loop={loop}
          effect={effect}
          autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
          navigation={showNav}
          pagination={showPagination ? { clickable: true } : false}
          className={`${rounded} overflow-hidden shadow-xl`}
        >
          {images.map((src, index) => (
            <SwiperSlide
              key={index}
              className={`${aspectRatio} ${mdAspectRatio} bg-background`}
            >
              <div className="relative w-full h-full">
                <SafeImage
                  src={src}
                  alt={`Carousel image ${index + 1}`}
                  className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                    objectFit === "cover" ? "object-cover" : "object-contain"
                  }`}
                />
                
                {/* Gradient Overlay (only for cover mode where we might have text overlay later) */}
                {objectFit === "cover" && (
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
                )}

                {/* Counter Indicator */}
                {images.length > 1 && (
                  <div className="absolute top-6 right-8 text-white/40 text-[10px] font-medium tracking-[0.4em] z-20">
                    {index + 1} / {images.length}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <style jsx global>{`
        /* Navigation Controls */
        .image-carousel .swiper-button-next,
        .image-carousel .swiper-button-prev {
          color: rgba(255, 255, 255, 0.3) !important;
          width: 50px !important;
          height: 100% !important;
          top: 0 !important;
          margin-top: 0 !important;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-carousel:hover .swiper-button-next,
        .image-carousel:hover .swiper-button-prev {
          opacity: 1;
        }

        .image-carousel .swiper-button-next:hover,
        .image-carousel .swiper-button-prev:hover {
          color: var(--color-brand) !important;
        }

        .image-carousel .swiper-button-next:after,
        .image-carousel .swiper-button-prev:after {
          font-size: 14px !important;
          font-weight: bold;
        }

        .image-carousel .swiper-button-prev {
          left: 10px !important;
        }
        .image-carousel .swiper-button-next {
          right: 10px !important;
        }

        /* Pagination Dots Styling */
        .image-carousel .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.25;
          width: 6px !important;
          height: 6px !important;
          transition: all 0.3s ease;
        }

        .image-carousel .swiper-pagination-bullet-active {
          background: var(--color-brand) !important;
          opacity: 1;
          width: 16px !important;
          border-radius: 4px !important;
        }

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .image-carousel .swiper-button-next,
          .image-carousel .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
