// app/[locale]/dine/bars/page.tsx
import CategoryPage from "@/components/category";

export default function BarsPage() {
  return (
    <CategoryPage
      category="DINE"
      heading="Bars"
      tagline="Refreshing beverages that you can find here"
      description="Whether you're after a post-swim spritz or a craft cocktail at midnight, our bars set the mood with inventive pours and local spirits."
      options={[
        { title: "The Lobby Bar", subtitle: "COCKTAILS & CONVERSATION", image: "/images/dine/bars/lobby.jpg", href: "/dine/bars/lobby" },
        { title: "Pool Bar", subtitle: "SIPS BY THE WATER", image: "/images/dine/bars/pool.jpg", href: "/dine/bars/pool" },
        { title: "Night Bar", subtitle: "WHERE THE EVENING STARTS", image: "/images/dine/bars/night.jpg", href: "/dine/bars/night" },
      ]}
    />
  );
}