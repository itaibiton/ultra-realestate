"use client";

import { UseFormReturn } from "react-hook-form";
import { DocumentUpload } from "../document-upload";
import type { BrokerFullData } from "@/lib/onboarding/professional-schemas";

interface BrokerStep3Props {
  form: UseFormReturn<BrokerFullData>;
}

export function BrokerStep3Documents({ form }: BrokerStep3Props) {
  const {
    formState: { errors },
    setValue,
    watch,
  } = form;

  const licenseDoc = watch("license_doc");
  const insuranceDoc = watch("insurance_doc");
  const idDoc = watch("id_doc");

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Verification Documents</h2>
        <p className="text-muted-foreground mt-1">
          Upload documents to verify your credentials
        </p>
      </div>

      <div className="space-y-6">
        <DocumentUpload
          label="Real Estate License"
          description="Upload a copy of your current real estate license"
          documentType="license"
          value={licenseDoc}
          onChange={(url) => setValue("license_doc", url || "")}
          required
          error={errors.license_doc?.message}
        />

        <DocumentUpload
          label="E&O Insurance Certificate"
          description="Errors and Omissions insurance (optional but recommended)"
          documentType="insurance"
          value={insuranceDoc}
          onChange={(url) => setValue("insurance_doc", url)}
        />

        <DocumentUpload
          label="Government ID"
          description="Driver's license or passport (optional)"
          documentType="id"
          value={idDoc}
          onChange={(url) => setValue("id_doc", url)}
        />
      </div>

      <div className="rounded-lg bg-muted/50 p-4 text-sm">
        <p className="font-medium mb-2">What happens next?</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Our team will review your documents within 24-48 hours</li>
          <li>You&apos;ll receive an email when your profile is verified</li>
          <li>Once verified, your profile will be visible to investors</li>
        </ul>
      </div>
    </div>
  );
}
