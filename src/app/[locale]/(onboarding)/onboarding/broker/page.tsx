"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { MultiStepForm, Step } from "@/components/onboarding/professional";
import {
  BrokerStep1Credentials,
  BrokerStep2Details,
  BrokerStep3Documents,
} from "@/components/onboarding/professional/broker";
import {
  brokerStep1Schema,
  brokerStep2Schema,
  brokerStep3Schema,
  brokerFullSchema,
  type BrokerFullData,
} from "@/lib/onboarding/professional-schemas";
import { saveBrokerProfile } from "../../professional-actions";
import { toast } from "sonner";

const steps: Step[] = [
  {
    id: 1,
    title: "License Info",
    description: "Your real estate license details",
    schema: brokerStep1Schema,
    component: BrokerStep1Credentials,
  },
  {
    id: 2,
    title: "Details",
    description: "Your professional experience",
    schema: brokerStep2Schema,
    component: BrokerStep2Details,
  },
  {
    id: 3,
    title: "Documents",
    description: "Upload verification documents",
    schema: brokerStep3Schema,
    component: BrokerStep3Documents,
  },
];

export default function BrokerOnboardingPage() {
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

  const handleSubmit = async (data: BrokerFullData) => {
    try {
      const result = await saveBrokerProfile({
        license_number: data.license_number,
        license_state: data.license_state,
        license_expiry: data.license_expiry,
        brokerage_name: data.brokerage_name,
        brokerage_address: data.brokerage_address,
        years_experience: data.years_experience,
        specializations: data.specializations as any[],
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

      toast.success("Profile saved! Your documents are under review.");
      router.push(`/${locale}/dashboard/broker`);
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Broker Registration</h1>
          <p className="text-muted-foreground">
            Complete your profile to start connecting with investors
          </p>
        </div>

        <MultiStepForm
          steps={steps}
          fullSchema={brokerFullSchema}
          defaultValues={{
            specializations: [],
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
