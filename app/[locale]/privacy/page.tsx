import PageHeader from "@/components/layout/PageHeader";
import { LAYOUT_CONFIG } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");
  const containerClass = LAYOUT_CONFIG.containerClass;

  return (
    <main className="min-h-screen bg-soft flex flex-col">
      <PageHeader title={t("header")} containerClass={containerClass} />

      <div className={`${containerClass} max-w-4xl py-16`}>
        {/* Last Updated */}
        <p className="text-xs text-foreground/40 tracking-widest uppercase mb-12">
          Last Updated: April 2, 2026
        </p>

        {/* Intro */}
        <p className="text-sm text-foreground/70 leading-relaxed mb-4">
          Urban Nest Asset Co., Ltd. ("we", "us", "our") respects your privacy
          and is committed to protecting your personal data in accordance with
          the Personal Data Protection Act (PDPA).
        </p>
        <p className="text-sm text-foreground/70 leading-relaxed mb-16">
          This Privacy Policy explains how we collect, use, and protect your
          information when you visit our website.
        </p>

        {/* Section 1 */}
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/80 mb-6">
            1. Information We Collect
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-4">
            Since our website is primarily informational, we do not collect
            personal information directly such as names, emails, or payment
            details through the website.
          </p>
          <p className="text-sm text-foreground/70 leading-relaxed mb-4">
            However, we may automatically collect limited technical data when
            you visit our website, including:
          </p>
          <ul className="space-y-2 mb-4 pl-6">
            {[
              "IP address",
              "Browser type and version",
              "Device type",
              "Pages visited and time spent on the site",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-foreground/70"
              >
                <span className="text-brand mt-0.5">*</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-foreground/70 leading-relaxed">
            This data is collected through analytics tools.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/80 mb-6">
            2. Use of Analytics Tools
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-4">
            We use Vercel Analytics to understand how visitors use our website.
            This helps us:
          </p>
          <ul className="space-y-2 mb-4 pl-6">
            {[
              "Improve website performance",
              "Understand visitor behavior",
              "Enhance user experience",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-foreground/70"
              >
                <span className="text-brand mt-0.5">*</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-foreground/70 leading-relaxed">
            The information collected is aggregated and does not directly
            identify you.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/80 mb-6">
            3. Purpose of Data Use
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-4">
            We use collected data only for:
          </p>
          <ul className="space-y-2 mb-4 pl-6">
            {[
              "Website improvement and performance monitoring",
              "Security and fraud prevention",
              "Internal statistical analysis",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-foreground/70"
              >
                <span className="text-brand mt-0.5">*</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-foreground/70 leading-relaxed">
            We do not sell or share your personal data with third parties for
            marketing purposes.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/80 mb-6">
            4. Data Sharing
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-4">
            We may share limited data with service providers (such as analytics
            providers) strictly for the purposes described in this policy.
          </p>
          <p className="text-sm text-foreground/70 leading-relaxed">
            We do not disclose personal data to third parties unless required by
            law.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/80 mb-6">
            5. Data Retention
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed">
            We retain collected data only as long as necessary for the purposes
            described in this policy or as required by applicable law.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/80 mb-6">
            6. Your Rights
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-4">
            Under the Personal Data Protection Act (PDPA), you have the right
            to:
          </p>
          <ul className="space-y-2 pl-6">
            {[
              "Request access to your personal data",
              "Request correction of inaccurate data",
              "Request deletion of your data (where applicable)",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-foreground/70"
              >
                <span className="text-brand mt-0.5">*</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 7 */}
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/80 mb-6">
            7. Data Security
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed">
            We implement reasonable technical and organizational measures to
            protect your information from unauthorized access, use, or
            disclosure.
          </p>
        </div>

        {/* Section 8 */}
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/80 mb-6">
            8. Contact Information
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-2">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Urban Nest Asset Co., Ltd. 69 Sukhumvit 61, Khlong Tan Nuea,
            Watthana, Bangkok, Thailand
            <br />
            Email: [your email here]
          </p>
        </div>

        {/* Section 9 */}
        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/80 mb-6">
            9. Updates to This Policy
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page.
          </p>
        </div>
      </div>
    </main>
  );
}
