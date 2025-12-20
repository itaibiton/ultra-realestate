/**
 * Onboarding Questions Engine
 * Defines the expanded question flow for investor onboarding
 * With AI-powered responses and enhanced UX
 */

import type { Question, OnboardingStep } from './types';

/**
 * All available onboarding questions (Expanded - 11 questions)
 */
export const ONBOARDING_QUESTIONS: Question[] = [
  // Step 1: Current Country (NEW)
  {
    id: 'current_country',
    category: 'personal',
    type: 'country-select',
    titleKey: 'questions.current_country.title',
    descriptionKey: 'questions.current_country.description',
    required: true,
    aiEnabled: true,
  },

  // Step 2: Citizenship (NEW)
  {
    id: 'citizenship',
    category: 'personal',
    type: 'country-select',
    titleKey: 'questions.citizenship.title',
    descriptionKey: 'questions.citizenship.description',
    required: true,
    aiEnabled: true,
  },

  // Step 3: Budget (IMPROVED - now uses open range input)
  {
    id: 'budget',
    category: 'budget',
    type: 'budget-range',
    titleKey: 'questions.budget.title',
    descriptionKey: 'questions.budget.description',
    required: true,
    defaultValue: { minAmount: 100000, maxAmount: 500000, currency: 'USD' },
    aiEnabled: true,
  },

  // Step 4: Purpose (IMPROVED - with open text option)
  {
    id: 'purpose',
    category: 'purpose',
    type: 'single-select',
    titleKey: 'questions.purpose.title',
    descriptionKey: 'questions.purpose.description',
    required: true,
    allowOpenText: true,
    aiEnabled: true,
    options: [
      { id: 'investment', labelKey: 'questions.purpose.options.investment', icon: 'TrendingUp', description: 'questions.purpose.options.investment_desc' },
      { id: 'living', labelKey: 'questions.purpose.options.living', icon: 'Home', description: 'questions.purpose.options.living_desc' },
      { id: 'both', labelKey: 'questions.purpose.options.both', icon: 'Layers', description: 'questions.purpose.options.both_desc' },
    ],
  },

  // Step 5: Target Locations (IMPROVED - country selector with flags)
  {
    id: 'location',
    category: 'location',
    type: 'country-multi-select',
    titleKey: 'questions.location.title',
    descriptionKey: 'questions.location.description',
    required: true,
    validation: { minSelected: 1, maxSelected: 5 },
    aiEnabled: true,
  },

  // Step 6: Property Type
  {
    id: 'property_type',
    category: 'property',
    type: 'multi-select',
    titleKey: 'questions.property.title',
    descriptionKey: 'questions.property.description',
    required: true,
    validation: { minSelected: 1 },
    aiEnabled: true,
    options: [
      { id: 'apartment', labelKey: 'questions.property.options.apartment', icon: 'Building2', description: 'questions.property.options.apartment_desc' },
      { id: 'house', labelKey: 'questions.property.options.house', icon: 'Home', description: 'questions.property.options.house_desc' },
      { id: 'commercial', labelKey: 'questions.property.options.commercial', icon: 'Store', description: 'questions.property.options.commercial_desc' },
      { id: 'land', labelKey: 'questions.property.options.land', icon: 'Mountain', description: 'questions.property.options.land_desc' },
    ],
  },

  // Step 7: Timeline
  {
    id: 'timeline',
    category: 'timeline',
    type: 'single-select',
    titleKey: 'questions.timeline.title',
    descriptionKey: 'questions.timeline.description',
    required: true,
    aiEnabled: true,
    options: [
      { id: 'asap', labelKey: 'questions.timeline.options.asap', icon: 'Zap', description: 'questions.timeline.options.asap_desc' },
      { id: '3_6_months', labelKey: 'questions.timeline.options.3_6_months', icon: 'Calendar', description: 'questions.timeline.options.3_6_months_desc' },
      { id: '6_12_months', labelKey: 'questions.timeline.options.6_12_months', icon: 'CalendarDays', description: 'questions.timeline.options.6_12_months_desc' },
      { id: '1_year_plus', labelKey: 'questions.timeline.options.1_year_plus', icon: 'Clock', description: 'questions.timeline.options.1_year_plus_desc' },
    ],
  },

  // Step 8: Risk Tolerance (NEW)
  {
    id: 'risk_tolerance',
    category: 'risk',
    type: 'single-select',
    titleKey: 'questions.risk.title',
    descriptionKey: 'questions.risk.description',
    required: true,
    aiEnabled: true,
    options: [
      { id: 'conservative', labelKey: 'questions.risk.options.conservative', icon: 'Shield', description: 'questions.risk.options.conservative_desc' },
      { id: 'moderate', labelKey: 'questions.risk.options.moderate', icon: 'Scale', description: 'questions.risk.options.moderate_desc' },
      { id: 'aggressive', labelKey: 'questions.risk.options.aggressive', icon: 'Rocket', description: 'questions.risk.options.aggressive_desc' },
    ],
  },

  // Step 9: Experience (IMPROVED - with open text option)
  {
    id: 'experience',
    category: 'experience',
    type: 'single-select',
    titleKey: 'questions.experience.title',
    descriptionKey: 'questions.experience.description',
    required: true,
    allowOpenText: true,
    aiEnabled: true,
    options: [
      { id: 'first_time', labelKey: 'questions.experience.options.first_time', icon: 'User', description: 'questions.experience.options.first_time_desc' },
      { id: 'some_experience', labelKey: 'questions.experience.options.some_experience', icon: 'Users', description: 'questions.experience.options.some_experience_desc' },
      { id: 'experienced', labelKey: 'questions.experience.options.experienced', icon: 'Award', description: 'questions.experience.options.experienced_desc' },
    ],
  },

  // Step 10: Special Requirements (NEW - open text with AI insights)
  {
    id: 'special_requirements',
    category: 'requirements',
    type: 'open-text',
    titleKey: 'questions.requirements.title',
    descriptionKey: 'questions.requirements.description',
    required: false,
    aiEnabled: true,
    aiInsights: true,
    validation: { maxLength: 500 },
  },

  // Step 11: Preferred Contact Method (NEW)
  {
    id: 'contact_preference',
    category: 'contact',
    type: 'single-select',
    titleKey: 'questions.contact.title',
    descriptionKey: 'questions.contact.description',
    required: true,
    aiEnabled: true,
    options: [
      { id: 'email', labelKey: 'questions.contact.options.email', icon: 'Mail', description: 'questions.contact.options.email_desc' },
      { id: 'whatsapp', labelKey: 'questions.contact.options.whatsapp', icon: 'MessageCircle', description: 'questions.contact.options.whatsapp_desc' },
      { id: 'phone', labelKey: 'questions.contact.options.phone', icon: 'Phone', description: 'questions.contact.options.phone_desc' },
    ],
  },
];

