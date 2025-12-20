/**
 * Profile Types
 * Centralized type definitions for user profiles and professional profiles
 */

import type { Database, Json } from "./database.types";

// ============================================
// Database Enum Types (re-exported for convenience)
// ============================================

export type UserRole = Database["public"]["Enums"]["user_role"];
export type VerificationStatus = Database["public"]["Enums"]["verification_status"];
export type BrokerSpecialization = Database["public"]["Enums"]["broker_specialization"];
export type LawyerPracticeArea = Database["public"]["Enums"]["lawyer_practice_area"];
export type LoanType = Database["public"]["Enums"]["loan_type"];
export type ExperienceLevel = Database["public"]["Enums"]["experience_level"];
export type InvestmentGoal = Database["public"]["Enums"]["investment_goal"];
export type InvestmentTimeline = Database["public"]["Enums"]["investment_timeline"];
export type RiskTolerance = Database["public"]["Enums"]["risk_tolerance"];
export type WorkingStyle = Database["public"]["Enums"]["working_style"];

// ============================================
// Base User Type
// ============================================

export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

// ============================================
// Investor Profile Types
// ============================================

export type InvestorProfile = Database["public"]["Tables"]["investor_profiles"]["Row"];
export type InvestorProfileInsert = Database["public"]["Tables"]["investor_profiles"]["Insert"];
export type InvestorProfileUpdate = Database["public"]["Tables"]["investor_profiles"]["Update"];

// ============================================
// Broker Profile Types
// ============================================

export type BrokerProfile = Database["public"]["Tables"]["broker_profiles"]["Row"];
export type BrokerProfileInsert = Database["public"]["Tables"]["broker_profiles"]["Insert"];
export type BrokerProfileUpdate = Database["public"]["Tables"]["broker_profiles"]["Update"];

// ============================================
// Lawyer Profile Types
// ============================================

export type LawyerProfile = Database["public"]["Tables"]["lawyer_profiles"]["Row"];
export type LawyerProfileInsert = Database["public"]["Tables"]["lawyer_profiles"]["Insert"];
export type LawyerProfileUpdate = Database["public"]["Tables"]["lawyer_profiles"]["Update"];

// ============================================
// Mortgage Advisor Profile Types
// ============================================

export type MortgageAdvisorProfile = Database["public"]["Tables"]["mortgage_advisor_profiles"]["Row"];
export type MortgageAdvisorProfileInsert = Database["public"]["Tables"]["mortgage_advisor_profiles"]["Insert"];
export type MortgageAdvisorProfileUpdate = Database["public"]["Tables"]["mortgage_advisor_profiles"]["Update"];

// ============================================
// Extended Types with Relationships
// ============================================

/**
 * User with full profile information
 */
export interface UserWithProfile extends User {
  investor_profile?: InvestorProfile | null;
  broker_profile?: BrokerProfile | null;
  lawyer_profile?: LawyerProfile | null;
  mortgage_advisor_profile?: MortgageAdvisorProfile | null;
}

/**
 * Broker with user information
 */
export interface BrokerWithUser extends BrokerProfile {
  user: User;
}

/**
 * Lawyer with user information
 */
export interface LawyerWithUser extends LawyerProfile {
  user: User;
}

/**
 * Mortgage Advisor with user information
 */
export interface MortgageAdvisorWithUser extends MortgageAdvisorProfile {
  user: User;
}

/**
 * Union type for any professional profile
 */
export type ProfessionalProfile = BrokerProfile | LawyerProfile | MortgageAdvisorProfile;

/**
 * Union type for any professional with user
 */
export type ProfessionalWithUser = BrokerWithUser | LawyerWithUser | MortgageAdvisorWithUser;

// ============================================
// Verification Document Type
// ============================================

export interface VerificationDocument {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
  status: VerificationStatus;
}

// ============================================
// Form Data Types for Onboarding
// ============================================

export interface BrokerProfileFormData {
  license_number: string;
  license_state: string;
  license_expiry?: string;
  brokerage_name?: string;
  brokerage_address?: string;
  years_experience: number;
  specializations: BrokerSpecialization[];
  service_areas?: string[];
  languages?: string[];
  bio?: string;
  headline?: string;
  website_url?: string;
  contact_email: string;
  contact_phone: string;
  preferred_contact_method?: string;
}

export interface LawyerProfileFormData {
  bar_number: string;
  bar_state: string;
  bar_admission_date?: string;
  law_firm_name?: string;
  firm_address?: string;
  firm_size?: string;
  years_experience: number;
  practice_areas: LawyerPracticeArea[];
  service_areas?: string[];
  languages?: string[];
  bio?: string;
  headline?: string;
  website_url?: string;
  hourly_rate?: number;
  consultation_fee?: number;
  offers_free_consultation?: boolean;
  contact_email: string;
  contact_phone: string;
  preferred_contact_method?: string;
}

export interface MortgageAdvisorProfileFormData {
  nmls_id: string;
  license_states: string[];
  company_name?: string;
  company_address?: string;
  company_nmls_id?: string;
  years_experience: number;
  loan_types: LoanType[];
  service_areas?: string[];
  languages?: string[];
  bio?: string;
  headline?: string;
  website_url?: string;
  contact_email: string;
  contact_phone: string;
  preferred_contact_method?: string;
}

export interface InvestorProfileFormData {
  current_country?: string;
  citizenship?: string;
  experience_level?: ExperienceLevel;
  investment_goals?: InvestmentGoal[];
  investment_timeline?: InvestmentTimeline;
  property_types?: Database["public"]["Enums"]["property_type"][];
  preferred_markets?: string[];
  budget_min?: number;
  budget_max?: number;
  budget_currency?: string;
  monthly_income?: number;
  monthly_expenses?: number;
  risk_tolerance?: RiskTolerance;
  working_style?: WorkingStyle;
}

// ============================================
// Helper Types
// ============================================

/**
 * All valid user roles as a const array
 */
export const ALL_USER_ROLES: readonly UserRole[] = [
  "investor",
  "broker",
  "lawyer",
  "mortgage_advisor",
] as const;

/**
 * Professional roles (excludes investor)
 */
export const PROFESSIONAL_ROLES: readonly UserRole[] = [
  "broker",
  "lawyer",
  "mortgage_advisor",
] as const;

/**
 * Type guard to check if a string is a valid UserRole
 */
export function isValidUserRole(role: string): role is UserRole {
  return ALL_USER_ROLES.includes(role as UserRole);
}

/**
 * Type guard to check if a role is a professional role
 */
export function isProfessionalRole(role: UserRole): boolean {
  return PROFESSIONAL_ROLES.includes(role);
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
 * Get verification status display
 */
export function getVerificationStatusDisplay(status: VerificationStatus): {
  label: string;
  color: string;
} {
  const statusMap: Record<VerificationStatus, { label: string; color: string }> = {
    pending: { label: "Pending", color: "yellow" },
    under_review: { label: "Under Review", color: "blue" },
    verified: { label: "Verified", color: "green" },
    rejected: { label: "Rejected", color: "red" },
  };
  return statusMap[status];
}
