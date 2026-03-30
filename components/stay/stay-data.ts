/**
 * Stay Page Types
 */
export interface StayRoom {
  id: string;
  label: string;
  status: string;
  capacity: number;
  info: {
    beds: string;
    restroom: string;
    extras: string[];
  };
  amenities: string[]; // List of translation keys (e.g., 'commonAmenities.ac')
  images: {
    featured: string[];
    gallery: string[];
  };
}

export interface StayFacility {
  icon: string;
  label: string;
  key: string;
}

/**
 * Stay Page Facilities
 */
export const STAY_FACILITIES: StayFacility[] = [
  {
    icon: "/icons/ui/users.svg",
    label: "facilities.capacity",
    key: "capacity",
  },
  {
    icon: "/icons/ui/bed.svg",
    label: "facilities.beds",
    key: "beds",
  },
  {
    icon: "/icons/ui/shower.svg",
    label: "facilities.restroom",
    key: "restroom",
  },
  {
    icon: "/icons/ui/wifi.svg",
    label: "facilities.wifi",
    key: "wifi",
  },
  {
    icon: "/icons/ui/television.svg",
    label: "facilities.tv",
    key: "tv",
  },
];

/**
 * Dormitory Rooms (Shared)
 */
export const STAY_DORM_ROOMS: StayRoom[] = [
  {
    label: "District A",
    id: "district-a",
    status: "roomStatuses.sharedDormitory",
    capacity: 8,
    info: {
      beds: "roomInfo.beds8",
      restroom: "roomInfo.sharedRestroom",
      extras: ["roomExtras.wifi"],
    },
    amenities: [
      "commonAmenities.bunk8",
      "commonAmenities.readingLight",
      "commonAmenities.powerOutlet",
      "commonAmenities.wifi",
      "commonAmenities.sharedBathroom",
      "commonAmenities.locker",
      "commonAmenities.ac",
      "commonAmenities.facilitiesAccess",
      "commonAmenities.shuttle",
      "commonAmenities.frontDesk",
    ],
    images: {
      featured: [
        "/images/rooms/district-a/district-a-001.webp",
        "/images/rooms/district-a/district-a-002.webp",
        "/images/rooms/district-a/district-a-003.webp",
      ],
      gallery: [],
    },
  },
  {
    label: "District B",
    id: "district-b",
    status: "roomStatuses.sharedDormitory",
    capacity: 8,
    info: {
      beds: "roomInfo.beds8",
      restroom: "roomInfo.sharedRestroom",
      extras: ["roomExtras.wifi"],
    },
    amenities: [
      "commonAmenities.bunk8",
      "commonAmenities.readingLight",
      "commonAmenities.powerOutlet",
      "commonAmenities.wifi",
      "commonAmenities.sharedBathroom",
      "commonAmenities.locker",
      "commonAmenities.ac",
      "commonAmenities.facilitiesAccess",
      "commonAmenities.shuttle",
      "commonAmenities.frontDesk",
    ],
    images: {
      featured: [
        "/images/rooms/district-b/district-b-001.webp",
        "/images/rooms/district-b/district-b-002.webp",
        "/images/rooms/district-b/district-b-003.webp",
      ],
      gallery: [],
    },
  },
];

/**
 * Private Rooms
 */
