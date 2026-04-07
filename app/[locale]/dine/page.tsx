"use client";

import PageHeader from "@/components/layout/PageHeader";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { LAYOUT_CONFIG } from "@/lib/constants";
import { useTranslations } from "next-intl";

const BAR_ITEMS = [
  {
    key: "item1",
    image: "/images/dine/craft-beer-1-brand.webp",
    gallery: [
      "/images/dine/craft-beer-1-001.webp",
      "/images/dine/craft-beer-1-002.webp",
      "/images/dine/craft-beer-1-003.webp",
    ],
  },
  {
    key: "item2",
    image: "/images/dine/craft-beer-2-brand.webp",
    gallery: [
      "/images/dine/craft-beer-2-001.webp",
      "/images/dine/craft-beer-2-002.webp",
      "/images/dine/craft-beer-2-003.webp",
    ],
  },
  {
    key: "item3",
    image: "/images/dine/craft-beer-3-brand.webp",
    gallery: [
      "/images/dine/craft-beer-3-001.webp",
      "/images/dine/craft-beer-3-002.webp",
      "/images/dine/craft-beer-3-003.webp",
    ],
  },
  {
    key: "item4",
    image: "/images/dine/craft-beer-1-brand.webp",
    gallery: [
      "/images/dine/craft-beer-1-001.webp",
      "/images/dine/craft-beer-1-002.webp",
      "/images/dine/craft-beer-1-003.webp",
    ],
  },
];

export default function BarPage() {
  const t = useTranslations("BarPage");
  const containerClass = LAYOUT_CONFIG.containerClass;

  return (
    <main className="pt-18 bg-soft transition-colors duration-300">
      <PageHeader title={t("header")} />
      {BAR_ITEMS.map((item) => {
        const image = (
          <div
            className="w-full lg:w-[55%] h-[50vh] lg:h-auto bg-cover bg-center"
            style={{ backgroundImage: `url('${item.image}')` }}
          />
        );

        const content = (
          <div className="w-full lg:w-[45%] bg-background flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-0 transition-colors duration-300">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand mb-4 tracking-tight uppercase italic underline underline-offset-8 decoration-brand/20">
              {t(`${item.key}.title`)}
            </h1>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 mb-6 italic">
              {t(`${item.key}.subtitle`)}
            </p>
            <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-md mb-10">
              {t(`${item.key}.description`)}
            </p>
          </div>
        );

        return (
          <div key={item.key}>
            {/* ── SPLIT SECTION ── */}
            <section
              className={`${containerClass} flex flex-col lg:flex-row min-h-[calc(100vh-72px)]`}
            >
              {image}
              {content}
            </section>

            {/* ── GALLERY SECTION (Carousel for Mobile) ── */}
            <section className={`${containerClass} mt-8 mb-12`}>
              {/* Desktop: Grid View */}
              <div className="hidden md:flex flex-wrap lg:flex-nowrap h-[50vh] gap-6">
                {item.gallery.map((src, i) => (
                  <div
                    key={i}
                    className={`bg-cover bg-center outline-2 outline-white shadow-xl rounded-xs hover:scale-[1.01] transition-transform duration-500 ${
                      i < 2
                        ? "flex-1 min-w-[45%] lg:min-w-0"
                        : "w-full lg:flex-1"
                    }`}
                    style={{ backgroundImage: `url('${src}')` }}
                  />
                ))}
              </div>

              {/* Mobile: Swipe Carousel */}
              <div className="md:hidden">
                <ImageCarousel
                  images={item.gallery}
                  aspectRatio="aspect-square"
                  objectFit="cover"
                  rounded="rounded-none"
                  autoplay={false}
                />
              </div>
            </section>

            {/* ── TEXT SECTION ── */}
            <section
              className={`${containerClass} flex flex-col items-center py-20`}
            >
              <div className="max-w-2xl w-full text-center">
                <h2 className="text-xl font-bold tracking-[0.2em] uppercase text-brand mb-8 italic underline underline-offset-4 decoration-brand/20">
                  {t(`${item.key}.tagline`)}
                </h2>
                <div className="space-y-4 text-sm md:text-base text-foreground/70 leading-relaxed text-left">
                  <p>{t(`${item.key}.textContent1`)}</p>
                  <p>{t(`${item.key}.textContent2`)}</p>
                </div>
              </div>
            </section>

            {/* ── DIVIDER ── */}
            <div className="border-t border-border" />
          </div>
        );
      })}
    </main>
  );
}
