"use client";

import { User as SupabaseUser } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle, LanguageSwitcher } from "@/components/shared";
import { HeaderMobileTrigger } from "./header-mobile-trigger";
import { HeaderUserMenu } from "./header-user-menu";

interface DashboardHeaderProps {
  user: SupabaseUser;
  className?: string;
}

/**
 * DashboardHeader - Top header bar for dashboard
 *
 * Contains:
 * - Mobile menu trigger (hamburger)
 * - Page title area
 * - Actions: notifications, theme toggle, language, user menu
 */
export function DashboardHeader({ user, className }: DashboardHeaderProps) {
  const t = useTranslations("header");

  return (
    <header
      className={cn(
        "glass-panel border-b sticky top-0 z-40",
        "h-16 px-4 md:px-6 flex items-center justify-between gap-4",
        className
      )}
    >
      {/* Left side: mobile trigger */}
      <div className="flex items-center gap-4">
        <HeaderMobileTrigger className="md:hidden" />
      </div>

      {/* Right side: actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">{t("notifications")}</span>
        </Button>

        <ThemeToggle />
        <LanguageSwitcher />

        <HeaderUserMenu user={user} />
      </div>
    </header>
  );
}
