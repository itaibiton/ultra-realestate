/**
 * Onboarding Types
 * Types and interfaces for the investor onboarding flow
 */

export type QuestionType =
  | 'single-select'
  | 'multi-select'
  | 'text'
  | 'number'
  | 'currency-input'
  | 'income-expenses'
  | 'country-select'        // Single country selection with flags
  | 'country-multi-select'  // Multiple country selection with flags
  | 'budget-slider'         // Budget slider (legacy)
  | 'budget-range'          // Budget range with min/max inputs
  | 'risk-slider'           // Risk tolerance slider
  | 'open-text';            // Free text with AI response

export type QuestionCategory =
  | 'budget'
  | 'purpose'
  | 'location'
  | 'property'
  | 'timeline'
  | 'experience'
  | 'finances'
  | 'personal'      // NEW: Personal info (country, citizenship)
  | 'risk'          // NEW: Risk tolerance
  | 'requirements'  // NEW: Special requirements
  | 'contact';      // NEW: Contact preferences

export interface QuestionOption {
  id: string;
  labelKey: string; // Translation key
  icon?: string;
  description?: string;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  type: QuestionType;
  titleKey: string; // Translation key for question title
  descriptionKey?: string; // Translation key for description
  options?: QuestionOption[];
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: unknown;
  validation?: {
    minLength?: number;
    maxLength?: number;
    minSelected?: number;
    maxSelected?: number;
  };
  // NEW: AI integration settings
  aiEnabled?: boolean;      // Whether to use AI for responses
  aiInsights?: boolean;     // Whether to generate insights
  allowOpenText?: boolean;  // Allow free text in addition to options
}

export interface OnboardingStep {
  id: number;
  questionId: string;
  aiPromptKey: string; // Translation key for AI's question
}

export interface OnboardingResponse {
  questionId: string;
  value: unknown;
  timestamp: Date;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  responses: Record<string, unknown>;
  isComplete: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export interface OnboardingProgress {
  step: number;
  totalSteps: number;
  percentage: number;
  currentQuestion: Question;
  answers: Record<string, unknown>;
}

// MVP Types
export type PurchasePurpose = 'investment' | 'living' | 'both';

export type PropertyType =
  | 'apartment'
  | 'house'
  | 'commercial'
  | 'land';

export type PurchaseTimeline =
  | 'asap'
  | '3_6_months'
  | '6_12_months'
  | '1_year_plus';

export type ExperienceLevel =
  | 'first_time'
  | 'some_experience'
  | 'experienced';

// NEW: Risk tolerance levels
export type RiskTolerance =
  | 'conservative'
  | 'moderate'
  | 'aggressive';

// NEW: Contact preferences
export type ContactPreference =
  | 'email'
  | 'whatsapp'
  | 'phone';

export interface InvestorProfileData {
  // Personal
  currentCountry?: string;
  citizenship?: string;

  // Budget
  budget: number;
  budgetCurrency: string;
  budgetRangeMin?: number;
  budgetRangeMax?: number;

  // Preferences
  purpose: PurchasePurpose;
  preferredLocations: string[];
  propertyTypes: PropertyType[];
  timeline: PurchaseTimeline;

  // Risk & Experience
  riskTolerance?: RiskTolerance;
  experienceLevel: ExperienceLevel;

  // Finances
  monthlyIncome: number;
  monthlyExpenses: number;

  // Additional
  specialRequirements?: string;
  contactPreference?: ContactPreference;
}

// Professionals types
export type ProfessionalType = 'mortgage_advisor' | 'real_estate_agent' | 'lawyer';

export interface ProfessionalRecommendation {
  type: ProfessionalType;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

// AI Response types
export interface AIOnboardingResponse {
  message: string;
  followUp?: string;
  insights?: string[];
}

export interface OnboardingContext {
  currentCountry?: string;
  citizenship?: string;
  budget?: number;
  budgetCurrency?: string;
  investmentPurpose?: string;
  targetLocations?: string[];
  propertyTypes?: string[];
  timeline?: string;
  riskTolerance?: string;
  experienceLevel?: string;
  specialRequirements?: string;
}
