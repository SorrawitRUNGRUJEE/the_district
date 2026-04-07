/**
 * Gallery Content Configuration
 *
 * Image groupings and descriptions for the mosaic gallery.
 * This is a manually curated dataset using all available room and facility assets.
 */

export interface GalleryImage {
  src: string;
  description?: string;
  groupLabel?: string; // Injected for Lightbox titles
}

export interface GalleryGroup {
  id: string;
  label?: string; // Shown as a frosted-glass badge on the grid
  images: GalleryImage[];
}

export const GALLERY_CONTENT: GalleryGroup[] = [
  // SECTION 1: Introduction & Social Hub
  {
    id: "district-a-vibe",
    label: "District A",
    images: [
      {
        src: "/images/rooms/district-a/district-a-001.webp",
        description: "TODO - test add description 1",
      },
      {
        src: "/images/rooms/district-a/district-a-002.webp",
        description: "TODO - test add description 2",
      },
      {
        src: "/images/rooms/district-a/district-a-003.webp",
        description: "TODO - test add description 3",
      },
    ],
  },
  {
    id: "lobby-welcome",
    images: [
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-001.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-002.webp",
      },
    ],
  },
  {
    id: "dine-vibe-1",
    images: [
      {
        src: "/images/dine/cocktail.jpg",
        description: "Crafted Moments at The Bar",
      },
    ],
  },

  // SECTION 2: Private Living - District G & Lobby Detail
  {
    id: "district-g-vibe-1",
    label: "District G",
    images: [
      {
        src: "/images/rooms/district-g/district-g-001.webp",
      },
      {
        src: "/images/rooms/district-g/district-g-002.webp",
      },
    ],
  },
  {
    id: "lobby-vibe-2",
    images: [
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-004.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-005.webp",
      },
    ],
  },
  // SECTION 3: Shared Experience - District B & More Lobby
  {
    id: "district-b-vibe",
    label: "District B",
    images: [
      {
        src: "/images/rooms/district-b/district-b-001.webp",
      },
      {
        src: "/images/rooms/district-b/district-b-002.webp",
      },
      {
        src: "/images/rooms/district-b/district-b-003.webp",
      },
    ],
  },
  {
    id: "lobby-vibe-3",
    images: [
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-006.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-007.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-008.webp",
      },
    ],
  },

  // SECTION 4: Private Living - District C (Extended Set)
  {
    id: "district-c-vibe-1",
    label: "District C",
    images: [
      {
        src: "/images/rooms/district-c/district-c-001.webp",
      },
      {
        src: "/images/rooms/district-c/district-c-002.webp",
      },
      {
        src: "/images/rooms/district-c/district-c-003.webp",
      },
    ],
  },
  {
    id: "lobby-vibe-4",
    images: [
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-009.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-010.webp",
      },
    ],
  },
  {
    id: "district-c-vibe-2",
    label: "District C",
    images: [
      {
        src: "/images/rooms/district-c/district-c-004.webp",
      },
      {
        src: "/images/rooms/district-c/district-c-005.webp",
      },
      {
        src: "/images/rooms/district-c/district-c-006.webp",
      },
      {
        src: "/images/rooms/district-c/district-c-007.webp",
      },
    ],
  },

  // SECTION 5: Compact & Cozy - District D & F
  {
    id: "district-f-vibe",
    label: "District F",
    images: [
      {
        src: "/images/rooms/district-f/district-f-001.webp",
      },
      {
        src: "/images/rooms/district-f/district-f-002.webp",
      },
      {
        src: "/images/rooms/district-f/district-f-003.webp",
      },
      {
        src: "/images/rooms/district-f/district-f-004.webp",
      },
    ],
  },
  {
    id: "lobby-vibe-5",
    images: [
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-011.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-012.webp",
      },
    ],
  },
  {
    id: "district-d-vibe",
    label: "District D",
    images: [
      {
        src: "/images/rooms/district-d/district-d-001.webp",
      },
      {
        src: "/images/rooms/district-d/district-d-002.webp",
      },
      {
        src: "/images/rooms/district-d/district-d-003.webp",
      },
    ],
  },
  {
    id: "lobby-vibe-6",
    images: [
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-013.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-014.webp",
      },
    ],
  },
  {
    id: "district-g-vibe-2",
    label: "District G",
    images: [
      {
        src: "/images/rooms/district-g/district-g-003.webp",
      },
      {
        src: "/images/rooms/district-g/district-g-004.webp",
      },
      {
        src: "/images/rooms/district-g/district-g-005.webp",
      },
    ],
  },
  {
    id: "district-d-vibe-2",
    label: "District D",
    images: [
      {
        src: "/images/rooms/district-d/district-d-004.webp",
      },
      {
        src: "/images/rooms/district-d/district-d-005.webp",
      },
      {
        src: "/images/rooms/district-d/district-d-006.webp",
      },
    ],
  },

  // SECTION 6: Family Comfort - District E & Lobby Finish
  {
    id: "district-e-vibe-1",
    label: "District E",
    images: [
      {
        src: "/images/rooms/district-e/district-e-001.webp",
      },
      {
        src: "/images/rooms/district-e/district-e-002.webp",
      },
      {
        src: "/images/rooms/district-e/district-e-003.webp",
      },
    ],
  },
  {
    id: "lobby-vibe-7",
    images: [
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-015.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-016.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-017.webp",
      },
    ],
  },
  {
    id: "district-e-vibe-2",
    label: "District E",
    images: [
      {
        src: "/images/rooms/district-e/district-e-004.webp",
      },
      {
        src: "/images/rooms/district-e/district-e-005.webp",
      },
      {
        src: "/images/rooms/district-e/district-e-006.webp",
      },
    ],
  },
  {
    id: "dine-vibe-2",
    images: [
      {
        src: "/images/dine/steak.jpg",
        description: "Savory Flavors at The Restaurant",
      },
    ],
  },

  // FINAL SECTION: The Closing Vibe (Remaining Lobby Shots)
  {
    id: "lobby-closeness",
    images: [
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-003.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-018.webp",
      },
    ],
  },
  {
    id: "district-g-final",
    label: "District G",
    images: [
      {
        src: "/images/rooms/district-g/district-g-006.webp",
      },
      {
        src: "/images/rooms/district-g/district-g-007.webp",
      },
    ],
  },
  {
    id: "lobby-final",
    images: [
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-020.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-021.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-022.webp",
      },
    ],
  },
  {
    // TODO - เปลี่ยนรูป ตอนนี้ใส่ๆไว้ก่อน
    id: "the-district-signature",
    images: [
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-019.webp",
      },
      {
        src: "/images/rooms/lobby-and-facilities/lobby-and-facilities-020.webp",
      },
    ],
  },
];

export const ALL_SLIDES = GALLERY_CONTENT.flatMap((group) =>
  group.images.map((img) => ({
    ...img,
    groupLabel: group.label,
  })),
);
