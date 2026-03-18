"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  containerClass?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16",
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`pt-32 pb-16 text-center bg-card border-b border-border transition-colors duration-300 ${className}`}
    >
      <div className={containerClass}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] uppercase text-foreground mb-6 leading-none">
            {title}
          </h1>

          <div className="h-px w-24 bg-brand/50 shadow-[0_0_15px_rgba(254,206,0,0.3)]" />

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-8 max-w-2xl text-[10px] md:text-[11px] font-medium tracking-[0.4em] text-foreground/40 uppercase leading-relaxed italic"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
