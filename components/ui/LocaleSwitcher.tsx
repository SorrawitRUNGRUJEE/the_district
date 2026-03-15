"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", flag: "/icons/flags/flag-uk.svg", label: "English" },
    { code: "th", flag: "/icons/flags/flag-th.svg", label: "ไทย" },
    { code: "cn", flag: "/icons/flags/flag-cn.svg", label: "中文" },
  ];

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const onSelectChange = (nextLocale: string) => {
    if (nextLocale === locale) return;
    setIsOpen(false);
    startTransition(() => {
      // @ts-expect-error - params is a dynamic object from Next.js 15
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  };

  /**
   * Close dropdown on click outside or Escape key
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Selection Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`cursor-pointer flex items-center transition-all hover:scale-110 active:scale-95 ${isPending ? "opacity-50" : ""}`}
      >
        <div className="relative h-4 w-6 overflow-hidden rounded-sm shadow-md">
          <Image
            src={currentLang.flag}
            alt={currentLang.label}
            fill
            className="object-cover"
          />
        </div>
      </button>

      {/* Language Options Dropdown */}
      <div
        className={`
          absolute top-full mt-4 w-44 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl z-20 transition-all duration-300 ease-out right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2
          
          ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="py-2">
          {languages.map((lang) => {
            const isActive = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectChange(lang.code)}
                className="flex w-full items-center justify-between px-5 py-3 transition-colors cursor-pointer text-left hover:bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-4 w-5 shrink-0 overflow-hidden rounded-[1px] opacity-80">
                    <Image
                      src={lang.flag}
                      alt={lang.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span
                    className={`text-[10px] font-bold tracking-[0.2em] transition-colors ${
                      isActive ? "text-brand" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {lang.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
