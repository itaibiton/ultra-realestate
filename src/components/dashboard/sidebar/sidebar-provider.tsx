"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface SidebarContextType {
  /** Whether sidebar is collapsed (icon-only mode) */
  isCollapsed: boolean;
  /** Whether mobile sidebar sheet is open */
  isMobileOpen: boolean;
  /** Toggle collapsed state */
  toggleCollapse: () => void;
  /** Set mobile sidebar open state */
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const STORAGE_KEY = "globalnest-sidebar-collapsed";

interface SidebarProviderProps {
  children: ReactNode;
}

/**
 * SidebarProvider - Manages sidebar state (collapsed/expanded, mobile open/close)
 *
 * Persists collapsed state to localStorage for user preference.
 * Provides context for all sidebar-related components.
 */
export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setIsCollapsed(stored === "true");
    }
    setIsHydrated(true);
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem(STORAGE_KEY, String(newValue));
      return newValue;
    });
  }, []);

  const setMobileOpen = useCallback((open: boolean) => {
    setIsMobileOpen(open);
  }, []);

  // Prevent hydration mismatch by using consistent initial state
  const contextValue: SidebarContextType = {
    isCollapsed: isHydrated ? isCollapsed : false,
    isMobileOpen,
    toggleCollapse,
    setMobileOpen,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

/**
 * useSidebar - Hook to access sidebar state and controls
 *
 * @throws Error if used outside SidebarProvider
 */
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}
