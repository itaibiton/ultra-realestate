"use client";

import { useEffect } from "react";
import { useSidebar } from "@/components/dashboard/sidebar/sidebar-provider";

/**
 * useSidebarKeyboard - Keyboard shortcuts for sidebar control
 *
 * Shortcuts:
 * - Cmd/Ctrl + B: Toggle sidebar collapse
 *
 * This hook should be used within a SidebarProvider context.
 */
export function useSidebarKeyboard() {
  const { toggleCollapse } = useSidebar();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+B (Mac) or Ctrl+B (Windows/Linux) - Toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleCollapse();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleCollapse]);
}
