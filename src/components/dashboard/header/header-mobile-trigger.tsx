"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useSidebar } from "../sidebar/sidebar-provider";

interface HeaderMobileTriggerProps {
  className?: string;
}

/**
 * HeaderMobileTrigger - Hamburger menu button for mobile
 *
 * Opens the mobile sidebar sheet when clicked.
 */
export function HeaderMobileTrigger({ className }: HeaderMobileTriggerProps) {
  const t = useTranslations("header");
  const { setMobileOpen } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setMobileOpen(true)}
      className={className}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">{t("menu")}</span>
    </Button>
  );
}
