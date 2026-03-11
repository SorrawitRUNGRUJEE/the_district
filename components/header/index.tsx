"use client";

import BookingModal from "@/components/booking/BookingModal";
import MenuOverlay from "@/components/header/MenuOverlay";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
import SafeImage from "@/components/ui/SafeImage";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Header = () => {
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const navLinks = [
    { href: "/story", label: t("story") },
    { href: "/offers", label: t("offers") },
    { href: "/gallery", label: t("gallery") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <>
      {/* Sticky Header with Advanced Glassmorphism */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-xl transition-all duration-300 group">
        {/* Visual Layers: Background & Gradients */}
        <div className="absolute inset-0 bg-black/60 -z-20" />

        {/* Bottom Luminous Glow: Enhances separation from page content */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-white/[0.08] to-transparent pointer-events-none -z-10" />

        {/* Main Header Content Container */}
        <div className="relative z-10 flex items-center justify-between py-5 px-6">
          {/* Brand & Menu Trigger */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group relative h-8 w-8 shrink-0 cursor-pointer"
              aria-label="Open Menu"
            >
              {/* Menu Icon Transition (White to Brand) */}
              <div className="absolute inset-0 h-full w-full transition-opacity duration-300 group-hover:opacity-0">
                <SafeImage
                  src="/icons/ui/menu-white.svg"
                  alt="Menu icon"
                  unoptimized
                />
              </div>
              {/* Menu Icon: Brand Color (Hover) */}
              <div className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <SafeImage
                  src="/icons/ui/menu-yellow.svg"
                  alt="Menu icon active"
                  unoptimized
                />
              </div>
            </button>

            <Link
              href="/"
              className="group flex flex-col md:flex-row md:items-baseline md:gap-3"
            >
              {/* Main Brand with Neon Glow Effect */}
              <h1 className="text-brand text-xl md:text-2xl font-black tracking-tighter uppercase italic transition-all duration-500 group-hover:text-brand-light group-hover:drop-shadow-[0_0_12px_rgba(254,206,0,0.5)]">
                THE DISTRICT
              </h1>

              {/* Subtle Identity: Minimalist yet Informative */}
              <span className="text-[7px] md:text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 transition-all duration-700 group-hover:text-brand group-hover:tracking-[0.6em] group-hover:opacity-100">
                Hotel & Hostel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation & CTAs */}
          <div className="flex items-center gap-4 lg:gap-8">
            <nav className="hidden lg:flex gap-8 text-white text-sm tracking-[0.2em] uppercase">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-bold hover:text-brand transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 lg:gap-6 lg:border-l lg:border-white/20 lg:pl-8">
              <LocaleSwitcher />

              <button
                onClick={() =>
                  window.open(
                    "https://the-district-ekkamai.hotelrunner.com/bv3/search",
                    "_blank",
                  )
                }
                className="hidden sm:block border border-white text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-brand hover:border-brand hover:text-black transition-all duration-300 cursor-pointer"
              >
                {t("checkAvailability")}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Modals */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onBookingClick={() => {
          setIsMenuOpen(false);
          setIsBookingOpen(true);
        }}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default Header;
