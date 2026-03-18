"use client";

import SafeImage from "@/components/ui/SafeImage";
import { Link } from "@/i18n/routing";
import { BRAND_INFO } from "@/lib/constants";
import { useTranslations } from "next-intl";

const Footer = () => {
  const nav = useTranslations("Navigation");
  const contact = useTranslations("Contact");

  const socialIcons = [
    {
      name: "instagram",
      icon: "/icons/social/instagram.svg",
      url: BRAND_INFO.socials.instagram,
    },
    {
      name: "facebook",
      icon: "/icons/social/facebook.svg",
      url: BRAND_INFO.socials.facebook,
    },
    {
      name: "tiktok",
      icon: "/icons/social/tiktok.svg",
      url: BRAND_INFO.socials.tiktok,
    },
    {
      name: "line",
      icon: "/icons/social/line.svg",
      url: BRAND_INFO.socials.line,
    },
  ];

  return (
    <footer className="relative bg-background text-foreground transition-colors duration-300">
      {/* Background with Ambient Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-30">
        <SafeImage
          src="/images/branding/cover.jpg"
          alt="Footer background"
          unoptimized
        />
      </div>
      <div className="absolute inset-0 z-10 bg-linear-to-t from-background via-background/80 to-transparent" />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-16 pb-8 md:pt-20 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          {/* 1. Navigation & Socials */}
          <div className="flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
            <nav className="flex flex-col space-y-3 text-xs font-bold tracking-widest uppercase">
              <Link
                href="/privacy"
                className="hover:text-brand transition-colors"
              >
                {nav("privacy")}
              </Link>
              <Link
                href="/contact"
                className="hover:text-brand transition-colors"
              >
                {nav("contact")}
              </Link>
            </nav>

            {/* Social Icons with Brand Hover */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold tracking-widest uppercase opacity-50">
                {contact("followUs")}
              </p>
              <div className="flex gap-4">
                {socialIcons.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group transition-all duration-300"
                  >
                    <div
                      className="w-5 h-5 bg-foreground opacity-60 group-hover:bg-brand group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                      style={{
                        maskImage: `url(${item.icon})`,
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        maskSize: "contain",
                        WebkitMaskImage: `url(${item.icon})`,
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        WebkitMaskSize: "contain",
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Branding Central */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-32 md:w-44 aspect-square overflow-hidden rounded-2xl border border-foreground/5 shadow-lg">
              <SafeImage
                src="/images/branding/logo.jpg"
                alt="The District Logo"
              />
            </div>
            <p className="text-[8px] tracking-[0.4em] uppercase font-bold text-foreground/40 text-center">
              {BRAND_INFO.name}
            </p>
          </div>

          {/* 3. Contact Information */}
          <div className="flex flex-col items-center md:items-end space-y-8 text-xs font-light tracking-widest text-foreground/80 text-center md:text-right">
            {/* Phone */}
            <div className="space-y-2">
              <p className="font-bold text-foreground uppercase tracking-widest">
                {contact("phone")}
              </p>
              <a
                href={`tel:${BRAND_INFO.phone.replace(/-/g, "")}`}
                className="block text-[10px] font-bold underline decoration-brand/40 hover:text-brand transition-colors"
              >
                {BRAND_INFO.phone}
              </a>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <p className="font-bold text-foreground uppercase tracking-widest">
                {contact("inquiries")}
              </p>
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="block text-[10px] font-bold underline decoration-brand/40 hover:text-brand transition-colors"
              >
                {BRAND_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* 4. Legal & Address */}
        <div className="mt-10 pt-6 border-t border-foreground/10 flex flex-col items-center space-y-4">
          <p className="text-[10px] text-center text-foreground/40 tracking-wide font-light italic max-w-2xl mx-auto">
            📍 {contact("address")}
          </p>
          <p className="text-[8px] text-foreground/30 uppercase tracking-[0.3em] font-bold">
            Copyright © {new Date().getFullYear()} THE DISTRICT. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
