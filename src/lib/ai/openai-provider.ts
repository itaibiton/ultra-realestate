/**
 * OpenAI Provider Implementation
 * Uses the OpenAI API for chat completions with streaming support
 */

import OpenAI from 'openai';
import type {
  AIProvider,
  AIProviderConfig,
  AIProviderType,
  ChatContext,
  ChatMessage,
  StreamChunk,
} from './types';

const DEFAULT_MODEL = 'gpt-4o-mini';
const DEFAULT_MAX_TOKENS = 1024;
const DEFAULT_TEMPERATURE = 0.7;

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private model: string;
  private maxTokens: number;
  private temperature: number;

  constructor(config?: Partial<AIProviderConfig>) {
    const apiKey = config?.apiKey || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('OpenAI API key is required. Set OPENAI_API_KEY environment variable.');
    }

    this.client = new OpenAI({ apiKey });
    this.model = config?.model || DEFAULT_MODEL;
    this.maxTokens = config?.maxTokens || DEFAULT_MAX_TOKENS;
    this.temperature = config?.temperature || DEFAULT_TEMPERATURE;
  }

  getProviderType(): AIProviderType {
    return 'openai';
  }

  private buildMessages(prompt: string, context?: ChatContext): OpenAI.Chat.ChatCompletionMessageParam[] {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    // Add context messages if provided
    if (context?.messages) {
      for (const msg of context.messages) {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }

    // Add the current prompt as a user message
    messages.push({
      role: 'user',
      content: prompt,
    });

    return messages;
  }

  async generateResponse(prompt: string, context?: ChatContext): Promise<string> {
    const messages = this.buildMessages(prompt, context);

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
    });

    return response.choices[0]?.message?.content || '';
  }

  async *streamResponse(
    prompt: string,
    context?: ChatContext
  ): AsyncGenerator<StreamChunk, void, unknown> {
    const messages = this.buildMessages(prompt, context);

    const stream = await this.client.chat.completions.create({
      model: this.model,
      messages,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      const done = chunk.choices[0]?.finish_reason === 'stop';

      if (content || done) {
        yield { content, done };
      }
    }
  }
}

export function createOpenAIProvider(config?: Partial<AIProviderConfig>): AIProvider {
  return new OpenAIProvider(config);
}
