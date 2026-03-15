"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { DORM_ROOMS, PRIVATE_ROOMS } from "./constants";

interface GalleryNavProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  containerClass: string;
}

export default function GalleryNav({
  activeSection,
  scrollToSection,
  containerClass,
}: GalleryNavProps) {
  const t = useTranslations("GalleryPage");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <div className="sticky top-[72px] z-30 transition-all font-bold">
      {/* Dynamic Background Wrapper */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isNavOpen
            ? "bg-neutral-950/95 backdrop-blur-md opacity-100"
            : "bg-transparent opacity-0"
        } md:bg-neutral-950/90 md:backdrop-blur-md md:opacity-100`}
      />

      <div className={`${containerClass} relative z-10 py-2 md:py-4`}>
        <div className="flex flex-col">
          {/* Mobile Toggle Button */}
          <div className="md:hidden flex justify-end">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className={`flex items-center justify-center gap-2 px-4 py-1.5 transition-all group min-w-[100px] rounded-full border ${
                isNavOpen
                  ? "bg-brand/20 border-brand/50 text-brand"
                  : "bg-neutral-900/80 backdrop-blur-md border-white/10 text-white/40 hover:bg-brand/10 hover:border-brand/30 hover:text-brand"
              }`}
            >
              <span className="text-[10px] font-black tracking-widest uppercase italic text-center leading-none">
                {isNavOpen ? "Close" : "Explore"}
              </span>
              <motion.div
                animate={{ rotate: isNavOpen ? 180 : 0 }}
                className={`w-2.5 h-2.5 transition-colors ${
                  isNavOpen ? "bg-brand" : "bg-white/30 group-hover:bg-brand"
                }`}
                style={{
                  maskImage: "url(/icons/ui/chevron-down.svg)",
                  WebkitMaskImage: "url(/icons/ui/chevron-down.svg)",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
              />
            </button>
          </div>

          {/* Nav Content */}
          <motion.div
            initial={false}
            animate={{
              height: isDesktop || isNavOpen ? "auto" : 0,
              opacity: isDesktop || isNavOpen ? 1 : 0,
            }}
            className="overflow-hidden md:opacity-100! md:height-auto!"
          >
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-y-6 md:gap-x-12 pt-1 pb-1 md:pt-0 md:pb-0">
              {/* Dorms Group */}
              <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4 font-bold">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/10 italic select-none text-center md:text-left">
                  {t("dormLabel")}
                </span>
                <div className="flex flex-wrap gap-3 md:gap-6 justify-center">
                  {DORM_ROOMS.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => scrollToSection(room.id)}
                      className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap hover:text-shadow-brand ${
                        activeSection === room.id
                          ? "text-brand scale-110"
                          : "text-neutral-500 hover:text-brand/80"
                      }`}
                    >
                      {room.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block h-3 w-px bg-white/5 mx-2" />

              {/* Privates Group */}
              <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4 font-bold">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/10 italic select-none text-center md:text-left">
                  {t("privateLabel")}
                </span>
                <div className="flex flex-wrap gap-3 md:gap-6 justify-center">
                  {PRIVATE_ROOMS.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => scrollToSection(room.id)}
                      className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap hover:text-shadow-brand ${
                        activeSection === room.id
                          ? "text-brand scale-110"
                          : "text-neutral-500 hover:text-brand/80"
                      }`}
                    >
                      {room.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
