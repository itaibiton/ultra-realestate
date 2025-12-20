"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectBadgesProps {
  label: string;
  description?: string;
  options: readonly Option[] | Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  maxSelections?: number;
  className?: string;
}

export function MultiSelectBadges({
  label,
  description,
  options,
  value,
  onChange,
  placeholder = "Select options...",
  required = false,
  error,
  maxSelections,
  className,
}: MultiSelectBadgesProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return;
      }
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const getLabel = (optionValue: string) => {
    const option = options.find((o) => o.value === optionValue);
    return option?.label || optionValue;
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal h-auto min-h-10",
              !value.length && "text-muted-foreground",
              error && "border-destructive"
            )}
          >
            <div className="flex flex-wrap gap-1">
              {value.length > 0 ? (
                value.map((v) => (
                  <Badge
                    key={v}
                    variant="secondary"
                    className="mr-1 mb-1"
                  >
                    {getLabel(v)}
                    <button
                      type="button"
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={(e) => removeOption(v, e)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <span>{placeholder}</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[300px] p-0" align="start">
          <div className="max-h-60 overflow-auto p-1">
            {options.map((option) => {
              const isSelected = value.includes(option.value);
              const isDisabled =
                !isSelected && maxSelections != null && value.length >= maxSelections;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !isDisabled && toggleOption(option.value)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
                    isSelected
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={isDisabled}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-sm border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/50"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  {option.label}
                </button>
              );
            })}
          </div>
          {maxSelections && (
            <div className="border-t px-2 py-1.5 text-xs text-muted-foreground">
              {value.length} / {maxSelections} selected
            </div>
          )}
        </PopoverContent>
      </Popover>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
