import { ImpactCounterSection } from "@/components/home/impact-counter-section";
import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Impact Tracker | LoopTech",
  description:
    "See the real-time impact LoopTech is making — students empowered, devices saved from landfills, and CO₂ emissions reduced.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live Impact Tracker"
        title={
          <>
            Real change,{" "}
            <span className="text-gradient-eco">measured.</span>
          </>
        }
        description="These numbers update in real time as students rent and devices are rescued. Together we're building a measurable legacy."
      />
      <ImpactCounterSection />
    </>
  );
}
