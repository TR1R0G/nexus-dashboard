"use client";

import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

export function ClientTopBar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Acme Corporation</h1>

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/assets/avatar-image.jpg" alt="User" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
