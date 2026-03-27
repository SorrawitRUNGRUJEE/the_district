import PageHeader from "@/components/layout/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
import { LAYOUT_CONFIG } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");
  const containerClass = LAYOUT_CONFIG.containerClass;

  return (
    <main className="min-h-screen bg-soft flex flex-col">
      <PageHeader title={t("header")} containerClass={containerClass} />
      <ComingSoon
        statusText={t("status")}
        description={
          t("description") ||
          "Our privacy policy is being updated to ensure your data is handled with the highest level of care and transparency."
        }
      />
    </main>
  );
}
