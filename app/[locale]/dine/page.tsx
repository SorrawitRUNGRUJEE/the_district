import PageHeader from "@/components/layout/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
import { useTranslations } from "next-intl";

export default function DinePage() {
  const t = useTranslations("DinePage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col">
      <PageHeader title={t("header")} containerClass={containerClass} />
      <ComingSoon
        statusText={t("status")}
        description={
          t("description") ||
          "Our culinary experiences are currently being curated to delight your palate."
        }
      />
    </main>
  );
}
