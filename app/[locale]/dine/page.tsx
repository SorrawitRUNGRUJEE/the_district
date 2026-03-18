import GrowOnHover from "@/components/growOnHover";
import PageHeader from "@/components/layout/PageHeader";

import { useTranslations } from "next-intl";

export default function DinePage() {
  const t = useTranslations("DinePage");
  const containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";

  return (
    <main className="min-h-screen bg-muted flex flex-col">
      <PageHeader title={t("header")} containerClass={containerClass} />
      <GrowOnHover />
    </main>
  );
}
