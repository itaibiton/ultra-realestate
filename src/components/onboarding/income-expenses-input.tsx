"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "\u20AC",
  ILS: "\u20AA",
  GBP: "\u00A3",
  AED: "AED",
};

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

// Format currency with symbol
function formatCurrency(num: number, loc: string, curr: string): string {
  return new Intl.NumberFormat(loc === "he" ? "he-IL" : "en-US", {
    style: "currency",
    currency: curr,
    maximumFractionDigits: 0,
  }).format(num);
}

interface IncomeExpensesInputProps {
  income: number;
  expenses: number;
  onIncomeChange: (value: number) => void;
  onExpensesChange: (value: number) => void;
  currency?: string;
  locale?: string;
  translations: {
    incomeLabel: string;
    expensesLabel: string;
    incomePlaceholder?: string;
    expensesPlaceholder?: string;
    disposableLabel?: string;
  };
  className?: string;
}

/**
 * IncomeExpensesInput - Dual input for monthly income and expenses
 * Shows disposable income calculation
 */
export function IncomeExpensesInput({
  income,
  expenses,
  onIncomeChange,
  onExpensesChange,
  currency = "USD",
  locale = "en",
  translations,
  className,
}: IncomeExpensesInputProps) {
  const [incomeDisplay, setIncomeDisplay] = useState(() =>
    income > 0 ? formatNumber(income, locale) : ""
  );
  const [expensesDisplay, setExpensesDisplay] = useState(() =>
    expenses > 0 ? formatNumber(expenses, locale) : ""
  );

  const currencySymbol = CURRENCY_SYMBOLS[currency] || "$";
  const disposable = income - expenses;

  // Handle income change
  const handleIncomeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const numericValue = parseNumber(rawValue);

      if (rawValue === "") {
        setIncomeDisplay("");
        onIncomeChange(0);
      } else {
        setIncomeDisplay(formatNumber(numericValue, locale));
        onIncomeChange(numericValue);
      }
    },
    [onIncomeChange, locale]
  );

  // Handle expenses change
  const handleExpensesChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const numericValue = parseNumber(rawValue);

      if (rawValue === "") {
        setExpensesDisplay("");
        onExpensesChange(0);
      } else {
        setExpensesDisplay(formatNumber(numericValue, locale));
        onExpensesChange(numericValue);
      }
    },
    [onExpensesChange, locale]
  );

  // Handle blur for formatting
  const handleIncomeBlur = useCallback(() => {
    if (income > 0) {
      setIncomeDisplay(formatNumber(income, locale));
    }
  }, [income, locale]);

  const handleExpensesBlur = useCallback(() => {
    if (expenses > 0) {
      setExpensesDisplay(formatNumber(expenses, locale));
    }
  }, [expenses, locale]);

  // Handle focus - select all for easier editing
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Income input */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <TrendingUp className="h-4 w-4 text-green-500" />
          {translations.incomeLabel}
        </Label>
        <div className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-500/10 text-green-600 font-medium">
            {currencySymbol}
          </div>
          <Input
            type="text"
            inputMode="numeric"
            value={incomeDisplay}
            onChange={handleIncomeChange}
            onBlur={handleIncomeBlur}
            onFocus={handleFocus}
            placeholder={translations.incomePlaceholder || "10,000"}
            className="h-11 flex-1"
          />
        </div>
      </div>

      {/* Expenses input */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <TrendingDown className="h-4 w-4 text-red-500" />
          {translations.expensesLabel}
        </Label>
        <div className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-500/10 text-red-600 font-medium">
            {currencySymbol}
          </div>
          <Input
            type="text"
            inputMode="numeric"
            value={expensesDisplay}
            onChange={handleExpensesChange}
            onBlur={handleExpensesBlur}
            onFocus={handleFocus}
            placeholder={translations.expensesPlaceholder || "6,000"}
            className="h-11 flex-1"
          />
        </div>
      </div>

      {/* Disposable income display */}
      {(income > 0 || expenses > 0) && (
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg p-3 mt-4",
            disposable >= 0
              ? "bg-green-500/10 text-green-700 dark:text-green-400"
              : "bg-red-500/10 text-red-700 dark:text-red-400"
          )}
        >
          <Wallet className="h-5 w-5" />
          <div className="flex-1">
            <span className="text-sm">
              {translations.disposableLabel || "Disposable"}:
            </span>
            <span className="ms-2 font-semibold">
              {formatCurrency(Math.abs(disposable), locale, currency)}
              {disposable < 0 && " (deficit)"}
              <span className="text-xs font-normal opacity-70">/month</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
