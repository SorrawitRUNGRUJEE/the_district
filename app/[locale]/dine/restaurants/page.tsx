import { useTranslations } from "next-intl";

const RESTAURANT_ITEMS = [
  {
    key: "item1",
    image: "/images/dine/steak.jpg",
    gallery: [
      "/images/dine/steak.jpg",
      "/images/dine/steak.jpg",
      "/images/dine/steak.jpg",
    ],
  },
  {
    key: "item2",
    image: "/images/dine/steak.jpg",
    gallery: [
      "/images/dine/steak.jpg",
      "/images/dine/steak.jpg",
      "/images/dine/steak.jpg",
    ],
  },
  {
    key: "item3",
    image: "/images/dine/steak.jpg",
    gallery: [
      "/images/dine/steak.jpg",
      "/images/dine/steak.jpg",
      "/images/dine/steak.jpg",
    ],
  },
  {
    key: "item4",
    image: "/images/dine/steak.jpg",
    gallery: [
      "/images/dine/steak.jpg",
      "/images/dine/steak.jpg",
      "/images/dine/steak.jpg",
    ],
  },
];

export default function RestaurantPage() {
  const t = useTranslations("RestaurantPage");

  return (
    <main className="pt-18">
      {RESTAURANT_ITEMS.map((item) => {

        const image = (
          <div
            className="w-full lg:w-[55%] h-[50vh] lg:h-auto bg-cover bg-center"
            style={{ backgroundImage: `url('${item.image}')` }}
          />
        );

        const content = (
          <div className="w-full lg:w-[45%] bg-background flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-0">
            <h1 className="text-5xl font-bold text-brand mb-4">
              {t(`${item.key}.title`)}
            </h1>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 mb-6">
              {t(`${item.key}.subtitle`)}
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed max-w-md mb-10">
              {t(`${item.key}.description`)}
            </p>
          </div>
        );

        return (
          <div key={item.key}>

            {/* ── SPLIT SECTION ── */}
            <section className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)]">
              {image}{content}
            </section>

            {/* ── GALLERY SECTION ── */}
            <section className="flex flex-wrap lg:flex-nowrap gap-2 mt-2">
              {item.gallery.map((src, i) => (
                <div
                  key={i}
                  className={`bg-cover bg-center h-[40vh] lg:h-[50vh] ${
                    i < 2 ? "flex-1 min-w-[45%] lg:min-w-0" : "w-full lg:flex-1"
                  }`}
                  style={{ backgroundImage: `url('${src}')` }}
                />
              ))}
            </section>

            {/* ── TEXT SECTION ── */}
            <section className="flex flex-col items-center py-20 px-6">
              <div className="max-w-2xl w-full text-center">
                <h2 className="text-lg font-bold tracking-[0.15em] uppercase text-brand mb-8">
                  {t(`${item.key}.tagline`)}
                </h2>
                <div className="space-y-4 text-sm text-foreground/70 leading-relaxed text-left">
                  <p>{t(`${item.key}.textContent1`)}</p>
                  <p>{t(`${item.key}.textContent2`)}</p>
                </div>
              </div>
            </section>

            {/* ── DIVIDER ── */}
            <div className="border-t border-border" />

          </div>
        );
      })}
    </main>
  );
}