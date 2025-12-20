import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { RoleProvider } from "@/providers/role-provider";
import { requireAuth } from "@/lib/auth";
import { setRequestLocale } from "next-intl/server";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * DashboardLayout - Shared layout for all authenticated dashboard pages
 *
 * Features:
 * - Authentication check with redirect to sign-in
 * - Role-based access control via RoleProvider
 * - shadcn sidebar-08 pattern (RTL support handled reactively in AppSidebar)
 * - SidebarProvider for state management
 * - AppSidebar with inset variant
 * - SidebarInset for main content area
 * - SiteHeader with breadcrumbs
 */
export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  // Set locale for next-intl (required for all layouts in [locale] route)
  const { locale } = await params;
  setRequestLocale(locale);

  // Auth check - redirects if not logged in
  const { user, role } = await requireAuth();

  // Prepare user info for client components
  const userInfo = {
    id: user.id,
    email: user.email,
    role: role,
    fullName: user.fullName,
    avatarUrl: user.avatarUrl,
  };

  return (
    <RoleProvider user={userInfo}>
      <SidebarProvider>
        <AppSidebar user={userInfo} />
        <SidebarInset className="max-h-svh overflow-hidden">
          <SiteHeader />
          <div className="flex-1 p-4 min-h-0 overflow-auto">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </RoleProvider>
  );
}
