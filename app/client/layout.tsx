import { ClientSidebar } from "@/components/layout/client/ClientSidebar";
import { ClientTopBar } from "@/components/layout/client/ClientTopBar";
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white">
      <ClientSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientTopBar />
        <main className="flex-1 overflow-y-auto p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
