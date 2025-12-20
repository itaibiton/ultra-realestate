"use client";

import { UseFormReturn } from "react-hook-form";
import { DocumentUpload } from "../document-upload";
import type { LawyerFullData } from "@/lib/onboarding/professional-schemas";

interface LawyerStep3Props {
  form: UseFormReturn<LawyerFullData>;
}

export function LawyerStep3Documents({ form }: LawyerStep3Props) {
  const {
    formState: { errors },
    setValue,
    watch,
  } = form;

  const barCertificateDoc = watch("bar_certificate_doc");
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
          label="Bar Certificate"
          description="Upload a copy of your bar admission certificate"
          documentType="bar_certificate"
          value={barCertificateDoc}
          onChange={(url) => setValue("bar_certificate_doc", url || "")}
          required
          error={errors.bar_certificate_doc?.message}
        />

        <DocumentUpload
          label="Malpractice Insurance"
          description="Professional liability insurance certificate (optional)"
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
          <li>Our team will verify your bar membership within 24-48 hours</li>
          <li>You&apos;ll receive an email when your profile is verified</li>
          <li>Once verified, you can connect with investors seeking legal help</li>
        </ul>
      </div>
    </div>
  );
}
