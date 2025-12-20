"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { MultiStepForm, Step } from "@/components/onboarding/professional";
import {
  LawyerStep1Credentials,
  LawyerStep2Details,
  LawyerStep3Documents,
} from "@/components/onboarding/professional/lawyer";
import {
  lawyerStep1Schema,
  lawyerStep2Schema,
  lawyerStep3Schema,
  lawyerFullSchema,
  type LawyerFullData,
} from "@/lib/onboarding/professional-schemas";
import { saveLawyerProfile } from "../../professional-actions";
import { toast } from "sonner";

const steps: Step[] = [
  {
    id: 1,
    title: "Bar Info",
    description: "Your bar admission details",
    schema: lawyerStep1Schema,
    component: LawyerStep1Credentials,
  },
  {
    id: 2,
    title: "Details",
    description: "Your practice information",
    schema: lawyerStep2Schema,
    component: LawyerStep2Details,
  },
  {
    id: 3,
    title: "Documents",
    description: "Upload verification documents",
    schema: lawyerStep3Schema,
    component: LawyerStep3Documents,
  },
];

export default function LawyerOnboardingPage() {
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

  const handleSubmit = async (data: LawyerFullData) => {
    try {
      const result = await saveLawyerProfile({
        bar_number: data.bar_number,
        bar_state: data.bar_state,
        bar_admission_date: data.bar_admission_date,
        law_firm_name: data.law_firm_name,
        firm_address: data.firm_address,
        years_experience: data.years_experience,
        practice_areas: data.practice_areas as any[],
        service_areas: data.service_areas,
        languages: data.languages,
        bio: data.bio,
        headline: data.headline,
        website_url: data.website_url,
        hourly_rate: data.hourly_rate,
        consultation_fee: data.consultation_fee,
        offers_free_consultation: data.offers_free_consultation,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Profile saved! Your credentials are under review.");
      router.push(`/${locale}/dashboard/lawyer`);
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Attorney Registration</h1>
          <p className="text-muted-foreground">
            Complete your profile to start helping investors with legal matters
          </p>
        </div>

        <MultiStepForm
          steps={steps}
          fullSchema={lawyerFullSchema}
          defaultValues={{
            practice_areas: [],
            languages: [],
            service_areas: [],
            offers_free_consultation: false,
          }}
          onSubmit={handleSubmit}
          submitLabel="Complete Registration"
        />
      </div>
    </div>
  );
}
