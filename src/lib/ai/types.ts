/**
 * AI Provider Types and Interfaces
 * Shared types for the AI abstraction layer supporting OpenAI and Claude
 */

export type AIProviderType = 'openai' | 'claude';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatContext {
  messages: ChatMessage[];
  userId?: string;
  locale?: string;
  metadata?: Record<string, unknown>;
}

export interface StreamChunk {
  content: string;
  done: boolean;
}

export interface AIProviderConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIProvider {
  /**
   * Generate a complete response (non-streaming)
   */
  generateResponse(
    prompt: string,
    context?: ChatContext
  ): Promise<string>;

  /**
   * Generate a streaming response
   */
  streamResponse(
    prompt: string,
    context?: ChatContext
  ): AsyncGenerator<StreamChunk, void, unknown>;

  /**
   * Get the provider type
   */
  getProviderType(): AIProviderType;
}

// Onboarding-specific types
export interface OnboardingQuestion {
  id: string;
  category: 'goals' | 'budget' | 'markets' | 'property' | 'risk' | 'timeline' | 'experience' | 'citizenship' | 'style';
  type: 'single-select' | 'multi-select' | 'text' | 'number' | 'range' | 'country-select';
  required: boolean;
}

export interface OnboardingContext extends ChatContext {
  currentStep: number;
  totalSteps: number;
  answers: Record<string, unknown>;
  investorProfile?: Partial<InvestorProfile>;
}

export interface InvestorProfile {
  investmentGoals: string[];
  budgetMin: number;
  budgetMax: number;
  budgetCurrency: string;
  preferredMarkets: string[];
  propertyTypes: string[];
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentTimeline: 'immediate' | 'within_6_months' | 'within_1_year' | 'within_2_years' | 'flexible';
  experienceLevel: 'first_time' | 'some_experience' | 'experienced' | 'professional';
  citizenship: string;
  currentCountry: string;
  workingStyle: 'self_directed' | 'guided' | 'full_service';
}
