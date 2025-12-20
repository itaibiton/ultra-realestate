"use client";

import { UseFormReturn } from "react-hook-form";
import { DocumentUpload } from "../document-upload";
import type { MortgageAdvisorFullData } from "@/lib/onboarding/professional-schemas";

interface MortgageAdvisorStep3Props {
  form: UseFormReturn<MortgageAdvisorFullData>;
}

export function MortgageAdvisorStep3Documents({ form }: MortgageAdvisorStep3Props) {
  const {
    formState: { errors },
    setValue,
    watch,
  } = form;

  const nmlsCertificateDoc = watch("nmls_certificate_doc");
  const stateLicenseDoc = watch("state_license_doc");
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
          label="NMLS Certificate"
          description="Upload your NMLS license or certificate"
          documentType="nmls_certificate"
          value={nmlsCertificateDoc}
          onChange={(url) => setValue("nmls_certificate_doc", url || "")}
          required
          error={errors.nmls_certificate_doc?.message}
        />

        <DocumentUpload
          label="State License"
          description="Your state mortgage license (optional)"
          documentType="state_license"
          value={stateLicenseDoc}
          onChange={(url) => setValue("state_license_doc", url)}
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
          <li>We&apos;ll verify your NMLS registration within 24-48 hours</li>
          <li>You&apos;ll receive an email when your profile is verified</li>
          <li>Once verified, you can help investors with financing options</li>
        </ul>
      </div>
    </div>
  );
}
