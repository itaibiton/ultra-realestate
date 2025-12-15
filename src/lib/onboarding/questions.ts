/**
 * Onboarding Questions Engine
 * Defines the MVP question flow for investor onboarding
 */

import type { Question, OnboardingStep } from './types';

/**
 * All available onboarding questions (MVP - 7 questions)
 */
export const ONBOARDING_QUESTIONS: Question[] = [
  // Step 1: Budget
  {
    id: 'budget',
    category: 'budget',
    type: 'currency-input',
    titleKey: 'questions.budget.title',
    descriptionKey: 'questions.budget.description',
    required: true,
    defaultValue: { amount: 500000, currency: 'USD' },
  },

  // Step 2: Purpose
  {
    id: 'purpose',
    category: 'purpose',
    type: 'single-select',
    titleKey: 'questions.purpose.title',
    descriptionKey: 'questions.purpose.description',
    required: true,
    options: [
      { id: 'investment', labelKey: 'questions.purpose.options.investment', icon: 'TrendingUp' },
      { id: 'living', labelKey: 'questions.purpose.options.living', icon: 'Home' },
      { id: 'both', labelKey: 'questions.purpose.options.both', icon: 'Layers' },
    ],
  },

  // Step 3: Location
  {
    id: 'location',
    category: 'location',
    type: 'multi-select',
    titleKey: 'questions.location.title',
    descriptionKey: 'questions.location.description',
    required: true,
    validation: { minSelected: 1, maxSelected: 3 },
    options: [
      { id: 'israel', labelKey: 'questions.location.options.israel', icon: '🇮🇱' },
      { id: 'usa', labelKey: 'questions.location.options.usa', icon: '🇺🇸' },
      { id: 'europe', labelKey: 'questions.location.options.europe', icon: '🇪🇺' },
      { id: 'uae', labelKey: 'questions.location.options.uae', icon: '🇦🇪' },
      { id: 'other', labelKey: 'questions.location.options.other', icon: '🌍' },
    ],
  },

  // Step 4: Property Type
  {
    id: 'property_type',
    category: 'property',
    type: 'multi-select',
    titleKey: 'questions.property.title',
    descriptionKey: 'questions.property.description',
    required: true,
    validation: { minSelected: 1 },
    options: [
      { id: 'apartment', labelKey: 'questions.property.options.apartment', icon: 'Building2' },
      { id: 'house', labelKey: 'questions.property.options.house', icon: 'Home' },
      { id: 'commercial', labelKey: 'questions.property.options.commercial', icon: 'Store' },
      { id: 'land', labelKey: 'questions.property.options.land', icon: 'Mountain' },
    ],
  },

  // Step 5: Timeline
  {
    id: 'timeline',
    category: 'timeline',
    type: 'single-select',
    titleKey: 'questions.timeline.title',
    descriptionKey: 'questions.timeline.description',
    required: true,
    options: [
      { id: 'asap', labelKey: 'questions.timeline.options.asap', icon: 'Zap' },
      { id: '3_6_months', labelKey: 'questions.timeline.options.3_6_months', icon: 'Calendar' },
      { id: '6_12_months', labelKey: 'questions.timeline.options.6_12_months', icon: 'CalendarDays' },
      { id: '1_year_plus', labelKey: 'questions.timeline.options.1_year_plus', icon: 'Clock' },
    ],
  },

  // Step 6: Experience
  {
    id: 'experience',
    category: 'experience',
    type: 'single-select',
    titleKey: 'questions.experience.title',
    descriptionKey: 'questions.experience.description',
    required: true,
    options: [
      { id: 'first_time', labelKey: 'questions.experience.options.first_time', icon: 'User', description: 'questions.experience.options.first_time_desc' },
      { id: 'some_experience', labelKey: 'questions.experience.options.some_experience', icon: 'Users', description: 'questions.experience.options.some_experience_desc' },
      { id: 'experienced', labelKey: 'questions.experience.options.experienced', icon: 'Award', description: 'questions.experience.options.experienced_desc' },
    ],
  },

  // Step 7: Income & Expenses
  {
    id: 'finances',
    category: 'finances',
    type: 'income-expenses',
    titleKey: 'questions.finances.title',
    descriptionKey: 'questions.finances.description',
    required: true,
  },
];

/**
 * Onboarding flow steps (order of questions)
 */
export const ONBOARDING_STEPS: OnboardingStep[] = [
  { id: 1, questionId: 'budget', aiPromptKey: 'ai.budget' },
  { id: 2, questionId: 'purpose', aiPromptKey: 'ai.purpose' },
  { id: 3, questionId: 'location', aiPromptKey: 'ai.location' },
  { id: 4, questionId: 'property_type', aiPromptKey: 'ai.property' },
  { id: 5, questionId: 'timeline', aiPromptKey: 'ai.timeline' },
  { id: 6, questionId: 'experience', aiPromptKey: 'ai.experience' },
  { id: 7, questionId: 'finances', aiPromptKey: 'ai.finances' },
];

/**
 * Get a question by ID
 */
export function getQuestionById(id: string): Question | undefined {
  return ONBOARDING_QUESTIONS.find((q) => q.id === id);
}

/**
 * Get the question for a specific step
 */
export function getQuestionForStep(step: number): Question | undefined {
  const stepConfig = ONBOARDING_STEPS.find((s) => s.id === step);
  if (!stepConfig) return undefined;
  return getQuestionById(stepConfig.questionId);
}

/**
 * Get the AI prompt key for a specific step
 */
export function getAIPromptKeyForStep(step: number): string | undefined {
  const stepConfig = ONBOARDING_STEPS.find((s) => s.id === step);
  return stepConfig?.aiPromptKey;
}

/**
 * Get total number of steps
 */
export function getTotalSteps(): number {
  return ONBOARDING_STEPS.length;
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(currentStep: number): number {
  const total = getTotalSteps();
  return Math.round((currentStep / total) * 100);
}

/**
 * Validate a response for a question
 */
export function validateResponse(questionId: string, value: unknown): { valid: boolean; error?: string } {
  const question = getQuestionById(questionId);
  if (!question) {
    return { valid: false, error: 'Question not found' };
  }

  // Check required
  if (question.required && (value === undefined || value === null || value === '')) {
    return { valid: false, error: 'This field is required' };
  }

  // Check multi-select validation
  if (question.type === 'multi-select' && Array.isArray(value)) {
    const { minSelected, maxSelected } = question.validation || {};
    if (minSelected && value.length < minSelected) {
      return { valid: false, error: `Please select at least ${minSelected} option(s)` };
    }
    if (maxSelected && value.length > maxSelected) {
      return { valid: false, error: `Please select at most ${maxSelected} option(s)` };
    }
  }

  return { valid: true };
}
