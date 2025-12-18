/**
 * Property Marketplace Types
 * Core types for the real estate marketplace feature
 */

// Database enums (matching Supabase schema)
export type PropertyType =
  | "residential_apartment"
  | "residential_house"
  | "commercial_office"
  | "commercial_retail"
  | "industrial"
  | "land"
  | "mixed_use";

export type PropertyStatus = "draft" | "active" | "pending" | "sold" | "archived";

export type ListingType = "sale" | "rent" | "both";

export type InsightType =
  | "analysis"
  | "neighborhood"
  | "legal"
  | "investment"
  | "comparison"
  | "risks";

// Core Property interface
export interface Property {
  id: string;
  title: string;
  description: string | null;
  slug: string;

  // Location
  country_code: string;
  state: string | null;
  city: string;
  address: string | null;
  zip_code: string | null;
  latitude: number | null;
  longitude: number | null;
  neighborhood: string | null;

  // Pricing
  price: number;
  currency: string;
  price_per_sqm: number | null;

  // Details
  property_type: PropertyType;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqm: number | null;
  lot_size_sqm: number | null;
  year_built: number | null;
  floors: number | null;
  parking_spaces: number | null;

  // Media
  images: string[];
  video_url: string | null;
  virtual_tour_url: string | null;

  // Features
  features: string[];
  amenities: string[];

  // Investment Metrics
  rental_yield: number | null;
  estimated_monthly_rent: number | null;
  hoa_fees: number | null;
  property_tax_annual: number | null;

  // Status
  status: PropertyStatus;
  listing_type: ListingType;

  // Agent
  agent_id: string | null;
  source: string | null;
  external_id: string | null;

  // Metrics
  views_count: number;
  saves_count: number;
  is_featured: boolean;

  // Timestamps
  created_at: string;
  updated_at: string;
}

// Property with additional computed fields for display
export interface PropertyWithExtras extends Property {
  is_saved?: boolean;
  match_score?: number;
  match_reasons?: string[];
  country?: Country;
}

// Country information
export interface Country {
  id: string;
  code: string;
  name: string;
  name_he: string | null;
  flag_emoji: string | null;
  market_overview: MarketOverview;
  ownership_rules: OwnershipRules;
  tax_info: TaxInfo;
  financing_options: FinancingOptions;
  israeli_community_info: string | null;
  israeli_population_estimate: number | null;
  hebrew_services_available: boolean;
  israeli_banks_operating: string[];
  currency_code: string | null;
  timezone: string | null;
  languages: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

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

// Saved property (watchlist)
export interface SavedProperty {
  id: string;
  user_id: string;
  property_id: string;
  notes: string | null;
  notify_price_change: boolean;
  notify_status_change: boolean;
  created_at: string;
  property?: Property;
}

// Property insight (AI-generated)
export interface PropertyInsight {
  id: string;
  property_id: string;
  insight_type: InsightType;
  content: InsightContent;
  locale: string;
  version: number;
  generated_at: string;
  expires_at: string | null;
  model_used: string | null;
  generation_time_ms: number | null;
}

export interface InsightContent {
  summary?: string;
  highlights?: string[];
  details?: Record<string, unknown>;
  score?: number;
  recommendations?: string[];
  risks?: string[];
  opportunities?: string[];
}

// Filter types for property search
export interface PropertyFilters {
  country_code?: string;
  city?: string;
  state?: string;
  property_type?: PropertyType[];
  listing_type?: ListingType;
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
  status?: PropertyStatus;
}

// Sort options
export type PropertySortField =
  | "price"
  | "created_at"
  | "area_sqm"
  | "bedrooms"
  | "views_count"
  | "saves_count";

export type SortDirection = "asc" | "desc";

export interface PropertySort {
  field: PropertySortField;
  direction: SortDirection;
}

// Pagination
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

// Search params combining filters, sort, and pagination
export interface PropertySearchParams {
  filters?: PropertyFilters;
  sort?: PropertySort;
  pagination?: PaginationParams;
  search?: string;
}

// Property card display props
export interface PropertyCardProps {
  property: PropertyWithExtras;
  onSave?: (propertyId: string) => void;
  onUnsave?: (propertyId: string) => void;
  isSaved?: boolean;
  showMatchScore?: boolean;
  locale?: string;
}

// Property form data for creation/editing
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
