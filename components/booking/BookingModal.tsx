"use client";

import SafeImage from "@/components/ui/SafeImage";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GUEST_OPTIONS = ["1-2", "3-4", "5-6", "7+"];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const t = useTranslations("Booking");
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState("1-2");
  const [month, setMonth] = useState<Date>(new Date());

  const defaultClassNames = getDefaultClassNames();

  // Block past dates based on current local time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setMonth((prev) => dayjs(prev).add(1, "month").toDate());
      if (e.key === "ArrowLeft")
        setMonth((prev) => dayjs(prev).subtract(1, "month").toDate());
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCheck = () => {
    if (range?.from && range?.to) {
      const start = dayjs(range.from).format("DD MMM YYYY");
      const end = dayjs(range.to).format("DD MMM YYYY");
      alert(t("alertMessage", { guests, start, end }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Softer Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-200 bg-black/50 backdrop-blur-sm"
          />

          {/* Neutral Toned Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 z-201 w-full bg-neutral-900 p-6 text-white lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:max-w-[420px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-3xl shadow-2xl border border-white/5 outline-none"
            tabIndex={-1}
          >
            <button
              onClick={onClose}
              title="Close (Esc)"
              className="absolute right-6 top-6 text-xl text-neutral-500 hover:text-brand transition-colors cursor-pointer"
            >
              ✕
            </button>

            <h2 className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
              {t("header")}
            </h2>

            {/* Calendar with Neutral Background */}
            <div className="mb-8 flex justify-center bg-neutral-950/50 p-4 rounded-2xl border border-white/5">
              <style>
                {`
                  .rdp-root {
                    --rdp-accent-color: #FECE00;
                    --rdp-range_middle-background-color: rgba(254, 206, 0, 0.08);
                    --rdp-range_middle-color: #FECE00;
                    --rdp-range_start-background: #FECE00;
                    --rdp-range_end-background: #FECE00;
                  }
                  .rdp-day { color: #a3a3a3; transition: all 0.2s; }
                  .rdp-day:hover:not([disabled]) { background-color: rgba(254, 206, 0, 0.1) !important; color: #FECE00 !important; }
                  .rdp-selected { color: white !important; font-weight: bold; }
                  .rdp-chevron { fill: #FECE00 !important; }
                `}
              </style>
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                month={month}
                onMonthChange={setMonth}
                disabled={{ before: today }}
                classNames={{
                  ...defaultClassNames,
                  root: `${defaultClassNames.root} border-none font-sans`,
                  today: `text-brand font-bold underline underline-offset-4`,
                }}
              />
            </div>

            {/* Guest Selection with Neutral Accents */}
            <div className="mb-8">
              <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                {t("guestsLabel")}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {GUEST_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setGuests(option)}
                    className={`flex items-center justify-center gap-3 rounded-xl border py-4 transition-all duration-300 cursor-pointer ${
                      guests === option
                        ? "border-brand bg-brand/5 text-brand"
                        : "border-white/5 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700"
                    }`}
                  >
                    <span className="text-sm font-bold">{option}</span>
                    <div className="w-4 h-4 overflow-hidden rounded-[2px]">
                      <SafeImage
                        src="/icons/ui/users.svg"
                        alt="Users"
                        className={`transition-colors duration-300 ${
                          guests === option ? "bg-brand" : "bg-neutral-600"
                        }`}
                        unoptimized
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Actions */}
            <div className="space-y-3">
              <button
                disabled={!range?.from || !range?.to}
                onClick={handleCheck}
                className={`w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] shadow-lg transition-all active:scale-[0.98] rounded-2xl cursor-pointer ${
                  !range?.from || !range?.to
                    ? "bg-neutral-800 text-neutral-500 opacity-50 cursor-not-allowed"
                    : "bg-brand text-neutral-600 hover:brightness-110"
                }`}
              >
                {!range?.from || !range?.to ? t("selectDates") : t("confirm")}
              </button>

              {range && (
                <button
                  onClick={() => setRange(undefined)}
                  className="w-full text-[10px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                >
                  {t("clear")}
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
