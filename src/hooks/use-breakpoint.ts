"use client";

import { useEffect, useState, useCallback } from "react";

/** Tailwind's default breakpoints in pixels */
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;
type BreakpointState = Breakpoint | "xs";

/**
 * useBreakpoint - Responsive breakpoint detection hook
 *
 * Returns the current breakpoint and helper booleans for responsive layouts.
 * Uses the breakpoint values from LAYOUT constants for consistency with Tailwind.
 *
 * @example
 * const { breakpoint, isMobile, isTablet, isDesktop } = useBreakpoint();
 *
 * // Use in conditional rendering
 * {isMobile ? <MobileNav /> : <DesktopNav />}
 *
 * // Use in responsive logic
 * const columns = isDesktop ? 3 : isTablet ? 2 : 1;
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<BreakpointState>("xl");

  const updateBreakpoint = useCallback(() => {
    const width = window.innerWidth;

    if (width < BREAKPOINTS.sm) {
      setBreakpoint("xs");
    } else if (width < BREAKPOINTS.md) {
      setBreakpoint("sm");
    } else if (width < BREAKPOINTS.lg) {
      setBreakpoint("md");
    } else if (width < BREAKPOINTS.xl) {
      setBreakpoint("lg");
    } else if (width < BREAKPOINTS["2xl"]) {
      setBreakpoint("xl");
    } else {
      setBreakpoint("2xl");
    }
  }, []);

  useEffect(() => {
    // Set initial value
    updateBreakpoint();

    // Listen for resize events
    window.addEventListener("resize", updateBreakpoint);

    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, [updateBreakpoint]);

  return {
    /** Current breakpoint name: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" */
    breakpoint,

    /** True when screen is smaller than sm (640px) */
    isXs: breakpoint === "xs",

    /** True when screen is xs or sm (smaller than md) */
    isMobile: breakpoint === "xs" || breakpoint === "sm",

    /** True when screen is exactly md (768px - 1023px) */
    isTablet: breakpoint === "md",

    /** True when screen is lg or larger */
    isDesktop: breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl",

    /** True when screen is xl or 2xl */
    isLargeDesktop: breakpoint === "xl" || breakpoint === "2xl",

    /** Current window width in pixels (only available after hydration) */
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  };
}

/**
 * useMediaQuery - Raw media query hook
 *
 * @param query - Media query string (e.g., "(min-width: 768px)")
 * @returns boolean indicating if the query matches
 *
 * @example
 * const isWide = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}
