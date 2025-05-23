// components/layout/AdminSidebar.tsx
"use client";

import clsx from "clsx";
import { FileWarning, Home, List, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/plans", label: "Plans", icon: List },
  { href: "/admin/exceptions", label: "Exceptions", icon: FileWarning },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-56 flex-col border-r bg-white p-4 lg:flex">
      <h1 className="mb-8 text-xl font-bold">Nexus</h1>

      <nav className="flex flex-col gap-2">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-3 rounded px-3 py-2 text-sm hover:bg-muted/50",
              pathname === href && "bg-primary/10 text-primary"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
