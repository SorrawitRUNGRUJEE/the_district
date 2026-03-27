"use client";

import ImageCarousel from "@/components/ui/ImageCarousel";

interface BlogGalleryProps {
  images?: string | string[];
}

export default function BlogGallery({ images }: BlogGalleryProps) {
  // Parse input to string array
  const imageList = Array.isArray(images)
    ? images
    : typeof images === "string"
      ? images
          .replace(/\s+/g, "")
          .split(",")
          .filter((img) => img.length > 0)
      : [];

  if (imageList.length === 0) return null;

  return (
    <ImageCarousel
      images={imageList}
      aspectRatio="aspect-16/10"
      mdAspectRatio="md:aspect-video"
      className="not-prose my-12"
      rounded="rounded-4xl"
    />
  );
}
