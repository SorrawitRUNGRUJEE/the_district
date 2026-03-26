"use client";

import { DORM_ROOMS, PRIVATE_ROOMS } from "@/components/gallery/constants";
import { GallerySection } from "@/components/gallery/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const ROOM_KEY_MAP: Record<string, string> = {
  "district-a": "districtA",
  "district-b": "districtB",
  "district-c": "districtC",
  "district-d": "districtD",
  "district-e": "districtE",
  "district-f": "districtF",
  "district-g": "districtG",
};

const amenityKeys = [
  "amenity1",
  "amenity2",
  "amenity3",
  "amenity4",
  "amenity5",
  "amenity6",
  "amenity7",
  "amenity8",
  "amenity9",
  "amenity10",
] as const;

// ── ROOM NAV ─────────────────────────────────────────────────────────────────
interface RoomNavProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  containerClass: string;
}

function RoomNav({ activeSection, scrollToSection, containerClass }: RoomNavProps) {
  const t = useTranslations("RoomPage");

  return (
    <div className="sticky top-18 z-30 bg-card/90 backdrop-blur-md border-b border-border">
      <div className={`${containerClass} py-6`}>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">

          {/* Dorms group */}
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-[10px] font-black tracking-[0.2em] uppercase text-foreground/20 italic select-none">
              {t("dormLabel")}
            </span>
            {DORM_ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => scrollToSection(room.id)}
                className={`text-[11px] cursor-pointer font-bold tracking-[0.15em] uppercase transition-all duration-300 whitespace-nowrap ${
                  activeSection === room.id
                    ? "text-brand scale-110"
                    : "text-muted-foreground hover:text-brand/80"
                }`}
              >
                {room.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block h-3 w-px bg-border" />

          {/* Privates group */}
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-[10px] font-black tracking-[0.2em] uppercase text-foreground/20 italic select-none">
              {t("privateLabel")}
            </span>
            {PRIVATE_ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => scrollToSection(room.id)}
                className={`text-[11px] cursor-pointer font-bold tracking-[0.15em] uppercase transition-all duration-300 whitespace-nowrap ${
                  activeSection === room.id
                    ? "text-brand scale-110"
                    : "text-muted-foreground hover:text-brand/80"
                }`}
              >
                {room.label}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// ── ROOM BLOCK ────────────────────────────────────────────────────────────────
function RoomBlock({ room }: { room: GallerySection }) {
  const tRooms = useTranslations("GalleryRooms");
  const roomKey = ROOM_KEY_MAP[room.id];
  const t = useTranslations(`RoomPage.${roomKey}`);

  return (
    <>
      {/* ── SPLIT SECTION ── */}
      <section className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)]">
        <div
          className="w-full lg:w-[55%] h-[50vh] lg:h-auto bg-cover bg-center"
          style={{ backgroundImage: `url('${room.images.featured[0]}')` }}
        />
        <div className="w-full lg:w-[45%] bg-background flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-0">
          {room.status && (
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand mb-4">
              {tRooms(room.status)}
            </p>
          )}
          <h1 className="text-5xl font-bold text-brand mb-4">{room.label}</h1>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 mb-6">
            {t("subtitle")}
          </p>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-md">
            {t("description")}
          </p>
        </div>
      </section>

      {/* ── GALLERY SECTION ── */}
      <section className="flex h-[50vh] gap-5 mt-5">
        {room.images.featured.map((src, i) => (
          <div
            key={i}
            className="flex-1 bg-cover bg-center outline-2 outline-white"
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </section>

      {/* ── TEXT SECTION ── */}
      <section className="flex flex-col items-center py-20">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-brand mb-8">
            {room.label}
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-8">
            {t("detailDescription")}
          </p>
          <ul className="text-left space-y-3 mb-8">
            {amenityKeys.map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm text-foreground/70">
                <span className="text-brand mt-0.5">✓</span>
                {t(key)}
              </li>
            ))}
          </ul>
          <p className="text-sm text-foreground/70 leading-relaxed">
            {t("closingText")}
          </p>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-border" />
    </>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function RoomPage() {
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";
  const allRooms: GallerySection[] = [...DORM_ROOMS, ...PRIVATE_ROOMS];
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Track intersection ratio per section, pick the highest visible one
    const ratioMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap.set(entry.target.id, entry.intersectionRatio);
        });

        // Pick the section with the highest visible ratio
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
    <main className="pt-18">
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