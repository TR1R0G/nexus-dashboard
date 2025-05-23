"use client";

import braintrustLogo from "@/public/assets/braintrust_logo.png";
import {
  AlertTriangle,
  BarChart2,
  CreditCard,
  FileBarChart,
  Home,
  Key,
  MessageSquare,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ClientSidebar() {
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
        <Link
          href="/dashboard"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-900"
        >
          <Home className="mr-3 h-6 w-6 text-gray-500" />
          Dashboard
        </Link>

        <Link
          href="/roi"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
        >
          <BarChart2 className="mr-3 h-6 w-6 text-gray-500" />
          ROI
        </Link>

        <Link
          href="/reporting"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
        >
          <FileBarChart className="mr-3 h-6 w-6 text-gray-500" />
          Reporting
        </Link>

        <Link
          href="/credentials"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
        >
          <Key className="mr-3 h-6 w-6 text-gray-500" />
          Credentials
        </Link>

        <Link
          href="/exceptions"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
        >
          <AlertTriangle className="mr-3 h-6 w-6 text-gray-500" />
          Exceptions
        </Link>

        <Link
          href="/users"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
        >
          <Users className="mr-3 h-6 w-6 text-gray-500" />
          Users
        </Link>

        <Link
          href="/billing"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
        >
          <CreditCard className="mr-3 h-6 w-6 text-gray-500" />
          Billing
        </Link>

        <Link
          href="/messaging"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
        >
          <MessageSquare className="mr-3 h-6 w-6 text-gray-500" />
          Messaging
        </Link>
      </nav>
    </div>
  );
}
