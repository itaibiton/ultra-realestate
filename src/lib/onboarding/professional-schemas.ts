/**
 * Professional Onboarding Zod Schemas
 * Validation schemas for broker, lawyer, and mortgage advisor forms
 */

import { z } from "zod";
import {
  BROKER_SPECIALIZATIONS,
  LAWYER_PRACTICE_AREAS,
  LOAN_TYPES,
  US_STATES,
  VALIDATION_PATTERNS,
} from "./professional-constants";

// ============================================
// Helper Schemas
// ============================================

const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .regex(VALIDATION_PATTERNS.phone, "Invalid phone number format");

const urlSchema = z
  .string()
  .url("Invalid URL format")
  .optional()
  .or(z.literal(""));

const stateSchema = z.enum(
  US_STATES.map((s) => s.value) as [string, ...string[]],
  { message: "Please select a state" }
);

// ============================================
// Broker Schemas
// ============================================

export const brokerStep1Schema = z.object({
  license_number: z
    .string()
    .min(6, "License number must be at least 6 characters")
    .max(20, "License number cannot exceed 20 characters")
    .regex(
      VALIDATION_PATTERNS.license_number,
      "License number can only contain letters and numbers"
    ),
  license_state: stateSchema,
  license_expiry: z.string().optional(),
  brokerage_name: z.string().optional(),
});

export const brokerStep2Schema = z.object({
  years_experience: z
    .number()
    .min(1, "Experience must be at least 1 year")
    .max(50, "Please enter a valid number of years"),
  specializations: z
    .array(
      z.enum(
        BROKER_SPECIALIZATIONS.map((s) => s.value) as [string, ...string[]]
      )
    )
    .min(1, "Select at least one specialization"),
  contact_phone: phoneSchema,
  contact_email: z.string().email("Invalid email address"),
  brokerage_address: z.string().optional(),
  website_url: urlSchema,
  bio: z.string().max(1000, "Bio cannot exceed 1000 characters").optional(),
  headline: z.string().max(100, "Headline cannot exceed 100 characters").optional(),
  languages: z.array(z.string()).optional(),
  service_areas: z.array(z.string()).optional(),
});

export const brokerStep3Schema = z.object({
  license_doc: z
    .string()
    .min(1, "License document is required"),
  insurance_doc: z.string().optional(),
  id_doc: z.string().optional(),
});

export const brokerFullSchema = brokerStep1Schema
  .merge(brokerStep2Schema)
  .merge(brokerStep3Schema);

export type BrokerStep1Data = z.infer<typeof brokerStep1Schema>;
export type BrokerStep2Data = z.infer<typeof brokerStep2Schema>;
export type BrokerStep3Data = z.infer<typeof brokerStep3Schema>;
export type BrokerFullData = z.infer<typeof brokerFullSchema>;

// ============================================
// Lawyer Schemas
// ============================================

export const lawyerStep1Schema = z.object({
  bar_number: z
    .string()
    .min(4, "Bar number must be at least 4 characters")
    .max(15, "Bar number cannot exceed 15 characters")
    .regex(
      VALIDATION_PATTERNS.bar_number,
      "Bar number can only contain letters and numbers"
    ),
  bar_state: stateSchema,
  bar_admission_date: z.string().optional(),
  law_firm_name: z.string().optional(),
});

export const lawyerStep2Schema = z.object({
  years_experience: z
    .number()
    .min(1, "Experience must be at least 1 year")
    .max(50, "Please enter a valid number of years"),
  practice_areas: z
    .array(
      z.enum(
        LAWYER_PRACTICE_AREAS.map((p) => p.value) as [string, ...string[]]
      )
    )
    .min(1, "Select at least one practice area"),
  contact_phone: phoneSchema,
  contact_email: z.string().email("Invalid email address"),
  hourly_rate: z.number().min(0).optional(),
  consultation_fee: z.number().min(0).optional(),
  offers_free_consultation: z.boolean().optional(),
  firm_address: z.string().optional(),
  website_url: urlSchema,
  bio: z.string().max(1000, "Bio cannot exceed 1000 characters").optional(),
  headline: z.string().max(100, "Headline cannot exceed 100 characters").optional(),
  languages: z.array(z.string()).optional(),
  service_areas: z.array(z.string()).optional(),
});

export const lawyerStep3Schema = z.object({
  bar_certificate_doc: z
    .string()
    .min(1, "Bar certificate is required"),
  insurance_doc: z.string().optional(),
  id_doc: z.string().optional(),
});

export const lawyerFullSchema = lawyerStep1Schema
  .merge(lawyerStep2Schema)
  .merge(lawyerStep3Schema);

export type LawyerStep1Data = z.infer<typeof lawyerStep1Schema>;
export type LawyerStep2Data = z.infer<typeof lawyerStep2Schema>;
export type LawyerStep3Data = z.infer<typeof lawyerStep3Schema>;
export type LawyerFullData = z.infer<typeof lawyerFullSchema>;

// ============================================
// Mortgage Advisor Schemas
// ============================================

export const mortgageAdvisorStep1Schema = z.object({
  nmls_id: z
    .string()
    .min(5, "NMLS ID must be at least 5 digits")
    .max(10, "NMLS ID cannot exceed 10 digits")
    .regex(VALIDATION_PATTERNS.nmls_id, "NMLS ID must be numeric"),
  license_states: z
    .array(stateSchema)
    .min(1, "Select at least one licensed state"),
  company_name: z.string().optional(),
  company_nmls_id: z.string().optional(),
});

export const mortgageAdvisorStep2Schema = z.object({
  years_experience: z
    .number()
    .min(1, "Experience must be at least 1 year")
    .max(50, "Please enter a valid number of years"),
  loan_types: z
    .array(
      z.enum(LOAN_TYPES.map((l) => l.value) as [string, ...string[]])
    )
    .min(1, "Select at least one loan type"),
  contact_phone: phoneSchema,
  contact_email: z.string().email("Invalid email address"),
  company_address: z.string().optional(),
  website_url: urlSchema,
  bio: z.string().max(1000, "Bio cannot exceed 1000 characters").optional(),
  headline: z.string().max(100, "Headline cannot exceed 100 characters").optional(),
  languages: z.array(z.string()).optional(),
  service_areas: z.array(z.string()).optional(),
});

export const mortgageAdvisorStep3Schema = z.object({
  nmls_certificate_doc: z
    .string()
    .min(1, "NMLS certificate is required"),
  state_license_doc: z.string().optional(),
  id_doc: z.string().optional(),
});

export const mortgageAdvisorFullSchema = mortgageAdvisorStep1Schema
  .merge(mortgageAdvisorStep2Schema)
  .merge(mortgageAdvisorStep3Schema);

export type MortgageAdvisorStep1Data = z.infer<typeof mortgageAdvisorStep1Schema>;
export type MortgageAdvisorStep2Data = z.infer<typeof mortgageAdvisorStep2Schema>;
export type MortgageAdvisorStep3Data = z.infer<typeof mortgageAdvisorStep3Schema>;
export type MortgageAdvisorFullData = z.infer<typeof mortgageAdvisorFullSchema>;
