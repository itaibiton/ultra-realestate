"use client";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { US_STATES } from "@/lib/onboarding/professional-constants";

interface StateSelectProps {
  label: string;
  description?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export function StateSelect({
  label,
  description,
  value,
  onChange,
  placeholder = "Select a state...",
  required = false,
  error,
  className,
}: StateSelectProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "w-full",
            error && "border-destructive focus:ring-destructive"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {US_STATES.map((state) => (
            <SelectItem key={state.value} value={state.value}>
              {state.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

interface MultiStateSelectProps {
  label: string;
  description?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export function MultiStateSelect({
  label,
  description,
  value,
  onChange,
  required = false,
  error,
  className,
}: MultiStateSelectProps) {
  // Re-use MultiSelectBadges for multiple state selection
  // Import it dynamically to avoid circular dependency
  const MultiSelectBadges = require("./multi-select-badges").MultiSelectBadges;

  return (
    <MultiSelectBadges
      label={label}
      description={description}
      options={US_STATES}
      value={value}
      onChange={onChange}
      placeholder="Select states..."
      required={required}
      error={error}
      className={className}
    />
  );
}
