"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "@/i18n/routing";

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

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center gap-6 mb-8"
        >
          <p className="text-brand text-[10px] font-black italic uppercase tracking-[0.5em]">
            {date}
          </p>
          <div className="h-px w-12 bg-white/20" />
          <div className="flex gap-4">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] hover:text-brand transition-colors"
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
