// components/category/index.tsx
"use client";

import SafeImage from "@/components/ui/SafeImage";
import { Link } from "@/i18n/routing";

interface Option {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export interface CategoryPageProps {
  category: string;
  heading: string;
  tagline: string;
  description: string;
  options: Option[];
}

const CategoryPage = ({ category, heading, tagline, description, options = [] }: CategoryPageProps) => {
  return (
    <div className="flex min-h-screen pt-24">

      {/* LEFT — Sticky description */}
      <aside className="hidden md:flex flex-col justify-start sticky top-24 self-start w-[38%] shrink-0 px-10 lg:px-16 py-10 gap-6">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand">
          {category}
        </p>
        <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-foreground" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
          {heading}
        </h1>
        <p className="text-base text-foreground/60 italic" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
          {tagline}
        </p>
        <p className="text-sm font-light leading-relaxed text-foreground/70 tracking-wide max-w-sm">
          {description}
        </p>
      </aside>

      {/* Divider */}
      <div className="hidden md:block w-px bg-border self-stretch mx-2" />

      {/* RIGHT — Scrollable options */}
      <main className="flex-1 overflow-y-auto px-8 lg:px-12 py-10">

        {/* Mobile heading */}
        <div className="md:hidden mb-8 space-y-2">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand">{category}</p>
          <h1 className="text-3xl font-light" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>{heading}</h1>
          <p className="text-sm text-foreground/60 italic" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>{tagline}</p>
          <p className="text-sm font-light leading-relaxed text-foreground/70">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {options.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              className="group flex flex-col gap-3 cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
                <SafeImage
                  src={option.image}
                  alt={option.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-light text-brand" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                  {option.title}
                </p>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/50">
                  {option.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;