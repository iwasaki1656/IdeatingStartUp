import { PageHeader } from "@/components/shared/page-header";
import { BuybackClient } from "@/components/buyback/buyback-client";

export const metadata = {
  title: "Sell or Donate a PC — LoopTech",
  description:
    "Get an instant buyback estimate for your used laptop, or donate for Eco-Contribution Points. Corporate bulk pickups with Data Destruction Certificates.",
};

export default function BuybackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Give / Sell a PC"
        title={
          <>
            Turn your old PC into <span className="text-gradient-eco">impact.</span>
          </>
        }
        description="Individuals get instant cash estimates. Corporates get bulk pickups with Data Destruction Certificates and SDGs Contribution Reports for ESG auditing."
      />
      <BuybackClient />
    </>
  );
}
