"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSidebar } from "./sidebar-provider";
import { SidebarNavItem } from "./sidebar-nav-item";
import type { NavSection } from "../nav-config";

interface SidebarNavSectionProps {
  section: NavSection;
  className?: string;
}

/**
 * SidebarNavSection - Collapsible section with label and items
 *
 * In collapsed sidebar mode, shows items directly without section header.
 */
export function SidebarNavSection({ section, className }: SidebarNavSectionProps) {
  const t = useTranslations("sidebar.sections");
  const { isCollapsed } = useSidebar();
  const [isOpen, setIsOpen] = useState(true);

  // In collapsed mode, just show items without section wrapper
  if (isCollapsed) {
    return (
      <div className={cn("space-y-1", className)}>
        {section.items.map((item) => (
          <SidebarNavItem key={item.key} item={item} />
        ))}
      </div>
    );
  }

  // Non-collapsible sections (like "main")
  if (!section.collapsible) {
    return (
      <div className={cn("space-y-1", className)}>
        {section.items.map((item) => (
          <SidebarNavItem key={item.key} item={item} />
        ))}
      </div>
    );
  }

  // Collapsible section
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors">
        {t(section.key)}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 mt-1">
        {section.items.map((item) => (
          <SidebarNavItem key={item.key} item={item} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
