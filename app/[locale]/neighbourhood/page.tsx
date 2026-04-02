import PageHeader from "@/components/layout/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
import { LAYOUT_CONFIG } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function NeighbourhoodPage() {
  const t = useTranslations("NeighbourhoodPage");
  const containerClass = LAYOUT_CONFIG.containerClass;

  return (
    <main className="min-h-screen bg-soft flex flex-col">
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
