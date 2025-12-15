/**
 * AI Provider Factory
 * Creates AI providers based on environment configuration
 *
 * Usage:
 *   import { createAIProvider, getAIProvider } from '@/lib/ai';
 *
 *   // Create a new provider instance
 *   const ai = createAIProvider();
 *
 *   // Or use the singleton instance
 *   const ai = getAIProvider();
 *
 *   // Generate response
 *   const response = await ai.generateResponse('Hello!');
 *
 *   // Stream response
 *   for await (const chunk of ai.streamResponse('Tell me a story')) {
 *     console.log(chunk.content);
 *   }
 *
 * Environment Variables:
 *   AI_PROVIDER: 'openai' | 'claude' (default: 'openai')
 *   OPENAI_API_KEY: OpenAI API key
 *   ANTHROPIC_API_KEY: Anthropic API key
 */

import type { AIProvider, AIProviderConfig, AIProviderType } from './types';
import { createOpenAIProvider } from './openai-provider';
import { createClaudeProvider } from './claude-provider';

// Re-export types
export * from './types';
export { createOpenAIProvider } from './openai-provider';
export { createClaudeProvider } from './claude-provider';

/**
 * Get the configured AI provider type from environment
 */
export function getConfiguredProviderType(): AIProviderType {
  const provider = process.env.AI_PROVIDER?.toLowerCase();

  if (provider === 'claude' || provider === 'anthropic') {
    return 'claude';
  }

  return 'openai';
}

/**
 * Create an AI provider based on environment configuration
 */
export function createAIProvider(
  config?: Partial<AIProviderConfig>,
  providerType?: AIProviderType
): AIProvider {
  const type = providerType || getConfiguredProviderType();

  switch (type) {
    case 'claude':
      return createClaudeProvider(config);
    case 'openai':
    default:
      return createOpenAIProvider(config);
  }
}

// Singleton instance for convenience
let aiProviderInstance: AIProvider | null = null;

/**
 * Get a singleton AI provider instance
 * Useful for server-side usage where you want to reuse the same client
 */
export function getAIProvider(): AIProvider {
  if (!aiProviderInstance) {
    aiProviderInstance = createAIProvider();
  }
  return aiProviderInstance;
}

/**
 * Reset the singleton instance (useful for testing)
 */
export function resetAIProvider(): void {
  aiProviderInstance = null;
}
