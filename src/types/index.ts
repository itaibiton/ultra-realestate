/**
 * Centralized Type Exports
 *
 * This module re-exports all types from the types directory for easy imports.
 * Usage: import { User, Property, BrokerProfile } from '@/types';
 */

// ============================================
// Database Types
// ============================================
export type { Database, Json, Tables, TablesInsert, TablesUpdate, Enums, CompositeTypes } from "./database.types";
export { Constants } from "./database.types";

// ============================================
// Profile Types
// ============================================
export type {
  // Enum types
  UserRole,
  VerificationStatus,
  BrokerSpecialization,
  LawyerPracticeArea,
  LoanType,
  ExperienceLevel,
  InvestmentGoal,
  InvestmentTimeline,
  RiskTolerance,
  WorkingStyle,
  // User types
  User,
  UserInsert,
  UserUpdate,
  // Investor profile types
  InvestorProfile,
  InvestorProfileInsert,
  InvestorProfileUpdate,
  // Broker profile types
  BrokerProfile,
  BrokerProfileInsert,
  BrokerProfileUpdate,
  // Lawyer profile types
  LawyerProfile,
  LawyerProfileInsert,
  LawyerProfileUpdate,
  // Mortgage advisor profile types
  MortgageAdvisorProfile,
  MortgageAdvisorProfileInsert,
  MortgageAdvisorProfileUpdate,
  // Extended types with relationships
  UserWithProfile,
  BrokerWithUser,
  LawyerWithUser,
  MortgageAdvisorWithUser,
  ProfessionalProfile,
  ProfessionalWithUser,
  // Verification
  VerificationDocument,
  // Form data types
  BrokerProfileFormData,
  LawyerProfileFormData,
  MortgageAdvisorProfileFormData,
  InvestorProfileFormData,
} from "./profiles.types";

export {
  ALL_USER_ROLES,
  PROFESSIONAL_ROLES,
  isValidUserRole,
  isProfessionalRole,
  getRoleDisplayName,
  getVerificationStatusDisplay,
} from "./profiles.types";

// ============================================
// Property Types
// ============================================
export type {
  // Enum types
  PropertyType,
  PropertyStatus,
  ListingType,
  InsightType,
  // Property types
  Property,
  PropertyInsert,
  PropertyUpdate,
  // Property insight types
  PropertyInsight,
  PropertyInsightInsert,
  PropertyInsightUpdate,
  // Saved property types
  SavedProperty,
  SavedPropertyInsert,
  SavedPropertyUpdate,
  // Country types
  Country,
  CountryInsert,
  CountryUpdate,
  // Extended property types
  PropertyWithBroker,
  PropertyWithAgent,
  PropertyWithInsights,
  PropertyWithCountry,
  PropertyWithSaveStatus,
  PropertyWithMatch,
  PropertyWithDetails,
  PropertyWithExtras,
  // Insight content
  InsightContent,
  // Market info types
  MarketOverview,
  OwnershipRules,
  TaxInfo,
  FinancingOptions,
  // Filter & search types
  PropertyFilters,
  PropertySortField,
  SortDirection,
  PropertySort,
  PaginationParams,
  PaginatedResponse,
  PropertySearchParams,
  // Form data
  PropertyFormData,
  // Component props
  PropertyCardProps,
  PropertyListProps,
  PropertyFiltersProps,
} from "./properties.types";
