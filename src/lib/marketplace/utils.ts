/**
 * Property Marketplace Utilities
 * Helper functions for marketplace features
 */

import { CURRENCIES, PROPERTY_TYPES, SQM_TO_SQFT, MATCH_SCORE_THRESHOLDS } from "./constants";
import type { Property, PropertyType, PropertyWithExtras } from "./types";

/**
 * Format price with currency symbol and locale
 */
export function formatPrice(
  price: number,
  currency: string = "USD",
  locale: string = "en"
): string {
  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const displayLocale = locale === "he" ? "he-IL" : currencyConfig.locale;

  return new Intl.NumberFormat(displayLocale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format area with unit conversion option
 */
export function formatArea(
  areaSqm: number,
  unit: "sqm" | "sqft" = "sqm",
  locale: string = "en"
): string {
  const value = unit === "sqft" ? areaSqm * SQM_TO_SQFT : areaSqm;
  const displayLocale = locale === "he" ? "he-IL" : "en-US";
  const formatted = new Intl.NumberFormat(displayLocale, {
    maximumFractionDigits: 0,
  }).format(value);

  return `${formatted} ${unit === "sqft" ? "sq ft" : "m²"}`;
}

/**
 * Get property type label key
 */
export function getPropertyTypeLabel(type: PropertyType): string {
  const found = PROPERTY_TYPES.find((pt) => pt.id === type);
  return found?.labelKey || "marketplace.propertyTypes.unknown";
}

/**
 * Get country flag emoji
 */
export function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    US: "🇺🇸",
    IL: "🇮🇱",
    UK: "🇬🇧",
    DE: "🇩🇪",
    FR: "🇫🇷",
    ES: "🇪🇸",
    IT: "🇮🇹",
    PT: "🇵🇹",
    GR: "🇬🇷",
    CY: "🇨🇾",
  };
  return flags[countryCode] || "🌍";
}

/**
 * Calculate match score between property and investor profile
 * Returns a score from 0-100
 */
export function calculateMatchScore(
  property: Property,
  investorProfile: {
    budget_min?: number;
    budget_max?: number;
    preferred_markets?: string[];
    property_types?: PropertyType[];
    investment_goals?: string[];
  }
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  let factors = 0;

  // Budget match (0-30 points)
  if (investorProfile.budget_min !== undefined || investorProfile.budget_max !== undefined) {
    factors++;
    const budgetMin = investorProfile.budget_min || 0;
    const budgetMax = investorProfile.budget_max || Infinity;

    if (property.price >= budgetMin && property.price <= budgetMax) {
      score += 30;
      reasons.push("withinBudget");
    } else if (property.price < budgetMin * 0.8 || property.price > budgetMax * 1.2) {
      // Way outside budget
      score += 5;
    } else {
      // Close to budget
      score += 15;
      reasons.push("nearBudget");
    }
  }

  // Location match (0-25 points)
  if (investorProfile.preferred_markets && investorProfile.preferred_markets.length > 0) {
    factors++;
    const propertyLocation = `${property.city}, ${property.country_code}`.toLowerCase();
    const isMatch = investorProfile.preferred_markets.some(
      (market) =>
        propertyLocation.includes(market.toLowerCase()) ||
        property.country_code.toLowerCase() === market.toLowerCase()
    );

    if (isMatch) {
      score += 25;
      reasons.push("preferredLocation");
    } else {
      score += 5;
    }
  }

  // Property type match (0-25 points)
  if (investorProfile.property_types && investorProfile.property_types.length > 0) {
    factors++;
    if (investorProfile.property_types.includes(property.property_type)) {
      score += 25;
      reasons.push("preferredType");
    } else {
      score += 5;
    }
  }

  // Investment metrics (0-20 points)
  if (investorProfile.investment_goals?.includes("rental_income") && property.rental_yield) {
    factors++;
    if (property.rental_yield >= 5) {
      score += 20;
      reasons.push("highYield");
    } else if (property.rental_yield >= 3) {
      score += 15;
      reasons.push("goodYield");
    } else {
      score += 5;
    }
  }

  // Normalize score based on factors evaluated
  const normalizedScore = factors > 0 ? Math.round((score / (factors * 25)) * 100) : 50;

  return {
    score: Math.min(100, normalizedScore),
    reasons,
  };
}

/**
 * Get match score label
 */
export function getMatchScoreLabel(score: number): "excellent" | "good" | "fair" | "low" {
  if (score >= MATCH_SCORE_THRESHOLDS.excellent) return "excellent";
  if (score >= MATCH_SCORE_THRESHOLDS.good) return "good";
  if (score >= MATCH_SCORE_THRESHOLDS.fair) return "fair";
  return "low";
}

/**
 * Generate property URL slug
 */
export function generateSlug(title: string, id?: string): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  return id ? `${baseSlug}-${id.slice(0, 8)}` : baseSlug;
}

/**
 * Parse search query into filters
 */
export function parseSearchQuery(query: string): {
  city?: string;
  bedrooms?: number;
  priceMax?: number;
} {
  const result: {
    city?: string;
    bedrooms?: number;
    priceMax?: number;
  } = {};

  // Extract bedroom count (e.g., "3 bed", "3br", "3 bedroom")
  const bedroomMatch = query.match(/(\d+)\s*(?:bed|br|bedroom)/i);
  if (bedroomMatch) {
    result.bedrooms = parseInt(bedroomMatch[1], 10);
  }

  // Extract price (e.g., "under 500k", "max 1m", "$500,000")
  const priceMatch = query.match(/(?:under|max|<)\s*\$?(\d+(?:\.\d+)?)\s*(k|m)?/i);
  if (priceMatch) {
    let price = parseFloat(priceMatch[1]);
    const suffix = priceMatch[2]?.toLowerCase();
    if (suffix === "k") price *= 1000;
    if (suffix === "m") price *= 1000000;
    result.priceMax = price;
  }

  // Remaining text is likely city/location
  const cleanedQuery = query
    .replace(/(\d+)\s*(?:bed|br|bedroom)/i, "")
    .replace(/(?:under|max|<)\s*\$?(\d+(?:\.\d+)?)\s*(k|m)?/i, "")
    .trim();

  if (cleanedQuery.length > 2) {
    result.city = cleanedQuery;
  }

  return result;
}

/**
 * Sort properties by match score
 */
export function sortByMatchScore(properties: PropertyWithExtras[]): PropertyWithExtras[] {
  return [...properties].sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
}

/**
 * Get compact price display (e.g., "$1.2M", "$500K")
 */
export function formatCompactPrice(price: number, currency: string = "USD"): string {
  const symbol = CURRENCIES[currency]?.symbol || "$";

  if (price >= 1000000) {
    return `${symbol}${(price / 1000000).toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `${symbol}${Math.round(price / 1000)}K`;
  }
  return `${symbol}${price}`;
}

/**
 * Calculate ROI based on property metrics
 */
export function calculateROI(property: Property): {
  annualReturn: number;
  capRate: number;
  cashOnCash: number;
} | null {
  if (!property.estimated_monthly_rent) return null;

  const annualRent = property.estimated_monthly_rent * 12;
  const annualExpenses =
    (property.hoa_fees || 0) * 12 +
    (property.property_tax_annual || 0);
  const netOperatingIncome = annualRent - annualExpenses;

  return {
    annualReturn: annualRent,
    capRate: (netOperatingIncome / property.price) * 100,
    cashOnCash: ((netOperatingIncome) / (property.price * 0.25)) * 100, // Assuming 25% down
  };
}
