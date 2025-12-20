/**
 * Summary Helper Functions
 * Utilities for the onboarding summary panel
 */

import type { QuestionCategory } from './types';
import { ONBOARDING_QUESTIONS, getQuestionById } from './questions';

/**
 * Get human-readable label for answer value
 */
export function getAnswerLabel(
  questionId: string,
  value: string,
  t: (key: string, values?: Record<string, string | number | Date>) => string
): string {
  const question = getQuestionById(questionId);
  if (!question) return value;

  // For option-based questions, find the matching option
  if (question.options) {
    const option = question.options.find((opt) => opt.id === value);
    if (option) {
      return t(option.labelKey);
    }
  }

  return value;
}

/**
 * Calculate completion percentage based on answered questions
 */
export function calculateSummaryProgress(
  answers: Record<string, string[]>,
  currentStep: number,
  totalSteps: number
): number {
  const answeredCount = Object.keys(answers).filter(
    (key) => answers[key] && answers[key].length > 0
  ).length;

  // Use the max of answered count or current step for better UX
  const progress = Math.max(answeredCount, currentStep - 1);
  return Math.round((progress / totalSteps) * 100);
}

/**
 * Determine which sections are complete
 */
export function getSectionStatus(
  category: QuestionCategory,
  answers: Record<string, string[]>
): 'complete' | 'partial' | 'pending' {
  // Get all questions in this category
  const categoryQuestions = ONBOARDING_QUESTIONS.filter(
    (q) => q.category === category
  );

  if (categoryQuestions.length === 0) return 'pending';

  const answeredQuestions = categoryQuestions.filter(
    (q) => answers[q.id] && answers[q.id].length > 0
  );

  if (answeredQuestions.length === categoryQuestions.length) {
    return 'complete';
  } else if (answeredQuestions.length > 0) {
    return 'partial';
  }

  return 'pending';
}

/**
 * Format currency values
 */
export function formatCurrency(
  amount: number,
  currency: string,
  locale: string
): string {
  try {
    return new Intl.NumberFormat(locale === 'he' ? 'he-IL' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    // Fallback if currency is not recognized
    return `${currency} ${amount.toLocaleString()}`;
  }
}

/**
 * Format number with locale
 */
export function formatNumber(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'he' ? 'he-IL' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get country name from code (basic implementation)
 * In production, you'd use a proper country names library
 */
export function getCountryName(countryCode: string, locale: string): string {
  // This is a simplified version - you might want to use a library like country-list
  // or maintain a proper translation file for country names
  const countries: Record<string, { en: string; he: string }> = {
    US: { en: 'United States', he: 'ארצות הברית' },
    IL: { en: 'Israel', he: 'ישראל' },
    GB: { en: 'United Kingdom', he: 'בריטניה' },
    CA: { en: 'Canada', he: 'קנדה' },
    AU: { en: 'Australia', he: 'אוסטרליה' },
    DE: { en: 'Germany', he: 'גרמניה' },
    FR: { en: 'France', he: 'צרפת' },
    ES: { en: 'Spain', he: 'ספרד' },
    IT: { en: 'Italy', he: 'איטליה' },
    GR: { en: 'Greece', he: 'יוון' },
    CY: { en: 'Cyprus', he: 'קפריסין' },
    PT: { en: 'Portugal', he: 'פורטוגל' },
    AE: { en: 'UAE', he: 'איחוד האמירויות' },
    // Add more as needed
  };

  const country = countries[countryCode];
  if (country) {
    return locale === 'he' ? country.he : country.en;
  }

  return countryCode;
}

/**
 * Check if a value exists and is not empty
 */
export function hasValue(value: string | string[] | number | undefined | null): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'number') return value > 0;
  return false;
}

/**
 * Parse finances data from JSON string
 */
export function parseFinancesData(value: string): { income: number; expenses: number } | null {
  try {
    const data = JSON.parse(value);
    if (typeof data.income === 'number' && typeof data.expenses === 'number') {
      return data;
    }
  } catch {
    return null;
  }
  return null;
}
