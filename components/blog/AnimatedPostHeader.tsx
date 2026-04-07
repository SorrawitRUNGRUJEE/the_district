"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedPostHeaderProps {
  children: ReactNode;
  title: string;
  date: string;
  tags: string[];
}

export default function AnimatedPostHeader({
  children,
  title,
  date,
  tags,
}: AnimatedPostHeaderProps) {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 w-full">
      <div className="max-w-5xl">
        {/* Mobile Navigation (Passed as children or handled here, children is more flexible) */}
        {children}

        {/* Meta Info: High-contrast Brand Hierarchy (Fixed to vivid brand for hero clarity) */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 mb-10"
        >
          {/* Date Level - High Visibility (Fixed to pure yellow #fece00) */}
          <div className="flex items-center gap-4">
            <p className="text-[9px] font-black text-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-[#fece00] italic shrink-0 shadow-[0_10px_20px_-5px_rgba(254,206,0,0.3)]">
              {date}
            </p>
            <div className="h-px w-16 bg-[#fece00]/30" />
          </div>

          {/* Tags Level - Compact Branded Style (Fixed to pure yellow #fece00) */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="text-[8px] md:text-[9px] font-bold text-[#fece00] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-[#fece00]/30 bg-black/40 backdrop-blur-md hover:bg-[#fece00] hover:text-black hover:border-[#fece00] transition-all duration-300 whitespace-nowrap"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Fluid Header Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-white italic drop-shadow-2xl"
        >
          {title}
        </motion.h1>
      </div>
    </div>
  );
}
