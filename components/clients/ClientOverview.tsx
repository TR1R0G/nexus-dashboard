// components/client/ClientOverview.tsx
"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { Check, Link } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

export default function ClientOverview() {
  const [pipelineSteps, setPipelineSteps] = useState([
    {
      title: "Discovery: Initial Survey",
      status: "completed",
      date: "Jan 15, 2025",
    },
    {
      title: "Discovery: Process Deep Dive",
      status: "completed",
      date: "Jan 20, 2025",
    },
    {
      title: "ADA Proposal Sent",
      status: "completed",
      date: "Jan 25, 2025",
    },
    {
      title: "ADA Proposal Review",
      status: "pending",
      date: undefined,
    },
    {
      title: "ADA Contract Sent",
      status: "disabled",
      date: undefined,
    },
    {
      title: "ADA Contract Signed",
      status: "disabled",
      date: undefined,
    },
    {
      title: "Credentials Collected",
      status: "disabled",
      date: undefined,
    },
    {
      title: "Factory Build Initiated",
      status: "disabled",
      date: undefined,
    },
    {
      title: "Test Plan Generated",
      status: "disabled",
      date: undefined,
    },
    {
      title: "Testing Started",
      status: "disabled",
      date: undefined,
    },
    {
      title: "Production Deploy",
      status: "disabled",
      date: undefined,
    },
  ]);

  function handleMarkComplete(index: number) {
    setPipelineSteps((steps) => {
      const newSteps = [...steps];
      // Mark current as completed
      newSteps[index] = {
        ...newSteps[index],
        status: "completed",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      // Set next step to pending if it exists and is disabled
      if (newSteps[index + 1] && newSteps[index + 1].status === "disabled") {
        newSteps[index + 1] = { ...newSteps[index + 1], status: "pending" };
      }
      return newSteps;
    });
  }

  return (
    <div className="space-y-6">
      {/* Assigned Support Engineers */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-[#1f2937]">
          Assigned Support Engineers
        </h2>
        <div className="flex flex-wrap gap-4">
          <EngineerCard
            name="John Smith"
            role="Lead SE"
            imageUrl="/placeholder.svg?height=80&width=80&query=professional man headshot"
          />
          <EngineerCard
            name="Sarah Johnson"
            role="Support SE"
            imageUrl="/placeholder.svg?height=80&width=80&query=professional woman headshot"
          />
          {/* <Button
                    variant="outline"
                    className="h-auto py-2 px-4 text-sm"
                  >
                    Change assigned SEs
                  </Button> */}
          {/* Might Implement Later */}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 h-full">
          {/* Client Users Table */}
          <Card className="overflow-hidden p-1 h-full">
            <div className="p-4 border-b border-[#e5e7eb]">
              <h3 className="font-medium text-[#1f2937]">Client Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e5e7eb] bg-[#faf9f8]">
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Phone</TableHeader>
                    <TableHeader>Billing</TableHeader>
                    <TableHeader>Admin</TableHeader>
                    <TableHeader>Notes</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#e5e7eb]">
                    <TableCell>Robert Wilson</TableCell>
                    <TableCell>robert@company.com</TableCell>
                    <TableCell>+1 555-0123</TableCell>
                    <TableCell>
                      <Check className="h-5 w-5 text-[#059669]" />
                    </TableCell>
                    <TableCell>
                      <Check className="h-5 w-5 text-[#059669]" />
                    </TableCell>
                    <TableCell>Primary contact</TableCell>
                  </tr>
                  <tr>
                    <TableCell>Emily Brown</TableCell>
                    <TableCell>emily@company.com</TableCell>
                    <TableCell>+1 555-0124</TableCell>
                    <TableCell>
                      <span className="block h-0.5 w-3 bg-[#757575]"></span>
                    </TableCell>
                    <TableCell>
                      <span className="block h-0.5 w-3 bg-[#757575]"></span>
                    </TableCell>
                    <TableCell>Technical lead</TableCell>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="h-full">
          {/* Document Links */}
          <Card className="p-1 h-full">
            <div className="p-4 border-b border-[#e5e7eb]">
              <h3 className="font-medium text-[#1f2937]">Document Links</h3>
            </div>
            <div className="p-4 space-y-4">
              <DocumentLink
                label="Survey Questions"
                url="https://docs.example.com/survey"
              />
              <DocumentLink
                label="Survey Results"
                url="https://docs.example.com/results"
              />
              <DocumentLink
                label="Process Documentation"
                url="https://docs.example.com/process"
              />
              <DocumentLink
                label="ADA Proposal"
                url="https://docs.example.com/proposal"
              />
              <DocumentLink
                label="Contract"
                url="https://docs.example.com/contract"
              />
              <DocumentLink
                label="Factory Markdown"
                url="https://docs.example.com/factory-markdown"
              />
              <DocumentLink
                label="Test Plan"
                url="https://docs.example.com/test-plan"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Pipeline Progress */}
      <section>
        <Card className="p-1">
          <div className="p-4 border-b border-[#e5e7eb]">
            <h3 className="font-medium text-[#1f2937]">Pipeline Progress</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {pipelineSteps.map((step, idx) => (
                <PipelineStep
                  key={step.title}
                  title={step.title}
                  status={step.status}
                  date={step.date}
                  onMarkComplete={() => handleMarkComplete(idx)}
                />
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href="#"
      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
        active ? "bg-[#141417] text-white" : "text-[#3b3b3b] hover:bg-[#fcf6f0]"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function EngineerCard({
  name,
  role,
  imageUrl,
}: {
  name: string;
  role: string;
  imageUrl: string;
}) {
  return (
    <Card className="p-4 flex flex-row items-center">
      <Avatar className="h-12 w-12">
        <img src={"/assets/avatar-image.jpg"} alt={name} />
      </Avatar>
      {/* imageUrl ||  */}
      <div>
        <h4 className="font-medium text-[#1f2937]">{name}</h4>
        <p className="text-sm text-[#757575]">{role}</p>
      </div>
    </Card>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-medium text-[#757575] uppercase tracking-wider">
      {children}
    </th>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-sm text-[#1f2937]">{children}</td>;
}

function DocumentLink({ label, url }: { label: string; url: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-[#757575]">{label}</p>
      <Input
        value={url}
        className="text-sm"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
}

function PipelineStep({
  title,
  status,
  date,
  onMarkComplete,
}: {
  title: string;
  status: string;
  date?: string;
  onMarkComplete?: () => void;
}) {
  return (
    <div className="flex items-start">
      <div className="mr-4 relative">
        <div
          className={`h-6 w-6 rounded-full flex items-center justify-center ${
            status === "completed"
              ? "bg-[#059669] text-white"
              : status === "pending"
              ? "border-2 border-[#757575] bg-white"
              : "border-2 border-[#ced4da] bg-white"
          }`}
        >
          {status === "completed" && <Check className="h-4 w-4" />}
        </div>
      </div>
      <div className="flex-1">
        <h4
          className={`font-medium ${
            status === "disabled" ? "text-[#757575]" : "text-[#1f2937]"
          }`}
        >
          {title}
        </h4>
        {status === "completed" && (
          <p className="text-sm text-[#757575]">Completed on {date}</p>
        )}
        {status === "pending" && onMarkComplete && (
          <Button
            variant="secondary"
            className="mt-2 bg-[#141417] text-white hover:bg-[#3b3b3b]"
            onClick={onMarkComplete}
          >
            Mark Complete
          </Button>
        )}
      </div>
    </div>
  );
}
