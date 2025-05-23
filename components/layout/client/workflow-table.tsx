"use client";

import { Switch } from "@/components/ui/switch";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface WorkflowData {
  date: string;
  time: string;
  department: string;
  name: string;
  nameLink: string;
  description: string;
  nodes: number;
  executions: number;
  exceptions: number;
  timeSaved: string;
  costSaved: string;
  status: boolean;
}

const workflowData: WorkflowData[] = [
  {
    date: "2025-05-14",
    time: "09:30",
    department: "Finance",
    name: "Invoice Processing",
    nameLink: "#invoice-processing",
    description: "Automated invoice processing workflow",
    nodes: 12,
    executions: 1234,
    exceptions: 23,
    timeSaved: "156.5 hrs",
    costSaved: "$15,650",
    status: true,
  },
  {
    date: "2025-05-13",
    time: "14:15",
    department: "HR",
    name: "Employee Onboarding",
    nameLink: "#employee-onboarding",
    description: "New employee onboarding automation",
    nodes: 8,
    executions: 456,
    exceptions: 5,
    timeSaved: "89.2 hrs",
    costSaved: "$8,920",
    status: true,
  },
];

export default function WorkflowTable() {
  return (
    <div className="border border-[#e5e7eb] rounded-md overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#faf9f8] border-b border-[#e5e7eb]">
            <TableHeader label="Create Date/Time" />
            <TableHeader label="Department" />
            <TableHeader label="Workflow Name" />
            <TableHeader label="Description" />
            <TableHeader label="Nodes" />
            <TableHeader label="Executions" />
            <TableHeader label="Exceptions" />
            <TableHeader label="Time Saved" />
            <TableHeader label="Cost Saved" />
            <TableHeaderUnsortable label="Status" />
          </tr>
        </thead>
        <tbody>
          {workflowData.map((workflow, index) => {
            const [status, setStatus] = useState(workflow.status);

            const handleStatusChange = (checked: boolean) => {
              const confirmed = window.confirm(
                `Are you sure you want to ${
                  checked ? "activate" : "deactivate"
                } this workflow?`
              );
              if (confirmed) {
                setStatus(checked);
                // Optionally, call your API to update status here
              }
            };

            return (
              <tr key={index} className="border-b border-[#e5e7eb] bg-white">
                <td className="px-4 py-3">
                  <div>{workflow.date}</div>
                  <div>{workflow.time}</div>
                </td>
                <td className="px-4 py-3">{workflow.department}</td>
                <td className="px-4 py-3">
                  <Link
                    href={workflow.nameLink}
                    className="text-[#4e86cf] hover:underline"
                  >
                    {workflow.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{workflow.description}</td>
                <td className="px-4 py-3 text-center">{workflow.nodes}</td>
                <td className="px-4 py-3 text-center">{workflow.executions}</td>
                <td className="px-4 py-3 text-center">{workflow.exceptions}</td>
                <td className="px-4 py-3">{workflow.timeSaved}</td>
                <td className="px-4 py-3">{workflow.costSaved}</td>
                <td className="px-4 py-3">
                  <Switch
                    checked={status}
                    onCheckedChange={handleStatusChange}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

interface TableHeaderProps {
  label: string;
}

function TableHeader({ label }: TableHeaderProps) {
  return (
    <th className="px-4 py-3 text-left font-medium">
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className="h-3.5 w-3.5 text-gray-500" />
      </div>
    </th>
  );
}

function TableHeaderUnsortable({ label }: TableHeaderProps) {
  return (
    <th className="px-4 py-3 text-left font-medium">
      <div className="flex items-center gap-1">{label}</div>
    </th>
  );
}
