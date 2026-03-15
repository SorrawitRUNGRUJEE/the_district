import PageHeader from "@/components/layout/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
import { useTranslations } from "next-intl";

export default function NeighbourhoodPage() {
  const t = useTranslations("NeighbourhoodPage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col">
      <PageHeader title={t("header")} containerClass={containerClass} />
      <ComingSoon
        statusText={t("status")}
        description={
          t("description") ||
          "Discover Ekkamai through our local insights. This guide is currently being updated with fresh recommendations."
        }
      />
    </main>
  );
}
