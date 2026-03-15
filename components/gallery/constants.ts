import { GallerySection } from "@/components/gallery/types";

export const FACILITIES = [
  { icon: "/icons/ui/users.svg", label: "Capacity", key: "capacity" },
  { icon: "/icons/ui/bed.svg", label: "Bed Type", key: "beds" },
  { icon: "/icons/ui/shower.svg", label: "Restroom", key: "restroom" },
  { icon: "/icons/ui/wifi.svg", label: "Wifi", key: "wifi" },
  { icon: "/icons/ui/television.svg", label: "Smart TV", key: "tv" },
];

export const DORM_ROOMS: GallerySection[] = [
  {
    label: "District A",
    id: "district-a",
    status: "SHARED DORMITORY",
    capacity: 8,
    info: {
      beds: "8 BUNK BEDS",
      restroom: "SHARED RESTROOM",
      extras: ["HIGH-SPEED WIFI"],
    },
    images: {
      featured: [
        "/images/gallery/district-a-featured-001.jpg",
        "/images/gallery/district-a-featured-002.jpg",
        "/images/gallery/district-a-featured-003.jpg",
      ],
      gallery: [
        "/images/gallery/district-a-001.jpg", "/images/gallery/district-a-002.jpg",
        "/images/gallery/district-a-003.jpg", "/images/gallery/district-a-004.jpg",
        "/images/gallery/district-a-005.jpg", "/images/gallery/district-a-006.jpg",
        "/images/gallery/district-a-007.jpg", "/images/gallery/district-a-008.jpg",
        "/images/gallery/district-a-009.jpg", "/images/gallery/district-a-010.jpg",
      ],
    },
  },
  {
    label: "District B",
    id: "district-b",
    status: "SHARED DORMITORY",
    capacity: 8,
    info: {
      beds: "8 BUNK BEDS",
      restroom: "SHARED RESTROOM",
      extras: ["HIGH-SPEED WIFI"],
    },
    images: {
      featured: [
        "/images/gallery/district-b-featured-001.jpg",
        "/images/gallery/district-b-featured-002.jpg",
        "/images/gallery/district-b-featured-003.jpg",
      ],
      gallery: [
        "/images/gallery/district-b-001.jpg", "/images/gallery/district-b-002.jpg",
        "/images/gallery/district-b-003.jpg", "/images/gallery/district-b-004.jpg",
        "/images/gallery/district-b-005.jpg", "/images/gallery/district-b-006.jpg",
        "/images/gallery/district-b-007.jpg", "/images/gallery/district-b-008.jpg",
        "/images/gallery/district-b-009.jpg", "/images/gallery/district-b-010.jpg",
      ],
    },
  },
];

