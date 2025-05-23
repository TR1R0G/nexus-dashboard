import WorkflowLogs from "@/components/layout/client/workflow-logs";
import { Workflow } from "@/lib/types";

// Mock data for demonstration
const workflows: Workflow[] = [
  { id: "1", name: "Invoice Processing Workflow" },
  { id: "2", name: "Customer Onboarding Workflow" },
  { id: "3", name: "Data Synchronization Workflow" },
  { id: "4", name: "Approval Process Workflow" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#faf9f8]">
      {/* Main content */}
      <div className="flex-1">
        {/* Content */}
        <main className="flex-1 p-6">
          <WorkflowLogs workflows={workflows} />
        </main>
      </div>
    </div>
  );
}
