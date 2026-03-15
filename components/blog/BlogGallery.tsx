"use client";

import SafeImage from "@/components/ui/SafeImage";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface BlogGalleryProps {
  images?: string | string[];
}

export default function BlogGallery({ images }: BlogGalleryProps) {
  // Parse input to string array
  const imageList = Array.isArray(images)
    ? images
    : typeof images === "string"
      ? images
          .replace(/\s+/g, "")
          .split(",")
          .filter((img) => img.length > 0)
      : [];

  if (imageList.length === 0) return null;

  return (
    <div className="not-prose blog-gallery group relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        loop={true}
        effect={"fade"}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={true}
        pagination={{ clickable: true }}
        className="rounded-4xl overflow-hidden shadow-xl"
      >
        {imageList.map((src, index) => (
          <SwiperSlide
            key={index}
            className="aspect-16/10 md:aspect-video bg-neutral-900"
          >
            <div className="relative w-full h-full">
              <SafeImage
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Counter Indicator */}
              <div className="absolute top-6 right-8 text-white/20 text-[10px] font-medium tracking-[0.4em]">
                {index + 1} / {imageList.length}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* Navigation Controls */
        .swiper-button-next,
        .swiper-button-prev {
          color: rgba(255, 255, 255, 0.3) !important;
          width: 50px !important;
          height: 100% !important;
          top: 0 !important;
          margin-top: 0 !important;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .blog-gallery:hover .swiper-button-next,
        .blog-gallery:hover .swiper-button-prev {
          opacity: 1;
        }

        /* Brand Accent Color (#FECE00) */
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: var(--color-brand) !important;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 14px !important;
          font-weight: bold;
        }

        .swiper-button-prev {
          left: 10px !important;
        }
        .swiper-button-next {
          right: 10px !important;
        }

        /* Pagination Dots Styling */
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.15;
          width: 4px !important;
          height: 4px !important;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: var(--color-brand) !important;
          opacity: 1;
          width: 12px !important;
          border-radius: 4px !important;
        }

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
