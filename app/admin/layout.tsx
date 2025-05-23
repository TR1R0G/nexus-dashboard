// app/admin/layout.tsx
import AdminSidebar from "@/components/layout/admin/AdminSidebar";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic"; // ensures fresh data for RSC children

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
