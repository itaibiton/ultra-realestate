/**
 * Professional Onboarding Constants
 * US states, specializations, practice areas, and other constants
 */

// ============================================
// US States
// ============================================

export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
] as const;

export type USState = (typeof US_STATES)[number]["value"];

// ============================================
// Broker Specializations
// ============================================

export const BROKER_SPECIALIZATIONS = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "luxury", label: "Luxury" },
  { value: "investment", label: "Investment Properties" },
  { value: "vacation", label: "Vacation/Second Homes" },
  { value: "international", label: "International" },
  { value: "new_construction", label: "New Construction" },
  { value: "relocation", label: "Relocation" },
] as const;

export type BrokerSpecialization = (typeof BROKER_SPECIALIZATIONS)[number]["value"];

// ============================================
// Lawyer Practice Areas
// ============================================

export const LAWYER_PRACTICE_AREAS = [
  { value: "real_estate_transactions", label: "Real Estate Transactions" },
  { value: "commercial_real_estate", label: "Commercial Real Estate" },
  { value: "residential_closings", label: "Residential Closings" },
  { value: "title_insurance", label: "Title Insurance" },
  { value: "zoning_land_use", label: "Zoning & Land Use" },
  { value: "construction_law", label: "Construction Law" },
  { value: "landlord_tenant", label: "Landlord-Tenant" },
  { value: "foreclosure", label: "Foreclosure" },
  { value: "tax_law", label: "Tax Law" },
  { value: "estate_planning", label: "Estate Planning" },
] as const;

export type LawyerPracticeArea = (typeof LAWYER_PRACTICE_AREAS)[number]["value"];

// ============================================
// Loan Types
// ============================================

export const LOAN_TYPES = [
  { value: "conventional", label: "Conventional" },
  { value: "fha", label: "FHA" },
  { value: "va", label: "VA" },
  { value: "usda", label: "USDA" },
  { value: "jumbo", label: "Jumbo" },
  { value: "heloc", label: "HELOC" },
  { value: "refinance", label: "Refinance" },
  { value: "reverse_mortgage", label: "Reverse Mortgage" },
  { value: "construction", label: "Construction" },
  { value: "investment_property", label: "Investment Property" },
] as const;

export type LoanType = (typeof LOAN_TYPES)[number]["value"];

// ============================================
// Experience Levels
// ============================================

export const EXPERIENCE_LEVELS = [
  { value: 1, label: "1-2 years" },
  { value: 3, label: "3-5 years" },
  { value: 6, label: "6-10 years" },
  { value: 11, label: "11-15 years" },
  { value: 16, label: "16-20 years" },
  { value: 21, label: "20+ years" },
] as const;

// ============================================
// Contact Methods
// ============================================

export const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "text", label: "Text Message" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number]["value"];

// ============================================
// Languages
// ============================================

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "he", label: "Hebrew" },
  { value: "es", label: "Spanish" },
  { value: "zh", label: "Chinese" },
  { value: "ar", label: "Arabic" },
  { value: "ru", label: "Russian" },
  { value: "fr", label: "French" },
  { value: "pt", label: "Portuguese" },
  { value: "de", label: "German" },
  { value: "ko", label: "Korean" },
  { value: "vi", label: "Vietnamese" },
] as const;

export type Language = (typeof LANGUAGES)[number]["value"];

// ============================================
// Document Types
// ============================================

export const DOCUMENT_TYPES = {
  broker: [
    { value: "license", label: "Real Estate License", required: true },
    { value: "insurance", label: "E&O Insurance", required: false },
    { value: "id", label: "Government ID", required: false },
  ],
  lawyer: [
    { value: "bar_certificate", label: "Bar Certificate", required: true },
    { value: "insurance", label: "Malpractice Insurance", required: false },
    { value: "id", label: "Government ID", required: false },
  ],
  mortgage_advisor: [
    { value: "nmls_certificate", label: "NMLS Certificate", required: true },
    { value: "state_license", label: "State License", required: false },
    { value: "id", label: "Government ID", required: false },
  ],
} as const;

// ============================================
// Validation Patterns
// ============================================

export const VALIDATION_PATTERNS = {
  license_number: /^[A-Z0-9]{6,20}$/i,
  bar_number: /^[A-Z0-9]{4,15}$/i,
  nmls_id: /^\d{5,10}$/,
  phone: /^\+?[1-9]\d{1,14}$/,
  url: /^https?:\/\/.+\..+/,
} as const;

// ============================================
// Max File Sizes
// ============================================

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};
