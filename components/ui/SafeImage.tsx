"use client";

import { BRAND_ASSETS } from "@/constants/branding";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: unknown;
  fallback?: string;
  /**
   * If true, the image will show a cursor-pointer.
   * The actual lightbox trigger should be handled by the parent's onClick
   * or by a global registry if we decide to implement one.
   */
  lightbox?: boolean;
}

export default function SafeImage({
  src,
  fallback = BRAND_ASSETS.COVER_FALLBACK,
  alt,
  className,
  lightbox = false,
  onClick,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState<boolean>(false);

  // Validate source type and error state
  const validSrc =
    error || typeof src !== "string" ? fallback : (src as string);

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${lightbox ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <Image
        // Force re-mount on src change to reset error state
        key={typeof src === "string" ? src : "empty"}
        fill
        {...props}
        src={validSrc}
        alt={alt}
        className={`object-cover ${className}`}
        onError={() => setError(true)}
        suppressHydrationWarning
        unoptimized
      />
    </div>
  );
}
