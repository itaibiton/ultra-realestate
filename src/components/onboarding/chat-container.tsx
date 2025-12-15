"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-message";
import { ChatOptions, ChatOptionCards } from "./chat-options";
import { ChatInput } from "./chat-input";
import { CurrencyInput } from "./currency-input";
import { IncomeExpensesInput } from "./income-expenses-input";
import { ProgressBar } from "./progress-bar";
import { Button } from "@/components/ui/button";
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
  // Currency input props
  budgetValue?: number;
  onBudgetChange?: (value: number) => void;
  budgetCurrency?: string;
  onBudgetCurrencyChange?: (currency: string) => void;
  // Income/Expenses props
  incomeValue?: number;
  expensesValue?: number;
  onIncomeChange?: (value: number) => void;
  onExpensesChange?: (value: number) => void;
  locale?: string;
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
  // Income/Expenses props
  incomeValue = 0,
  expensesValue = 0,
  onIncomeChange,
  onExpensesChange,
  locale = "en",
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

    if (currentQuestion.type === "currency-input") {
      return budgetValue > 0;
    }

    if (currentQuestion.type === "income-expenses") {
      return incomeValue >= 0 && expensesValue >= 0;
    }

    return true;
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Progress bar */}
      <div className="px-4 py-3 border-b">
        <ProgressBar current={currentStep} total={totalSteps} />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            isTyping={message.isTyping}
          />
        ))}

        {/* Options display */}
        {currentQuestion && !isLoading && displayOptions.length > 0 && (
          <div className="pt-2">
            {shouldShowCards ? (
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
            )}
          </div>
        )}

        {/* Text input for text-type questions */}
        {currentQuestion?.type === "text" && !isLoading && (
          <div className="pt-2">
            <ChatInput
              onSend={onSendMessage}
              placeholder={t("chat.inputPlaceholder")}
              disabled={isLoading}
            />
          </div>
        )}

        {/* Currency input for budget questions */}
        {currentQuestion?.type === "currency-input" && !isLoading && onBudgetChange && onBudgetCurrencyChange && (
          <div className="pt-2">
            <CurrencyInput
              value={budgetValue}
              onChange={onBudgetChange}
              currency={budgetCurrency}
              onCurrencyChange={onBudgetCurrencyChange}
              locale={locale}
            />
          </div>
        )}

        {/* Income/Expenses input for finances questions */}
        {currentQuestion?.type === "income-expenses" && !isLoading && onIncomeChange && onExpensesChange && (
          <div className="pt-2">
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
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Navigation buttons */}
      <div className="px-4 py-3 border-t bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
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
