"use client";

import { User as SupabaseUser } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSidebar } from "./sidebar-provider";
import { useSidebarKeyboard } from "@/hooks/use-sidebar-keyboard";
import { SidebarHeader } from "./sidebar-header";
import { SidebarNav } from "./sidebar-nav";
import { SidebarFooter } from "./sidebar-footer";

interface SidebarProps {
  user: SupabaseUser;
  className?: string;
}

/**
 * Sidebar - Desktop sidebar navigation component
 *
 * Features:
 * - Glass morphism design
 * - Collapsible to icon-only mode (Cmd/Ctrl+B)
 * - Smooth width transition
 * - Fixed positioning on desktop
 */
export function Sidebar({ user, className }: SidebarProps) {
  const { isCollapsed } = useSidebar();

  // Enable keyboard shortcuts
  useSidebarKeyboard();

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "glass-panel border-e flex flex-col h-screen sticky top-0",
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          className
        )}
      >
        <SidebarHeader />
        <SidebarNav />
        <SidebarFooter user={user} />
      </aside>
    </TooltipProvider>
  );
}
