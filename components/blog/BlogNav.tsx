"use client";

import { LAYOUT_CONFIG } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

interface BlogNavProps {
  allTags: { name: string; count: number }[];
  selectedTag: string | null;
  allLabel: string;
  totalCount: number;
  containerClass?: string;
}

export default function BlogNav({
  allTags,
  selectedTag,
  allLabel,
  totalCount,
  containerClass = LAYOUT_CONFIG.containerClass,
}: BlogNavProps) {
  const t = useTranslations("BlogPage");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialScrollY = useRef(0);

  // Close menu on significant scroll
  useEffect(() => {
    if (!isNavOpen) return;

    // Capture scroll position when opened
    initialScrollY.current = window.scrollY;

    const handleScroll = () => {
      const scrollDiff = Math.abs(window.scrollY - initialScrollY.current);
      if (scrollDiff > 80) {
        // Threshold to prevent accidental close
        setIsNavOpen(false);
      }
    };

    // Add delay before listening to avoid immediate trigger from the open click/touch if it has momentum
    const timeout = setTimeout(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNavOpen]);

  const selectTag = (tag: string | null) => {
    setIsNavOpen(false);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (tag) {
        params.set("tag", tag);
      } else {
        params.delete("tag");
      }
      params.set("page", "1");
      router.push(`blog?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="sticky top-[80px] z-60 transition-all font-bold py-6 pointer-events-none">
      {/* Click Outside Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsNavOpen(false)}
            className="fixed inset-0 bg-transparent pointer-events-auto z-[-1]"
          />
        )}
      </AnimatePresence>

      <div
        className={`${containerClass} relative flex items-center justify-between pointer-events-none min-h-[44px]`}
      >
        {/* LEFT: Active Tag Indicator (Floating Pill) */}
        <div className="flex-none min-w-[120px] md:min-w-[160px] h-full flex items-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {!isNavOpen && (
              <motion.div
                key={selectedTag || "all"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-brand text-black text-[10px] font-black tracking-widest uppercase px-5 py-2.5 italic rounded-full inline-flex items-center gap-1 shadow-[0_10px_40px_-10px_rgba(var(--brand-rgb),0.5)] border border-white/20 select-none cursor-default"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>{t("filter.updating")}</span>
                  </div>
                ) : selectedTag ? (
                  <>
                    <span className="opacity-40">#</span>
                    <span className="truncate max-w-[140px] md:max-w-[400px]">
                      {selectedTag}{" "}
                      <span className="opacity-50 ml-1">
                        (
                        {allTags.find((t) => t.name === selectedTag)?.count ||
                          0}
                        )
                      </span>
                    </span>
                  </>
                ) : (
                  <span>
                    {allLabel}{" "}
                    <span className="opacity-50 ml-1">({totalCount})</span>
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER: Floating Menu (Visible when open) */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10 w-full flex justify-center top-1/2 -translate-y-1/2 pointer-events-none">
          <AnimatePresence>
            {isNavOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="bg-background/95 backdrop-blur-3xl border border-border/50 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-4 transition-shadow duration-500 overflow-hidden pointer-events-auto"
              >
                <div className="px-8 pt-6 pb-4 flex flex-col items-center gap-8 min-w-[300px]">
                  {/* Selection Grid */}
                  <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 max-w-4xl">
                    {/* All Posts */}
                    <button
                      onClick={() => selectTag(null)}
                      disabled={isPending}
                      className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 ${
                        !selectedTag
                          ? "text-brand scale-110"
                          : "text-soft-foreground hover:text-brand"
                      }`}
                    >
                      {allLabel} ({totalCount})
                    </button>

                    <div className="hidden lg:block h-3 w-px bg-border/40" />

                    {/* Individual Tags */}
                    {allTags.map((tag) => (
                      <button
                        key={tag.name}
                        onClick={() => selectTag(tag.name)}
                        disabled={isPending}
                        className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 ${
                          selectedTag === tag.name
                            ? "text-brand scale-110"
                            : "text-soft-foreground hover:text-brand"
                        }`}
                      >
                        {tag.name} ({tag.count})
                      </button>
                    ))}
                  </div>

                  {/* Inline Close Button (Integrated) */}
                  <button
                    onClick={() => setIsNavOpen(false)}
                    className="flex flex-col items-center gap-1 group transition-all"
                  >
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase text-foreground/30 group-hover:text-brand transition-colors">
                      {t("filter.close")}
                    </span>
                    <motion.div
                      className="w-4 h-4 bg-foreground/20 group-hover:bg-brand transition-colors"
                      style={{
                        maskImage: "url(/icons/ui/chevron-down.svg)",
                        WebkitMaskImage: "url(/icons/ui/chevron-down.svg)",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        transform: "rotate(180deg)",
                      }}
                    />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Explore Toggle (Floating Pill - Hidden when open) */}
        <div className="flex-none text-right h-full flex items-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {!isNavOpen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => setIsNavOpen(true)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 transition-all group min-w-[110px] md:min-w-[160px] rounded-full shadow-xl bg-surface/80 backdrop-blur-md border border-border text-foreground/50 hover:bg-brand/10 hover:border-brand/30 hover:text-brand"
              >
                <span className="text-[10px] font-black tracking-widest uppercase italic leading-none">
                  {t("filter.explore")} ({allTags.length})
                </span>
                <div
                  className="w-3 h-3 bg-foreground/20 group-hover:bg-brand transition-colors"
                  style={{
                    maskImage: "url(/icons/ui/chevron-down.svg)",
                    WebkitMaskImage: "url(/icons/ui/chevron-down.svg)",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                  }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
