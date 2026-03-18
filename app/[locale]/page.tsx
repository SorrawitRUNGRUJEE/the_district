import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 text-center"
      style={{ backgroundImage: "url('/images/home/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"></div>

      {/* Hero Content */}
      <div className="relative z-10 space-y-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-foreground uppercase drop-shadow-md">
          {t("title")}
        </h1>

        <div className="mx-auto h-px w-24 bg-brand"></div>

        <p className="max-w-xl text-lg md:text-xl font-light tracking-[0.3em] text-foreground/90 uppercase italic drop-shadow-sm">
          {t("subtitle")}
        </p>

        <div className="pt-10">
          <Link
            href="/gallery"
            className="inline-block border border-foreground px-10 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:bg-brand hover:border-brand hover:text-black transition-all duration-300"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
