/**
 * Role-based access control types and constants
 *
 * This module defines the user roles and their associated routes/permissions.
 */

export type UserRole = "investor" | "broker" | "lawyer" | "mortgage_advisor";

/**
 * Default dashboard route for each role
 */
export const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  investor: "/dashboard",
  broker: "/dashboard/broker",
  lawyer: "/dashboard/lawyer",
  mortgage_advisor: "/dashboard/mortgage",
} as const;

/**
 * Routes that require specific roles to access
 * These are checked in middleware for role-based protection
 */
export const ROLE_PROTECTED_ROUTES: Record<UserRole, string[]> = {
  broker: ["/dashboard/broker", "/properties/manage", "/listings"],
  lawyer: ["/dashboard/lawyer", "/cases", "/clients"],
  mortgage_advisor: ["/dashboard/mortgage", "/applications", "/calculators"],
  investor: [], // Investors can access general dashboard routes
} as const;

/**
 * Routes that require authentication but allow any role
 */
export const AUTHENTICATED_ROUTES = [
  "/dashboard",
  "/properties",
  "/saved",
  "/settings",
  "/profile",
  "/messages",
  "/onboarding",
  "/complete",
  "/welcome",
  "/chat",
  "/summary",
] as const;

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
  "/",
  "/sign-in",
  "/sign-up",
  "/about",
  "/contact",
  "/how-it-works",
  "/auth/confirm",
] as const;

/**
 * Check if a route requires a specific role
 */
export function getRequiredRoleForRoute(pathname: string): UserRole | null {
  // Remove locale prefix (e.g., /en or /he)
  const pathWithoutLocale = pathname.replace(/^\/(en|he)/, "");

  for (const [role, routes] of Object.entries(ROLE_PROTECTED_ROUTES)) {
    for (const route of routes) {
      if (pathWithoutLocale.startsWith(route)) {
        return role as UserRole;
      }
    }
  }
  return null;
}

/**
 * Check if a route requires authentication
 */
export function isProtectedRoute(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(en|he)/, "");

  // Check role-specific routes
  for (const routes of Object.values(ROLE_PROTECTED_ROUTES)) {
    for (const route of routes) {
      if (pathWithoutLocale.startsWith(route)) {
        return true;
      }
    }
  }

  // Check general authenticated routes
  for (const route of AUTHENTICATED_ROUTES) {
    if (pathWithoutLocale.startsWith(route)) {
      return true;
    }
  }

  return false;
}

/**
 * Check if user has permission to access a route
 */
export function canAccessRoute(userRole: UserRole, pathname: string): boolean {
  const requiredRole = getRequiredRoleForRoute(pathname);

  // If no specific role required, any authenticated user can access
  if (!requiredRole) {
    return true;
  }

  // Check if user has the required role
  return userRole === requiredRole;
}

/**
 * Get display name for a role
 */
export function getRoleDisplayName(role: UserRole): string {
  const displayNames: Record<UserRole, string> = {
    investor: "Investor",
    broker: "Broker",
    lawyer: "Lawyer",
    mortgage_advisor: "Mortgage Advisor",
  };
  return displayNames[role];
}

/**
 * All valid user roles
 */
export const ALL_ROLES: UserRole[] = ["investor", "broker", "lawyer", "mortgage_advisor"];

/**
 * Check if a string is a valid user role
 */
export function isValidRole(role: string): role is UserRole {
  return ALL_ROLES.includes(role as UserRole);
}
