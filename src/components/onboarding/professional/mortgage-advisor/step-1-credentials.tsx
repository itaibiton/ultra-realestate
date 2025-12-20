"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiStateSelect } from "../state-select";
import type { MortgageAdvisorFullData } from "@/lib/onboarding/professional-schemas";

interface MortgageAdvisorStep1Props {
  form: UseFormReturn<MortgageAdvisorFullData>;
}

export function MortgageAdvisorStep1Credentials({ form }: MortgageAdvisorStep1Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const licenseStates = watch("license_states") || [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">NMLS Information</h2>
        <p className="text-muted-foreground mt-1">
          Enter your NMLS and licensing details
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nmls_id">
            NMLS ID <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nmls_id"
            placeholder="e.g., 123456"
            {...register("nmls_id")}
            className={errors.nmls_id ? "border-destructive" : ""}
          />
          {errors.nmls_id && (
            <p className="text-sm text-destructive">
              {errors.nmls_id.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company_nmls_id">Company NMLS ID</Label>
          <Input
            id="company_nmls_id"
            placeholder="e.g., 654321"
            {...register("company_nmls_id")}
          />
        </div>
      </div>

      <MultiStateSelect
        label="Licensed States"
        description="Select all states where you are licensed to originate loans"
        value={licenseStates}
        onChange={(value) => setValue("license_states", value)}
        required
        error={errors.license_states?.message}
      />

      <div className="space-y-2">
        <Label htmlFor="company_name">Company Name</Label>
        <Input
          id="company_name"
          placeholder="e.g., First National Mortgage"
          {...register("company_name")}
        />
        {errors.company_name && (
          <p className="text-sm text-destructive">
            {errors.company_name.message}
          </p>
        )}
      </div>
    </div>
  );
}
