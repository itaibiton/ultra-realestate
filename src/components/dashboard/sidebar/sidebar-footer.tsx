"use client";

import { User as SupabaseUser } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { LogOut, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebar } from "./sidebar-provider";
import { signOut } from "@/app/[locale]/(auth)/actions";

interface SidebarFooterProps {
  user: SupabaseUser;
  className?: string;
}

/**
 * SidebarFooter - User info, sign out, and collapse toggle
 *
 * Shows user avatar/email in expanded mode, icon-only in collapsed mode.
 */
export function SidebarFooter({ user, className }: SidebarFooterProps) {
  const t = useTranslations("sidebar");
  const { isCollapsed, toggleCollapse } = useSidebar();

  // Get user initials from email
  const initials = user.email
    ? user.email.slice(0, 2).toUpperCase()
    : "??";

  const collapseButton = (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleCollapse}
      className="h-8 w-8"
    >
      {isCollapsed ? (
        <ChevronsRight className="h-4 w-4 rtl:rotate-180" />
      ) : (
        <ChevronsLeft className="h-4 w-4 rtl:rotate-180" />
      )}
      <span className="sr-only">
        {isCollapsed ? t("expand") : t("collapse")}
      </span>
    </Button>
  );

  const signOutButton = (
    <form action={signOut}>
      <Button variant="ghost" size="icon" type="submit" className="h-8 w-8">
        <LogOut className="h-4 w-4" />
        <span className="sr-only">{t("nav.signOut")}</span>
      </Button>
    </form>
  );

  if (isCollapsed) {
    return (
      <div className={cn("p-3 border-t border-border space-y-2", className)}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="flex justify-center">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">{user.email}</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="flex justify-center">{signOutButton}</div>
          </TooltipTrigger>
          <TooltipContent side="right">{t("nav.signOut")}</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="flex justify-center">{collapseButton}</div>
          </TooltipTrigger>
          <TooltipContent side="right">{t("expand")}</TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className={cn("p-3 border-t border-border", className)}>
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user.email}</p>
        </div>
        <div className="flex items-center gap-1">
          {signOutButton}
          {collapseButton}
        </div>
      </div>
    </div>
  );
}
