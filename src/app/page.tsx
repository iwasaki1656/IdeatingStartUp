import { ModelSection } from "@/components/home/model-section";
import { HeroSection } from "@/components/home/hero-section";
import { VisionSection } from "@/components/home/vision-section";
import { ImpactCounterSection } from "@/components/home/impact-counter-section";
import { UserGuideSection } from "@/components/home/user-guide-section";

export default function HomePage() {
  return (
    <>
      <ModelSection />
      <HeroSection />
      <VisionSection />
      <ImpactCounterSection />
      <UserGuideSection />
    </>
  );
}
