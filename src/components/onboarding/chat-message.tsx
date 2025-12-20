"use client";

import { cn } from "@/lib/utils";
import { Bot, User, Check } from "lucide-react";
import { TypingIndicator } from "./typing-indicator";
import { motion } from "framer-motion";

interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
  isTyping?: boolean;
  className?: string;
  /** Optional answer to display under the question (for assistant messages) */
  answer?: string;
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
  answer,
}: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "flex gap-3 w-full",
          isAssistant ? "justify-start" : "justify-end"
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

      {/* Inline answer display for questions */}
      {isAssistant && answer && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-11 mt-2 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
            <Check className="h-3 w-3 text-green-500" />
          </div>
          <span className="text-foreground/80">{answer}</span>
        </motion.div>
      )}
    </div>
  );
}
