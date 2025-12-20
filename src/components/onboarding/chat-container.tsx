"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-message";
import { ChatOptions, ChatOptionCards } from "./chat-options";
import { ChatInput } from "./chat-input";
import { CurrencyInput } from "./currency-input";
import { BudgetRangeInput } from "./budget-range-input";
import { IncomeExpensesInput } from "./income-expenses-input";
import { BudgetSlider } from "./budget-slider";
import { ProgressBar } from "./progress-bar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CountrySelect } from "@/components/ui/country-select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Question, QuestionOption } from "@/lib/onboarding/types";

export interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  isTyping?: boolean;
}

interface ChatContainerProps {
  messages: Message[];
  currentQuestion?: Question;
  selectedOptions: string[];
  onSelectOption: (id: string) => void;
  onSendMessage: (message: string) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  isLoading?: boolean;
  canGoBack?: boolean;
  canGoNext?: boolean;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
  className?: string;
  // Currency input props (legacy)
  budgetValue?: number;
  onBudgetChange?: (value: number) => void;
  budgetCurrency?: string;
  onBudgetCurrencyChange?: (currency: string) => void;
  // Budget range props
  budgetMinValue?: number;
  budgetMaxValue?: number;
  onBudgetMinChange?: (value: number) => void;
  onBudgetMaxChange?: (value: number) => void;
  // Income/Expenses props
  incomeValue?: number;
  expensesValue?: number;
  onIncomeChange?: (value: number) => void;
  onExpensesChange?: (value: number) => void;
  locale?: string;
  // Country select props
  countryValue?: string;
  onCountryChange?: (value: string) => void;
  countriesValue?: string[];
  onCountriesChange?: (value: string[]) => void;
  // Open text props
  openTextValue?: string;
  onOpenTextChange?: (value: string) => void;
  // Answered questions for inline display
  answeredQuestions?: Record<number, string>;
}

/**
 * Chat Container - Main orchestrator for the onboarding chat interface
 * Manages messages, options, and navigation
 */
