"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNavSection } from "./sidebar-nav-section";
import { navConfig } from "../nav-config";

interface SidebarNavProps {
  className?: string;
}

/**
 * SidebarNav - Main navigation component containing all sections
 *
 * Uses ScrollArea for overflow handling in long navigation lists.
 */
export function SidebarNav({ className }: SidebarNavProps) {
  return (
    <ScrollArea className={cn("flex-1 py-4", className)}>
      <nav className="px-3 space-y-6">
        {navConfig.map((section) => (
          <SidebarNavSection key={section.key} section={section} />
        ))}
      </nav>
    </ScrollArea>
  );
}
