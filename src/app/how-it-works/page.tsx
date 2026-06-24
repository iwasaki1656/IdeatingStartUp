import { UserGuideSection } from "@/components/home/user-guide-section";
import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "How It Works | LoopTech",
  description:
    "Rent a certified eco-refurbished laptop in 4 simple steps. LoopTech makes getting a PC easy, affordable, and sustainable.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How It Works"
        title={
          <>
            Rent a PC in{" "}
            <span className="text-gradient-neon">4 simple steps.</span>
          </>
        }
        description="From browsing our catalog to having a laptop at your door — the entire process is designed to be fast, affordable, and stress-free."
      />
      <UserGuideSection />
    </>
  );
}
