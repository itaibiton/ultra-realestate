"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "\u20AC", name: "Euro" },
  { code: "ILS", symbol: "\u20AA", name: "Israeli Shekel" },
  { code: "GBP", symbol: "\u00A3", name: "British Pound" },
  { code: "AED", symbol: "AED", name: "UAE Dirham" },
] as const;

// Format number with locale-aware thousand separators
function formatNumber(num: number, loc: string): string {
  if (num === 0) return "";
  return new Intl.NumberFormat(loc === "he" ? "he-IL" : "en-US").format(num);
}

// Parse formatted string back to number
function parseNumber(str: string): number {
  const cleaned = str.replace(/[^\d]/g, "");
  return parseInt(cleaned, 10) || 0;
}

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  locale?: string;
  className?: string;
}

/**
 * CurrencyInput - Large numeric input with currency selector
 * Used for budget input in onboarding flow
 */
export function CurrencyInput({
  value,
  onChange,
  currency,
  onCurrencyChange,
  locale = "en",
  className,
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState(() => formatNumber(value, locale));

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const numericValue = parseNumber(rawValue);

      // Update display with formatting
      if (rawValue === "") {
        setDisplayValue("");
        onChange(0);
      } else {
        setDisplayValue(formatNumber(numericValue, locale));
        onChange(numericValue);
      }
    },
    [onChange, locale]
  );

  // Handle blur - ensure proper formatting
  const handleBlur = useCallback(() => {
    if (value > 0) {
      setDisplayValue(formatNumber(value, locale));
    }
  }, [value, locale]);

  // Handle focus - optionally clear for easier typing
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        {/* Currency symbol prefix */}
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-lg font-medium">
          {selectedCurrency.symbol}
        </div>

        {/* Amount input */}
        <Input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="500,000"
          className="h-12 flex-1 text-lg font-medium"
        />

        {/* Currency selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-12 gap-2 px-3">
              {selectedCurrency.code}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {CURRENCIES.map((curr) => (
              <DropdownMenuItem
                key={curr.code}
                onClick={() => onCurrencyChange(curr.code)}
                className={cn(
                  "flex items-center gap-2",
                  curr.code === currency && "bg-accent"
                )}
              >
                <span className="w-6 text-center">{curr.symbol}</span>
                <span>{curr.code}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
