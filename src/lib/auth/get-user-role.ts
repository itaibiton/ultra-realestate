import { createClient } from "@/lib/supabase/server";
import { type UserRole, isValidRole } from "./roles";

export interface UserWithRole {
  id: string;
  email: string;
  role: UserRole;
  fullName: string | null;
  avatarUrl: string | null;
}

/**
 * Get the current user's role from the database
 *
 * This function fetches the role from the `users` table, which is more reliable
 * than auth metadata as it reflects the actual database state.
 *
 * @returns The user with role info, or null if not authenticated
 */
export async function getUserWithRole(): Promise<UserWithRole | null> {
  const supabase = await createClient();

  // First get the authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  // Fetch user role from the users table
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role, full_name, avatar_url")
    .eq("id", user.id)
    .single();

  if (userError || !userData) {
    // If user record doesn't exist yet, try to get role from auth metadata
    const metadataRole = user.user_metadata?.role;
    if (metadataRole && isValidRole(metadataRole)) {
      return {
        id: user.id,
        email: user.email || "",
        role: metadataRole,
        fullName: user.user_metadata?.full_name || null,
        avatarUrl: user.user_metadata?.avatar_url || null,
      };
    }
    // Default to investor if no role found
    return {
      id: user.id,
      email: user.email || "",
      role: "investor",
      fullName: null,
      avatarUrl: null,
    };
  }

  // Validate the role from database
  const role = isValidRole(userData.role) ? userData.role : "investor";

  return {
    id: user.id,
    email: user.email || "",
    role,
    fullName: userData.full_name,
    avatarUrl: userData.avatar_url,
  };
}

/**
 * Get just the user's role (lightweight version)
 *
 * @returns The user's role, or null if not authenticated
 */
export async function getUserRole(): Promise<UserRole | null> {
  const userWithRole = await getUserWithRole();
  return userWithRole?.role || null;
}

/**
 * Check if the current user has one of the specified roles
 *
 * @param allowedRoles - Array of roles that are allowed
 * @returns true if user has one of the allowed roles
 */
export async function hasRole(allowedRoles: UserRole[]): Promise<boolean> {
  const role = await getUserRole();
  if (!role) return false;
  return allowedRoles.includes(role);
}

/**
 * Check if the current user is a professional (non-investor)
 *
 * @returns true if user is a broker, lawyer, or mortgage advisor
 */
export async function isProfessional(): Promise<boolean> {
  const role = await getUserRole();
  if (!role) return false;
  return ["broker", "lawyer", "mortgage_advisor"].includes(role);
}
