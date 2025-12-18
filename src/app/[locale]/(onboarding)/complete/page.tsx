"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Building2,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  Home,
  Landmark,
  Scale,
  UserCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { getOnboardingProgress } from "../actions";
import type { ProfessionalRecommendation, ProfessionalType } from "@/lib/onboarding/types";

interface ProfessionalCard {
  type: ProfessionalType;
  icon: React.ElementType;
  priority: "high" | "medium" | "low";
  reason: string;
}

/**
 * Complete Page - Onboarding completion and professionals recommendations
 */
export default function CompletePage() {
  const t = useTranslations("onboarding");
  const locale = useLocale();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [professionals, setProfessionals] = useState<ProfessionalCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile and determine professional recommendations
  useEffect(() => {
    async function loadProfileAndRecommend() {
      const data = await getOnboardingProgress();

      // Parse responses to determine recommendations
      const responses = data.responses || [];
      const responseMap: Record<string, string[]> = {};
      responses.forEach((r: { question_id: string; response_value: string | null; response_array: string[] | null }) => {
        responseMap[r.question_id] = r.response_array || (r.response_value ? [r.response_value] : []);
      });

      const recommendations: ProfessionalCard[] = [];

      // Get user answers
      const budget = parseInt(responseMap["budget"]?.[0] || "0", 10);
      const locations = responseMap["location"] || [];
      const propertyTypes = responseMap["property_type"] || [];
      const experience = responseMap["experience"]?.[0] || "first_time";
      const purpose = responseMap["purpose"]?.[0] || "investment";

      // Determine if international purchase (not just Israel)
      const isInternational = locations.some((loc) => loc !== "israel");

      // Determine if commercial property
      const isCommercial = propertyTypes.includes("commercial");

      // Determine if first-time buyer
      const isFirstTime = experience === "first_time";

      // Always recommend real estate agent
      recommendations.push({
        type: "real_estate_agent",
        icon: Building2,
        priority: "high",
        reason: t("professionals.reasons.always_recommended"),
      });

      // Recommend mortgage advisor for first-time buyers or large budgets
      if (isFirstTime || budget > 300000) {
        recommendations.push({
          type: "mortgage_advisor",
          icon: Landmark,
          priority: isFirstTime ? "high" : "medium",
          reason: isFirstTime
            ? t("professionals.reasons.first_time_buyer")
            : t("professionals.reasons.financing_needed"),
        });
      }

      // Recommend lawyer for international or commercial purchases
      if (isInternational || isCommercial) {
        recommendations.push({
          type: "lawyer",
          icon: Scale,
          priority: isCommercial ? "high" : "medium",
          reason: isCommercial
            ? t("professionals.reasons.commercial_property")
            : t("professionals.reasons.international_purchase"),
        });
      }

      // Sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

      setProfessionals(recommendations);
      setIsLoading(false);
    }

    loadProfileAndRecommend();
  }, [t]);

  // Trigger confetti and show content on mount
  useEffect(() => {
    // Fire confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#22c55e", "#3b82f6", "#8b5cf6"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#22c55e", "#3b82f6", "#8b5cf6"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Show content after a short delay
    setTimeout(() => setShowContent(true), 300);
  }, []);

  // Navigate to professionals page
  const handleConnectProfessional = (type: ProfessionalType) => {
    router.push(`/${locale}/professionals?type=${type}`);
  };

  // Navigate to properties
  const handleViewProperties = () => {
    router.push(`/${locale}/properties`);
  };

  // Navigate to dashboard
  const handleGoToDashboard = () => {
    router.push(`/${locale}/dashboard`);
  };

  // Get priority badge color
  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "medium":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "low":
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  return (
    <div className={`space-y-8 transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
      {/* Success header */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold">{t("complete.title")}</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t("complete.description")}
        </p>
      </div>

      {/* AI personalization note */}
      <Card className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">{t("complete.aiNote.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("complete.aiNote.description")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professionals recommendations */}
      {!isLoading && professionals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{t("professionals.title")}</h2>
          <p className="text-sm text-muted-foreground">{t("professionals.description")}</p>
          <div className="grid gap-4">
            {professionals.map((professional) => {
              const Icon = professional.icon;
              return (
                <Card key={professional.type} className="bg-card/50 backdrop-blur border-muted">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-foreground" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">
                            {t(`professionals.types.${professional.type}.title`)}
                          </h3>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(professional.priority)}
                          >
                            {professional.priority === "high" ? "Recommended" : "Optional"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t(`professionals.types.${professional.type}.description`)}
                        </p>
                        <p className="text-xs text-muted-foreground italic">
                          {professional.reason}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleConnectProfessional(professional.type)}
                        >
                          <UserCheck className="w-4 h-4 me-2" />
                          {t("professionals.connectButton")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 pt-4">
        <Button
          size="lg"
          className="gap-2"
          onClick={handleViewProperties}
        >
          <Home className="w-4 h-4" />
          {t("complete.viewProperties")}
          <ArrowRight className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="gap-2"
          onClick={handleGoToDashboard}
        >
          <LayoutDashboard className="w-4 h-4" />
          {t("complete.goToDashboard")}
        </Button>
      </div>
    </div>
  );
}
