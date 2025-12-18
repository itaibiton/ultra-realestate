/**
 * Property Marketplace Constants
 * Static data and configuration for the marketplace
 */

import type { PropertyType, PropertySortField, SortDirection, ListingType } from "./types";

// Property type definitions with labels
export const PROPERTY_TYPES: {
  id: PropertyType;
  labelKey: string;
  icon: string;
}[] = [
  { id: "residential_apartment", labelKey: "propertyTypes.apartment", icon: "Building2" },
  { id: "residential_house", labelKey: "propertyTypes.house", icon: "Home" },
  { id: "commercial_office", labelKey: "propertyTypes.office", icon: "Building" },
  { id: "commercial_retail", labelKey: "propertyTypes.retail", icon: "Store" },
  { id: "industrial", labelKey: "propertyTypes.industrial", icon: "Factory" },
  { id: "land", labelKey: "propertyTypes.land", icon: "Mountain" },
  { id: "mixed_use", labelKey: "propertyTypes.mixedUse", icon: "Layers" },
];

// Listing type options
export const LISTING_TYPES: {
  id: ListingType;
  labelKey: string;
}[] = [
  { id: "sale", labelKey: "listingTypes.sale" },
  { id: "rent", labelKey: "listingTypes.rent" },
  { id: "both", labelKey: "listingTypes.both" },
];

// Common amenities
export const AMENITIES: {
  id: string;
  labelKey: string;
  icon: string;
}[] = [
  { id: "pool", labelKey: "amenities.pool", icon: "Waves" },
  { id: "gym", labelKey: "amenities.gym", icon: "Dumbbell" },
  { id: "parking", labelKey: "amenities.parking", icon: "Car" },
  { id: "security", labelKey: "amenities.security", icon: "Shield" },
  { id: "elevator", labelKey: "amenities.elevator", icon: "ArrowUpDown" },
  { id: "balcony", labelKey: "amenities.balcony", icon: "Sun" },
  { id: "garden", labelKey: "amenities.garden", icon: "TreeDeciduous" },
  { id: "storage", labelKey: "amenities.storage", icon: "Package" },
  { id: "laundry", labelKey: "amenities.laundry", icon: "WashingMachine" },
  { id: "ac", labelKey: "amenities.ac", icon: "Snowflake" },
  { id: "heating", labelKey: "amenities.heating", icon: "Flame" },
  { id: "doorman", labelKey: "amenities.doorman", icon: "UserCheck" },
  { id: "rooftop", labelKey: "amenities.rooftop", icon: "Cloud" },
  { id: "pets_allowed", labelKey: "amenities.petsAllowed", icon: "Dog" },
];

// Property features
export const FEATURES: {
  id: string;
  labelKey: string;
}[] = [
  { id: "renovated", labelKey: "features.renovated" },
  { id: "new_construction", labelKey: "features.newConstruction" },
  { id: "ocean_view", labelKey: "features.oceanView" },
  { id: "city_view", labelKey: "features.cityView" },
  { id: "mountain_view", labelKey: "features.mountainView" },
  { id: "furnished", labelKey: "features.furnished" },
  { id: "smart_home", labelKey: "features.smartHome" },
  { id: "solar_panels", labelKey: "features.solarPanels" },
  { id: "ev_charging", labelKey: "features.evCharging" },
  { id: "corner_unit", labelKey: "features.cornerUnit" },
  { id: "high_ceilings", labelKey: "features.highCeilings" },
  { id: "walk_in_closet", labelKey: "features.walkInCloset" },
  { id: "open_floor_plan", labelKey: "features.openFloorPlan" },
  { id: "investment_ready", labelKey: "features.investmentReady" },
];

