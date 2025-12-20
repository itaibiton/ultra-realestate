"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowRight } from "lucide-react";

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "\u20AC", name: "Euro" },
  { code: "ILS", symbol: "\u20AA", name: "Israeli Shekel" },
  { code: "GBP", symbol: "\u00A3", name: "British Pound" },
  { code: "AED", symbol: "AED", name: "UAE Dirham" },
] as const;

// Quick preset ranges
const PRESETS = [
  { label: "$100K", min: 100000, max: 250000 },
  { label: "$250K", min: 250000, max: 500000 },
  { label: "$500K", min: 500000, max: 1000000 },
  { label: "$1M", min: 1000000, max: 2500000 },
  { label: "$5M+", min: 5000000, max: 10000000 },
];

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

// Format for display (compact)
function formatCompact(num: number): string {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`;
  }
  return `$${num}`;
}

interface BudgetRangeInputProps {
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  locale?: string;
  className?: string;
}

/**
 * BudgetRangeInput - Open range input with min/max fields
 * Allows user to specify their budget range freely
 */
export function BudgetRangeInput({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  currency,
  onCurrencyChange,
  locale = "en",
  className,
}: BudgetRangeInputProps) {
  const [minDisplay, setMinDisplay] = useState(() => formatNumber(minValue, locale));
  const [maxDisplay, setMaxDisplay] = useState(() => formatNumber(maxValue, locale));

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  // Handle min input change
  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const numericValue = parseNumber(rawValue);

      if (rawValue === "") {
        setMinDisplay("");
        onMinChange(0);
      } else {
        setMinDisplay(formatNumber(numericValue, locale));
        onMinChange(numericValue);
      }
    },
    [onMinChange, locale]
  );

  // Handle max input change
  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const numericValue = parseNumber(rawValue);

      if (rawValue === "") {
        setMaxDisplay("");
        onMaxChange(0);
      } else {
        setMaxDisplay(formatNumber(numericValue, locale));
        onMaxChange(numericValue);
      }
    },
    [onMaxChange, locale]
  );

  // Handle blur - ensure proper formatting
  const handleMinBlur = useCallback(() => {
    if (minValue > 0) {
      setMinDisplay(formatNumber(minValue, locale));
    }
  }, [minValue, locale]);

  const handleMaxBlur = useCallback(() => {
    if (maxValue > 0) {
      setMaxDisplay(formatNumber(maxValue, locale));
    }
  }, [maxValue, locale]);

  // Handle preset selection
  const handlePresetSelect = (preset: typeof PRESETS[0]) => {
    onMinChange(preset.min);
    onMaxChange(preset.max);
    setMinDisplay(formatNumber(preset.min, locale));
    setMaxDisplay(formatNumber(preset.max, locale));
  };

  // Check if a preset is active
  const isPresetActive = (preset: typeof PRESETS[0]) => {
    return minValue === preset.min && maxValue === preset.max;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Quick Presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <motion.button
            key={preset.label}
            type="button"
            onClick={() => handlePresetSelect(preset)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              "hover:border-primary/50 hover:bg-primary/5",
              isPresetActive(preset)
                ? "border-primary bg-primary/10 text-primary"
                : "border-muted bg-muted/30 text-muted-foreground"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {preset.label}
          </motion.button>
        ))}
      </div>

      {/* Range Inputs */}
      <div className="flex items-center gap-3">
        {/* Min Input */}
        <div className="flex-1">
          <label className="mb-1.5 block text-xs text-muted-foreground">
            Minimum
          </label>
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
              {selectedCurrency.symbol}
            </div>
            <Input
              type="text"
              inputMode="numeric"
              value={minDisplay}
              onChange={handleMinChange}
              onBlur={handleMinBlur}
              onFocus={(e) => e.target.select()}
              placeholder="100,000"
              className="h-11 text-base font-medium"
            />
          </div>
        </div>

        {/* Arrow */}
        <div className="flex h-11 items-end pb-2">
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Max Input */}
        <div className="flex-1">
          <label className="mb-1.5 block text-xs text-muted-foreground">
            Maximum
          </label>
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
              {selectedCurrency.symbol}
            </div>
            <Input
              type="text"
              inputMode="numeric"
              value={maxDisplay}
              onChange={handleMaxChange}
              onBlur={handleMaxBlur}
              onFocus={(e) => e.target.select()}
              placeholder="500,000"
              className="h-11 text-base font-medium"
            />
          </div>
        </div>
      </div>

      {/* Currency Selector */}
      <div className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-3">
        <span className="text-sm text-muted-foreground">Currency</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <span className="font-medium">{selectedCurrency.symbol}</span>
              <span>{selectedCurrency.code}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {CURRENCIES.map((curr) => (
              <DropdownMenuItem
                key={curr.code}
                onClick={() => onCurrencyChange(curr.code)}
                className={cn(
                  "flex items-center gap-2",
                  curr.code === currency && "bg-accent"
                )}
              >
                <span className="w-8 text-center font-medium">{curr.symbol}</span>
                <span className="flex-1">{curr.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Summary Display */}
      {(minValue > 0 || maxValue > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-lg font-semibold text-primary">
            {minValue > 0 && maxValue > 0
              ? `${formatCompact(minValue)} - ${formatCompact(maxValue)}`
              : minValue > 0
              ? `From ${formatCompact(minValue)}`
              : `Up to ${formatCompact(maxValue)}`}
          </p>
          <p className="text-xs text-muted-foreground">
            Your investment budget range
          </p>
        </motion.div>
      )}
    </div>
  );
}
