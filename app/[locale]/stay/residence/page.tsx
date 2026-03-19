// app/[locale]/stay/residence/page.tsx
import CategoryPage from "@/components/category";

export default function ResidencePage() {
  return (
    <CategoryPage
      category="STAY"
      heading="Residence"
      tagline="Long stays, elevated living"
      description="For those who want to linger. Our residences offer fully appointed suites with kitchen facilities, premium finishes, and the warmth of a home in Thonglor."
      options={[
        { title: "Studio Suite", subtitle: "COMPACT LUXURY", image: "/images/stay/residence/studio.jpg", href: "/stay/residence/studio" },
        { title: "One Bedroom", subtitle: "SPACE TO BREATHE", image: "/images/stay/residence/one-bed.jpg", href: "/stay/residence/one-bed" },
        { title: "Two Bedroom", subtitle: "ROOM FOR EVERYONE", image: "/images/stay/residence/two-bed.jpg", href: "/stay/residence/two-bed" },
      ]}
    />
  );
}