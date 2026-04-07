"use client";

import PageHeader from "@/components/layout/PageHeader";
import { useIsClient } from "@/hooks/use-is-client";
import { BRAND_INFO, LAYOUT_CONFIG } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const { resolvedTheme } = useTheme();
  const isClient = useIsClient();
  const [isMapInteracted, setIsMapInteracted] = useState(false);

  if (!isClient) return null;

  const isDark = resolvedTheme === "dark";
  const containerClass = LAYOUT_CONFIG.containerClass;

  const contactItems = [
    {
      label: t("location"),
      value: BRAND_INFO.name,
      subValue: t("address"),
      icon: "/icons/ui/location.svg",
      href: "https://www.google.com/maps/dir/?api=1&destination=The+District+Hostel+Ekkamai",
    },
    {
      label: t("phone"),
      value: BRAND_INFO.phone,
      subValue: t("phoneNote"),
      href: `tel:${BRAND_INFO.phone.replace(/-/g, "")}`,
      icon: "/icons/ui/phone.svg",
    },
    {
      label: t("inquiries"),
      value: BRAND_INFO.email,
      subValue: t("responseNote"),
      href: `mailto:${BRAND_INFO.email}`,
      icon: "/icons/ui/email.svg",
    },
  ];

  const socialItems = [
    {
      name: "Instagram",
      href: BRAND_INFO.socials.instagram,
      icon: "/icons/social/instagram.svg",
    },
    {
      name: "Facebook",
      href: BRAND_INFO.socials.facebook,
      icon: "/icons/social/facebook.svg",
    },
    {
      name: "TikTok",
      href: BRAND_INFO.socials.tiktok,
      icon: "/icons/social/tiktok.svg",
    },
    {
      name: "Line",
      href: BRAND_INFO.socials.line,
      icon: "/icons/social/line.svg",
    },
  ];

  return (
    <main className="bg-soft text-foreground min-h-screen flex flex-col">
      <PageHeader title={t("header")} containerClass={containerClass} />

      <section className="py-24 md:py-32 grow">
        <div className={containerClass}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-16 lg:gap-x-32 lg:gap-y-10">
            {/* 1. Contact Info Segment */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12 order-1"
            >
              {contactItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={item.label === t("location") ? "_blank" : undefined}
                  rel={
                    item.label === t("location")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-start gap-5 md:gap-8 cursor-pointer"
                >
                  {/* Icon with Brand Masking */}
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 bg-brand shrink-0 group-hover:bg-brand-light transition-all duration-500 group-hover:drop-shadow-brand"
                    style={{
                      maskImage: `url(${item.icon})`,
                      WebkitMaskImage: `url(${item.icon})`,
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                    }}
                  />

                  <div className="space-y-3 overflow-hidden">
                    <h3 className="text-brand group-hover:text-brand-light transition-colors text-[10px] font-black uppercase tracking-[0.5em] italic">
                      {item.label}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <p className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-foreground group-hover:text-brand-light transition-all duration-300 uppercase border-b border-brand/10 group-hover:border-brand/60 truncate sm:whitespace-normal">
                          {item.value}
                        </p>
                        {/* Subtle Link SVG */}
                        <div
                          className="w-3.5 h-3.5 bg-brand opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-500 shrink-0"
                          style={{
                            maskImage: "url(/icons/ui/hand-pointer.svg)",
                            WebkitMaskImage: "url(/icons/ui/hand-pointer.svg)",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskPosition: "center",
                            maskSize: "contain",
                            WebkitMaskSize: "contain",
                          }}
                        />
                      </div>
                      {item.subValue && (
                        <p
                          className={`font-light leading-relaxed max-w-sm group-hover:text-brand dark:group-hover:text-brand-light transition-all duration-300 ${
                            item.label === t("inquiries") ||
                            item.label === t("phone")
                              ? "text-[10px] font-bold text-foreground/30 uppercase tracking-[0.3em] pt-1"
                              : "text-lg md:text-xl text-muted-foreground"
                          }`}
                        >
                          {item.subValue}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* 3. Action Buttons & Socials Segment (Mobile: order-3, Desktop: under info) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-10 pt-8 lg:pt-12 border-t-2 border-foreground/10 order-3"
            >
              {/* Follow Us Segment */}
              <div className="space-y-3">
                <div className="flex items-center gap-5 md:gap-8 group/socials cursor-default">
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 bg-brand group-hover/socials:bg-brand-light group-hover/socials:drop-shadow-brand transition-all duration-500"
                    style={{
                      maskImage: "url(/icons/ui/globe.svg)",
                      WebkitMaskImage: "url(/icons/ui/globe.svg)",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                    }}
                  />
                  <h3 className="text-brand group-hover/socials:text-brand-light transition-colors text-[10px] font-black uppercase tracking-[0.5em] italic">
                    {t("followUs")}
                  </h3>
                </div>

                <div className="flex gap-6 md:gap-8 pl-13 md:pl-18">
                  {socialItems.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-foreground hover:bg-brand hover:drop-shadow-brand transition-all duration-300"
                      style={{
                        maskImage: `url(${social.icon})`,
                        WebkitMaskImage: `url(${social.icon})`,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 2. Google Maps Segment */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-4 order-2 lg:row-span-2 pt-12 border-t-2 border-foreground/10 lg:pt-0 lg:border-t-0"
            >
              {/* Map Header */}
              <div className="flex items-center gap-8 group/mapheader cursor-default">
                <div
                  className="w-10 h-10 bg-brand group-hover/mapheader:bg-brand-light group-hover/mapheader:drop-shadow-brand transition-all duration-500"
                  style={{
                    maskImage: "url(/icons/ui/map-location.svg)",
                    WebkitMaskImage: "url(/icons/ui/map-location.svg)",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                  }}
                />
                <h3 className="text-brand group-hover/mapheader:text-brand-light transition-colors text-[10px] font-black uppercase tracking-[0.5em] italic">
                  {t("googleMaps")}
                </h3>
              </div>

              <div
                onMouseEnter={() => setIsMapInteracted(true)}
                onTouchStart={() => setIsMapInteracted(true)}
                className="relative h-[500px] lg:h-[650px] w-full rounded-2xl overflow-hidden border border-border group/map shadow-2xl"
              >
                <AnimatePresence>
                  {isDark && !isMapInteracted && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 z-10 bg-soft/60 flex flex-col items-center justify-center cursor-pointer group/mapover pointer-events-auto"
                    >
                      {/* Centered Pin - Anchored by Tip */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex items-center justify-center">
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-10 h-10 md:w-12 md:h-12 bg-brand drop-shadow-brand z-20"
                          style={{
                            maskImage: "url(/icons/ui/location.svg)",
                            WebkitMaskImage: "url(/icons/ui/location.svg)",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            maskPosition: "center",
                            WebkitMaskPosition: "center",
                            maskSize: "contain",
                            WebkitMaskSize: "contain",
                          }}
                        />

                        {/* Location Card */}
                        <div className="absolute left-full flex flex-col whitespace-nowrap bg-white/5 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
                          <p className="text-foreground text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase mb-1">
                            The District
                          </p>
                          <p className="text-brand text-[9px] md:text-[10px] font-black tracking-[0.2em] italic uppercase">
                            Hostel Ekkamai
                          </p>
                        </div>
                      </div>

                      {/* Explore Hint - Moved to bottom */}
                      <p className="absolute bottom-12 text-foreground/40 text-[9px] uppercase font-bold tracking-[0.5em] group-hover/mapover:text-brand transition-all duration-500">
                        Explore Map
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7876931510045!2d100.5847339750899!3d13.731299786658452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f9264b0d963%3A0xc9228ff571ef2223!2sThe%20District%20Hostel%20Ekkamai!5e0!3m2!1sen!2sth!4v1771848992927!5m2!1sen!2sth"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={`transition-all duration-500 ease-in-out ${
                    isDark && !isMapInteracted
                      ? "grayscale invert"
                      : "grayscale-0 invert-0"
                  }`}
                />
                <div className="absolute inset-0 pointer-events-none border border-border rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
