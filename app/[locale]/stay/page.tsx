import PageHeader from "@/components/layout/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
import { useTranslations } from "next-intl";

export default function StayPage() {
  const t = useTranslations("StayPage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col">
      <PageHeader title={t("header")} containerClass={containerClass} />
      <ComingSoon
        statusText={t("status")}
        description={
          t("description") ||
          "Our luxury stays are currently being prepared to offer you the ultimate Ekkamai experience."
        }
      />
    </main>
  );
}