// Sort options for property listing
export const SORT_OPTIONS: {
  field: PropertySortField;
  direction: SortDirection;
  labelKey: string;
}[] = [
  { field: "created_at", direction: "desc", labelKey: "sort.newest" },
  { field: "created_at", direction: "asc", labelKey: "sort.oldest" },
  { field: "price", direction: "asc", labelKey: "sort.priceLowHigh" },
  { field: "price", direction: "desc", labelKey: "sort.priceHighLow" },
  { field: "area_sqm", direction: "desc", labelKey: "sort.areaLargest" },
  { field: "area_sqm", direction: "asc", labelKey: "sort.areaSmallest" },
  { field: "bedrooms", direction: "desc", labelKey: "sort.bedrooms" },
  { field: "views_count", direction: "desc", labelKey: "sort.mostViewed" },
  { field: "saves_count", direction: "desc", labelKey: "sort.mostSaved" },
];

// Default filter values
export const DEFAULT_FILTERS = {
  status: "active" as const,
  listing_type: undefined,
  country_code: undefined,
  price_min: undefined,
  price_max: undefined,
  bedrooms_min: undefined,
  property_type: undefined,
};

// Default sort
export const DEFAULT_SORT = {
  field: "created_at" as PropertySortField,
  direction: "desc" as SortDirection,
};

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [12, 24, 48];

// Price range presets (USD)
export const PRICE_RANGES = [
  { min: 0, max: 100000, labelKey: "priceRanges.under100k" },
  { min: 100000, max: 250000, labelKey: "priceRanges.100kTo250k" },
  { min: 250000, max: 500000, labelKey: "priceRanges.250kTo500k" },
  { min: 500000, max: 1000000, labelKey: "priceRanges.500kTo1m" },
  { min: 1000000, max: 2000000, labelKey: "priceRanges.1mTo2m" },
  { min: 2000000, max: 5000000, labelKey: "priceRanges.2mTo5m" },
  { min: 5000000, max: undefined, labelKey: "priceRanges.over5m" },
];

// Bedroom options
export const BEDROOM_OPTIONS = [
  { value: 0, labelKey: "bedrooms.studio" },
  { value: 1, labelKey: "bedrooms.one" },
  { value: 2, labelKey: "bedrooms.two" },
  { value: 3, labelKey: "bedrooms.three" },
  { value: 4, labelKey: "bedrooms.four" },
  { value: 5, labelKey: "bedrooms.fivePlus" },
];

// Country codes we support
export const SUPPORTED_COUNTRIES = [
  { code: "US", nameKey: "countries.us", flag: "🇺🇸" },
  { code: "IL", nameKey: "countries.il", flag: "🇮🇱" },
];

// Currency formatting helpers
export const CURRENCIES: Record<string, { symbol: string; locale: string }> = {
  USD: { symbol: "$", locale: "en-US" },
  ILS: { symbol: "₪", locale: "he-IL" },
  EUR: { symbol: "€", locale: "de-DE" },
  GBP: { symbol: "£", locale: "en-GB" },
};

// Area unit conversion
export const SQM_TO_SQFT = 10.7639;

// Match score thresholds
export const MATCH_SCORE_THRESHOLDS = {
  excellent: 90,
  good: 70,
  fair: 50,
};

// AI insight cache duration (milliseconds)
export const INSIGHT_CACHE_DURATION = {
  analysis: 7 * 24 * 60 * 60 * 1000, // 7 days
  neighborhood: 30 * 24 * 60 * 60 * 1000, // 30 days
  legal: 90 * 24 * 60 * 60 * 1000, // 90 days
  investment: 7 * 24 * 60 * 60 * 1000, // 7 days
  comparison: 3 * 24 * 60 * 60 * 1000, // 3 days
  risks: 14 * 24 * 60 * 60 * 1000, // 14 days
};

// Popular cities by country
export const POPULAR_CITIES: Record<string, string[]> = {
  US: ["Miami", "New York", "Los Angeles", "Austin", "Phoenix", "Atlanta", "Seattle", "Denver"],
  IL: ["Tel Aviv", "Jerusalem", "Haifa", "Herzliya", "Netanya", "Ramat Gan", "Ashdod"],
};
