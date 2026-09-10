"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderGit2, 
  Zap, 
  Calendar, 
  BarChart3, 
  Settings 
} from "lucide-react"; // Wait, I didn't install lucide-react. I'll use standard svgs or install lucide-react. 
// It's better to install lucide-react since it's standard and tiny.

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Applications", href: "/applications", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Skills", href: "/skills", icon: Zap },
  { name: "Interviews", href: "/interviews", icon: Calendar },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">NEXO</span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                  `}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"}`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <Link
            href="/settings"
            className={`
              group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md
              ${pathname === "/settings" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
            `}
          >
            <Settings
              className={`mr-3 flex-shrink-0 h-5 w-5 ${pathname === "/settings" ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"}`}
              aria-hidden="true"
            />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
