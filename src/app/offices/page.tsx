import { PageHeader } from "@/components/shared/page-header";
import { OfficesClient } from "@/components/offices/offices-client";

export const metadata = {
  title: "Office Network — LoopTech",
  description:
    "Locate LoopTech support and self-pickup centers across Malaysia. Kuala Lumpur, Selangor, Penang, Johor, Sabah & Sarawak.",
};

export default function OfficesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Malaysia Network"
        title={
          <>
            Find us <span className="text-gradient-neon">near you.</span>
          </>
        }
        description="Self-pickup your device for free, get repairs, or sell us your used PC. Toggle between map and card views."
      />
      <OfficesClient />
    </>
  );
}
