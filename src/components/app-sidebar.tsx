"use client";

import * as React from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  Globe,
  LayoutDashboard,
  Building2,
  Bookmark,
  Route,
  Users,
  Settings,
  User,
  LifeBuoy,
  Send,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: SupabaseUser;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const t = useTranslations("sidebar");

  // Navigation sections with flat structure
  const navSections = [
    {
      label: t("sections.main"),
      items: [
        { title: t("nav.dashboard"), url: "/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      label: t("sections.properties"),
      items: [
        { title: t("nav.marketplace"), url: "/properties", icon: Building2 },
        { title: t("nav.watchlist"), url: "/properties/watchlist", icon: Bookmark },
      ],
    },
    {
      label: t("sections.journey"),
      items: [
        { title: t("nav.status"), url: "/journey", icon: Route },
        { title: t("nav.professionals"), url: "/journey/professionals", icon: Users },
      ],
    },
    {
      label: t("sections.profile"),
      items: [
        { title: t("nav.settings"), url: "/profile", icon: Settings },
        { title: t("nav.account"), url: "/profile/account", icon: User },
      ],
    },
  ];

  // Secondary navigation at bottom
  const navSecondary = [
    {
      title: t("nav.support"),
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: t("nav.feedback"),
      url: "/feedback",
      icon: Send,
    },
  ];

  // User data for nav footer
  const userData = {
    name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
    email: user.email || "",
    avatar: user.user_metadata?.avatar_url || "",
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Globe className="size-4" />
                </div>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-medium">GlobalNest</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {t("subtitle")}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain sections={navSections} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
