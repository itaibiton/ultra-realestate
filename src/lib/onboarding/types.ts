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
  | 'income-expenses';

export type QuestionCategory =
  | 'budget'
  | 'purpose'
  | 'location'
  | 'property'
  | 'timeline'
  | 'experience'
  | 'finances';

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

export interface InvestorProfileData {
  budget: number;
  budgetCurrency: string;
  purpose: PurchasePurpose;
  preferredLocations: string[];
  propertyTypes: PropertyType[];
  timeline: PurchaseTimeline;
  experienceLevel: ExperienceLevel;
  monthlyIncome: number;
  monthlyExpenses: number;
}

// Professionals types
export type ProfessionalType = 'mortgage_advisor' | 'real_estate_agent' | 'lawyer';

export interface ProfessionalRecommendation {
  type: ProfessionalType;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}
