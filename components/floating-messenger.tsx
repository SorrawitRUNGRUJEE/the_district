"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function FloatingMessenger() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("FloatingMessenger");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col gap-3 mb-3 items-end"
          >
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-xl border border-neutral-100 text-xs font-semibold text-neutral-700 whitespace-nowrap">
              {t("tagline")}
            </div>

            {/* LINE */}
            <Link
              href="https://line.me/R/ti/p/@yourid"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#00C300] shadow-lg hover:scale-110 transition-transform"
              title="LINE"
            >
              <span className="sr-only">LINE</span>
              <div
                className="w-7 h-7 bg-white"
                style={{
                  WebkitMaskImage: "url(/icons/social/line.svg)",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: "url(/icons/social/line.svg)",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              />
            </Link>

            {/* Facebook Messenger */}
            <Link
              href="https://m.me/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0084FF] shadow-lg hover:scale-110 transition-transform"
              title="Facebook Messenger"
            >
              <span className="sr-only">Facebook Messenger</span>
              <div
                className="w-7 h-7 bg-white"
                style={{
                  WebkitMaskImage: "url(/icons/social/facebook-messenger.svg)",
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskImage: "url(/icons/social/facebook-messenger.svg)",
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-brand text-black shadow-xl hover:bg-brand-light transition-colors active:scale-95 z-50 relative"
        aria-label="Toggle Messenger"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center w-full h-full"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-900"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <div
              className="w-7 h-7 bg-neutral-900 -scale-x-100"
              style={{
                WebkitMaskImage: "url(/icons/ui/message.svg)",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: "url(/icons/ui/message.svg)",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            />
          )}
        </motion.div>
      </button>
    </div>
  );
}
