import SafeImage from "@/components/ui/SafeImage";

export default function SingleImage({
  src,
  alt,
}: {
  src: string;
  alt?: string;
}) {
  return (
    <div className="not-prose my-12 overflow-hidden rounded-4xl shadow-xl border border-border">
      <div className="aspect-video relative">
        <SafeImage
          src={src}
          alt={alt || "Blog image"}
          className="object-cover"
        />
      </div>
    </div>
  );
}
