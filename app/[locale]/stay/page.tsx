import GrowOnHover from "@/components/growOnHover";
import { useTranslations } from "next-intl";

export default function StayPage() {
  const t = useTranslations("StayPage");


  return (
    <main className="min-h-screen bg-muted flex flex-col">
<GrowOnHover panels={[
  {
    id: "left",                                              // unique identifier
    label: "Hostel",                                   // big heading text
    subtitle: "At the epicentre of Thong Lor's hip culinary scene", // small text below
    image: "/images/story/top.jpg",                       // background image path
    href: "/stay/hostel",                                   // where to go on click
  },
  {
    id: "right",
    label: "Residence",
    subtitle: "Refreshing beverages that you can find here",
    image: "/images/story/top.jpg",
    href: "/stay/residence",
  },
]} />
    </main>
  );
}
