import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

type TimeFilter = "7d" | "30d" | "mtd" | "qtd" | "ytd" | "itd";

interface DataCardsProps {
  timeFilter: TimeFilter;
}

// This would normally come from an API
const getMetrics = (timeFilter: TimeFilter) => {
  // For demo purposes, we're returning the same data regardless of filter
  return {
    totalWorkflows: { value: 2847, change: 12 },
    totalExceptions: { value: 156, change: -8 },
    timeSaved: { value: 1284, change: 24 },
    revenue: { value: 847000, change: 16 },
    activeClients: { value: 128, change: 5 },
  };
};

export default function DataCards({ timeFilter }: DataCardsProps) {
  const metrics = getMetrics(timeFilter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard
        title="Total Workflows"
        value={metrics.totalWorkflows.value.toLocaleString()}
        change={metrics.totalWorkflows.change}
      />
      <MetricCard
        title="Total Exceptions"
        value={metrics.totalExceptions.value.toLocaleString()}
        change={metrics.totalExceptions.change}
      />
      <MetricCard
        title="Time Saved"
        value={`${metrics.timeSaved.value.toLocaleString()}h`}
        change={metrics.timeSaved.change}
      />
      <MetricCard
        title="Revenue"
        value={`$${Math.round(metrics.revenue.value / 1000)}K`} // value={`$${Math.round(metrics.revenue / 1000)}K`}
        change={metrics.revenue.change}
      />
      <MetricCard
        title="Active Clients"
        value={metrics.activeClients.value.toLocaleString()}
        change={metrics.activeClients.change}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
}

function MetricCard({ title, value, change }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-[#1f2937]">{title}</h3>
          <div
            className={cn(
              "flex items-center text-xs font-medium",
              isPositive ? "text-[#1d8560]" : "text-[#ce4343]"
            )}
          >
            {isPositive ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}
