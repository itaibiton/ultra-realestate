import { redirect } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import { SidebarProvider } from "@/components/dashboard/sidebar/sidebar-provider";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { SidebarMobile } from "@/components/dashboard/sidebar/sidebar-mobile";
import { DashboardHeader } from "@/components/dashboard/header/dashboard-header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout - Shared layout for all authenticated dashboard pages
 *
 * Provides:
 * - Authentication guard (redirects to sign-in if not logged in)
 * - Sidebar navigation (desktop: fixed, mobile: sheet)
 * - Top header with user menu
 * - Background effects
 */
export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = await createClient();
  const locale = (await getLocale()) as Locale;

  // Auth check - redirect if not logged in
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect({ href: "/sign-in", locale });
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        {/* Background effects */}
        <div className="fixed inset-0 grid-bg -z-10" />
        <div className="fixed top-20 start-1/4 w-[400px] h-[200px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full -z-10" />
        <div className="fixed top-40 end-1/4 w-[300px] h-[200px] bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full -z-10" />

        {/* Desktop Sidebar */}
        <Sidebar user={user} className="hidden md:flex" />

        {/* Mobile Sidebar (Sheet) */}
        <SidebarMobile user={user} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader user={user} />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