export const PRIVATE_ROOMS: GallerySection[] = [
  {
    label: "District C",
    id: "district-c",
    status: "PRIVATE LARGE ROOM",
    capacity: 6,
    info: {
      beds: "4 BUNKS + 1 QUEEN BED",
      restroom: "PRIVATE BATHROOM",
      extras: ["SMART TV", "HIGH-SPEED WIFI"],
    },
    images: {
      featured: [
        "/images/gallery/district-c-featured-001.jpg",
        "/images/gallery/district-c-featured-002.jpg",
        "/images/gallery/district-c-featured-003.jpg",
      ],
      gallery: [
        "/images/gallery/district-c-001.jpg", "/images/gallery/district-c-002.jpg",
        "/images/gallery/district-c-003.jpg", "/images/gallery/district-c-004.jpg",
        "/images/gallery/district-c-005.jpg", "/images/gallery/district-c-006.jpg",
        "/images/gallery/district-c-007.jpg", "/images/gallery/district-c-008.jpg",
        "/images/gallery/district-c-009.jpg", "/images/gallery/district-c-010.jpg",
      ],
    },
  },
  {
    label: "District D",
    id: "district-d",
    status: "PRIVATE COMPACT ROOM",
    capacity: 3,
    info: {
      beds: "3 BUNK BEDS",
      restroom: "PRIVATE BATHROOM",
      extras: ["HIGH-SPEED WIFI"],
    },
    images: {
      featured: [
        "/images/gallery/district-d-featured-001.jpg",
        "/images/gallery/district-d-featured-002.jpg",
        "/images/gallery/district-d-featured-003.jpg",
      ],
      gallery: [
        "/images/gallery/district-d-001.jpg", "/images/gallery/district-d-002.jpg",
        "/images/gallery/district-d-003.jpg", "/images/gallery/district-d-004.jpg",
        "/images/gallery/district-d-005.jpg", "/images/gallery/district-d-006.jpg",
        "/images/gallery/district-d-007.jpg", "/images/gallery/district-d-008.jpg",
        "/images/gallery/district-d-009.jpg", "/images/gallery/district-d-010.jpg",
      ],
    },
  },
  {
    label: "District E",
    id: "district-e",
    status: "PRIVATE FAMILY ROOM",
    capacity: 4,
    info: {
      beds: "2 BUNKS + 1 QUEEN BED",
      restroom: "PRIVATE BATHROOM",
      extras: ["SMART TV", "HIGH-SPEED WIFI"],
    },
    images: {
      featured: [
        "/images/gallery/district-e-featured-001.jpg",
        "/images/gallery/district-e-featured-002.jpg",
        "/images/gallery/district-e-featured-003.jpg",
      ],
      gallery: [
        "/images/gallery/district-e-001.jpg", "/images/gallery/district-e-002.jpg",
        "/images/gallery/district-e-003.jpg", "/images/gallery/district-e-004.jpg",
        "/images/gallery/district-e-005.jpg", "/images/gallery/district-e-006.jpg",
        "/images/gallery/district-e-007.jpg", "/images/gallery/district-e-008.jpg",
        "/images/gallery/district-e-009.jpg", "/images/gallery/district-e-010.jpg",
      ],
    },
  },
  {
    label: "District F",
    id: "district-f",
    status: "PRIVATE COMPACT ROOM",
    capacity: 3,
    info: {
      beds: "3 BUNK BEDS",
      restroom: "PRIVATE BATHROOM",
      extras: ["HIGH-SPEED WIFI"],
    },
    images: {
      featured: [
        "/images/gallery/district-f-featured-001.jpg",
        "/images/gallery/district-f-featured-002.jpg",
        "/images/gallery/district-f-featured-003.jpg",
      ],
      gallery: [
        "/images/gallery/district-f-001.jpg", "/images/gallery/district-f-002.jpg",
        "/images/gallery/district-f-003.jpg", "/images/gallery/district-f-004.jpg",
        "/images/gallery/district-f-005.jpg", "/images/gallery/district-f-006.jpg",
        "/images/gallery/district-f-007.jpg", "/images/gallery/district-f-008.jpg",
        "/images/gallery/district-f-009.jpg", "/images/gallery/district-f-010.jpg",
      ],
    },
  },
  {
    label: "District G",
    id: "district-g",
    status: "PRIVATE FAMILY ROOM",
    capacity: 4,
    info: {
      beds: "2 BUNKS + 1 QUEEN BED",
      restroom: "PRIVATE BATHROOM",
      extras: ["SMART TV", "HIGH-SPEED WIFI"],
    },
    images: {
      featured: [
        "/images/gallery/district-g-featured-001.jpg",
        "/images/gallery/district-g-featured-002.jpg",
        "/images/gallery/district-g-featured-003.jpg",
      ],
      gallery: [
        "/images/gallery/district-g-001.jpg", "/images/gallery/district-g-002.jpg",
        "/images/gallery/district-g-003.jpg", "/images/gallery/district-g-004.jpg",
        "/images/gallery/district-g-005.jpg", "/images/gallery/district-g-006.jpg",
        "/images/gallery/district-g-007.jpg", "/images/gallery/district-g-008.jpg",
        "/images/gallery/district-g-009.jpg", "/images/gallery/district-g-010.jpg",
      ],
    },
  },
];
