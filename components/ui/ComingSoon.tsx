"use client";

import { motion } from "framer-motion";

interface ComingSoonProps {
  statusText: string;
  description: string;
  establishmentText?: string;
  containerClass?: string;
}

export default function ComingSoon({
  statusText,
  description,
  establishmentText = "EST. 2025 — THE DISTRICT",
  containerClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16",
}: ComingSoonProps) {
  return (
    <section className="bg-neutral-900 py-32 grow flex flex-col items-center justify-center">
      <div className={containerClass}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center text-center px-8 py-12 md:px-20 md:py-16 bg-black/40 backdrop-blur-xl border border-white/5 rounded-sm max-w-2xl mx-auto shadow-2xl"
        >
          <div className="bg-white/5 px-6 py-2 border-x border-white/20 mb-8">
            <p className="text-lg md:text-xl font-light tracking-[0.4em] text-white uppercase italic">
              {statusText}
            </p>
          </div>

          <p className="max-w-md text-[11px] md:text-[12px] font-light tracking-[0.3em] text-white/50 uppercase leading-relaxed whitespace-pre-line">
            {description}
          </p>

          <div className="mt-12 text-[9px] tracking-[0.5em] text-brand font-black opacity-60 italic">
            {establishmentText}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
