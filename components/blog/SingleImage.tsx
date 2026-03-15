import SafeImage from "@/components/ui/SafeImage";

export default function SingleImage({
  src,
  alt,
}: {
  src: string;
  alt?: string;
}) {
  return (
    <div className="not-prose my-12 overflow-hidden rounded-[2rem] shadow-xl border border-white/5">
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
