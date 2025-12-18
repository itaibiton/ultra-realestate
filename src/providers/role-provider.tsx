"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { UserRole } from "@/lib/auth/roles";

interface UserInfo {
  id: string;
  email: string;
  role: UserRole;
  fullName: string | null;
  avatarUrl: string | null;
}

interface RoleContextValue {
  user: UserInfo;
  role: UserRole;
  isInvestor: boolean;
  isBroker: boolean;
  isLawyer: boolean;
  isMortgageAdvisor: boolean;
  isProfessional: boolean;
}

const RoleContext = createContext<RoleContextValue | null>(null);

interface RoleProviderProps {
  children: ReactNode;
  user: UserInfo;
}

/**
 * RoleProvider - Provides user role information to client components
 *
 * This should be placed in a layout that already has server-side auth verification.
 * The user info is passed down from the server component.
 *
 * @example
 * // In a server layout:
 * const { user, role } = await requireAuth();
 * return (
 *   <RoleProvider user={{ id: user.id, email: user.email, role, ... }}>
 *     {children}
 *   </RoleProvider>
 * )
 */
export function RoleProvider({ children, user }: RoleProviderProps) {
  const value: RoleContextValue = {
    user,
    role: user.role,
    isInvestor: user.role === "investor",
    isBroker: user.role === "broker",
    isLawyer: user.role === "lawyer",
    isMortgageAdvisor: user.role === "mortgage_advisor",
    isProfessional: ["broker", "lawyer", "mortgage_advisor"].includes(user.role),
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

/**
 * Hook to access the current user's role and info
 *
 * Must be used within a RoleProvider
 *
 * @example
 * const { role, isBroker, isProfessional } = useRole();
 * if (isBroker) {
 *   // Show broker-specific UI
 * }
 */
export function useRole(): RoleContextValue {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }

  return context;
}

/**
 * Hook to get just the user's role
 */
export function useUserRole(): UserRole {
  const { role } = useRole();
  return role;
}

/**
 * Hook to check if user has a specific role
 */
export function useHasRole(allowedRoles: UserRole[]): boolean {
  const { role } = useRole();
  return allowedRoles.includes(role);
}

/**
 * Hook to get the full user info
 */
export function useUser(): UserInfo {
  const { user } = useRole();
  return user;
}
