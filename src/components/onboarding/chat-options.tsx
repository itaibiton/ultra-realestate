"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Option {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

interface ChatOptionsProps {
  options: Option[];
  selected: string[];
  onSelect: (id: string) => void;
  multiSelect?: boolean;
  maxSelections?: number;
  className?: string;
}

/**
 * Chat Options Component
 * Displays selectable options for the chat interface
 * Supports both single and multi-select modes
 */
export function ChatOptions({
  options,
  selected,
  onSelect,
  multiSelect = false,
  maxSelections,
  className,
}: ChatOptionsProps) {
  const handleSelect = (id: string) => {
    if (!multiSelect) {
      // Single select - just select this one
      onSelect(id);
      return;
    }

    // Multi-select logic
    const isSelected = selected.includes(id);
    if (isSelected) {
      // Deselect
      onSelect(id);
    } else if (!maxSelections || selected.length < maxSelections) {
      // Select if under max
      onSelect(id);
    }
  };

  const isDisabled = (id: string) => {
    if (!multiSelect) return false;
    if (selected.includes(id)) return false;
    return maxSelections ? selected.length >= maxSelections : false;
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        const disabled = isDisabled(option.id);

        return (
          <Button
            key={option.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-auto py-2 px-3 transition-all duration-200",
              isSelected && "bg-blue-500 hover:bg-blue-600 border-blue-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => handleSelect(option.id)}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              {option.icon && <span className="text-base">{option.icon}</span>}
              <span className="text-sm">{option.label}</span>
              {isSelected && <Check className="w-3 h-3 ml-1" />}
            </div>
          </Button>
        );
      })}
    </div>
  );
}

interface ChatOptionCardsProps {
  options: Option[];
  selected: string[];
  onSelect: (id: string) => void;
  multiSelect?: boolean;
  className?: string;
}

/**
 * Chat Option Cards - Larger card-style options
 * Used for options that need more space (like risk tolerance with descriptions)
 */
export function ChatOptionCards({
  options,
  selected,
  onSelect,
  multiSelect = false,
  className,
}: ChatOptionCardsProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option.id);

        return (
          <button
            key={option.id}
            className={cn(
              "w-full p-4 rounded-lg border text-start transition-all duration-200",
              isSelected
                ? "border-blue-500 bg-blue-500/10"
                : "border-border hover:border-muted-foreground/50 hover:bg-muted/50"
            )}
            onClick={() => onSelect(option.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {option.icon && <span className="text-lg">{option.icon}</span>}
                  <span className="font-medium">{option.label}</span>
                </div>
                {option.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                  isSelected
                    ? "border-blue-500 bg-blue-500"
                    : "border-muted-foreground/30"
                )}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
