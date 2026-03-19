"use client"
import { Link } from "@/i18n/routing";
import { useState } from "react";

interface Panel {
  id: string;
  label: string;
  subtitle: string;
  image: string;
  href: string;
}

interface GrowOnHoverProps {
  panels?: Panel[];
}

const GrowOnHover = ({ panels = [
  {
    id: "left",
    label: "RESTAURANTS",
    subtitle: "At the epicentre of Thong Lor's hip culinary scene",
    image: "/images/restaurants.jpg",
    href: "/restaurants",
  },
  {
    id: "right",
    label: "BARS",
    subtitle: "Refreshing beverages that you can find here",
    image: "/images/bars.jpg",
    href: "/bars",
  },
]}: GrowOnHoverProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const getWidth = (id: string) => {
    if (!hovered) return "50%";
    return hovered === id ? "80%" : "20%";
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {panels.map((panel) => (
        <Link
          key={panel.id}
          href={panel.href}
          style={{
            position: "relative",
            width: getWidth(panel.id),
            height: "100%",
            transition: "width 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
            cursor: "pointer",
            textDecoration: "none",
            display: "block",
          }}
          onMouseEnter={() => setHovered(panel.id)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Background image */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${panel.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: hovered === panel.id ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          }} />

          {/* Dark overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
          }} />

          {/* Bottom text */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "2.5rem 3rem",
            opacity: hovered && hovered !== panel.id ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}>
            <p style={{
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(1.2rem, 2vw, 2rem)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {panel.label}
            </p>
            <p style={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "serif",
              fontWeight: 300,
              fontSize: "clamp(0.8rem, 1vw, 1rem)",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {panel.subtitle}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GrowOnHover;