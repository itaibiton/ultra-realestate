"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { getCurrencySymbol } from "@/lib/countries";

interface BudgetRange {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
}

const BUDGET_RANGES: BudgetRange[] = [
  { id: "starter", label: "$100K - $500K", min: 100000, max: 500000, step: 25000 },
  { id: "mid", label: "$500K - $1M", min: 500000, max: 1000000, step: 50000 },
  { id: "premium", label: "$1M - $5M", min: 1000000, max: 5000000, step: 100000 },
  { id: "luxury", label: "$5M+", min: 5000000, max: 50000000, step: 500000 },
];

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  className?: string;
}

export function BudgetSlider({
  value,
  onChange,
  currency = "USD",
  className,
}: BudgetSliderProps) {
  // Determine which range the current value falls into
  const activeRange = React.useMemo(() => {
    for (const range of BUDGET_RANGES) {
      if (value >= range.min && value <= range.max) {
        return range;
      }
    }
    // Default to the range that best fits
    if (value < BUDGET_RANGES[0].min) return BUDGET_RANGES[0];
    return BUDGET_RANGES[BUDGET_RANGES.length - 1];
  }, [value]);

  // Calculate slider position within the active range (0-100)
  const sliderPosition = React.useMemo(() => {
    const range = activeRange;
    const normalized = (value - range.min) / (range.max - range.min);
    return [Math.round(normalized * 100)];
  }, [value, activeRange]);

  // Handle range selection
  const handleRangeSelect = (range: BudgetRange) => {
    // Set to the minimum of the new range
    onChange(range.min);
  };

  // Handle slider change
  const handleSliderChange = (newValue: number[]) => {
    const percentage = newValue[0] / 100;
    const range = activeRange;
    const actualValue = range.min + percentage * (range.max - range.min);
    // Round to the nearest step
    const rounded = Math.round(actualValue / range.step) * range.step;
    onChange(rounded);
  };

  // Format the display value
  const formatValue = (val: number): string => {
    const symbol = getCurrencySymbol(currency);
    if (val >= 1000000) {
      return `${symbol}${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `${symbol}${(val / 1000).toFixed(0)}K`;
    }
    return `${symbol}${val.toLocaleString()}`;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Budget Range Selector */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {BUDGET_RANGES.map((range) => (
          <motion.button
            key={range.id}
            type="button"
            onClick={() => handleRangeSelect(range)}
            className={cn(
              "relative rounded-xl border-2 px-3 py-4 text-center transition-all",
              "hover:border-primary/50 hover:bg-primary/5",
              activeRange.id === range.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-muted bg-muted/30 text-muted-foreground"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-medium">{range.label}</span>
            {activeRange.id === range.id && (
              <motion.div
                layoutId="budget-indicator"
                className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Fine-tuning Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {formatValue(activeRange.min)}
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={value}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-2xl font-bold text-primary"
            >
              {formatValue(value)}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm text-muted-foreground">
            {formatValue(activeRange.max)}
          </span>
        </div>

        <Slider
          value={sliderPosition}
          onValueChange={handleSliderChange}
          max={100}
          step={1}
          className="w-full"
        />

        {/* Step indicator */}
        <p className="text-center text-xs text-muted-foreground">
          Adjust in {formatValue(activeRange.step)} increments
        </p>
      </div>

      {/* Min-Max Range Display */}
      <div className="flex items-center justify-center gap-4 rounded-lg bg-muted/50 p-3">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Min Budget</p>
          <p className="text-sm font-medium">{formatValue(activeRange.min)}</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Selected</p>
          <p className="text-sm font-semibold text-primary">{formatValue(value)}</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Max Budget</p>
          <p className="text-sm font-medium">{formatValue(activeRange.max)}</p>
        </div>
      </div>
    </div>
  );
}
