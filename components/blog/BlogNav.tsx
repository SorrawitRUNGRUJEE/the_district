"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface BlogNavProps {
  allTags: { name: string; count: number }[];
  selectedTag: string | null;
  allLabel: string;
  totalCount: number;
  containerClass: string;
}

export default function BlogNav({
  allTags,
  selectedTag,
  allLabel,
  totalCount,
  containerClass,
}: BlogNavProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const selectTag = (tag: string | null) => {
    // Close mobile nav immediately for "instant" action feel
    if (!isDesktop) setIsNavOpen(false);

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
    <div className="sticky top-[72px] z-30 transition-all font-bold">
      {/* Dynamic Background Wrapper */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isNavOpen
            ? "bg-card/95 backdrop-blur-md opacity-100"
            : "bg-transparent opacity-0"
        } md:bg-card/90 md:backdrop-blur-md md:opacity-100`}
      />

      <div className={`${containerClass} relative z-10 py-2 md:py-4`}>
        <div className="flex flex-col">
          {/* Mobile Header Row: Toggle + Active Tag Indicator */}
          <div className="md:hidden flex items-center justify-between gap-4">
            {/* Top Left Pill Indicator */}
            <div className="flex-1 overflow-hidden h-6 flex items-center">
              <AnimatePresence mode="wait">
                {isPending ? (
                  <motion.div
                    key="spinner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-3 h-3 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
                    <span className="text-[8px] font-black uppercase italic text-brand animate-pulse">
                      Updating...
                    </span>
                  </motion.div>
                ) : (
                  !isNavOpen && (
                    <motion.div
                      key={selectedTag || "all"}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="bg-brand text-black text-[9px] font-black tracking-widest uppercase px-3 py-1 italic rounded-full inline-flex items-center gap-1 shadow-lg border border-white/5"
                    >
                      {selectedTag ? (
                        <>
                          <span className="opacity-40">#</span>
                          <span className="truncate max-w-[150px]">
                            {selectedTag}{" "}
                            <span className="opacity-50 ml-1">
                              (
                              {allTags.find((t) => t.name === selectedTag)
                                ?.count || 0}
                              )
                            </span>
                          </span>
                        </>
                      ) : (
                        <span>
                          {allLabel}{" "}
                          <span className="opacity-50 ml-1">
                            ({totalCount})
                          </span>
                        </span>
                      )}
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className={`flex items-center justify-center gap-2 px-4 py-1.5 transition-all group min-w-[120px] rounded-full border ${
                isNavOpen
                  ? "bg-brand/20 border-brand/50 text-brand"
                  : "bg-card/80 backdrop-blur-md border-border text-foreground/40 hover:bg-brand/10 hover:border-brand/30 hover:text-brand"
              }`}
            >
              <span className="text-[10px] font-black tracking-widest uppercase italic text-center leading-none">
                {isNavOpen ? "Close" : `Explore Topics (${allTags.length})`}
              </span>
              <motion.div
                animate={{ rotate: isNavOpen ? 180 : 0 }}
                className={`w-2.5 h-2.5 transition-colors ${
                  isNavOpen
                    ? "bg-brand"
                    : "bg-foreground/30 group-hover:bg-brand"
                }`}
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
            </button>
          </div>

          {/* Nav Content */}
          <motion.div
            initial={false}
            animate={{
              height: isDesktop || isNavOpen ? "auto" : 0,
              opacity: isDesktop || isNavOpen ? 1 : 0,
            }}
            className="overflow-hidden md:opacity-100! md:height-auto!"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-y-4 md:gap-x-10 pt-1 pb-1 md:pt-0 md:pb-0">
              {/* All Posts Option */}
              <button
                onClick={() => selectTag(null)}
                disabled={isPending}
                className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap hover:text-shadow-brand disabled:opacity-50 ${
                  !selectedTag
                    ? "text-brand scale-110"
                    : "text-muted-foreground hover:text-brand/80"
                }`}
              >
                {allLabel} ({totalCount})
              </button>

              <div className="hidden md:block h-3 w-px bg-border" />

              {/* Tag List */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 md:gap-x-10 justify-center">
                {allTags.map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => selectTag(tag.name)}
                    disabled={isPending}
                    className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap hover:text-shadow-brand disabled:opacity-50 ${
                      selectedTag === tag.name
                        ? "text-brand scale-110"
                        : "text-muted-foreground hover:text-brand/80"
                    }`}
                  >
                    {tag.name} ({tag.count})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
