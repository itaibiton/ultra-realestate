"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {
  ChatContainer,
  type Message,
  OnboardingSummary,
} from "@/components/onboarding";
import {
  ONBOARDING_STEPS,
  getQuestionForStep,
  getTotalSteps,
} from "@/lib/onboarding";
import { saveOnboardingResponse, updateOnboardingStep } from "@/app/[locale]/(onboarding)/actions";

/**
 * Chat Page - Main onboarding chat interface
 * Guides users through the investment profile questionnaire
 */
export default function ChatPage() {
  const t = useTranslations("onboarding");
  const locale = useLocale();
  const router = useRouter();
  const initializedRef = useRef(false);

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Budget state
  const [budgetAmount, setBudgetAmount] = useState(500000);
  const [budgetCurrency, setBudgetCurrency] = useState("USD");
  const [budgetMin, setBudgetMin] = useState(100000);
  const [budgetMax, setBudgetMax] = useState(500000);

  // Finances state
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);

  // Country state
  const [currentCountry, setCurrentCountry] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [targetLocations, setTargetLocations] = useState<string[]>([]);

  // Open text state
  const [specialRequirements, setSpecialRequirements] = useState("");

  const totalSteps = getTotalSteps();

  // Build answered questions map for inline display
  const answeredQuestions = useMemo(() => {
    const result: Record<number, string> = {};
    const formatCurrency = (amount: number) =>
      new Intl.NumberFormat(locale === "he" ? "he-IL" : "en-US", {
        style: "currency",
        currency: budgetCurrency,
        maximumFractionDigits: 0,
      }).format(amount);

    // Step 1: Current country
    if (currentCountry) {
      result[1] = currentCountry;
    }
    // Step 2: Citizenship
    if (citizenship) {
      result[2] = citizenship;
    }
    // Step 3: Budget
    if (budgetMin > 0 || budgetMax > 0) {
      result[3] = `${formatCurrency(budgetMin)} - ${formatCurrency(budgetMax)}`;
    } else if (budgetAmount > 0) {
      result[3] = formatCurrency(budgetAmount);
    }
    // Step 4-11: From answers object
    ONBOARDING_STEPS.forEach((step) => {
      if (step.id <= 3) return; // Already handled above
      const answer = answers[step.questionId];
      if (answer && answer.length > 0) {
        const question = getQuestionForStep(step.id);
        if (question?.options) {
          // Format option labels
          const labels = answer
            .map((id) => {
              const opt = question.options?.find((o) => o.id === id);
              return opt ? t(opt.labelKey) : id;
            })
            .join(", ");
          result[step.id] = labels;
        } else if (step.questionId === "location") {
          result[step.id] = targetLocations.join(", ");
        } else if (step.questionId === "special_requirements") {
          result[step.id] = specialRequirements || "(Skipped)";
        } else {
          result[step.id] = answer.join(", ");
        }
      }
    });

    return result;
  }, [answers, currentCountry, citizenship, budgetAmount, budgetMin, budgetMax, budgetCurrency, targetLocations, specialRequirements, locale, t]);
  const currentQuestion = getQuestionForStep(currentStep);
  const currentStepConfig = ONBOARDING_STEPS.find((s) => s.id === currentStep);

  // Initialize with greeting message (only once)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Add greeting
    const greetingMsg: Message = {
      id: `greeting-${Date.now()}`,
      role: "assistant",
      content: t("ai.greeting"),
    };
    setMessages([greetingMsg]);

    // Add first question after a short delay
    setTimeout(() => {
      if (currentStepConfig) {
        const questionMsg: Message = {
          id: `q-1-${Date.now()}`,
          role: "assistant",
          content: t(currentStepConfig.aiPromptKey),
        };
        setMessages((prev) => [...prev, questionMsg]);
      }
    }, 500);
  }, [t, currentStepConfig]);

  // Handle option selection
  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (!currentQuestion) return;

      if (currentQuestion.type === "single-select") {
        setSelectedOptions([optionId]);
      } else {
        // Multi-select toggle
        setSelectedOptions((prev) =>
          prev.includes(optionId)
            ? prev.filter((id) => id !== optionId)
            : [...prev, optionId]
        );
      }
    },
    [currentQuestion]
  );

  // Handle text message send
  const handleSendMessage = useCallback((message: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: message,
      },
    ]);

    // Store the answer
    if (currentQuestion) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: [message],
      }));
    }
  }, [currentQuestion]);

  // Handle next step
  const handleNext = useCallback(async () => {
    if (!currentQuestion || isLoading) return;

    setIsLoading(true);

    // Determine response based on question type
    let response: string[] = [];
    let userMessage = "";

    if (currentQuestion.type === "currency-input" || currentQuestion.type === "budget-slider") {
      // Budget question - save amount and currency
      response = [String(budgetAmount), budgetCurrency];
      userMessage = new Intl.NumberFormat(locale === "he" ? "he-IL" : "en-US", {
        style: "currency",
        currency: budgetCurrency,
        maximumFractionDigits: 0,
      }).format(budgetAmount);
    } else if (currentQuestion.type === "budget-range") {
      // Budget range question - save min, max, and currency
      response = [String(budgetMin), String(budgetMax), budgetCurrency];
      const formatNum = (n: number) =>
        new Intl.NumberFormat(locale === "he" ? "he-IL" : "en-US", {
          style: "currency",
          currency: budgetCurrency,
          maximumFractionDigits: 0,
        }).format(n);
      userMessage = `${formatNum(budgetMin)} - ${formatNum(budgetMax)}`;
    } else if (currentQuestion.type === "country-select") {
      // Country selection
      const countryVal = getCurrentCountryValue();
      response = [countryVal];
      userMessage = countryVal;
    } else if (currentQuestion.type === "country-multi-select") {
      // Multi-country selection
      response = targetLocations;
      userMessage = targetLocations.join(", ");
    } else if (currentQuestion.type === "open-text") {
      // Open text
      response = specialRequirements ? [specialRequirements] : [];
      userMessage = specialRequirements || "(Skipped)";
    } else if (currentQuestion.type === "income-expenses") {
      // Finances question - save as JSON
      response = [JSON.stringify({ income: monthlyIncome, expenses: monthlyExpenses })];
      const formatNum = (n: number) =>
        new Intl.NumberFormat(locale === "he" ? "he-IL" : "en-US", {
          style: "currency",
          currency: budgetCurrency,
          maximumFractionDigits: 0,
        }).format(n);
      userMessage = `${t("questions.finances.incomeLabel")}: ${formatNum(monthlyIncome)}, ${t("questions.finances.expensesLabel")}: ${formatNum(monthlyExpenses)}`;
    } else {
      // Standard options selection
      response = selectedOptions.length > 0 ? selectedOptions : [];
    }

    // Store locally
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: response,
    }));

    // Add user's response as a message
    if (currentQuestion.type === "currency-input" || currentQuestion.type === "income-expenses" || currentQuestion.type === "budget-range") {
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          role: "user",
          content: userMessage,
        },
      ]);
    } else if (response.length > 0 && currentQuestion.options) {
      const selectedLabels = response
        .map((id) => {
          const option = currentQuestion.options?.find((o) => o.id === id);
          return option ? t(option.labelKey) : id;
        })
        .join(", ");

      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          role: "user",
          content: selectedLabels,
        },
      ]);
    }

    // Save to database
    const saveResult = await saveOnboardingResponse(
      currentQuestion.id,
      response,
      currentQuestion.category
    );

    if (saveResult.error) {
      toast.error("Failed to save response. Please try again.");
      setIsLoading(false);
      return;
    }

    await updateOnboardingStep(currentStep);

    // Move to next step or complete
    if (currentStep >= totalSteps) {
      // Navigate to summary
      router.push(`/${locale}/summary`);
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setSelectedOptions([]);

    // Add AI response for next question
    const nextStepConfig = ONBOARDING_STEPS.find((s) => s.id === nextStep);
    if (nextStepConfig) {
      // Show typing indicator
      const typingId = `typing-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: typingId,
          role: "assistant",
          content: "",
          isTyping: true,
        },
      ]);

      // Simulate AI thinking delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Replace typing with actual message
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== typingId),
        {
          id: `q-${nextStep}-${Date.now()}`,
          role: "assistant",
          content: t(nextStepConfig.aiPromptKey),
        },
      ]);
    }

    setIsLoading(false);
  }, [currentQuestion, currentStep, selectedOptions, totalSteps, t, router, isLoading, locale, budgetAmount, budgetCurrency, budgetMin, budgetMax, monthlyIncome, monthlyExpenses, targetLocations, specialRequirements]);

  // Handle back step
  const handleBack = useCallback(() => {
    if (currentStep <= 1) return;

    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);

    // Restore previous answers if they exist
    const prevQuestion = getQuestionForStep(prevStep);
    if (prevQuestion && answers[prevQuestion.id]) {
      setSelectedOptions(answers[prevQuestion.id]);
    } else {
      setSelectedOptions([]);
    }
  }, [currentStep, answers]);

  // Get the current country value based on the question
  const getCurrentCountryValue = () => {
    if (!currentQuestion) return "";
    if (currentQuestion.id === "current_country") return currentCountry;
    if (currentQuestion.id === "citizenship") return citizenship;
    return "";
  };

  // Set country value based on the question
  const handleCountryChange = (value: string) => {
    if (!currentQuestion) return;
    if (currentQuestion.id === "current_country") {
      setCurrentCountry(value);
    } else if (currentQuestion.id === "citizenship") {
      setCitizenship(value);
    }
  };

  // Determine if can proceed based on question type
  const canProceed = () => {
    if (!currentQuestion) return false;
    switch (currentQuestion.type) {
      case "single-select":
      case "multi-select":
        return selectedOptions.length > 0;
      case "text":
        return true; // Text input has its own submit
      case "currency-input":
      case "budget-slider":
        return budgetAmount > 0;
      case "budget-range":
        return budgetMin > 0 || budgetMax > 0;
      case "income-expenses":
        return monthlyIncome >= 0 && monthlyExpenses >= 0;
      case "country-select":
        return !!getCurrentCountryValue();
      case "country-multi-select":
        return targetLocations.length > 0;
      case "open-text":
        return true; // Optional field
      default:
        return false;
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 lg:grid-rows-[minmax(0,1fr)] min-h-0">
      {/* Chat - Left Side */}
      <div className="lg:col-span-3 h-full">
        <Card className="h-full bg-card/50 backdrop-blur border-muted overflow-hidden p-0 gap-0">
          <ChatContainer
            messages={messages}
            currentQuestion={currentQuestion}
            selectedOptions={selectedOptions}
            onSelectOption={handleSelectOption}
            onSendMessage={handleSendMessage}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
            isLoading={isLoading}
            canGoBack={currentStep > 1}
            canGoNext={canProceed()}
            t={t}
            // Budget props
            budgetValue={budgetAmount}
            onBudgetChange={setBudgetAmount}
            budgetCurrency={budgetCurrency}
            onBudgetCurrencyChange={setBudgetCurrency}
            // Budget range props
            budgetMinValue={budgetMin}
            budgetMaxValue={budgetMax}
            onBudgetMinChange={setBudgetMin}
            onBudgetMaxChange={setBudgetMax}
            // Finances props
            incomeValue={monthlyIncome}
            expensesValue={monthlyExpenses}
            onIncomeChange={setMonthlyIncome}
            onExpensesChange={setMonthlyExpenses}
            locale={locale}
            // Country props
            countryValue={getCurrentCountryValue()}
            onCountryChange={handleCountryChange}
            countriesValue={targetLocations}
            onCountriesChange={setTargetLocations}
            // Open text props
            openTextValue={specialRequirements}
            onOpenTextChange={setSpecialRequirements}
            // Answered questions for inline display
            answeredQuestions={answeredQuestions}
          />
        </Card>
      </div>

      {/* Summary - Right Side */}
      <div className="lg:col-span-2 h-full">
        <OnboardingSummary
          currentStep={currentStep}
          totalSteps={totalSteps}
          answers={answers}
          budgetAmount={budgetAmount}
          budgetMin={budgetMin}
          budgetMax={budgetMax}
          budgetCurrency={budgetCurrency}
          monthlyIncome={monthlyIncome}
          monthlyExpenses={monthlyExpenses}
          currentCountry={currentCountry}
          citizenship={citizenship}
          targetLocations={targetLocations}
          specialRequirements={specialRequirements}
          locale={locale}
          t={t}
        />
      </div>
    </div>
  );
}
