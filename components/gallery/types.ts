export type MosaicPattern = string[];

export interface GalleryImages {
  featured: string[];
  gallery: string[];
}

export interface GallerySection {
  label: string;
  id: string;
  status: string;
  capacity: number;
  info: {
    beds: string;
    restroom: string;
    extras?: string[];
  };
  images: GalleryImages;
}

export const GALLERY_PATTERNS = {
  TOP_LEFT: [
    "col-span-2 row-span-2", // 0: 2x2 Feature
    "col-span-2 row-span-1", // 1
    "col-span-1 row-span-1", // 2
    "col-span-1 row-span-2", // 3
    "col-span-2 row-span-1", // 4
    "col-span-1 row-span-1", // 5
  ],
  TOP_RIGHT: [
    "md:col-start-3 col-span-2 row-span-2", // 0
    "col-span-2 row-span-1", // 1
    "col-span-1 row-span-1", // 2
    "col-span-1 row-span-2", // 3
    "col-span-2 row-span-1", // 4
    "col-span-1 row-span-1", // 5
  ],
  CENTER: [
    "md:col-start-2 col-span-2 row-span-2", // 0
    "col-span-1 row-span-2", // 1
    "col-span-1 row-span-1", // 2
    "col-span-1 row-span-2", // 3
    "col-span-1 row-span-1", // 4
    "col-span-2 row-span-1", // 5
  ],
  BOTTOM_LEFT: [
    "md:row-start-2 col-span-2 row-span-2", // 0
    "col-span-2 row-span-1", // 1
    "col-span-1 row-span-1", // 2
    "col-span-1 row-span-1", // 3
    "col-span-2 row-span-1", // 4
    "col-span-2 row-span-1", // 5
  ],
  BOTTOM_RIGHT: [
    "md:col-start-3 md:row-start-2 col-span-2 row-span-2", // 0
    "col-span-2 row-span-1", // 1
    "col-span-1 row-span-1", // 2
    "col-span-1 row-span-1", // 3
    "col-span-2 row-span-1", // 4
    "col-span-2 row-span-1", // 5
  ],
} as const;

export type PatternKey = keyof typeof GALLERY_PATTERNS;

export const PATTERN_SEQUENCE: PatternKey[] = [
  "TOP_LEFT",
  "TOP_RIGHT",
  "CENTER",
  "BOTTOM_LEFT",
  "BOTTOM_RIGHT",
];
