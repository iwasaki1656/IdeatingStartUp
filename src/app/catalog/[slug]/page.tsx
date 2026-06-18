import { notFound } from "next/navigation";

import { devices, getDeviceBySlug } from "@/lib/data/devices";
import { PageHeader } from "@/components/shared/page-header";
import { DeviceDetailClient } from "@/components/catalog/device-detail-client";

export function generateStaticParams() {
  return devices.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const device = getDeviceBySlug(params.slug);
  if (!device) return { title: "Device not found — LoopTech" };
  return {
    title: `${device.name} — LoopTech`,
    description: device.studentDescription,
  };
}

export default function DeviceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const device = getDeviceBySlug(params.slug);
  if (!device) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${device.brand} · ${device.condition}`}
        title={device.name}
        description={`Certified for ${device.tags
          .map((t: string) => t.replace("For ", ""))
          .join(", ")
          .toLowerCase()}. Transparent specs, student-tier pricing.`}
      />
      <DeviceDetailClient device={device} />
    </>
  );
}
