"use client";

import { AnimatePresence, motion } from "framer-motion";
import { img } from "framer-motion/client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * AutoSlideImage: Handles smooth cross-fade transitions for gallery items
 */
const AutoSlideImage = ({
  images,
  interval = 3500,
  label,
}: {
  images: string[];
  interval?: number;
  label?: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => {
        setIndex((prev) => (prev + 1) % images.length);
      },
      interval + Math.random() * 2000,
    );

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="relative w-full h-[480px] overflow-hidden bg-neutral-900 shadow-2xl rounded-sm border border-white/5">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[index]}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "linear" }}
          className="absolute inset-0 h-full w-full object-cover"
          alt="Gallery Slide"
        />
      </AnimatePresence>
      <div className="absolute inset-0 z-10 bg-black/10 hover:bg-black/0 transition-colors duration-700 cursor-crosshair" />
      {label && (
        <div className="absolute bottom-4 left-4 z-20">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">
            {label}
          </span>
        </div>
      )}
    </div>
  );
};

export default function GalleryPage() {
  const t = useTranslations("GalleryPage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";
  const hdlRoomTitleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 100; // adjust this to match your header height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const sections = [
    {
      label: "Room A",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
      images: [
        "/images/gallery/pool-1.jpg",
        "/images/gallery/pool-2.jpg",
        "/images/gallery/pool-3.jpg",
      ],
      facility: [
        {
          img: "/images/accomodation/air_conditioning.svg",
          description: "air conditioning",
        },
        {
          img: "/images/accomodation/bed.svg",
          description: "bed",
        },
        {
          img: "/images/accomodation/food.svg",
          description: "beverage",
        },
        {
          img: "/images/accomodation/shower.svg",
          description: "shower",
        },
        {
          img: "/images/accomodation/wifi.svg",
          description: "wifi",
        },
      ],
    },
    {
      label: "Room B",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",

      images: [
        "/images/gallery/room-1.jpg",
        "/images/gallery/room-2.jpg",
        "/images/gallery/room-3.jpg",
      ],
      facility: [
        {
          img: "/images/accomodation/air_conditioning.svg",
          description: "air conditioning",
        },
        {
          img: "/images/accomodation/bed.svg",
          description: "bed",
        },
        {
          img: "/images/accomodation/food.svg",
          description: "beverage",
        },
        {
          img: "/images/accomodation/shower.svg",
          description: "shower",
        },
        {
          img: "/images/accomodation/wifi.svg",
          description: "wifi",
        },
      ],
    },
    {
      label: "Room C",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",

      images: [
        "/images/gallery/food-1.jpg",
        "/images/gallery/food-2.jpg",
        "/images/gallery/food-3.jpg",
      ],
      facility: [
        {
          img: "/images/accomodation/air_conditioning.svg",
          description: "air conditioning",
        },
        {
          img: "/images/accomodation/bed.svg",
          description: "bed",
        },
        {
          img: "/images/accomodation/food.svg",
          description: "beverage",
        },
        {
          img: "/images/accomodation/shower.svg",
          description: "shower",
        },
        {
          img: "/images/accomodation/wifi.svg",
          description: "wifi",
        },
      ],
    },
    {
      label: "Room D",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",

      images: ["/images/gallery/lobby-1.jpg", "/images/gallery/lobby-2.jpg"],
      facility: [
        {
          img: "/images/accomodation/air_conditioning.svg",
          description: "air conditioning",
        },
        {
          img: "/images/accomodation/bed.svg",
          description: "bed",
        },
        {
          img: "/images/accomodation/food.svg",
          description: "beverage",
        },
        {
          img: "/images/accomodation/shower.svg",
          description: "shower",
        },
        {
          img: "/images/accomodation/wifi.svg",
          description: "wifi",
        },
      ],
    },
    {
      label: "Room E",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",

      images: [
        "/images/gallery/exterior-1.jpg",
        "/images/gallery/exterior-2.jpg",
      ],
      facility: [
        {
          img: "/images/accomodation/air_conditioning.svg",
          description: "air conditioning",
        },
        {
          img: "/images/accomodation/bed.svg",
          description: "bed",
        },
        {
          img: "/images/accomodation/food.svg",
          description: "beverage",
        },
        {
          img: "/images/accomodation/shower.svg",
          description: "shower",
        },
        {
          img: "/images/accomodation/wifi.svg",
          description: "wifi",
        },
      ],
    },
    {
      label: "Room F",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",

      images: [
        "/images/gallery/neighborhood-1.jpg",
        "/images/gallery/neighborhood-2.jpg",
      ],
      facility: [
        {
          img: "/images/accomodation/air_conditioning.svg",
          description: "air conditioning",
        },
        {
          img: "/images/accomodation/bed.svg",
          description: "bed",
        },
        {
          img: "/images/accomodation/food.svg",
          description: "beverage",
        },
        {
          img: "/images/accomodation/shower.svg",
          description: "shower",
        },
        {
          img: "/images/accomodation/wifi.svg",
          description: "wifi",
        },
      ],
    },
  ];

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      {/* Hero Header */}
      <div className="pt-24 pb-8 text-center bg-black border-b border-white/5">
        <div className={containerClass}>
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] uppercase text-white leading-tight">
            {t("header")}
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-brand"></div>
        </div>
      </div>

      {/* Single Column Section */}
      <section className="bg-neutral-900 py-12 border-b border-white/5">
        <div className={containerClass}>
          <p className="text-[20px] font-bold tracking-[0.4em]  text-white/30 mb-4">
            {t("subHeader")}
          </p>
          <div className="flex flex-col gap-4 mb-8">
            {sections.map((sections) => {
              return (
                <div
                  onClick={() => hdlRoomTitleClick(sections.label)}
                  key={sections.label}
                >
                  <p className="text-brand hover:text-white/30 cursor-pointer">
                    {"- " + sections.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-20">
            {sections.map((section) => {
              return (
                <div
                  id={section.label}
                  key={section.description}
                  className="flex flex-col gap-4"
                >
                  <h1 className="text-3xl">{section.label}</h1>
                  <h4>{section.description}</h4>
                  <AutoSlideImage
                    key={section.label}
                    images={section.images}
                    label={section.label}
                  />
                  <p>{t("facility")}</p>
                  <div className="flex items-baseline justify-between w-full ">
                    {section.facility.map((el) => {
                      return (
                        <div
                          className="flex flex-col items-center"
                          key={el.description}
                        >
                          <img
                            className="w-20 h-20"
                            style={{
                              filter:
                                "brightness(0) saturate(100%) invert(83%) sepia(94%) saturate(501%) hue-rotate(1deg) brightness(103%) contrast(104%)",
                            }}
                            src={el.img}
                            alt=""
                          />
                          <p>{el.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">
              {t("curated")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
