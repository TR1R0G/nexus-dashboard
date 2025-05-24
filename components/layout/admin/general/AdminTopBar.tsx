"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";

const titleMap: Record<string, string> = {
  "/admin": "Dashboard Overview",
  "/admin/users": "User Manager",
  "/admin/clients": "Client Manager",
  "/admin/clients/new": "Add New Client",
  "/admin/billing": "Billing Center",
  "/admin/subscriptions": "Subscription Manager",
  "/admin/subscriptions/new": "Add New Plan",
  "/admin/messaging": "Messaging",
  "/admin/reporting": "Reporting",
  "/admin/exceptions": "Exceptions",
};

interface TopNavProps {
  title?: string;
}

export default function AdminTopBar({ title }: TopNavProps) {
  const pathname = usePathname();

  // Use provided title or derive from pathname
  const pageTitle = title || titleMap[pathname || "/admin"] || "Dashboard";

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">{pageTitle}</h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-[#ce4343] rounded-full" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/assets/avatar-image.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
