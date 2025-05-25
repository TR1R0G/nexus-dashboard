"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import useSWR from "swr";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

type Props = { timeFilter: string };

export default function DataCards({ timeFilter }: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/admin/dashboard?range=${timeFilter}`,
    fetcher
  );

  if (isLoading) return <p>Loading…</p>;
  if (error || !data?.current || !data?.previous) return <p>Error 😢</p>;

  const { current, previous } = data;

  /* ---------- change here ---------- */
  function pct(curr: number, prev: number) {
    if (!prev) return 0; // ← show ▲ 0 % instead of dash
    return ((curr - prev) / prev) * 100;
  }
  /* --------------------------------- */

  const stats = [
    { key: "total_workflows", label: "Total Workflows" },
    { key: "total_exceptions", label: "Total Exceptions" },
    { key: "time_saved", label: "Time Saved (h)" },
    { key: "revenue", label: "Revenue ($)" },
    { key: "active_clients", label: "Active Clients" },
  ] as const;

  return (
    <div className="grid lg:grid-cols-5 gap-4">
      {stats.map((s) => {
        // @ts-ignore  (indexed access)
        const curr = current[s.key] as number;
        // @ts-ignore
        const prev = previous[s.key] as number;
        return (
          <MetricCard
            key={s.key}
            title={s.label}
            value={s.key === "revenue" ? `$${curr}` : curr}
            change={pct(curr, prev)}
          />
        );
      })}
    </div>
  );
}

/* ----- presentational component (unchanged except for null-handling) ----- */

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number; // never null now
}

function MetricCard({ title, value, change }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white">
      <CardContent className="pt-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#1f2937]">{title}</h3>

          <span
            className={cn(
              "flex items-center text-xs font-medium",
              isPositive ? "text-[#1d8560]" : "text-[#ce4343]"
            )}
          >
            {isPositive ? (
              <ArrowUp className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDown className="mr-1 h-3 w-3" />
            )}
            {Math.abs(change).toFixed(0)}%
          </span>
        </div>

        <div className="text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}
