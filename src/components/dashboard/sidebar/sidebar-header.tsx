"use client";

import { Globe } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-provider";

interface SidebarHeaderProps {
  className?: string;
}

/**
 * SidebarHeader - Logo and brand area at top of sidebar
 *
 * Shows full logo in expanded mode, icon-only in collapsed mode.
 */
export function SidebarHeader({ className }: SidebarHeaderProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className={cn("p-4 border-b border-border", className)}>
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-3 transition-all",
          isCollapsed && "justify-center"
        )}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
          <Globe className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="text-lg font-semibold">GlobalNest</span>
        )}
      </Link>
    </div>
  );
}
