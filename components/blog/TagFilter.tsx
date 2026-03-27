"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface TagFilterProps {
  allTags: { name: string; count: number }[];
  selectedTags: string[];
  allLabel: string;
  totalCount: number;
}

export default function TagFilter({
  allTags,
  selectedTags,
  allLabel,
  totalCount,
}: TagFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Closes the library when clicking outside or pressing Escape
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newTags = [...selectedTags];

    if (newTags.includes(tag)) {
      newTags = newTags.filter((t) => t !== tag);
    } else {
      newTags.push(tag);
    }

    if (newTags.length > 0) {
      params.set("tag", newTags.join(","));
    } else {
      params.delete("tag");
    }

    params.set("page", "1");
    router.push(`blog?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    router.push("blog", { scroll: false });
  };

  return (
    /**
     * Sticky section with no background to maintain transparency.
     * pointer-events-none ensures background content remains clickable.
     */
    <section className="sticky py-6 top-[48px] z-30 pointer-events-none w-full">
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center pointer-events-auto relative py-4"
      >
        {/* Floating Control Capsule */}
        <div className="inline-flex flex-wrap justify-center items-center gap-x-6 gap-y-3 px-8 py-3 bg-surface/80 backdrop-blur-xl border border-border rounded-full shadow-2xl">
          <button
            onClick={clearAll}
            className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase pb-1 border-b-2 transition-all ${
              selectedTags.length === 0
                ? "border-brand text-brand"
                : "border-transparent text-soft-foreground/30 hover:text-foreground"
            }`}
          >
            {allLabel}{" "}
            <span className="text-[8px] opacity-40">({totalCount})</span>
          </button>

          {selectedTags.map((tagName) => (
            <button
              key={tagName}
              onClick={() => toggleTag(tagName)}
              className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase pb-1 border-b-2 border-brand text-brand animate-in fade-in zoom-in-95"
            >
              #{tagName}{" "}
              <span className="text-[8px] opacity-40">
                ({allTags.find((t) => t.name === tagName)?.count || 0})
              </span>
              <span className="ml-1 opacity-50">✕</span>
            </button>
          ))}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-[9px] font-black tracking-[0.2em] uppercase px-5 py-2 transition-all rounded-full border shadow-lg ${
              isOpen
                ? "bg-brand text-black border-brand scale-105"
                : "bg-background/5 text-soft-foreground/50 border-border hover:bg-background/10 hover:text-foreground"
            }`}
          >
            {isOpen ? "− CLOSE" : `+ EXPLORE TOPICS (${allTags.length})`}
          </button>
        </div>

        {/* Floating Library Panel (Absolute Overlay) */}
        {isOpen && (
          <div className="absolute top-full mt-4 w-full max-w-4xl p-10 bg-background/95 backdrop-blur-2xl border border-border rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-4 duration-500 z-50">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-3">
              {allTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.name);
                return (
                  <button
                    key={tag.name}
                    onClick={() => toggleTag(tag.name)}
                    className={`flex items-center gap-2 text-[9px] font-medium tracking-[0.2em] uppercase transition-all px-4 py-2.5 rounded-full border ${
                      isSelected
                        ? "bg-brand border-brand text-black font-black"
                        : "bg-background/3 border-border text-soft-foreground/40 hover:text-foreground hover:bg-background/8 hover:border-foreground/10"
                    }`}
                  >
                    #{tag.name}{" "}
                    <span
                      className={`text-[8px] ${isSelected ? "text-black/60" : "opacity-30"}`}
                    >
                      ({tag.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
