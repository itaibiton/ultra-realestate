"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "./sidebar-provider";
import { navColorClasses, type NavItem, type FeatureColor } from "../nav-config";

interface SidebarNavItemProps {
  item: NavItem;
  className?: string;
}

/**
 * SidebarNavItem - Single navigation item with icon and label
 *
 * Features:
 * - Active state based on current pathname
 * - Tooltip in collapsed mode
 * - Optional color accent and badge
 */
export function SidebarNavItem({ item, className }: SidebarNavItemProps) {
  const t = useTranslations("sidebar.nav");
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;
  const colorClass = item.color ? navColorClasses[item.color] : "";

  const content = (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
        "text-muted-foreground hover:text-foreground hover:bg-accent",
        isActive && "text-foreground bg-accent font-medium",
        isCollapsed && "justify-center px-2",
        className
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 flex-shrink-0",
          isActive ? colorClass : "text-muted-foreground"
        )}
      />
      {!isCollapsed && (
        <>
          <span className="flex-1">{t(item.key)}</span>
          {item.badge !== undefined && item.badge > 0 && (
            <Badge variant="secondary" className="ms-auto">
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </Link>
  );

  // Wrap in tooltip when collapsed
  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {t(item.key)}
          {item.badge !== undefined && item.badge > 0 && (
            <Badge variant="secondary">{item.badge}</Badge>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}
