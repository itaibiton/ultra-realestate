"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Check, Loader2, DollarSign, Target, MapPin, Building2, Clock, GraduationCap, Wallet, type LucideIcon } from "lucide-react";
import { getOnboardingProgress, completeOnboarding } from "../actions";
import type { InvestorProfileData, PurchasePurpose, PropertyType, PurchaseTimeline, ExperienceLevel } from "@/lib/onboarding/types";

interface ProfileSection {
  key: string;
  questionKey: string;
  titleKey: string;
  icon: LucideIcon;
  values: string[];
  displayType: "badge" | "currency" | "finances";
}

/**
 * Summary Page - Review and confirm investment profile
 */
export default function SummaryPage() {
  const t = useTranslations("onboarding");
  const tQuestions = useTranslations("onboarding.questions");
  const locale = useLocale();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responses, setResponses] = useState<Record<string, string[]>>({});

  // Load saved responses
  useEffect(() => {
    async function loadProgress() {
      const data = await getOnboardingProgress();
      if (data.responses) {
        const responseMap: Record<string, string[]> = {};
        data.responses.forEach((r: { question_id: string; response_value: string | null; response_array: string[] | null }) => {
          responseMap[r.question_id] = r.response_array || (r.response_value ? [r.response_value] : []);
        });
        setResponses(responseMap);
      }
      setIsLoading(false);
    }
    loadProgress();
  }, []);

  // Transform responses to profile sections for display
  const sections: ProfileSection[] = [
    {
      key: "budget",
      questionKey: "budget",
      titleKey: "summary.sections.budget",
      icon: DollarSign,
      values: responses["budget"] || [],
      displayType: "currency",
    },
    {
      key: "purpose",
      questionKey: "purpose",
      titleKey: "summary.sections.goals",
      icon: Target,
      values: responses["purpose"] || [],
      displayType: "badge",
    },
    {
      key: "location",
      questionKey: "location",
      titleKey: "summary.sections.markets",
      icon: MapPin,
      values: responses["location"] || [],
      displayType: "badge",
    },
    {
      key: "property",
      questionKey: "property",
      titleKey: "summary.sections.property",
      icon: Building2,
      values: responses["property_type"] || [],
      displayType: "badge",
    },
    {
      key: "timeline",
      questionKey: "timeline",
      titleKey: "summary.sections.timeline",
      icon: Clock,
      values: responses["timeline"] || [],
      displayType: "badge",
    },
    {
      key: "experience",
      questionKey: "experience",
      titleKey: "summary.sections.experience",
      icon: GraduationCap,
      values: responses["experience"] || [],
      displayType: "badge",
    },
    {
      key: "finances",
      questionKey: "finances",
      titleKey: "summary.sections.finances",
      icon: Wallet,
      values: responses["finances"] || [],
      displayType: "finances",
    },
  ];

  // Get display label for a value
  const getDisplayLabel = (questionKey: string, value: string): string => {
    const optionKey = `${questionKey}.options.${value}`;
    const translated = tQuestions(optionKey);
    // If translation returns the key itself, just return the formatted value
    return translated === optionKey ? value.replace(/_/g, " ") : translated;
  };

  // Format currency value
  const formatCurrency = (value: string): string => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) return value;
    return new Intl.NumberFormat(locale === "he" ? "he-IL" : "en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(parsed);
  };

  // Handle confirm and complete
  const handleConfirm = async () => {
    setIsSubmitting(true);

    // Parse budget value
    const budgetValue = responses["budget"]?.[0];
    const budget = budgetValue ? parseInt(budgetValue, 10) : 500000;

    // Parse finances values (income, expenses)
    const financesValue = responses["finances"]?.[0];
    let monthlyIncome = 0;
    let monthlyExpenses = 0;
    if (financesValue) {
      try {
        const finances = JSON.parse(financesValue);
        monthlyIncome = finances.income || 0;
        monthlyExpenses = finances.expenses || 0;
      } catch {
        // If not JSON, try to parse as simple numbers
        const parts = financesValue.split(",");
        monthlyIncome = parseInt(parts[0], 10) || 0;
        monthlyExpenses = parseInt(parts[1], 10) || 0;
      }
    }

    // Build profile data from responses
    const profileData: InvestorProfileData = {
      budget,
      budgetCurrency: "USD",
      purpose: (responses["purpose"]?.[0] || "investment") as PurchasePurpose,
      preferredLocations: responses["location"] || [],
      propertyTypes: (responses["property_type"] || []) as PropertyType[],
      timeline: (responses["timeline"]?.[0] || "3_6_months") as PurchaseTimeline,
      experienceLevel: (responses["experience"]?.[0] || "first_time") as ExperienceLevel,
      monthlyIncome,
      monthlyExpenses,
    };

    const result = await completeOnboarding(profileData);

    if (result.success) {
      toast.success("Profile saved successfully!");
      router.push(`/${locale}/complete`);
    } else {
      toast.error(result.error || "Failed to save profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle edit - go back to chat
  const handleEdit = () => {
    router.push(`/${locale}/chat`);
  };

  // Render section value based on display type
  const renderSectionValue = (section: ProfileSection) => {
    if (section.values.length === 0) {
      return (
        <span className="text-sm text-muted-foreground italic">
          {t("summary.notSpecified")}
        </span>
      );
    }

    if (section.displayType === "currency") {
      return (
        <span className="text-lg font-semibold">
          {formatCurrency(section.values[0])}
        </span>
      );
    }

    if (section.displayType === "finances") {
      try {
        const finances = JSON.parse(section.values[0]);
        return (
          <div className="flex flex-col gap-1">
            <span className="text-sm">
              {tQuestions("finances.incomeLabel")}: {formatCurrency(String(finances.income || 0))}
            </span>
            <span className="text-sm">
              {tQuestions("finances.expensesLabel")}: {formatCurrency(String(finances.expenses || 0))}
            </span>
          </div>
        );
      } catch {
        return (
          <span className="text-sm text-muted-foreground italic">
            {t("summary.notSpecified")}
          </span>
        );
      }
    }

    // Badge display type
    return (
      <div className="flex flex-wrap gap-2">
        {section.values.map((value) => (
          <Badge key={value} variant="secondary">
            {getDisplayLabel(section.questionKey, value)}
          </Badge>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">{t("summary.title")}</h1>
        <p className="text-muted-foreground">{t("summary.description")}</p>
      </div>

      {/* Profile sections */}
      <Card className="bg-card/50 backdrop-blur border-muted">
        <CardContent className="p-6 space-y-6">
          {sections.map((section) => {
            const Icon = section.icon as React.ComponentType<{ className?: string }>;
            return (
              <div key={section.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {t(section.titleKey)}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={handleEdit}
                  >
                    <Pencil className="w-3 h-3 me-1" />
                    {t("summary.editButton")}
                  </Button>
                </div>
                {renderSectionValue(section)}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Confirm button */}
      <Button
        size="lg"
        className="w-full gap-2"
        onClick={handleConfirm}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("summary.processing")}
          </>
        ) : (
          <>
            <Check className="w-4 h-4" />
            {t("summary.confirmButton")}
          </>
        )}
      </Button>
    </div>
  );
}
