import PageHeader from "@/components/layout/PageHeader";
import SafeImage from "@/components/ui/SafeImage";
import { LAYOUT_CONFIG } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function StoryPage() {
  const t = useTranslations("StoryPage");
  const containerClass = LAYOUT_CONFIG.containerClass;

  return (
    <main className="min-h-screen bg-soft transition-colors duration-300">
      <PageHeader title={t("title")} containerClass={containerClass} />

      <div className={containerClass}>
        <div className="flex flex-wrap shadow-2xl bg-background rounded-xs overflow-hidden border border-border/50">
          <div className="order-1 lg:w-1/2 w-full h-[50vh] lg:h-auto lg:min-h-[80vh]">
            <SafeImage
              // TODO - อันนี้เซฟจาก ig ละเอามา upscale เม่งโคตรเบลอเลย55555
              src="/images/story/story-ekkamai-we-know-it-well.webp"
              alt="The District Ekkamai - Local Roots"
            />
          </div>

          <div className="order-2 lg:w-1/2 w-full px-10 py-12 lg:px-16 lg:py-16 flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-black uppercase italic text-brand mb-8">
              {t("firstHeader")}
            </h2>
            <div className="space-y-4 text-foreground/80 text-base leading-relaxed">
              <p>{t("firstContent1")}</p>
              <p>{t("firstContent2")}</p>
            </div>
          </div>

          <div className="order-4 lg:order-3 lg:w-1/2 w-full px-10 py-12 lg:px-16 lg:py-16 flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-black uppercase italic text-brand mb-8">
              {t("secondHeader")}
            </h2>
            <div className="space-y-4 text-foreground/80 text-base leading-relaxed">
              <p>{t("secondContent1")}</p>
              <p>{t("secondContent2")}</p>
            </div>
          </div>

          <div className="order-3 lg:order-4 lg:w-1/2 w-full h-[50vh] lg:h-auto lg:min-h-[80vh]">
            <SafeImage
              src="/images/story/story-neighborhood-more-interesting.webp"
              alt="Discovering Ekkamai with The District"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
