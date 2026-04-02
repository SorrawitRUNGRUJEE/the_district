"use client";

import MenuOverlay from "@/components/header/MenuOverlay";
import BookingButton from "@/components/ui/BookingButton";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Returns true when this link matches the current page
  const isActive = (href: string) => {
    if (href === "/") return pathname.split("/").length === 2;
    return pathname.includes(href);
  };

  const navLinks = [
    { href: "/story", label: t("story") },
    { href: "/stay", label: t("stay") },
    { href: "/gallery", label: t("gallery") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      {/* Sticky Header with Advanced Glassmorphism */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-xl border-b border-border transition-all duration-300">
        {/* Visual Layers: Background */}
        <div className="absolute inset-0 bg-background/55 -z-20" />

        {/* Main Header Content Container */}
        <div className="relative z-10 flex items-center justify-between py-5 px-6">
          {/* Brand & Menu Trigger */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group/menu relative h-8 w-8 shrink-0 cursor-pointer"
              aria-label="Open Menu"
            >
              <div
                className="w-full h-full bg-foreground transition-colors duration-300 group-hover/menu:bg-brand"
                style={{
                  WebkitMaskImage: "url(/icons/ui/menu.svg)",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: "url(/icons/ui/menu.svg)",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              />
            </button>

            <Link
              href="/"
              className="group/brand flex flex-row items-end gap-2"
            >
              {/* Logo Image — glows when on home page as 'selected' state */}
              <div
                className={`relative h-8 md:h-10 aspect-square overflow-hidden rounded-lg transition-all duration-500 group-hover/brand:drop-shadow-brand ${isActive("/") ? "drop-shadow-brand" : ""}`}
              >
                <Image
                  src="/images/branding/logo.webp"
                  alt="The District Logo"
                  fill
                  className="object-contain"
                />
              </div>

              {/* 'Hostel' subtitle — brand color when on home page */}
              <span
                className={`text-[7px] md:text-[9px] font-bold tracking-[0.4em] uppercase transition-all duration-700 group-hover/brand:tracking-[0.6em] pb-0.5 ${
                  isActive("/")
                    ? "text-brand group-hover/brand:text-shadow-brand"
                    : "text-foreground/30 group-hover/brand:text-brand"
                }`}
              >
                Hostel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation & CTAs */}
          <div className="flex items-center gap-4 lg:gap-8">
            <nav className="hidden lg:flex gap-8 text-foreground text-sm tracking-[0.2em] uppercase">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-bold transition-all duration-300 relative pb-0.5 ${
                    isActive(link.href)
                      ? "text-brand after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-brand hover:text-shadow-brand"
                      : "text-foreground hover:text-brand hover:text-shadow-brand"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 lg:gap-6">
              <div className="hidden lg:block w-0.5 h-6 border-l-2 border-border-strong" />

              <ThemeToggle />

              <div className="hidden lg:block w-0.5 h-6 border-l-2 border-border-strong" />

              <LocaleSwitcher />

              <BookingButton className="hidden sm:block px-6 py-2" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Modals */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
