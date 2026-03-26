"use client";

import { DORM_ROOMS, PRIVATE_ROOMS } from "@/components/gallery/constants";
import { GallerySection } from "@/components/gallery/types";
import { useTranslations } from "next-intl";

// Maps room id to its translation namespace key
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

function RoomBlock({ room }: { room: GallerySection }) {
  const tRooms = useTranslations("GalleryRooms");
  const roomKey = ROOM_KEY_MAP[room.id];
  const t = useTranslations(`RoomPage.${roomKey}`);

  return (
    <>
      {/* ── SPLIT SECTION ── */}
      <section className="flex min-h-[calc(100vh-72px)]">
        <div
          className="w-[55%] bg-cover bg-center"
          style={{ backgroundImage: `url('${room.images.featured[0]}')` }}
        />
        <div className="w-[45%] bg-background flex flex-col justify-center px-16">
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
      <section className="flex h-[50vh] gap-2 mt-2">
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
            {t("closingText")}
          </p>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-border" />
    </>
  );
}

export default function RoomPage() {
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";
  const allRooms: GallerySection[] = [...DORM_ROOMS, ...PRIVATE_ROOMS];

  return (
    <main className="pt-18">
      {allRooms.map((room) => (
        <div key={room.id} id={room.id} className={containerClass}>
          <RoomBlock room={room} />
        </div>
      ))}
    </main>
  );
}
