import { VisionSection } from "@/components/home/vision-section";
import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Our Mission | LoopTech",
  description:
    "Learn how LoopTech is closing the digital divide for Malaysian students while fighting e-waste through circular technology.",
};

export default function MissionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Mission"
        title={
          <>
            A future where{" "}
            <span className="text-gradient-neon">learning</span> never stops —
            and nothing is{" "}
            <span className="text-gradient-eco">wasted.</span>
          </>
        }
        description="LoopTech sits at the intersection of two UN Sustainable Development Goals. Every rental is a vote for equal access and a circular economy."
      />
      <VisionSection />
    </>
  );
}
