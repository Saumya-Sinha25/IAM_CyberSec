"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Database,
  FileText,
  Users,
  Shield,
  ScrollText,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Resources",
      href: "/dashboard/resources",
      icon: Database,
    },
    {
      name: "My Requests",
      href: "/dashboard/requests",
      icon: FileText,
    },
    {
      name: "Manager Queue",
      href: "/dashboard/manager",
      icon: Users,
    },
    {
      name: "Admin Queue",
      href: "/dashboard/admin",
      icon: Shield,
    },
    {
      name: "Audit Logs",
      href: "/dashboard/audit",
      icon: ScrollText,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white border-r border-slate-800">
      <div className="h-20 flex items-center px-8 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold">
            AccessFlow
          </h1>

          <p className="text-xs text-slate-400">
            Identity & Access Management
          </p>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon size={18} />

              <span>
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}