/**
 * Onboarding flow steps (order of questions)
 */
export const ONBOARDING_STEPS: OnboardingStep[] = [
  { id: 1, questionId: 'current_country', aiPromptKey: 'ai.current_country' },
  { id: 2, questionId: 'citizenship', aiPromptKey: 'ai.citizenship' },
  { id: 3, questionId: 'budget', aiPromptKey: 'ai.budget' },
  { id: 4, questionId: 'purpose', aiPromptKey: 'ai.purpose' },
  { id: 5, questionId: 'location', aiPromptKey: 'ai.location' },
  { id: 6, questionId: 'property_type', aiPromptKey: 'ai.property' },
  { id: 7, questionId: 'timeline', aiPromptKey: 'ai.timeline' },
  { id: 8, questionId: 'risk_tolerance', aiPromptKey: 'ai.risk' },
  { id: 9, questionId: 'experience', aiPromptKey: 'ai.experience' },
  { id: 10, questionId: 'special_requirements', aiPromptKey: 'ai.requirements' },
  { id: 11, questionId: 'contact_preference', aiPromptKey: 'ai.contact' },
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

  // Check required (skip for optional questions like special_requirements)
  if (question.required && (value === undefined || value === null || value === '')) {
    return { valid: false, error: 'This field is required' };
  }

  // Check multi-select validation
  if ((question.type === 'multi-select' || question.type === 'country-multi-select') && Array.isArray(value)) {
    const { minSelected, maxSelected } = question.validation || {};
    if (minSelected && value.length < minSelected) {
      return { valid: false, error: `Please select at least ${minSelected} option(s)` };
    }
    if (maxSelected && value.length > maxSelected) {
      return { valid: false, error: `Please select at most ${maxSelected} option(s)` };
    }
  }

  // Check text length validation
  if (question.type === 'open-text' && typeof value === 'string') {
    const { maxLength } = question.validation || {};
    if (maxLength && value.length > maxLength) {
      return { valid: false, error: `Text must be ${maxLength} characters or less` };
    }
  }

  return { valid: true };
}

/**
 * Check if a question supports AI responses
 */
export function isAIEnabled(questionId: string): boolean {
  const question = getQuestionById(questionId);
  return question?.aiEnabled ?? false;
}

/**
 * Check if a question should generate AI insights
 */
export function shouldGenerateInsights(questionId: string): boolean {
  const question = getQuestionById(questionId);
  return question?.aiInsights ?? false;
}
