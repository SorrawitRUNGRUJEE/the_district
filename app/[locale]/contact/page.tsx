"use client";

import PageHeader from "@/components/layout/PageHeader";
import { BRAND_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const common = useTranslations("Common");
  const containerClass = "max-w-7xl mx-auto px-8 md:px-20";

  return (
    <main className="bg-neutral-900 text-white min-h-screen flex flex-col">
      <PageHeader title={t("header")} containerClass={containerClass} />

      <section className="py-24 md:py-32 grow">
        <div className={containerClass}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
            {/* Left Column: Location & Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <h3 className="text-brand text-[10px] font-black uppercase tracking-[0.5em] italic">
                  {common("locationLabel")}
                </h3>
                <div className="space-y-4">
                  <p className="text-2xl md:text-3xl font-light tracking-tight text-white uppercase">
                    {BRAND_INFO.name}
                  </p>
                  <p className="font-light leading-relaxed text-neutral-400 text-base max-w-md">
                    {common("address")}
                  </p>
                </div>
              </div>

              {/* Quick Action: Google Maps Hint */}
              <div className="pt-8 border-t border-white/5">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
                  Located in the heart of Ekkamai Park Avenue
                </p>
              </div>
            </motion.div>

            {/* Right Column: Direct Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-12 lg:pt-2"
            >
              {/* Reservations & General Inquiry */}
              <div className="space-y-6">
                <h3 className="text-brand text-[10px] font-black uppercase tracking-[0.5em] italic">
                  {common("inquiries")}
                </h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${BRAND_INFO.phone.replace(/-/g, "")}`}
                    className="block text-2xl md:text-3xl font-light tracking-tight text-white hover:text-brand transition-colors"
                  >
                    {BRAND_INFO.phone}
                  </a>
                  <div className="space-y-1">
                    <a
                      href={`mailto:${BRAND_INFO.email}`}
                      className="block text-base font-medium text-neutral-400 hover:text-white underline decoration-brand/20 underline-offset-8 transition-all"
                    >
                      {BRAND_INFO.email}
                    </a>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] pt-2">
                      Typical response time: Within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="h-[500px] w-full bg-neutral-800 lg:grayscale lg:invert lg:opacity-50 lg:hover:grayscale-0 lg:hover:invert-0 lg:hover:opacity-100 transition-all duration-1000 border-t border-white/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7876931510045!2d100.5847339750899!3d13.731299786658452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f9264b0d963%3A0xc9228ff571ef2223!2sThe%20District%20Hostel%20Ekkamai!5e0!3m2!1sen!2sth!4v1771848992927!5m2!1sen!2sth"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
