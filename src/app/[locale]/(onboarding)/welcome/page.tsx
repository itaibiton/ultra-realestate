"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Clock } from "lucide-react";

/**
 * Welcome Page - Entry point for the onboarding flow
 *
 * Shows after email verification and gives users the option to:
 * - Start the AI-guided onboarding process
 * - Skip and go directly to the dashboard
 */
export default function WelcomePage() {
  const t = useTranslations("onboarding");
  const locale = useLocale();
  const router = useRouter();

  const handleStartOnboarding = () => {
    router.push(`/${locale}/chat`);
  };

  const handleSkip = () => {
    router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="flex flex-col items-center text-center space-y-8">
      {/* Progress indicator */}
      <div className="w-full max-w-xs">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-0 bg-blue-500 rounded-full transition-all duration-500" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {t("progress", { current: 0, total: 9 })}
        </p>
      </div>

      {/* Hero illustration */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Welcome text */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("welcome.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          {t("welcome.description")}
        </p>
      </div>

      {/* Benefits */}
      <Card className="w-full max-w-md bg-card/50 backdrop-blur border-muted">
        <CardContent className="p-6">
          <ul className="space-y-4 text-start">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-500 text-sm font-semibold">1</span>
              </div>
              <div>
                <p className="font-medium">{t("welcome.benefits.personalized.title")}</p>
                <p className="text-sm text-muted-foreground">{t("welcome.benefits.personalized.description")}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-500 text-sm font-semibold">2</span>
              </div>
              <div>
                <p className="font-medium">{t("welcome.benefits.markets.title")}</p>
                <p className="text-sm text-muted-foreground">{t("welcome.benefits.markets.description")}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-500 text-sm font-semibold">3</span>
              </div>
              <div>
                <p className="font-medium">{t("welcome.benefits.recommendations.title")}</p>
                <p className="text-sm text-muted-foreground">{t("welcome.benefits.recommendations.description")}</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Time estimate */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>{t("welcome.timeEstimate")}</span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <Button
          size="lg"
          className="flex-1 gap-2"
          onClick={handleStartOnboarding}
        >
          {t("welcome.startButton")}
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button
          size="lg"
          variant="ghost"
          className="flex-1"
          onClick={handleSkip}
        >
          {t("welcome.skipButton")}
        </Button>
      </div>
    </div>
  );
}
