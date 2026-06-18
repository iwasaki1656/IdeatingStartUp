import { PageHeader } from "@/components/shared/page-header";
import { CatalogClient } from "@/components/catalog/catalog-client";

export const metadata = {
  title: "Device Catalog — LoopTech",
  description:
    "Browse and rent certified, eco-refurbished laptops. Filter by CPU, RAM, storage, and student use cases.",
};

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Device Catalog"
        title={
          <>
            Find your <span className="text-gradient-neon">perfect study PC.</span>
          </>
        }
        description="Every device is certified, sanitized, and ready to learn on. New and rebuilt options, transparent specs, and student-tier pricing."
      />
      <CatalogClient />
    </>
  );
}
