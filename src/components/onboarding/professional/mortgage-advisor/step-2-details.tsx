"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelectBadges } from "../multi-select-badges";
import { LOAN_TYPES, LANGUAGES } from "@/lib/onboarding/professional-constants";
import type { MortgageAdvisorFullData } from "@/lib/onboarding/professional-schemas";

interface MortgageAdvisorStep2Props {
  form: UseFormReturn<MortgageAdvisorFullData>;
}

export function MortgageAdvisorStep2Details({ form }: MortgageAdvisorStep2Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const loanTypes = watch("loan_types") || [];
  const languages = watch("languages") || [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Professional Details</h2>
        <p className="text-muted-foreground mt-1">
          Tell us about your experience and loan expertise
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="years_experience">
            Years of Experience <span className="text-destructive">*</span>
          </Label>
          <Input
            id="years_experience"
            type="number"
            min="1"
            max="50"
            placeholder="e.g., 8"
            {...register("years_experience", { valueAsNumber: true })}
            className={errors.years_experience ? "border-destructive" : ""}
          />
          {errors.years_experience && (
            <p className="text-sm text-destructive">
              {errors.years_experience.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_email">
            Contact Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact_email"
            type="email"
            placeholder="you@mortgage.com"
            {...register("contact_email")}
            className={errors.contact_email ? "border-destructive" : ""}
          />
          {errors.contact_email && (
            <p className="text-sm text-destructive">
              {errors.contact_email.message}
            </p>
          )}
        </div>
      </div>

      <MultiSelectBadges
        label="Loan Types"
        description="Select the types of loans you specialize in"
        options={LOAN_TYPES}
        value={loanTypes}
        onChange={(value) => setValue("loan_types", value)}
        required
        error={errors.loan_types?.message}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact_phone">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact_phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...register("contact_phone")}
            className={errors.contact_phone ? "border-destructive" : ""}
          />
          {errors.contact_phone && (
            <p className="text-sm text-destructive">
              {errors.contact_phone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="website_url">Website URL</Label>
          <Input
            id="website_url"
            type="url"
            placeholder="https://yoursite.com"
            {...register("website_url")}
          />
          {errors.website_url && (
            <p className="text-sm text-destructive">
              {errors.website_url.message}
            </p>
          )}
        </div>
      </div>

      <MultiSelectBadges
        label="Languages"
        description="Languages you speak"
        options={LANGUAGES}
        value={languages}
        onChange={(value) => setValue("languages", value)}
      />

      <div className="space-y-2">
        <Label htmlFor="company_address">Office Address</Label>
        <Input
          id="company_address"
          placeholder="123 Main St, City, State ZIP"
          {...register("company_address")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="headline">Professional Headline</Label>
        <Input
          id="headline"
          placeholder="e.g., Investment Property Loan Specialist"
          maxLength={100}
          {...register("headline")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell clients about your experience, the types of borrowers you work with, and your approach..."
          rows={4}
          maxLength={1000}
          {...register("bio")}
        />
      </div>
    </div>
  );
}
