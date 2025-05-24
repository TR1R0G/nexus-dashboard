// components/layout/AdminSidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import braintrustLogo from "@/public/assets/braintrust_logo.png";
import {
  AlertTriangle,
  Building2,
  CreditCard,
  FileBarChart,
  Home,
  MessageSquare,
  Repeat,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", icon: Home, href: "/admin" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Clients", icon: Building2, href: "/admin/clients" },
  { name: "Billing", icon: CreditCard, href: "/admin/billing" },
  { name: "Subscriptions", icon: Repeat, href: "/admin/subscriptions" },
  { name: "Messaging", icon: MessageSquare, href: "/admin/messaging" },
  { name: "Reporting", icon: FileBarChart, href: "/admin/reporting" },
  { name: "Exceptions", icon: AlertTriangle, href: "/admin/exceptions" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[194px] h-full bg-[#FAF9F8] border-r flex flex-col">
      <div className="p-4 flex justify-center">
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Image
            src={braintrustLogo}
            alt="Braintrust Logo"
            width={32}
            height={32}
          />
        </button>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-3">
        {menuItems.map((item) => {
          let isActive;
          if (item.href === "/admin") {
            isActive = pathname === "/admin";
          } else {
            isActive = pathname.startsWith(item.href);
          }
          return (
            <div key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="mr-3 h-6 w-6 text-gray-500" />
                {item.name}
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
