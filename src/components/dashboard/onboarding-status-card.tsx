"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight, Edit2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/onboarding/circular-progress";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface OnboardingStatusCardProps {
  currentStep: number;
  totalSteps: number;
  isComplete?: boolean;
  profileStrength?: "weak" | "moderate" | "strong";
  className?: string;
}

const strengthConfig = {
  weak: {
    label: "Weak",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  moderate: {
    label: "Moderate",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  strong: {
    label: "Strong",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
};

/**
 * Onboarding Status Card - Dashboard widget for onboarding progress
 * Shows completion status and profile strength
 */
export function OnboardingStatusCard({
  currentStep,
  totalSteps,
  isComplete = false,
  profileStrength = "weak",
  className,
}: OnboardingStatusCardProps) {
  const router = useRouter();
  const locale = useLocale();

  const progressPercent = Math.round((currentStep / totalSteps) * 100);
  const strength = strengthConfig[profileStrength];

  const handleAction = () => {
    if (isComplete) {
      router.push(`/${locale}/dashboard/profile`);
    } else {
      router.push(`/${locale}/chat`);
    }
  };

  // Calculate which milestones are complete
  const milestones = [
    { step: 3, label: "Location & Budget" },
    { step: 7, label: "Preferences" },
    { step: 11, label: "Profile Complete" },
  ];

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <span>Investment Profile</span>
          <span
            className={cn(
              "text-xs font-normal px-2 py-0.5 rounded-full",
              strength.bgColor,
              strength.color
            )}
          >
            {strength.label}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Circle */}
        <div className="flex items-center gap-4">
          <CircularProgress
            value={progressPercent}
            size={64}
            strokeWidth={5}
          />
          <div className="flex-1">
            <p className="text-2xl font-bold">{progressPercent}%</p>
            <p className="text-sm text-muted-foreground">
              {isComplete ? "Profile complete" : `${currentStep} of ${totalSteps} steps`}
            </p>
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-2">
          {milestones.map((milestone, index) => {
            const isCompleted = currentStep >= milestone.step;
            return (
              <motion.div
                key={milestone.step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={isCompleted ? "text-foreground" : "text-muted-foreground"}>
                  {milestone.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleAction}
          variant={isComplete ? "outline" : "default"}
          className="w-full gap-2"
          size="sm"
        >
          {isComplete ? (
            <>
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </>
          ) : (
            <>
              Continue Setup
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
