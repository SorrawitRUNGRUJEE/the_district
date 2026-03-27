"use client";

import { DORM_ROOMS, PRIVATE_ROOMS } from "@/components/gallery/constants";
import { LAYOUT_CONFIG } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface GalleryNavProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  containerClass?: string;
}

export default function GalleryNav({
  activeSection,
  scrollToSection,
  containerClass = LAYOUT_CONFIG.containerClass,
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

  const allRooms = [...DORM_ROOMS, ...PRIVATE_ROOMS];
  const activeRoom = allRooms.find((r) => r.id === activeSection);

  const handleRoomClick = (id: string) => {
    if (!isDesktop) {
      setIsNavOpen(false);
      // Wait for the menu to start closing so the layout settles
      // before calculating the scroll position
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <div className="sticky top-[72px] z-30 transition-all font-bold">
      {/* Dynamic Background Wrapper */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isNavOpen
            ? "bg-surface/95 backdrop-blur-md opacity-100 shadow-lg"
            : "bg-surface/10 backdrop-blur-sm opacity-100 md:bg-transparent md:backdrop-blur-none"
        }`}
      />

      <div className={`${containerClass} relative z-10 py-2 md:py-3`}>
        {/* Unified Flex Container */}
        <div className="flex items-center justify-between gap-x-6">
          
          {/* Left/Middle Block: Indicator + Selection Items (Absolute Overlap) */}
          <div className="flex-1 relative min-h-[32px] flex items-center">
            {/* Active Indicator (Cross-fades on desktop) */}
            <div className={`transition-opacity duration-300 ${isNavOpen && isDesktop ? "opacity-0 invisible" : "opacity-100 visible"}`}>
              <AnimatePresence>
                {(!isNavOpen || !isDesktop) && activeRoom && (
                  <motion.div
                    key="active-room"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-brand text-black text-[9px] font-black tracking-widest uppercase px-3 py-1 italic rounded-full inline-flex items-center gap-1 shadow-lg border border-border/10 whitespace-nowrap"
                  >
                    <span className="opacity-40">#</span>
                    <span className="truncate max-w-[150px] md:max-w-[300px]">
                      {activeRoom.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Selection Items (Overlays or follows based on breakpoint) */}
            <AnimatePresence>
              {isNavOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`${isDesktop ? "absolute inset-0" : "relative w-full mt-2"} flex flex-wrap items-center gap-x-6 gap-y-2`}
                >
                  {/* Dorms */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground/10 italic select-none hidden lg:block">
                      {t("dormLabel")}
                    </span>
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                      {DORM_ROOMS.map((room) => (
                        <button
                          key={room.id}
                          onClick={() => handleRoomClick(room.id)}
                          className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap hover:text-shadow-brand ${
                            activeSection === room.id
                              ? "text-brand scale-110"
                              : "text-soft-foreground hover:text-brand/80"
                          }`}
                        >
                          {room.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="hidden lg:block h-3 w-px bg-border/40" />

                  {/* Privates */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground/10 italic select-none hidden lg:block">
                      {t("privateLabel")}
                    </span>
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                      {PRIVATE_ROOMS.map((room) => (
                        <button
                          key={room.id}
                          onClick={() => handleRoomClick(room.id)}
                          className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap hover:text-shadow-brand ${
                            activeSection === room.id
                              ? "text-brand scale-110"
                              : "text-soft-foreground hover:text-brand/80"
                          }`}
                        >
                          {room.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Block: Toggle Button (Static Position) */}
          <div className="flex-none">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className={`flex items-center justify-center gap-2 px-4 py-1.5 transition-all group min-w-[100px] md:min-w-[120px] rounded-full border ${
                isNavOpen
                  ? "bg-brand/20 border-brand/50 text-brand font-bold"
                  : "bg-surface/80 backdrop-blur-md border border-border text-foreground/40 hover:bg-brand/10 hover:border-brand/30 hover:text-brand"
              }`}
            >
              <span className="text-[10px] font-black tracking-widest uppercase italic text-center leading-none">
                {isNavOpen ? "Close" : "Explore"}
              </span>
              <motion.div
                animate={{ rotate: isNavOpen ? 180 : 0 }}
                className={`w-2.5 h-2.5 transition-colors ${
                  isNavOpen
                    ? "bg-brand"
                    : "bg-foreground/30 group-hover:bg-brand"
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
        </div>
      </div>
    </div>
  );
}
