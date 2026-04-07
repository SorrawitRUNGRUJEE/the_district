"use client";

import PageHeader from "@/components/layout/PageHeader";
import {
  STAY_DORM_ROOMS,
  STAY_FACILITIES,
  STAY_PRIVATE_ROOMS,
  StayRoom,
} from "@/components/stay/stay-data";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { useLightbox } from "@/components/ui/LightboxProvider";
import { LAYOUT_CONFIG } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const ROOM_KEY_MAP: Record<string, string> = {
  "district-a": "districtA",
  "district-b": "districtB",
  "district-c": "districtC",
  "district-d": "districtD",
  "district-e": "districtE",
  "district-f": "districtF",
  "district-g": "districtG",
};

// ── ROOM NAV ─────────────────────────────────────────────────────────────────
interface RoomNavProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  containerClass?: string;
}

function RoomNav({
  activeSection,
  scrollToSection,
  containerClass = LAYOUT_CONFIG.containerClass,
}: RoomNavProps) {
  const t = useTranslations("StayPage");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const initialScrollY = useRef(0);

  // Helper to get active room label
  const activeRoom = [...STAY_DORM_ROOMS, ...STAY_PRIVATE_ROOMS].find(
    (r) => r.id === activeSection,
  );

  // Close menu on significant scroll or Escape key
  useEffect(() => {
    if (!isNavOpen) return;

    // Capture initial scroll position
    initialScrollY.current = window.scrollY;

    const handleScroll = () => {
      const scrollDiff = Math.abs(window.scrollY - initialScrollY.current);
      if (scrollDiff > 80) setIsNavOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNavOpen(false);
      }
    };

    const timeout = setTimeout(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("keydown", handleKeyDown);
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNavOpen]);

  const handleScroll = (id: string) => {
    setIsNavOpen(false); // Close menu after choice always
    scrollToSection(id);
  };

  return (
    <div className="sticky top-[80px] z-60 transition-all font-bold pb-5 md:py-6 pointer-events-none">
      {/* Click Outside Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsNavOpen(false)}
            className="fixed inset-0 bg-transparent pointer-events-auto z-[-1]"
          />
        )}
      </AnimatePresence>

      <div
        className={`${containerClass} px-2! md:px-12! lg:px-16! relative flex items-center justify-between pointer-events-none min-h-[44px]`}
      >
        {/* LEFT: Active Room Indicator (Floating Pill) */}
        <div className="flex-none min-w-[100px] md:min-w-[160px] h-full flex items-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {!isNavOpen && (
              <motion.div
                key={activeSection || "none"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-brand text-black text-[9px] md:text-[10px] font-black tracking-widest uppercase px-3 py-2 md:px-5 md:py-2.5 italic rounded-full inline-flex items-center gap-1 shadow-[0_10px_40px_-10px_rgba(var(--brand-rgb),0.5)] border border-white/20 select-none cursor-default"
              >
                <span>{activeRoom?.label || t("exploreRooms")}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER: Floating Menu (Visible when open) */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10 w-full flex justify-center top-0 md:top-1/2 md:-translate-y-1/2 pointer-events-none">
          <AnimatePresence>
            {isNavOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="bg-background/95 backdrop-blur-3xl border border-white/15 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] rounded-3xl md:rounded-[2.5rem] p-2 md:p-4 transition-shadow duration-500 overflow-hidden pointer-events-auto mt-4 md:mt-0"
              >
                <div className="px-4 py-4 md:px-10 md:pb-4 flex flex-col items-center gap-4 md:gap-8 min-w-[280px] md:min-w-none max-h-[70vh] md:max-h-none overflow-y-auto md:overflow-visible scrollbar-hide">
                  <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-x-12 max-w-5xl">
                    {/* Dorms group */}
                    <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-x-8">
                      <span className="text-[9px] font-black tracking-[0.3em] uppercase text-foreground/20 italic select-none leading-none mb-1 md:mb-0">
                        {t("dormLabel")}
                      </span>
                      <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-x-8">
                        {STAY_DORM_ROOMS.map((room) => (
                          <button
                            key={room.id}
                            onClick={() => handleScroll(room.id)}
                            className={`text-[11px] cursor-pointer font-black tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap leading-none ${
                              activeSection === room.id
                                ? "text-brand scale-110"
                                : "text-soft-foreground hover:text-brand"
                            }`}
                          >
                            {room.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:block h-6 w-px bg-border/40 mx-2 shrink-0" />

                    {/* Privates group */}
                    <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-x-8">
                      <span className="text-[9px] font-black tracking-[0.3em] uppercase text-foreground/20 italic select-none leading-none mb-1 md:mb-0">
                        {t("privateLabel")}
                      </span>
                      <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-x-8">
                        {STAY_PRIVATE_ROOMS.map((room) => (
                          <button
                            key={room.id}
                            onClick={() => handleScroll(room.id)}
                            className={`text-[11px] cursor-pointer font-black tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap leading-none ${
                              activeSection === room.id
                                ? "text-brand scale-110"
                                : "text-soft-foreground hover:text-brand"
                            }`}
                          >
                            {room.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Inline Close Button */}
                  <button
                    onClick={() => setIsNavOpen(false)}
                    className="flex flex-row items-center gap-3 group transition-all px-6 py-2 rounded-full border border-white/20 bg-white/5 hover:border-brand/40 hover:bg-white/10 cursor-pointer shrink-0"
                  >
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase text-foreground/50 group-hover:text-brand transition-colors">
                      {t("close")}
                    </span>
                    <motion.div
                      className="w-3.5 h-3.5 bg-foreground/40 group-hover:bg-brand transition-colors"
                      style={{
                        maskImage: "url(/icons/ui/chevron-down.svg)",
                        WebkitMaskImage: "url(/icons/ui/chevron-down.svg)",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        transform: "rotate(180deg)",
                      }}
                    />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Explore Toggle (Floating Pill - Hidden when open) */}
        <div className="flex-none text-right h-full flex items-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {!isNavOpen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => setIsNavOpen(true)}
                className="flex items-center justify-center gap-2 px-3 py-2 md:px-5 md:py-2.5 transition-all group min-w-[100px] md:min-w-[160px] rounded-full shadow-lg bg-surface/95 backdrop-blur-md border border-white/10 text-foreground/70 hover:bg-brand/10 hover:border-brand/40 hover:text-brand"
              >
                <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase italic leading-none">
                  {t("explore")} (
                  {STAY_DORM_ROOMS.length + STAY_PRIVATE_ROOMS.length})
                </span>
                <div
                  className="w-3 h-3 bg-foreground/40 group-hover:bg-brand transition-colors"
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
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── ROOM BLOCK ────────────────────────────────────────────────────────────────
function RoomBlock({ room }: { room: StayRoom }) {
  const t = useTranslations("StayPage");
  const roomKey = ROOM_KEY_MAP[room.id];
  const { open: openLightbox } = useLightbox();

  return (
    <>
      {/* ── SPLIT SECTION ── */}
      <section className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)]">
        <div
          className="w-full lg:w-[55%] h-[50vh] lg:h-auto bg-cover bg-center"
          style={{ backgroundImage: `url('${room.images.featured[0]}')` }}
        />
        <div className="w-full lg:w-[45%] bg-background flex flex-col justify-center items-center text-center px-8 py-12 lg:px-16 lg:py-0 transition-colors duration-300">
          {room.status && (
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand mb-4">
              {t(room.status)}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand mb-4 tracking-tight uppercase italic underline underline-offset-8 decoration-brand/20">
            {room.label}
          </h1>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 mb-8 italic">
            {t(`${roomKey}.subtitle`)}
          </p>

          {/* Room Stats & Facilities */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 md:gap-x-6 lg:gap-x-10 mb-10 max-w-md">
            {/* Capacity Stat */}
            <div className="flex flex-col items-center gap-2 group/stat w-20 md:w-24 text-center shrink-0">
              <div className="flex items-center gap-1.5 h-6">
                <div
                  className="w-4 h-4 md:w-5 md:h-5 bg-brand group-hover/stat:bg-brand-light transition-colors duration-300"
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
                <span className="text-[10px] font-black text-brand group-hover/stat:text-brand-light transition-colors italic">
                  x {room.capacity}
                </span>
              </div>
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 group-hover/stat:text-brand transition-colors duration-300">
                {t("facilities.capacity")}
              </span>
            </div>

            {/* Main Facilities */}
            {STAY_FACILITIES.map((facility) => {
              if (facility.key === "capacity") return null;

              let show = true;
              let value = "";

              if (facility.key === "beds") value = t(room.info.beds);
              if (facility.key === "restroom") value = t(room.info.restroom);

              if (facility.key === "tv") {
                const tvKey = room.info.extras?.find((e) => e.includes("tv"));
                show = !!tvKey;
                if (tvKey) value = t(tvKey);
              }
              if (facility.key === "wifi") {
                const wifiKey = room.info.extras?.find((e) =>
                  e.includes("wifi"),
                );
                show = !!wifiKey;
                if (wifiKey) value = t(wifiKey);
              }

              if (!show) return null;

              return (
                <div
                  className="flex flex-col items-center gap-2 group/icon w-20 md:w-24 text-center shrink-0"
                  key={facility.key}
                >
                  <div className="flex items-center justify-center gap-1.5 h-6">
                    <div
                      className="w-4 h-4 md:w-5 md:h-5 bg-brand group-hover/icon:bg-brand-light transition-colors duration-300 shrink-0"
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
                      <span className="text-[10px] font-extrabold text-brand group-hover/icon:text-brand-light transition-all italic leading-tight uppercase tracking-tight">
                        {value}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 group-hover/icon:text-brand-light transition-colors duration-300 shrink-0">
                    {t(facility.label)}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-md">
            {t(`${roomKey}.description`)}
          </p>
        </div>
      </section>

      {/* ── GALLERY SECTION (Carousel for Mobile) ── */}
      <section className="mt-8 mb-12">
        {/* Desktop: Grid View */}
        <div className="hidden md:flex h-[60vh] gap-6 px-1">
          {room.images.featured.map((src, i) => (
            <div
              key={i}
              className="group/img relative flex-1 cursor-pointer overflow-hidden shadow-xl rounded-xs"
              onClick={() =>
                openLightbox(
                  room.images.featured.map((s) => ({ src: s })),
                  i,
                )
              }
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/img:scale-110"
                style={{ backgroundImage: `url('${src}')` }}
              />
            </div>
          ))}
        </div>

        {/* Mobile: Swipe Carousel */}
        <div className="md:hidden">
          <ImageCarousel
            images={room.images.featured}
            aspectRatio="aspect-square"
            objectFit="cover"
            rounded="rounded-none"
            autoplay={false}
          />
        </div>
      </section>

      {/* ── TEXT SECTION ── */}
      <section className="flex flex-col items-center py-20">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-brand mb-8">
            {room.label}
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-8">
            {t(`${roomKey}.detailDescription`)}
          </p>
          <ul className="text-left space-y-3 mb-8">
            {room.amenities.map((key) => (
              <li
                key={key}
                className="flex items-start gap-3 text-sm text-foreground/70"
              >
                <span className="text-brand mt-0.5">✓</span>
                {t(key)}
              </li>
            ))}
          </ul>
          <p className="text-sm text-foreground/70 leading-relaxed">
            {t(`${roomKey}.closingText`)}
          </p>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-border" />
    </>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function StayPage() {
  const t = useTranslations("StayPage");
  const containerClass = LAYOUT_CONFIG.containerClass;
  const allRooms: StayRoom[] = [...STAY_DORM_ROOMS, ...STAY_PRIVATE_ROOMS];
  const [activeSection, setActiveSection] = useState("district-a");

  useEffect(() => {
    const ratioMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let mostVisible = "";
        ratioMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = id;
          }
        });

        if (mostVisible) setActiveSection(mostVisible);
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
      },
    );

    const sections = document.querySelectorAll(".room-section");
    sections.forEach((section) => {
      ratioMap.set(section.id, 0);
      observer.observe(section);
    });

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

  return (
    <main className="min-h-screen bg-soft text-foreground transition-colors duration-300">
      <PageHeader title={t("header")} />
      <RoomNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        containerClass={containerClass}
      />
      {allRooms.map((room) => (
        <div
          key={room.id}
          id={room.id}
          className={`${containerClass} room-section`}
        >
          <RoomBlock room={room} />
        </div>
      ))}
    </main>
  );
}
