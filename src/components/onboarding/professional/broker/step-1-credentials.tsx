"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StateSelect } from "../state-select";
import type { BrokerFullData } from "@/lib/onboarding/professional-schemas";

interface BrokerStep1Props {
  form: UseFormReturn<BrokerFullData>;
}

export function BrokerStep1Credentials({ form }: BrokerStep1Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const licenseState = watch("license_state");

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">License Information</h2>
        <p className="text-muted-foreground mt-1">
          Enter your real estate license details
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="license_number">
            License Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="license_number"
            placeholder="e.g., RE12345678"
            {...register("license_number")}
            className={errors.license_number ? "border-destructive" : ""}
          />
          {errors.license_number && (
            <p className="text-sm text-destructive">
              {errors.license_number.message}
            </p>
          )}
        </div>

        <StateSelect
          label="License State"
          value={licenseState}
          onChange={(value) => setValue("license_state", value)}
          required
          error={errors.license_state?.message}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="license_expiry">License Expiry Date</Label>
          <Input
            id="license_expiry"
            type="date"
            {...register("license_expiry")}
          />
          {errors.license_expiry && (
            <p className="text-sm text-destructive">
              {errors.license_expiry.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brokerage_name">Brokerage Name</Label>
          <Input
            id="brokerage_name"
            placeholder="e.g., ABC Realty"
            {...register("brokerage_name")}
          />
          {errors.brokerage_name && (
            <p className="text-sm text-destructive">
              {errors.brokerage_name.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
