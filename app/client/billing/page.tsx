import { BillingActions } from "@/components/layout/client/billing/billing-actions";
import { BillingOverview } from "@/components/layout/client/billing/billing-overview";
import { RecentInvoices } from "@/components/layout/client/billing/recent-invoices";
import { UsageSummary } from "@/components/layout/client/billing/usage-summary";

export default function BillingDashboard() {
  return (
    <div className="flex h-screen bg-[#faf9f8]">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <BillingOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-stretch">
              <div className="lg:col-span-1 h-full">
                <UsageSummary />
              </div>
              <div className="h-full">
                <RecentInvoices />
              </div>
            </div>

            <BillingActions />
          </div>
        </main>
      </div>
    </div>
  );
}
