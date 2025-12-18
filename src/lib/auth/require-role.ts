import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { type Locale } from "@/i18n/routing";
import { getUserWithRole, type UserWithRole } from "./get-user-role";
import { type UserRole, ROLE_DASHBOARD_ROUTES } from "./roles";

export interface AuthResult {
  user: UserWithRole;
  role: UserRole;
}

/**
 * Require authentication for a server component
 *
 * Redirects to sign-in if not authenticated.
 * Use this in server components that require a logged-in user.
 *
 * @returns User info with role
 * @throws Redirect to /sign-in if not authenticated
 */
export async function requireAuth(): Promise<AuthResult> {
  const locale = (await getLocale()) as Locale;
  const userWithRole = await getUserWithRole();

  if (!userWithRole) {
    return redirect({ href: "/sign-in", locale });
  }

  return {
    user: userWithRole,
    role: userWithRole.role,
  };
}

/**
 * Require a specific role for a server component
 *
 * Redirects to sign-in if not authenticated.
 * Redirects to appropriate dashboard if user doesn't have required role.
 *
 * @param allowedRoles - Array of roles that are allowed to access
 * @returns User info with role
 * @throws Redirect if not authenticated or wrong role
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<AuthResult> {
  const locale = (await getLocale()) as Locale;
  const userWithRole = await getUserWithRole();

  // Not authenticated - redirect to sign-in
  if (!userWithRole) {
    return redirect({ href: "/sign-in", locale });
  }

  // Check if user has one of the allowed roles
  if (!allowedRoles.includes(userWithRole.role)) {
    // Redirect to user's correct dashboard
    const correctDashboard = ROLE_DASHBOARD_ROUTES[userWithRole.role];
    return redirect({ href: correctDashboard, locale });
  }

  return {
    user: userWithRole,
    role: userWithRole.role,
  };
}

/**
 * Require broker role
 */
export async function requireBroker(): Promise<AuthResult> {
  return requireRole(["broker"]);
}

/**
 * Require lawyer role
 */
export async function requireLawyer(): Promise<AuthResult> {
  return requireRole(["lawyer"]);
}

/**
 * Require mortgage advisor role
 */
export async function requireMortgageAdvisor(): Promise<AuthResult> {
  return requireRole(["mortgage_advisor"]);
}

/**
 * Require any professional role (broker, lawyer, or mortgage advisor)
 */
export async function requireProfessional(): Promise<AuthResult> {
  return requireRole(["broker", "lawyer", "mortgage_advisor"]);
}

/**
 * Require investor role
 */
export async function requireInvestor(): Promise<AuthResult> {
  return requireRole(["investor"]);
}
