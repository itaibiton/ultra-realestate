"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { MultiStepForm, Step } from "@/components/onboarding/professional";
import {
  MortgageAdvisorStep1Credentials,
  MortgageAdvisorStep2Details,
  MortgageAdvisorStep3Documents,
} from "@/components/onboarding/professional/mortgage-advisor";
import {
  mortgageAdvisorStep1Schema,
  mortgageAdvisorStep2Schema,
  mortgageAdvisorStep3Schema,
  mortgageAdvisorFullSchema,
  type MortgageAdvisorFullData,
} from "@/lib/onboarding/professional-schemas";
import { saveMortgageAdvisorProfile } from "../../professional-actions";
import { toast } from "sonner";

const steps: Step[] = [
  {
    id: 1,
    title: "NMLS Info",
    description: "Your NMLS and licensing details",
    schema: mortgageAdvisorStep1Schema,
    component: MortgageAdvisorStep1Credentials,
  },
  {
    id: 2,
    title: "Details",
    description: "Your loan expertise",
    schema: mortgageAdvisorStep2Schema,
    component: MortgageAdvisorStep2Details,
  },
  {
    id: 3,
    title: "Documents",
    description: "Upload verification documents",
    schema: mortgageAdvisorStep3Schema,
    component: MortgageAdvisorStep3Documents,
  },
];

export default function MortgageAdvisorOnboardingPage() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const t = useTranslations("auth");
  const verified = searchParams.get("verified") === "true";

  // Show success toast when email is verified
  useEffect(() => {
    if (verified) {
      toast.success(t("emailVerified"), {
        description: t("emailVerifiedDescription"),
      });
    }
  }, [verified, t]);

  const handleSubmit = async (data: MortgageAdvisorFullData) => {
    try {
      const result = await saveMortgageAdvisorProfile({
        nmls_id: data.nmls_id,
        license_states: data.license_states,
        company_name: data.company_name,
        company_address: data.company_address,
        company_nmls_id: data.company_nmls_id,
        years_experience: data.years_experience,
        loan_types: data.loan_types as any[],
        service_areas: data.service_areas,
        languages: data.languages,
        bio: data.bio,
        headline: data.headline,
        website_url: data.website_url,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Profile saved! Your NMLS credentials are under review.");
      router.push(`/${locale}/dashboard/mortgage`);
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Mortgage Advisor Registration</h1>
          <p className="text-muted-foreground">
            Complete your profile to start helping investors with financing
          </p>
        </div>

        <MultiStepForm
          steps={steps}
          fullSchema={mortgageAdvisorFullSchema}
          defaultValues={{
            license_states: [],
            loan_types: [],
            languages: [],
            service_areas: [],
          }}
          onSubmit={handleSubmit}
          submitLabel="Complete Registration"
        />
      </div>
    </div>
  );
}
