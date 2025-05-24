// components/client/ClientWorkflows.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-medium text-[#757575] uppercase tracking-wider">
      {children}
    </th>
  );
}

function TableCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 text-sm text-[#1f2937] ${className}`}>
      {children}
    </td>
  );
}

export default function ClientWorkflows() {
  const [workflows, setWorkflows] = useState([
    {
      date: "Jan 15, 2025",
      department: "Sales",
      name: "Lead Processing",
      nodes: 12,
      executions: 234,
      exceptions: 2,
      timeSaved: 30,
      moneySaved: 75,
      status: true,
    },
    {
      date: "Jan 10, 2025",
      department: "HR",
      name: "Onboarding",
      nodes: 8,
      executions: 45,
      exceptions: 0,
      timeSaved: 120,
      moneySaved: 180,
      status: true,
    },
  ]);

  function handleStatusChange(index: number, checked: boolean) {
    const confirmed = window.confirm(
      `Are you sure you want to ${
        checked ? "activate" : "deactivate"
      } this workflow?`
    );
    if (confirmed) {
      setWorkflows((prev) =>
        prev.map((w, i) => (i === index ? { ...w, status: checked } : w))
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1f2937]">Workflows</h2>
        <Button className="bg-[#000000] hover:bg-[#1f2937]">
          <Plus className="h-4 w-4 mr-2" />
          Add Workflow
        </Button>
      </div>

      <Card className="bg-white rounded-lg border border-[#e5e7eb] overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#faf9f8]">
                <TableHeader>Create Date</TableHeader>
                <TableHeader>Department</TableHeader>
                <TableHeader>Workflow Name</TableHeader>
                <TableHeader># of Nodes</TableHeader>
                <TableHeader># of Executions</TableHeader>
                <TableHeader># of Exceptions</TableHeader>
                <TableHeader>Time Saved</TableHeader>
                <TableHeader>$ Saved</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader> </TableHeader>
              </tr>
            </thead>
            <tbody>
              {workflows.map((workflow, index) => (
                <tr key={workflow.name} className="border-b border-[#e5e7eb]">
                  <TableCell>
                    <div>
                      <div>{workflow.date.split(",")[0]},</div>
                      <div>{workflow.date.split(",")[1]}</div>
                    </div>
                  </TableCell>
                  <TableCell>{workflow.department}</TableCell>
                  <TableCell>{workflow.name}</TableCell>
                  <TableCell>{workflow.nodes}</TableCell>
                  <TableCell className="text-[#4e86cf]">
                    {workflow.executions}
                  </TableCell>
                  <TableCell className="text-[#4e86cf]">
                    {workflow.exceptions}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-end">
                      <span className="mr-1">{workflow.timeSaved}</span>
                      <span className="text-xs text-[#757575]">min</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-end">
                      <span className="mr-1">{workflow.moneySaved}</span>
                      <span className="text-xs text-[#757575]">USD</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={workflow.status}
                      onCheckedChange={(checked) =>
                        handleStatusChange(index, checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      href="#"
                      className="text-[#4e86cf] hover:underline text-sm"
                    >
                      ROI Report
                    </Link>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
