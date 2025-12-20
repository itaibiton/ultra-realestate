"use client";

import { useState, useCallback } from "react";
import { useForm, FormProvider, UseFormReturn, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./step-indicator";
import { FormStep, FormStepContainer } from "./form-step";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export interface Step {
  id: number;
  title: string;
  description?: string;
  schema: z.ZodSchema;
  component: React.ComponentType<{ form: UseFormReturn<any> }>;
}

interface MultiStepFormProps<T extends FieldValues> {
  steps: Step[];
  fullSchema: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => Promise<void>;
  onStepChange?: (step: number) => void;
  submitLabel?: string;
  className?: string;
}

export function MultiStepForm<T extends FieldValues>({
  steps,
  fullSchema,
  defaultValues,
  onSubmit,
  onStepChange,
  submitLabel = "Complete",
  className,
}: MultiStepFormProps<T>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(fullSchema as any) as any,
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  const currentStepData = steps.find((s) => s.id === currentStep);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  const validateCurrentStep = useCallback(async () => {
    if (!currentStepData) return false;

    // Get field names from the current step's schema
    const stepSchema = currentStepData.schema;
    const shape = (stepSchema as any)._def?.shape?.() || {};
    const fieldNames = Object.keys(shape);

    // Trigger validation for current step fields only
    const result = await form.trigger(fieldNames as any);
    return result;
  }, [currentStepData, form]);

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (isLastStep) {
      setIsSubmitting(true);
      try {
        await onSubmit(form.getValues());
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setDirection("forward");
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    }
  };

  const handleBack = () => {
    if (isFirstStep) return;
    setDirection("backward");
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    onStepChange?.(prevStep);
  };

  const goToStep = async (step: number) => {
    if (step === currentStep) return;

    // Can only go back freely, going forward requires validation
    if (step < currentStep) {
      setDirection("backward");
      setCurrentStep(step);
      onStepChange?.(step);
    } else {
      // Validate all steps between current and target
      for (let i = currentStep; i < step; i++) {
        const stepData = steps.find((s) => s.id === i);
        if (stepData) {
          const shape = (stepData.schema as any)._def?.shape?.() || {};
          const fieldNames = Object.keys(shape);
          const isValid = await form.trigger(fieldNames as any);
          if (!isValid) return;
        }
      }
      setDirection("forward");
      setCurrentStep(step);
      onStepChange?.(step);
    }
  };

  return (
    <FormProvider {...form}>
      <div className={cn("w-full max-w-2xl mx-auto", className)}>
        {/* Step Indicator */}
        <StepIndicator
          steps={steps.map((s) => ({ id: s.id, title: s.title }))}
          currentStep={currentStep}
          className="mb-8"
        />

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="space-y-6"
        >
          {/* Step Content */}
          <FormStepContainer>
            {steps.map((step) => (
              <FormStep
                key={step.id}
                isActive={step.id === currentStep}
                direction={direction}
              >
                <div className="space-y-6">
                  {step.description && (
                    <p className="text-muted-foreground text-center">
                      {step.description}
                    </p>
                  )}
                  <step.component form={form} />
                </div>
              </FormStep>
            ))}
          </FormStepContainer>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={isFirstStep || isSubmitting}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 me-2 animate-spin" />
                  Submitting...
                </>
              ) : isLastStep ? (
                submitLabel
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
