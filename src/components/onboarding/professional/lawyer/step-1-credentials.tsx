"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StateSelect } from "../state-select";
import type { LawyerFullData } from "@/lib/onboarding/professional-schemas";

interface LawyerStep1Props {
  form: UseFormReturn<LawyerFullData>;
}

export function LawyerStep1Credentials({ form }: LawyerStep1Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const barState = watch("bar_state");

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Bar Information</h2>
        <p className="text-muted-foreground mt-1">
          Enter your bar admission details
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bar_number">
            Bar Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="bar_number"
            placeholder="e.g., 123456"
            {...register("bar_number")}
            className={errors.bar_number ? "border-destructive" : ""}
          />
          {errors.bar_number && (
            <p className="text-sm text-destructive">
              {errors.bar_number.message}
            </p>
          )}
        </div>

        <StateSelect
          label="Bar State"
          value={barState}
          onChange={(value) => setValue("bar_state", value)}
          required
          error={errors.bar_state?.message}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bar_admission_date">Bar Admission Date</Label>
          <Input
            id="bar_admission_date"
            type="date"
            {...register("bar_admission_date")}
          />
          {errors.bar_admission_date && (
            <p className="text-sm text-destructive">
              {errors.bar_admission_date.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="law_firm_name">Law Firm Name</Label>
          <Input
            id="law_firm_name"
            placeholder="e.g., Smith & Associates"
            {...register("law_firm_name")}
          />
          {errors.law_firm_name && (
            <p className="text-sm text-destructive">
              {errors.law_firm_name.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
