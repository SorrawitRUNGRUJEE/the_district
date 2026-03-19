import GrowOnHover from "@/components/growOnHover";
export default function DinePage() {



  return (
    <main className="min-h-screen bg-muted flex flex-col">
<GrowOnHover panels={[
  {
    id: "left",                                              // unique identifier
    label: "RESTAURANTS",                                   // big heading text
    subtitle: "At the epicentre of Thong Lor's hip culinary scene", // small text below
    image: "/images/dine/steak.jpg",                       // background image path
    href: "/dine/restaurants",                                   // where to go on click
  },
  {
    id: "right",
    label: "BARS",
    subtitle: "Refreshing beverages that you can find here",
    image: "/images/dine/cocktail.jpg",
    href: "/dine/bars",
  },
]} />
    </main>
  );
}
