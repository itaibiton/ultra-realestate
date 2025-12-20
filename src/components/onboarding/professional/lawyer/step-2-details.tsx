"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelectBadges } from "../multi-select-badges";
import { LAWYER_PRACTICE_AREAS, LANGUAGES } from "@/lib/onboarding/professional-constants";
import type { LawyerFullData } from "@/lib/onboarding/professional-schemas";

interface LawyerStep2Props {
  form: UseFormReturn<LawyerFullData>;
}

export function LawyerStep2Details({ form }: LawyerStep2Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const practiceAreas = watch("practice_areas") || [];
  const languages = watch("languages") || [];
  const offersFreeConsultation = watch("offers_free_consultation");

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Professional Details</h2>
        <p className="text-muted-foreground mt-1">
          Tell us about your practice and expertise
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
            placeholder="e.g., 10"
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
            placeholder="you@lawfirm.com"
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
        label="Practice Areas"
        description="Select your areas of legal expertise"
        options={LAWYER_PRACTICE_AREAS}
        value={practiceAreas}
        onChange={(value) => setValue("practice_areas", value)}
        required
        error={errors.practice_areas?.message}
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
            placeholder="https://yourlawfirm.com"
            {...register("website_url")}
          />
          {errors.website_url && (
            <p className="text-sm text-destructive">
              {errors.website_url.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
          <Input
            id="hourly_rate"
            type="number"
            min="0"
            placeholder="e.g., 250"
            {...register("hourly_rate", { valueAsNumber: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="consultation_fee">Consultation Fee ($)</Label>
          <Input
            id="consultation_fee"
            type="number"
            min="0"
            placeholder="e.g., 100"
            {...register("consultation_fee", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="offers_free_consultation"
          checked={offersFreeConsultation}
          onCheckedChange={(checked) =>
            setValue("offers_free_consultation", checked === true)
          }
        />
        <Label htmlFor="offers_free_consultation" className="font-normal cursor-pointer">
          I offer free initial consultations
        </Label>
      </div>

      <MultiSelectBadges
        label="Languages"
        description="Languages you speak"
        options={LANGUAGES}
        value={languages}
        onChange={(value) => setValue("languages", value)}
      />

      <div className="space-y-2">
        <Label htmlFor="firm_address">Office Address</Label>
        <Input
          id="firm_address"
          placeholder="123 Main St, City, State ZIP"
          {...register("firm_address")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="headline">Professional Headline</Label>
        <Input
          id="headline"
          placeholder="e.g., Real Estate Attorney specializing in international transactions"
          maxLength={100}
          {...register("headline")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell clients about your practice, experience, and areas of focus..."
          rows={4}
          maxLength={1000}
          {...register("bio")}
        />
      </div>
    </div>
  );
}
