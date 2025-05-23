"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SortField =
  | "name"
  | "contractStart"
  | "workflows"
  | "nodes"
  | "executions"
  | "exceptions"
  | "revenue"
  | "timeSaved"
  | "moneySaved";
type SortDirection = "asc" | "desc";

// Sample data - would normally come from an API
const clients = [
  {
    id: 1,
    name: "Acme Corp",
    contractStart: "2025-01-15",
    workflows: 24,
    nodes: 156,
    executions: 1847,
    exceptions: 12,
    revenue: 24500,
    timeSaved: 284,
    moneySaved: 42600,
  },
  {
    id: 2,
    name: "Globex Industries",
    contractStart: "2024-11-03",
    workflows: 36,
    nodes: 210,
    executions: 2453,
    exceptions: 8,
    revenue: 36750,
    timeSaved: 412,
    moneySaved: 58200,
  },
  {
    id: 3,
    name: "Initech LLC",
    contractStart: "2025-02-22",
    workflows: 18,
    nodes: 92,
    executions: 1245,
    exceptions: 15,
    revenue: 18900,
    timeSaved: 196,
    moneySaved: 31400,
  },
  {
    id: 4,
    name: "Umbrella Corp",
    contractStart: "2024-12-10",
    workflows: 42,
    nodes: 278,
    executions: 3120,
    exceptions: 6,
    revenue: 52800,
    timeSaved: 520,
    moneySaved: 74500,
  },
];

export default function ClientsTable() {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Special handling for dates
    if (sortField === "contractStart") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    // Numeric comparison
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    // String comparison
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // Fallback
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="border border-[#e5e7eb] rounded-b-md overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#faf9f8] border-b border-[#e5e7eb]">
            <SortableTableHead
              title="Client Name"
              field="name"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableTableHead
              title="Contract Start"
              field="contractStart"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableTableHead
              title="Workflows"
              field="workflows"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableTableHead
              title="Nodes"
              field="nodes"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableTableHead
              title="Executions"
              field="executions"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableTableHead
              title="Exceptions"
              field="exceptions"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableTableHead
              title="Revenue"
              field="revenue"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableTableHead
              title="Time Saved"
              field="timeSaved"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableTableHead
              title="Money Saved"
              field="moneySaved"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client) => (
            <tr
              key={client.id}
              className="border-b border-[#e5e7eb] bg-white hover:bg-[#faf9f8]"
            >
              <td className="px-4 py-3 font-medium">
                <Link
                  href={`/clients/${client.id}`}
                  className="text-[#4e86cf] hover:underline"
                >
                  {client.name}
                </Link>
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/contracts/${client.id}`}
                  className="text-[#4e86cf] hover:underline"
                >
                  {new Date(client.contractStart).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Link>
              </td>
              <td className="px-4 py-3 text-center">
                <Link
                  href={`/clients/${client.id}/workflows`}
                  className="text-[#4e86cf] hover:underline"
                >
                  {client.workflows}
                </Link>
              </td>
              <td className="px-4 py-3 text-center">{client.nodes}</td>
              <td className="px-4 py-3 text-center">
                <Link
                  href={`/clients/${client.id}/executions`}
                  className="text-[#4e86cf] hover:underline"
                >
                  {client.executions.toLocaleString()}
                </Link>
              </td>
              <td className="px-4 py-3 text-center">
                <Link
                  href={`/clients/${client.id}/exceptions`}
                  className="text-[#4e86cf] hover:underline"
                >
                  {client.exceptions}
                </Link>
              </td>
              <td className="px-4 py-3 text-center">
                ${client.revenue.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center">{client.timeSaved}h</td>
              <td className="px-4 py-3 text-center">
                ${client.moneySaved.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface SortableTableHeadProps {
  title: string;
  field: SortField;
  currentSort: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}

function SortableTableHead({
  title,
  field,
  currentSort,
  direction,
  onSort,
}: SortableTableHeadProps) {
  const isActive = currentSort === field;

  return (
    <th className="px-4 py-3 text-left font-medium">
      <button
        className="flex items-center gap-1 group"
        onClick={() => onSort(field)}
      >
        {title}
        <span
          className={`ml-1 h-4 w-4 ${
            isActive ? "opacity-100" : "opacity-30 group-hover:opacity-60"
          }`}
        >
          {isActive ? (
            direction === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </span>
      </button>
    </th>
  );
}
