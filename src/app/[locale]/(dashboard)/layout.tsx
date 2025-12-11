import { redirect } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLocale } from "next-intl/server";
import { Locale, isRTL } from "@/i18n/routing";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout - Shared layout for all authenticated dashboard pages
 *
 * Uses shadcn sidebar-08 pattern with:
 * - SidebarProvider for state management
 * - AppSidebar with inset variant
 * - SidebarInset for main content area
 * - SiteHeader with breadcrumbs
 */
export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = await createClient();
  const locale = (await getLocale()) as Locale;

  // Auth check - redirect if not logged in
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect({ href: "/sign-in", locale });
  }

  const sidebarSide = isRTL(locale) ? "right" : "left";

  return (
    <SidebarProvider>
      <AppSidebar user={user} side={sidebarSide} />
      <SidebarInset>
        <SiteHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
