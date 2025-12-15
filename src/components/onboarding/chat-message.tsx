"use client";

import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { TypingIndicator } from "./typing-indicator";

interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
  isTyping?: boolean;
  className?: string;
}

/**
 * Chat Message Component
 * Displays a single message in the chat interface
 * Supports both AI and user messages with distinct styling
 */
export function ChatMessage({
  role,
  content,
  isTyping = false,
  className,
}: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-3 w-full",
        isAssistant ? "justify-start" : "justify-end",
        className
      )}
    >
      {isAssistant && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isAssistant
            ? "bg-muted text-foreground rounded-tl-sm"
            : "bg-blue-500 text-white rounded-tr-sm"
        )}
      >
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        )}
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
