"use client";

import { User as SupabaseUser } from "@supabase/supabase-js";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebar } from "./sidebar-provider";
import { SidebarHeader } from "./sidebar-header";
import { SidebarNav } from "./sidebar-nav";
import { SidebarFooter } from "./sidebar-footer";

interface SidebarMobileProps {
  user: SupabaseUser;
}

/**
 * SidebarMobile - Sheet-based sidebar for mobile devices
 *
 * Opens as a slide-out drawer from the start side (left in LTR, right in RTL).
 * Controlled by the SidebarProvider's isMobileOpen state.
 */
export function SidebarMobile({ user }: SidebarMobileProps) {
  const { isMobileOpen, setMobileOpen } = useSidebar();

  return (
    <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent
        side="left"
        className="w-72 p-0 glass-panel border-e"
      >
        <TooltipProvider>
          <div className="flex flex-col h-full">
            <SidebarHeader />
            <SidebarNav />
            <SidebarFooter user={user} />
          </div>
        </TooltipProvider>
      </SheetContent>
    </Sheet>
  );
}
