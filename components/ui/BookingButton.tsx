"use client";

import { useTranslations } from "next-intl";
import { BRAND_INFO } from "@/lib/constants";

interface BookingButtonProps {
  className?: string;
  onClick?: () => void;
}

const BookingButton = ({ className, onClick }: BookingButtonProps) => {
  const t = useTranslations("Navigation");

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    window.open(BRAND_INFO.links.booking, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`border border-white text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-brand hover:border-brand hover:text-black transition-all duration-300 cursor-pointer ${className}`}
    >
      {t("checkAvailability")}
    </button>
  );
};

export default BookingButton;
