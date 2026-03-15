import SafeImage from "@/components/ui/SafeImage";
import { useTranslations } from "next-intl";

export default function OffersPage() {
  const t = useTranslations("OffersPage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      {/* Page Header */}
      <div className="pt-24 pb-8 text-center bg-black border-b border-white/5">
        <div className={containerClass}>
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.3em] uppercase text-white leading-tight">
            {t("header")}
          </h1>
          {/* Brand accent line */}
          <div className="mx-auto mt-8 h-px w-24 bg-brand"></div>
        </div>
      </div>

      {/* Offer Section 1: Stay */}
      <section className="bg-neutral-900 py-8 border-b border-white/5">
        <div
          className={`${containerClass} flex flex-col md:flex-row gap-8 items-center`}
        >
          <div className="w-full md:w-1/2">
            <div className="relative aspect-4/3 w-full bg-neutral-900 overflow-hidden shadow-2xl cursor-pointer group">
              <SafeImage
                src="/images/offers/offer-1.jpg"
                alt="Stay"
                preload={true}
                className="group-hover:scale-110 transition-transform duration-[1.5s] opacity-70 group-hover:opacity-100"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <span className="text-brand text-xs font-bold tracking-[0.4em] uppercase">
              — {t("stay.tag")}
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase leading-[1.1] whitespace-pre-line">
              {t("stay.title")}
            </h2>
            <p className="text-white/50 leading-relaxed font-light tracking-wide text-lg max-w-md">
              {t("stay.desc")}
            </p>
            <button className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase cursor-pointer">
              <span className="border-b border-white/20 pb-1 group-hover:border-brand transition-colors">
                {t("stay.cta")}
              </span>
              <span className="text-brand group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Offer Section 2: Experience */}
      <section className="bg-black py-8 border-b border-white/5">
        <div
          className={`${containerClass} flex flex-col md:flex-row-reverse gap-8 items-center`}
        >
          <div className="w-full md:w-1/2">
            <div className="relative aspect-4/3 w-full bg-neutral-900 overflow-hidden shadow-2xl cursor-pointer group">
              <SafeImage
                src="/images/offers/offer-2.jpg"
                alt="Experience"
                className="group-hover:scale-110 transition-transform duration-[1.5s] opacity-70 group-hover:opacity-100"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <span className="text-brand text-xs font-bold tracking-[0.4em] uppercase">
              — {t("experience.tag")}
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase leading-[1.1] whitespace-pre-line">
              {t("experience.title")}
            </h2>
            <p className="text-white/50 leading-relaxed font-light tracking-wide text-lg max-w-md">
              {t("experience.desc")}
            </p>
            <button className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase cursor-pointer">
              <span className="border-b border-white/20 pb-1 group-hover:border-brand transition-colors">
                {t("experience.cta")}
              </span>
              <span className="text-brand group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Offer Section 3: Dining */}
      <section className="bg-neutral-900 py-8">
        <div
          className={`${containerClass} flex flex-col md:flex-row gap-8 items-center`}
        >
          <div className="w-full md:w-1/2">
            <div className="relative aspect-4/3 w-full bg-neutral-900 overflow-hidden shadow-2xl cursor-pointer group">
              <SafeImage
                src="/images/offers/offer-3.jpg"
                alt="Dining"
                className="group-hover:scale-110 transition-transform duration-[1.5s] opacity-70 group-hover:opacity-100"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <span className="text-brand text-xs font-bold tracking-[0.4em] uppercase">
              — {t("dining.tag")}
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase leading-[1.1] whitespace-pre-line">
              {t("dining.title")}
            </h2>
            <p className="text-white/50 leading-relaxed font-light tracking-wide text-lg max-w-md">
              {t("dining.desc")}
            </p>
            <button className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase cursor-pointer">
              <span className="border-b border-white/20 pb-1 group-hover:border-brand transition-colors">
                {t("dining.cta")}
              </span>
              <span className="text-brand group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
