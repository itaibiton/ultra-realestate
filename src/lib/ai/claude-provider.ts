/**
 * Claude (Anthropic) Provider Implementation
 * Uses the Anthropic API for chat completions with streaming support
 */

import Anthropic from '@anthropic-ai/sdk';
import type {
  AIProvider,
  AIProviderConfig,
  AIProviderType,
  ChatContext,
  StreamChunk,
} from './types';

const DEFAULT_MODEL = 'claude-sonnet-4-20250514';
const DEFAULT_MAX_TOKENS = 1024;
const DEFAULT_TEMPERATURE = 0.7;

export class ClaudeProvider implements AIProvider {
  private client: Anthropic;
  private model: string;
  private maxTokens: number;
  private temperature: number;

  constructor(config?: Partial<AIProviderConfig>) {
    const apiKey = config?.apiKey || process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error('Anthropic API key is required. Set ANTHROPIC_API_KEY environment variable.');
    }

    this.client = new Anthropic({ apiKey });
    this.model = config?.model || DEFAULT_MODEL;
    this.maxTokens = config?.maxTokens || DEFAULT_MAX_TOKENS;
    this.temperature = config?.temperature || DEFAULT_TEMPERATURE;
  }

  getProviderType(): AIProviderType {
    return 'claude';
  }

  private buildMessages(prompt: string, context?: ChatContext): {
    system?: string;
    messages: Anthropic.MessageParam[];
  } {
    let system: string | undefined;
    const messages: Anthropic.MessageParam[] = [];

    // Extract system message and build conversation
    if (context?.messages) {
      for (const msg of context.messages) {
        if (msg.role === 'system') {
          system = msg.content;
        } else {
          messages.push({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
          });
        }
      }
    }

    // Add the current prompt as a user message
    messages.push({
      role: 'user',
      content: prompt,
    });

    return { system, messages };
  }

  async generateResponse(prompt: string, context?: ChatContext): Promise<string> {
    const { system, messages } = this.buildMessages(prompt, context);

    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
      system,
      messages,
    });

    // Extract text from content blocks
    const textContent = response.content.find((block) => block.type === 'text');
    return textContent?.type === 'text' ? textContent.text : '';
  }

  async *streamResponse(
    prompt: string,
    context?: ChatContext
  ): AsyncGenerator<StreamChunk, void, unknown> {
    const { system, messages } = this.buildMessages(prompt, context);

    const stream = await this.client.messages.stream({
      model: this.model,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
      system,
      messages,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield { content: event.delta.text, done: false };
      } else if (event.type === 'message_stop') {
        yield { content: '', done: true };
      }
    }
  }
}

export function createClaudeProvider(config?: Partial<AIProviderConfig>): AIProvider {
  return new ClaudeProvider(config);
}