export const STAY_PRIVATE_ROOMS: StayRoom[] = [
  {
    label: "District C",
    id: "district-c",
    status: "roomStatuses.privateLargeRoom",
    capacity: 6,
    info: {
      beds: "roomInfo.beds4Plus1",
      restroom: "roomInfo.privateBathroom",
      extras: ["roomExtras.tv", "roomExtras.wifi"],
    },
    amenities: [
      "commonAmenities.bunk4Queen1",
      "commonAmenities.privateBathroom",
      "commonAmenities.tv",
      "commonAmenities.wifi",
      "commonAmenities.ac",
      "commonAmenities.safetyBox",
      "commonAmenities.miniFridge",
      "commonAmenities.facilitiesAccess",
      "commonAmenities.shuttle",
      "commonAmenities.frontDesk",
    ],
    images: {
      featured: [
        "/images/rooms/district-c/district-c-001.webp",
        "/images/rooms/district-c/district-c-002.webp",
        "/images/rooms/district-c/district-c-003.webp",
      ],
      gallery: [],
    },
  },
  {
    label: "District D",
    id: "district-d",
    status: "roomStatuses.privateCompactRoom",
    capacity: 3,
    info: {
      beds: "roomInfo.beds3",
      restroom: "roomInfo.privateBathroom",
      extras: ["roomExtras.wifi"],
    },
    amenities: [
      "commonAmenities.bunk3",
      "commonAmenities.privateBathroom",
      "commonAmenities.wifi",
      "commonAmenities.ac",
      "commonAmenities.safetyBox",
      "commonAmenities.locker",
      "commonAmenities.readingLight",
      "commonAmenities.facilitiesAccess",
      "commonAmenities.shuttle",
      "commonAmenities.frontDesk",
    ],
    images: {
      featured: [
        "/images/rooms/district-d/district-d-001.webp",
        "/images/rooms/district-d/district-d-002.webp",
        "/images/rooms/district-d/district-d-003.webp",
      ],
      gallery: [],
    },
  },
  {
    label: "District E",
    id: "district-e",
    status: "roomStatuses.privateFamilyRoom",
    capacity: 4,
    info: {
      beds: "roomInfo.beds2Plus1",
      restroom: "roomInfo.privateBathroom",
      extras: ["roomExtras.tv", "roomExtras.wifi"],
    },
    amenities: [
      "commonAmenities.bunk2Queen1",
      "commonAmenities.privateBathroom",
      "commonAmenities.tv",
      "commonAmenities.wifi",
      "commonAmenities.ac",
      "commonAmenities.safetyBox",
      "commonAmenities.miniFridge",
      "commonAmenities.facilitiesAccess",
      "commonAmenities.shuttle",
      "commonAmenities.frontDesk",
    ],
    images: {
      featured: [
        "/images/rooms/district-e/district-e-001.webp",
        "/images/rooms/district-e/district-e-002.webp",
        "/images/rooms/district-e/district-e-003.webp",
      ],
      gallery: [],
    },
  },
  {
    label: "District F",
    id: "district-f",
    status: "roomStatuses.privateCompactRoom",
    capacity: 3,
    info: {
      beds: "roomInfo.beds3",
      restroom: "roomInfo.privateBathroom",
      extras: ["roomExtras.wifi"],
    },
    amenities: [
      "commonAmenities.bunk3",
      "commonAmenities.privateBathroom",
      "commonAmenities.wifi",
      "commonAmenities.ac",
      "commonAmenities.safetyBox",
      "commonAmenities.locker",
      "commonAmenities.readingLight",
      "commonAmenities.facilitiesAccess",
      "commonAmenities.shuttle",
      "commonAmenities.frontDesk",
    ],
    images: {
      featured: [
        "/images/rooms/district-f/district-f-001.webp",
        "/images/rooms/district-f/district-f-002.webp",
        "/images/rooms/district-f/district-f-003.webp",
      ],
      gallery: [],
    },
  },
  {
    label: "District G",
    id: "district-g",
    status: "roomStatuses.privateFamilyRoom",
    capacity: 4,
    info: {
      beds: "roomInfo.beds2Plus1",
      restroom: "roomInfo.privateBathroom",
      extras: ["roomExtras.tv", "roomExtras.wifi"],
    },
    amenities: [
      "commonAmenities.bunk2Queen1",
      "commonAmenities.privateBathroom",
      "commonAmenities.tv",
      "commonAmenities.wifi",
      "commonAmenities.ac",
      "commonAmenities.safetyBox",
      "commonAmenities.miniFridge",
      "commonAmenities.facilitiesAccess",
      "commonAmenities.shuttle",
      "commonAmenities.frontDesk",
    ],
    images: {
      featured: [
        "/images/rooms/district-g/district-g-001.webp",
        "/images/rooms/district-g/district-g-002.webp",
        "/images/rooms/district-g/district-g-003.webp",
      ],
      gallery: [],
    },
  },
];
