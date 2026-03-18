"use client";

import BookingButton from "@/components/ui/BookingButton";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [animate, setAnimate] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  const isActive = (href: string) => {
    if (href === "/") return pathname.split("/").length === 2;
    return pathname.includes(href);
  };

  const getLinkClass = (href: string, animateState: boolean, delay: string) => {
    return `w-full py-3 text-center text-base font-bold tracking-[0.25em] uppercase transition-all duration-400 relative ${
      animateState ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
    } ${delay} cursor-pointer ${
      isActive(href)
        ? "text-brand after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-px after:bg-brand hover:text-shadow-brand"
        : "text-foreground/80 hover:text-brand hover:text-shadow-brand"
    }`;
  };

  // Sync animation state with visibility toggle
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) setAnimate(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setAnimate(true), 10);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mainItems = [
    { label: t("home"), href: "/" },
    { label: t("story"), href: "/story" },
    { label: t("gallery"), href: "/gallery" },
    { label: t("blog"), href: "/blog" },
    { label: t("contact"), href: "/contact" },
  ];

  const secondaryItems = [
    { label: t("stay"), href: "/stay" },
    { label: t("dine"), href: "/dine" },
    { label: t("neighbourhood"), href: "/neighbourhood" },
  ];

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-100 flex items-center justify-center bg-background/60 backdrop-blur-xl transition-opacity duration-400 ease-out overflow-y-auto ${animate ? "opacity-100" : "opacity-0"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-full flex-col bg-background/95 text-foreground shadow-2xl transition-all duration-400 ease-out h-full lg:h-auto lg:max-w-lg lg:border lg:border-border lg:rounded-2xl ${animate ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0"}`}
      >
        <button
          onClick={onClose}
          className="fixed right-6 top-6 z-120 text-3xl font-light text-foreground/40 hover:text-brand hover:rotate-90 lg:absolute cursor-pointer transition-all"
        >
          ✕
        </button>

        <nav className="flex flex-col items-center px-8 py-24 lg:py-16">
          <div className="flex w-full flex-col items-center">
            {/* Primary Navigation (Mobile Only) */}
            <div className="flex w-full flex-col items-center lg:hidden">
              {mainItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={getLinkClass(
                    item.href,
                    animate,
                    `[transition-delay:${index * 30 + 50}ms]`,
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Secondary Navigation Items */}
            {secondaryItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={getLinkClass(
                  item.href,
                  animate,
                  `[transition-delay:${(index + 4) * 30 + 50}ms]`,
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Booking CTA (Mobile Only) */}
          <div
            className={`mt-10 w-full flex justify-center lg:hidden transition-all duration-400 delay-300 ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          >
            <BookingButton
              onClick={onClose}
              className="w-full max-w-[240px] px-6 py-4 tracking-[0.3em]"
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MenuOverlay;
