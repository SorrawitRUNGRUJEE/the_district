"use client";

import { BRAND_INFO } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function FloatingMessenger() {
  const [isOpen, setIsOpen] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
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

  // Prevent background scrolling while modal is active & support ESC key to close
  useEffect(() => {
    if (!showQrModal) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowQrModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showQrModal]);

  const handleLineClick = (e: React.MouseEvent) => {
    // Intercept desktop clicks to show modal instead of redirecting to the blank LINE webpage
    if (window.innerWidth >= 768) {
      e.preventDefault();
      setShowQrModal(true);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQrModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-soft border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full z-10"
            >
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              <h3 className="text-brand text-[10px] font-black tracking-[0.4em] uppercase mb-6 italic text-center">
                {t("scanToChat")}
              </h3>

              <div className="bg-white p-4 rounded-2xl w-full aspect-square mb-6 relative">
                <Image
                  src="/images/social/line-qr.png"
                  alt="LINE QR Code"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain"
                  priority={false}
                />
              </div>

              <p className="text-surface-foreground text-sm text-center font-light leading-relaxed">
                {t("scanInstruction")}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-xl border border-border text-xs font-semibold text-neutral-900 whitespace-nowrap">
                {t("tagline")}
              </div>

              <Link
                href={BRAND_INFO.socials.line}
                onClick={handleLineClick}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#00C300] shadow-lg hover:scale-110 transition-transform cursor-pointer"
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

              <Link
                href={BRAND_INFO.socials.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0084FF] shadow-lg hover:scale-110 transition-transform cursor-pointer"
                title="Facebook Messenger"
              >
                <span className="sr-only">Facebook Messenger</span>
                <div
                  className="w-7 h-7 bg-white"
                  style={{
                    WebkitMaskImage:
                      "url(/icons/social/facebook-messenger.svg)",
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
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#fece00] text-black shadow-xl hover:bg-[#ffde4d] transition-colors active:scale-95 z-50 relative cursor-pointer"
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
    </>
  );
}