export function ChatContainer({
  messages,
  currentQuestion,
  selectedOptions,
  onSelectOption,
  onSendMessage,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  isLoading = false,
  canGoBack = true,
  canGoNext = true,
  t,
  className,
  // Currency input props
  budgetValue = 0,
  onBudgetChange,
  budgetCurrency = "USD",
  onBudgetCurrencyChange,
  // Budget range props
  budgetMinValue = 0,
  budgetMaxValue = 0,
  onBudgetMinChange,
  onBudgetMaxChange,
  // Income/Expenses props
  incomeValue = 0,
  expensesValue = 0,
  onIncomeChange,
  onExpensesChange,
  locale = "en",
  // Country select props
  countryValue = "",
  onCountryChange,
  countriesValue = [],
  onCountriesChange,
  // Open text props
  openTextValue = "",
  onOpenTextChange,
  // Answered questions for inline display
  answeredQuestions = {},
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Determine if we should show cards or buttons based on question type
  const shouldShowCards =
    currentQuestion?.type === "single-select" &&
    currentQuestion.options?.some((opt) => opt.description);

  // Transform options for display
  const displayOptions: { id: string; label: string; description?: string; icon?: string }[] =
    currentQuestion?.options?.map((opt: QuestionOption) => ({
      id: opt.id,
      label: t(opt.labelKey),
      description: opt.description ? t(opt.description) : undefined,
      icon: opt.icon,
    })) || [];

  // Validation check
  const isValid = () => {
    if (!currentQuestion) return true;
    if (!currentQuestion.required) return true;

    if (currentQuestion.type === "multi-select" || currentQuestion.type === "single-select") {
      const minRequired = currentQuestion.validation?.minSelected || 1;
      return selectedOptions.length >= minRequired;
    }

    if (currentQuestion.type === "currency-input" || currentQuestion.type === "budget-slider") {
      return budgetValue > 0;
    }

    if (currentQuestion.type === "budget-range") {
      return budgetMinValue > 0 || budgetMaxValue > 0;
    }

    if (currentQuestion.type === "income-expenses") {
      return incomeValue >= 0 && expensesValue >= 0;
    }

    if (currentQuestion.type === "country-select") {
      return !!countryValue;
    }

    if (currentQuestion.type === "country-multi-select") {
      const minRequired = currentQuestion.validation?.minSelected || 1;
      return countriesValue.length >= minRequired;
    }

    if (currentQuestion.type === "open-text") {
      return true; // Optional by default
    }

    return true;
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Progress bar */}
      <div className="shrink-0 px-4 py-2 border-b">
        <ProgressBar current={currentStep} total={totalSteps} />
      </div>

      {/* Messages area - only messages, scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        {messages.map((message) => {
          // Extract step number from question message ID (format: q-{step}-{timestamp})
          let answer: string | undefined;
          if (message.role === "assistant" && message.id.startsWith("q-")) {
            const stepMatch = message.id.match(/^q-(\d+)-/);
            if (stepMatch) {
              const step = parseInt(stepMatch[1], 10);
              answer = answeredQuestions[step];
            }
          }
          return (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
              isTyping={message.isTyping}
              answer={answer}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input controls area - fixed at bottom */}
      {currentQuestion && !isLoading && (
        <div className="shrink-0 px-4 py-3 border-t bg-background/50">
          {/* Options display */}
          {displayOptions.length > 0 && (
            shouldShowCards ? (
              <ChatOptionCards
                options={displayOptions}
                selected={selectedOptions}
                onSelect={onSelectOption}
                multiSelect={currentQuestion.type === "multi-select"}
              />
            ) : (
              <ChatOptions
                options={displayOptions}
                selected={selectedOptions}
                onSelect={onSelectOption}
                multiSelect={currentQuestion.type === "multi-select"}
                maxSelections={currentQuestion.validation?.maxSelected}
              />
            )
          )}

          {/* Text input for text-type questions */}
          {currentQuestion.type === "text" && (
            <ChatInput
              onSend={onSendMessage}
              placeholder={t("chat.inputPlaceholder")}
              disabled={isLoading}
            />
          )}

          {/* Currency input for budget questions */}
          {currentQuestion.type === "currency-input" && onBudgetChange && onBudgetCurrencyChange && (
            <CurrencyInput
              value={budgetValue}
              onChange={onBudgetChange}
              currency={budgetCurrency}
              onCurrencyChange={onBudgetCurrencyChange}
              locale={locale}
            />
          )}

          {/* Income/Expenses input for finances questions */}
          {currentQuestion.type === "income-expenses" && onIncomeChange && onExpensesChange && (
            <IncomeExpensesInput
              income={incomeValue}
              expenses={expensesValue}
              onIncomeChange={onIncomeChange}
              onExpensesChange={onExpensesChange}
              currency={budgetCurrency}
              locale={locale}
              translations={{
                incomeLabel: t("questions.finances.incomeLabel"),
                expensesLabel: t("questions.finances.expensesLabel"),
                incomePlaceholder: t("questions.finances.incomePlaceholder"),
                expensesPlaceholder: t("questions.finances.expensesPlaceholder"),
                disposableLabel: t("questions.finances.disposableLabel"),
              }}
            />
          )}

          {/* Country select for single country */}
          {currentQuestion.type === "country-select" && onCountryChange && (
            <CountrySelect
              value={countryValue}
              onChange={(val) => onCountryChange(val as string)}
              autoDetect={currentQuestion.id === "current_country"}
              placeholder={t("questions.current_country.title")}
              showPopular
            />
          )}

          {/* Country multi-select for target locations */}
          {currentQuestion.type === "country-multi-select" && onCountriesChange && (
            <CountrySelect
              value={countriesValue}
              onChange={(val) => onCountriesChange(val as string[])}
              multiple
              maxSelections={currentQuestion.validation?.maxSelected || 5}
              placeholder={t("questions.location.title")}
              showPopular
            />
          )}

          {/* Budget slider (legacy) */}
          {currentQuestion.type === "budget-slider" && onBudgetChange && (
            <BudgetSlider
              value={budgetValue}
              onChange={onBudgetChange}
              currency={budgetCurrency}
            />
          )}

          {/* Budget range input */}
          {currentQuestion.type === "budget-range" && onBudgetMinChange && onBudgetMaxChange && onBudgetCurrencyChange && (
            <BudgetRangeInput
              minValue={budgetMinValue}
              maxValue={budgetMaxValue}
              onMinChange={onBudgetMinChange}
              onMaxChange={onBudgetMaxChange}
              currency={budgetCurrency}
              onCurrencyChange={onBudgetCurrencyChange}
              locale={locale}
            />
          )}

          {/* Open text for special requirements */}
          {currentQuestion.type === "open-text" && onOpenTextChange && (
            <div>
              <Textarea
                value={openTextValue}
                onChange={(e) => onOpenTextChange(e.target.value)}
                placeholder={t("questions.requirements.placeholder")}
                maxLength={currentQuestion.validation?.maxLength || 500}
                className="min-h-[80px] resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1 text-end">
                {openTextValue.length}/{currentQuestion.validation?.maxLength || 500}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="shrink-0 px-4 py-2 border-t bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            disabled={!canGoBack || currentStep <= 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("chat.backButton")}
          </Button>

          <Button
            size="sm"
            onClick={onNext}
            disabled={!canGoNext || isLoading || !isValid()}
            className="gap-2"
          >
            {t("chat.nextButton")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
