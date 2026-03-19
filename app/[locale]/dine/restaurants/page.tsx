// app/[locale]/dine/restaurants/page.tsx
import CategoryPage from "@/components/category";

export default function RestaurantsPage() {
  return (
    <CategoryPage
      category="DINE"
      heading="Restaurants"
      tagline="At the epicentre of Thong Lor's hip culinary scene"
      description="From morning coffee rituals to late-night feasts, our restaurants bring together bold Bangkok flavours with an internationally inspired menu."
      options={[
        { title: "The Dining Room", subtitle: "ALL-DAY MODERN THAI", image: "/images/dine/restaurants/dining-room.jpg", href: "/dine/restaurants/dining-room" },
        { title: "Rooftop Kitchen", subtitle: "CITY VIEWS, ELEVATED PLATES", image: "/images/dine/restaurants/rooftop.jpg", href: "/dine/restaurants/rooftop" },
        { title: "The Courtyard", subtitle: "OPEN-AIR GARDEN DINING", image: "/images/dine/restaurants/courtyard.jpg", href: "/dine/restaurants/courtyard" },
      ]}
    />
  );
}