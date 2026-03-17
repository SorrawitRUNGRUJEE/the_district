"use client";

import GalleryNav from "@/components/gallery/GalleryNav";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import {
  DORM_ROOMS,
  FACILITIES,
  PRIVATE_ROOMS,
} from "@/components/gallery/constants";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const t = useTranslations("GalleryPage");
  const tRooms = useTranslations("GalleryRooms"); // Added for constants translation
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.5],
        rootMargin: "-110px 0px -80% 0px",
      },
    );

    const sections = document.querySelectorAll(".room-section");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? 180 : 140;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const allSections = [...DORM_ROOMS, ...PRIVATE_ROOMS];

  return (
    <main className="bg-neutral-900 text-white min-h-screen">
      <PageHeader title={t("header")} containerClass={containerClass} />
      <GalleryNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        containerClass={containerClass}
      />
      <section className="md:py-10">
        <div className={containerClass}>
          <div className="space-y-20">
            {allSections.map((section, index) => (
              <div
                id={section.id}
                key={section.id}
                className="scroll-mt-32 room-section"
              >
                <div className="flex flex-col gap-10 mb-12">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="space-y-4">
                      {section.status && (
                        <div className="inline-flex items-center gap-2 px-2 py-1 bg-brand/10 border border-brand/20 rounded-xs">
                          <div className="w-1 h-1 rounded-full bg-brand animate-pulse" />
                          <span className="text-[10px] font-black tracking-widest uppercase text-brand italic">
                            {tRooms(section.status)}
                          </span>
                        </div>
                      )}
                      <h3 className="text-brand text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
                        {section.label}
                      </h3>
                    </div>

                    {/* Room Stats & Facilities */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-6 md:gap-x-6 lg:gap-x-10">
                      {/* Capacity Stat */}
                      <div className="flex flex-col items-center gap-2 group/stat w-20 md:w-24 text-center shrink-0">
                        <div className="flex items-center gap-1.5 h-6">
                          <div
                            className="w-5 h-5 bg-white/40 group-hover/stat:bg-brand transition-colors duration-300"
                            style={{
                              maskImage: "url(/icons/ui/users.svg)",
                              WebkitMaskImage: "url(/icons/ui/users.svg)",
                              maskRepeat: "no-repeat",
                              WebkitMaskRepeat: "no-repeat",
                              maskPosition: "center",
                              WebkitMaskPosition: "center",
                              maskSize: "contain",
                              WebkitMaskSize: "contain",
                            }}
                          />
                          <span className="text-[10px] font-black text-white/50 group-hover/stat:text-brand transition-colors italic">
                            x {section.capacity}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">
                          {tRooms("facilities.capacity")}
                        </span>
                      </div>

                      {/* Main Facilities */}
                      {FACILITIES.map((facility) => {
                        if (facility.key === "capacity") return null;

                        let show = true;
                        let value = "";

                        // Resolve dynamic values using translation keys
                        if (facility.key === "beds")
                          value = tRooms(section.info.beds);
                        if (facility.key === "restroom")
                          value = tRooms(section.info.restroom);

                        // Check exact string match since constants were updated to keys
                        if (facility.key === "tv") {
                          show =
                            section.info.extras?.includes("extras.tv") || false;
                          value = tRooms("extras.tv");
                        }
                        if (facility.key === "wifi") {
                          show =
                            section.info.extras?.includes("extras.wifi") ||
                            false;
                          value = tRooms("extras.wifi");
                        }

                        if (!show) return null;

                        return (
                          <div
                            className="flex flex-col items-center gap-2 group/icon w-20 md:w-24 text-center shrink-0"
                            key={facility.key}
                          >
                            <div className="flex items-center justify-center gap-1.5 h-6">
                              <div
                                className="w-5 h-5 bg-white/30 group-hover/icon:bg-brand transition-colors duration-300 shrink-0"
                                style={{
                                  maskImage: `url(${facility.icon})`,
                                  WebkitMaskImage: `url(${facility.icon})`,
                                  maskRepeat: "no-repeat",
                                  WebkitMaskRepeat: "no-repeat",
                                  maskPosition: "center",
                                  WebkitMaskPosition: "center",
                                  maskSize: "contain",
                                  WebkitMaskSize: "contain",
                                }}
                              />
                              {value && (
                                <span className="text-[10px] font-extrabold text-white/50 group-hover/icon:text-brand transition-all italic leading-tight uppercase tracking-tight">
                                  {value}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 shrink-0">
                              {tRooms(facility.label)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <MasonryGrid
                  images={section.images}
                  label={section.label}
                  index={index}
                />
              </div>
            ))}
          </div>

          {/* Branding Footer */}
          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-white/20 italic">
              The District / {t("curated")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
