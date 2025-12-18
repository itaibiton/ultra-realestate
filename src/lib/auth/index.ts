// Role types and constants
export {
  type UserRole,
  ROLE_DASHBOARD_ROUTES,
  ROLE_PROTECTED_ROUTES,
  AUTHENTICATED_ROUTES,
  PUBLIC_ROUTES,
  ALL_ROLES,
  getRequiredRoleForRoute,
  isProtectedRoute,
  canAccessRoute,
  getRoleDisplayName,
  isValidRole,
} from "./roles";

// Role fetching utilities
export {
  type UserWithRole,
  getUserWithRole,
  getUserRole,
  hasRole,
  isProfessional,
} from "./get-user-role";

// Server-side role guards
export {
  type AuthResult,
  requireAuth,
  requireRole,
  requireBroker,
  requireLawyer,
  requireMortgageAdvisor,
  requireProfessional,
  requireInvestor,
} from "./require-role";
