"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  DollarSign,
  TrendingUp,
  Target,
  Calendar,
  Shield,
  User,
  MessageCircle,
  FileText,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { CircularProgress } from "./circular-progress";
import { SummarySection } from "./summary-section";
import { SummaryItem } from "./summary-item";
import {
  calculateSummaryProgress,
  formatCurrency,
  getCountryName,
  hasValue,
  parseFinancesData,
  getAnswerLabel,
} from "@/lib/onboarding/summary-helpers";

interface OnboardingSummaryProps {
  currentStep: number;
  totalSteps: number;
  answers: Record<string, string[]>;
  budgetAmount: number;
  budgetMin?: number;
  budgetMax?: number;
  budgetCurrency: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  currentCountry: string;
  citizenship: string;
  targetLocations: string[];
  specialRequirements: string;
  locale: string;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
}

/**
 * Onboarding Summary Panel
 * Displays live summary of user's answers as they progress through onboarding
 */
export function OnboardingSummary({
  currentStep,
  totalSteps,
  answers,
  budgetAmount,
  budgetMin = 0,
  budgetMax = 0,
  budgetCurrency,
  monthlyIncome,
  monthlyExpenses,
  currentCountry,
  citizenship,
  targetLocations,
  specialRequirements,
  locale,
  t,
}: OnboardingSummaryProps) {
  // Calculate progress
  const progressPercent = useMemo(
    () => calculateSummaryProgress(answers, currentStep, totalSteps),
    [answers, currentStep, totalSteps]
  );

  // Calculate disposable income
  const disposableIncome = useMemo(
    () => Math.max(0, monthlyIncome - monthlyExpenses),
    [monthlyIncome, monthlyExpenses]
  );

  // Determine which sections are complete/active
  const sections = useMemo(() => {
    const currentQuestionCategories = ['current_country', 'citizenship', 'budget', 'purpose', 'location', 'property_type', 'timeline', 'risk_tolerance', 'experience', 'special_requirements', 'contact_preference'];
    const currentQuestionId = currentQuestionCategories[currentStep - 1];

    return {
      location: {
        complete: hasValue(currentCountry) && hasValue(citizenship) && hasValue(targetLocations),
        active: currentQuestionId === 'current_country' || currentQuestionId === 'citizenship' || currentQuestionId === 'location',
      },
      budget: {
        complete: budgetAmount > 0 || budgetMin > 0 || budgetMax > 0,
        active: currentQuestionId === 'budget',
      },
      finances: {
        complete: monthlyIncome > 0 || monthlyExpenses > 0,
        active: false, // finances is not a separate question in this flow
      },
      profile: {
        complete: hasValue(answers['experience']) && hasValue(answers['risk_tolerance']),
        active: currentQuestionId === 'experience' || currentQuestionId === 'risk_tolerance',
      },
      goals: {
        complete: hasValue(answers['purpose']) && hasValue(answers['property_type']),
        active: currentQuestionId === 'purpose' || currentQuestionId === 'property_type',
      },
      timeline: {
        complete: hasValue(answers['timeline']),
        active: currentQuestionId === 'timeline',
      },
      contact: {
        complete: hasValue(answers['contact_preference']),
        active: currentQuestionId === 'contact_preference',
      },
      requirements: {
        complete: hasValue(specialRequirements) || currentStep > 10,
        active: currentQuestionId === 'special_requirements',
      },
    };
  }, [currentStep, answers, currentCountry, citizenship, targetLocations, budgetAmount, monthlyIncome, monthlyExpenses, specialRequirements]);

  // Format location data
  const locationData = useMemo(() => ({
    currentCountry: currentCountry ? getCountryName(currentCountry, locale) : undefined,
    citizenship: citizenship ? getCountryName(citizenship, locale) : undefined,
    targetMarkets: targetLocations.map(code => getCountryName(code, locale)),
  }), [currentCountry, citizenship, targetLocations, locale]);

  // Get answer labels
  const getLabel = (questionId: string, valueId: string) => {
    return getAnswerLabel(questionId, valueId, t);
  };

  return (
    <Card className="h-full overflow-hidden flex flex-col bg-card/50 backdrop-blur border-muted p-0 gap-0">
      {/* Header */}
      <div className="px-4 py-3 border-b shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">
              {t("summary.title")}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t("summary.subtitle")}
            </p>
          </div>
          <CircularProgress value={progressPercent} size={48} strokeWidth={4} />
        </div>
      </div>

      {/* Summary Sections - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        <AnimatePresence mode="sync">
          {/* Location Section */}
          <SummarySection
            key="location"
            title={t("summary.sections.location.title")}
            icon={MapPin}
            isComplete={sections.location.complete}
            isActive={sections.location.active}
          >
            <SummaryItem
              label={t("summary.sections.location.currentCountry")}
              value={locationData.currentCountry}
              pending={t("summary.sections.location.pending")}
            />
            <SummaryItem
              label={t("summary.sections.location.citizenship")}
              value={locationData.citizenship}
              pending={t("summary.sections.location.pending")}
            />
            <SummaryItem
              label={t("summary.sections.location.targetMarkets")}
              value={locationData.targetMarkets}
              pending={t("summary.sections.location.pending")}
            />
          </SummarySection>

          {/* Budget Section */}
          <SummarySection
            key="budget"
            title={t("summary.sections.budget.title")}
            icon={DollarSign}
            isComplete={sections.budget.complete}
            isActive={sections.budget.active}
          >
            <SummaryItem
              label={t("summary.sections.budget.amount")}
              value={
                budgetMin > 0 || budgetMax > 0
                  ? `${formatCurrency(budgetMin, budgetCurrency, locale)} - ${formatCurrency(budgetMax, budgetCurrency, locale)}`
                  : budgetAmount > 0
                    ? formatCurrency(budgetAmount, budgetCurrency, locale)
                    : undefined
              }
              pending={t("summary.sections.budget.pending")}
            />
          </SummarySection>

          {/* Finances Section - Only show if we have the data */}
          {(monthlyIncome > 0 || monthlyExpenses > 0) && (
            <SummarySection
              key="finances"
              title={t("summary.sections.finances.title")}
              icon={TrendingUp}
              isComplete={sections.finances.complete}
              isActive={sections.finances.active}
            >
              <SummaryItem
                label={t("summary.sections.finances.income")}
                value={monthlyIncome > 0 ? formatCurrency(monthlyIncome, budgetCurrency, locale) : undefined}
                pending={t("summary.sections.finances.pending")}
              />
              <SummaryItem
                label={t("summary.sections.finances.expenses")}
                value={monthlyExpenses > 0 ? formatCurrency(monthlyExpenses, budgetCurrency, locale) : undefined}
                pending={t("summary.sections.finances.pending")}
              />
              {monthlyIncome > 0 && monthlyExpenses > 0 && (
                <SummaryItem
                  label={t("summary.sections.finances.disposable")}
                  value={formatCurrency(disposableIncome, budgetCurrency, locale)}
                />
              )}
            </SummarySection>
          )}

          {/* Goals Section */}
          <SummarySection
            key="goals"
            title={t("summary.sections.goals.title")}
            icon={Target}
            isComplete={sections.goals.complete}
            isActive={sections.goals.active}
          >
            <SummaryItem
              label={t("summary.sections.goals.purpose")}
              value={answers['purpose']?.[0] ? getLabel('purpose', answers['purpose'][0]) : undefined}
              pending={t("summary.sections.goals.pending")}
            />
            <SummaryItem
              label={t("summary.sections.goals.propertyTypes")}
              value={answers['property_type']?.map(id => getLabel('property_type', id))}
              pending={t("summary.sections.goals.pending")}
            />
          </SummarySection>

          {/* Timeline Section */}
          <SummarySection
            key="timeline"
            title={t("summary.sections.timeline.title")}
            icon={Calendar}
            isComplete={sections.timeline.complete}
            isActive={sections.timeline.active}
          >
            <SummaryItem
              label={t("summary.sections.timeline.purchase")}
              value={answers['timeline']?.[0] ? getLabel('timeline', answers['timeline'][0]) : undefined}
              pending={t("summary.sections.timeline.pending")}
            />
          </SummarySection>

          {/* Profile Section */}
          <SummarySection
            key="profile"
            title={t("summary.sections.profile.title")}
            icon={User}
            isComplete={sections.profile.complete}
            isActive={sections.profile.active}
          >
            <SummaryItem
              label={t("summary.sections.profile.experience")}
              value={answers['experience']?.[0] ? getLabel('experience', answers['experience'][0]) : undefined}
              pending={t("summary.sections.profile.pending")}
            />
            <SummaryItem
              label={t("summary.sections.profile.risk")}
              value={answers['risk_tolerance']?.[0] ? getLabel('risk_tolerance', answers['risk_tolerance'][0]) : undefined}
              pending={t("summary.sections.profile.pending")}
            />
          </SummarySection>

          {/* Contact Section */}
          <SummarySection
            key="contact"
            title={t("summary.sections.contact.title")}
            icon={MessageCircle}
            isComplete={sections.contact.complete}
            isActive={sections.contact.active}
          >
            <SummaryItem
              label={t("summary.sections.contact.method")}
              value={answers['contact_preference']?.[0] ? getLabel('contact_preference', answers['contact_preference'][0]) : undefined}
              pending={t("summary.sections.contact.pending")}
            />
          </SummarySection>

          {/* Requirements Section */}
          {currentStep >= 10 && (
            <SummarySection
              key="requirements"
              title={t("summary.sections.requirements.title")}
              icon={FileText}
              isComplete={sections.requirements.complete}
              isActive={sections.requirements.active}
            >
              <SummaryItem
                label={t("summary.sections.requirements.details")}
                value={specialRequirements || undefined}
                pending={t("summary.sections.requirements.none")}
              />
            </SummarySection>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
