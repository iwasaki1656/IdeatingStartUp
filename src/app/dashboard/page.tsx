import { PageHeader } from "@/components/shared/page-header";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata = {
  title: "My Page / Dashboard — LoopTech",
  description:
    "Manage your active rental, payment history, and student verification status.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="My Page"
        title={
          <>
            Your <span className="text-gradient-neon">dashboard.</span>
          </>
        }
        description="Track your rental contract, manage payments, and keep your student verification current — all in one place."
      />
      <DashboardClient />
    </>
  );
}
