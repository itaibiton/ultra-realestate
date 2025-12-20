"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface OnboardingBannerProps {
  currentStep: number;
  totalSteps: number;
  isComplete?: boolean;
  className?: string;
}

/**
 * Onboarding Banner - Prominent alert for incomplete onboarding
 * Shows at top of dashboard when user hasn't completed their investment profile
 */
export function OnboardingBanner({
  currentStep,
  totalSteps,
  isComplete = false,
  className,
}: OnboardingBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  // Don't show if complete or dismissed
  if (isComplete || isDismissed) {
    return null;
  }

  const progressPercent = Math.round((currentStep / totalSteps) * 100);
  const stepsRemaining = totalSteps - currentStep;

  const handleContinue = () => {
    router.push(`/${locale}/chat`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
          "relative overflow-hidden rounded-xl border bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 p-4 md:p-6",
          className
        )}
      >
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-1/2 -right-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-lg">
                Complete Your Investment Profile
              </h3>
              <p className="text-sm text-muted-foreground">
                {stepsRemaining === 0
                  ? "Just one more step to unlock personalized property recommendations!"
                  : `${stepsRemaining} more ${stepsRemaining === 1 ? "question" : "questions"} to unlock AI-powered property matching.`}
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-3">
              <Progress value={progressPercent} className="h-2 flex-1" />
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {currentStep}/{totalSteps}
              </span>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={handleContinue}
            className="gap-2 shrink-0"
          >
            {currentStep === 0 ? "Get Started" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
