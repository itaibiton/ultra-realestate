/**
 * Property Types
 * Extended type definitions for properties with relationships
 */

import type { Database, Json } from "./database.types";
import type { BrokerWithUser, User } from "./profiles.types";

// ============================================
// Database Types (re-exported for convenience)
// ============================================

export type PropertyType = Database["public"]["Enums"]["property_type"];
export type PropertyStatus = Database["public"]["Enums"]["property_status"];
export type ListingType = Database["public"]["Enums"]["listing_type"];
export type InsightType = Database["public"]["Enums"]["insight_type"];

// ============================================
// Base Property Types
// ============================================

export type Property = Database["public"]["Tables"]["properties"]["Row"];
export type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"];
export type PropertyUpdate = Database["public"]["Tables"]["properties"]["Update"];

// ============================================
// Property Insight Types
// ============================================

export type PropertyInsight = Database["public"]["Tables"]["property_insights"]["Row"];
export type PropertyInsightInsert = Database["public"]["Tables"]["property_insights"]["Insert"];
export type PropertyInsightUpdate = Database["public"]["Tables"]["property_insights"]["Update"];

// ============================================
// Saved Property Types
// ============================================

export type SavedProperty = Database["public"]["Tables"]["saved_properties"]["Row"];
export type SavedPropertyInsert = Database["public"]["Tables"]["saved_properties"]["Insert"];
export type SavedPropertyUpdate = Database["public"]["Tables"]["saved_properties"]["Update"];

// ============================================
// Country Types
// ============================================

export type Country = Database["public"]["Tables"]["countries"]["Row"];
export type CountryInsert = Database["public"]["Tables"]["countries"]["Insert"];
export type CountryUpdate = Database["public"]["Tables"]["countries"]["Update"];

// ============================================
// Extended Property Types
// ============================================

/**
 * Property with broker relationship
 */
export interface PropertyWithBroker extends Property {
  broker: BrokerWithUser | null;
}

/**
 * Property with agent (user) relationship
 */
export interface PropertyWithAgent extends Property {
  agent: User | null;
}

/**
 * Property with AI-generated insights
 */
export interface PropertyWithInsights extends Property {
  insights: PropertyInsight[];
}

/**
 * Property with country information
 */
export interface PropertyWithCountry extends Property {
  country: Country | null;
}

/**
 * Property with save status for current user
 */
export interface PropertyWithSaveStatus extends Property {
  is_saved: boolean;
  saved_at?: string | null;
  save_notes?: string | null;
}

/**
 * Property with match score (for recommendations)
 */
export interface PropertyWithMatch extends Property {
  match_score: number;
  match_reasons: string[];
}

/**
 * Full property details for detail page
 */
export interface PropertyWithDetails extends Property {
  broker: BrokerWithUser | null;
  agent: User | null;
  insights: PropertyInsight[];
  country: Country | null;
  is_saved: boolean;
  similar_properties?: Property[];
}

/**
 * Property with all extensions (for marketplace listing)
 */
export interface PropertyWithExtras extends Property {
  is_saved?: boolean;
  match_score?: number;
  match_reasons?: string[];
  country?: Country | null;
}

// ============================================
// Insight Content Types
// ============================================

export interface InsightContent {
  summary?: string;
  highlights?: string[];
  details?: Record<string, unknown>;
  score?: number;
  recommendations?: string[];
  risks?: string[];
  opportunities?: string[];
}

// ============================================
// Market Overview Types (from countries)
// ============================================

export interface MarketOverview {
  avg_price_sqm?: number;
  price_trend?: "rising" | "stable" | "falling";
  rental_yield_avg?: number;
  market_size?: string;
  popular_cities?: string[];
}

export interface OwnershipRules {
  foreign_ownership?: boolean;
  restrictions?: string[];
  visa_requirements?: string[];
  required_docs?: string[];
}

export interface TaxInfo {
  property_tax_rate?: string;
  capital_gains_tax?: string;
  stamp_duty?: string;
  income_tax_rental?: string;
  tax_treaty_israel?: boolean;
  purchase_tax?: string;
}

export interface FinancingOptions {
  local_mortgage?: boolean;
  foreign_buyer_mortgage?: boolean;
  max_ltv?: number;
  israeli_banks?: string[];
  requirements?: string[];
}

// ============================================
// Filter & Search Types
// ============================================

export interface PropertyFilters {
  country_code?: string;
  city?: string;
  state?: string;
  property_type?: PropertyType[];
  listing_type?: ListingType;
  status?: PropertyStatus;
  price_min?: number;
  price_max?: number;
  bedrooms_min?: number;
  bedrooms_max?: number;
  bathrooms_min?: number;
  area_min?: number;
  area_max?: number;
  features?: string[];
  amenities?: string[];
  is_featured?: boolean;
}

export type PropertySortField =
  | "price"
  | "created_at"
  | "updated_at"
  | "area_sqm"
  | "bedrooms"
  | "views_count"
  | "saves_count";

export type SortDirection = "asc" | "desc";

export interface PropertySort {
  field: PropertySortField;
  direction: SortDirection;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PropertySearchParams {
  filters?: PropertyFilters;
  sort?: PropertySort;
  pagination?: PaginationParams;
  search?: string;
}

// ============================================
// Form Data Types
// ============================================

export interface PropertyFormData {
  title: string;
  description?: string;
  country_code: string;
  state?: string;
  city: string;
  address?: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  neighborhood?: string;
  price: number;
  currency: string;
  property_type: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  area_sqm?: number;
  lot_size_sqm?: number;
  year_built?: number;
  floors?: number;
  parking_spaces?: number;
  images?: string[];
  video_url?: string;
  virtual_tour_url?: string;
  features?: string[];
  amenities?: string[];
  rental_yield?: number;
  estimated_monthly_rent?: number;
  hoa_fees?: number;
  property_tax_annual?: number;
  listing_type: ListingType;
  status?: PropertyStatus;
}

// ============================================
// Component Props Types
// ============================================

export interface PropertyCardProps {
  property: PropertyWithExtras;
  onSave?: (propertyId: string) => void;
  onUnsave?: (propertyId: string) => void;
  isSaved?: boolean;
  showMatchScore?: boolean;
  locale?: string;
}

export interface PropertyListProps {
  properties: PropertyWithExtras[];
  onSave?: (propertyId: string) => void;
  onUnsave?: (propertyId: string) => void;
  savedPropertyIds?: string[];
  showMatchScore?: boolean;
  locale?: string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export interface PropertyFiltersProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  onReset?: () => void;
}
