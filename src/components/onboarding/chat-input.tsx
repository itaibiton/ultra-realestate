"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Chat Input Component
 * Text input for free-form responses in the chat interface
 */
export function ChatInput({
  onSend,
  placeholder = "Type your answer...",
  disabled = false,
  className,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        "flex items-end gap-2 p-2 bg-muted/50 rounded-xl border",
        className
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className={cn(
          "flex-1 resize-none bg-transparent px-3 py-2 text-sm",
          "placeholder:text-muted-foreground focus:outline-none",
          "min-h-[40px] max-h-[120px]",
          disabled && "opacity-50"
        )}
      />
      <Button
        size="icon"
        onClick={handleSubmit}
        disabled={!value.trim() || disabled}
        className="h-9 w-9 rounded-lg"
      >
        <Send className="w-4 h-4" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
}
