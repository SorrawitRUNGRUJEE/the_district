import PageHeader from "@/components/layout/PageHeader";
import { useTranslations } from "next-intl";

export default function StoryPage() {
  const t = useTranslations("StoryPage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="min-h-screen bg-black lg:flex lg:flex-col">
      <PageHeader title={t("title")} containerClass={containerClass} />
      <div className="w-screen flex flex-wrap pb-20 ">
        <div className="order-1 lg:w-1/2 w-full h-[80vh] bg-[url('/images/story/top.jpg')] bg-cover bg-center" />
        <div className="order-2 lg:w-1/2 w-full  px-10 py-12 lg:px-16 lg:py-16 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-black uppercase italic text-brand mb-8">
            {t("firstHeader")}
          </h2>
          <div className="space-y-4 text-white text-base leading-relaxed">
             <p>{t("firstContent1")}</p>
            <p>{t("firstContent2")}</p>
          </div>
        </div>
        <div className="order-4 lg:order-3 lg:w-1/2 w-full text-white px-10 py-12 lg:px-16 lg:py-16 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-black uppercase italic text-brand mb-8">
            {t("secondHeader")}
          </h2>
          <div className="space-y-4 text-white text-base leading-relaxed">
            <p>{t("secondContent1")}</p>
            <p>{t("secondContent1")}</p>
          </div>
        </div>
        <div className="order-3 lg:order-4 lg:w-1/2 w-full h-[80vh] bg-[url('/images/story/top.jpg')] bg-cover bg-center" />
      </div>
    </main>
  );
}