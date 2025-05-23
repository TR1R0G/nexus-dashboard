// app/admin/page.tsx
import DataCard from "@/components/ui/DataCard";
import { fetchAdminKpis } from "@/lib/queries/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const kpi = await fetchAdminKpis();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <DataCard title="Total Workflows" value={kpi.totalWorkflows} />
      <DataCard title="Total Exceptions" value={kpi.totalExceptions} />
      <DataCard title="Revenue" value={`$${kpi.revenue}`} />
      <DataCard title="Active Clients" value={kpi.activeClients} />
      <DataCard title="Time Saved (h)" value={kpi.timeSaved} />
    </div>
  );
}
