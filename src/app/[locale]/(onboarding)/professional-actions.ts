"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type {
  BrokerProfileFormData,
  LawyerProfileFormData,
  MortgageAdvisorProfileFormData,
} from "@/types";

/**
 * Save broker profile data
 */
export async function saveBrokerProfile(data: BrokerProfileFormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Check if profile exists
  const { data: existing } = await supabase
    .from("broker_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  const profileData = {
    user_id: user.id,
    license_number: data.license_number,
    license_state: data.license_state,
    license_expiry: data.license_expiry || null,
    brokerage_name: data.brokerage_name || null,
    brokerage_address: data.brokerage_address || null,
    years_experience: data.years_experience,
    specializations: data.specializations,
    service_areas: data.service_areas || [],
    languages: data.languages || [],
    bio: data.bio || null,
    headline: data.headline || null,
    website_url: data.website_url || null,
    contact_email: data.contact_email,
    contact_phone: data.contact_phone,
    verification_status: "pending" as const,
    profile_completed: true,
  };

  if (existing) {
    const { error } = await supabase
      .from("broker_profiles")
      .update(profileData)
      .eq("id", existing.id);

    if (error) {
      console.error("Update broker profile error:", error);
      return { error: error.message };
    }
  } else {
    const { error } = await supabase.from("broker_profiles").insert(profileData);

    if (error) {
      console.error("Insert broker profile error:", error);
      return { error: error.message };
    }
  }

  revalidatePath("/dashboard/broker");
  return { success: true };
}

/**
 * Save lawyer profile data
 */
export async function saveLawyerProfile(data: LawyerProfileFormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Check if profile exists
  const { data: existing } = await supabase
    .from("lawyer_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  const profileData = {
    user_id: user.id,
    bar_number: data.bar_number,
    bar_state: data.bar_state,
    bar_admission_date: data.bar_admission_date || null,
    law_firm_name: data.law_firm_name || null,
    firm_address: data.firm_address || null,
    years_experience: data.years_experience,
    practice_areas: data.practice_areas,
    service_areas: data.service_areas || [],
    languages: data.languages || [],
    bio: data.bio || null,
    headline: data.headline || null,
    website_url: data.website_url || null,
    hourly_rate: data.hourly_rate || null,
    consultation_fee: data.consultation_fee || null,
    offers_free_consultation: data.offers_free_consultation || false,
    contact_email: data.contact_email,
    contact_phone: data.contact_phone,
    verification_status: "pending" as const,
    profile_completed: true,
  };

  if (existing) {
    const { error } = await supabase
      .from("lawyer_profiles")
      .update(profileData)
      .eq("id", existing.id);

    if (error) {
      console.error("Update lawyer profile error:", error);
      return { error: error.message };
    }
  } else {
    const { error } = await supabase.from("lawyer_profiles").insert(profileData);

    if (error) {
      console.error("Insert lawyer profile error:", error);
      return { error: error.message };
    }
  }

  revalidatePath("/dashboard/lawyer");
  return { success: true };
}

/**
 * Save mortgage advisor profile data
 */
export async function saveMortgageAdvisorProfile(
  data: MortgageAdvisorProfileFormData
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Check if profile exists
  const { data: existing } = await supabase
    .from("mortgage_advisor_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  const profileData = {
    user_id: user.id,
    nmls_id: data.nmls_id,
    license_states: data.license_states,
    company_name: data.company_name || null,
    company_address: data.company_address || null,
    company_nmls_id: data.company_nmls_id || null,
    years_experience: data.years_experience,
    loan_types: data.loan_types,
    service_areas: data.service_areas || [],
    languages: data.languages || [],
    bio: data.bio || null,
    headline: data.headline || null,
    website_url: data.website_url || null,
    contact_email: data.contact_email,
    contact_phone: data.contact_phone,
    verification_status: "pending" as const,
    profile_completed: true,
  };

  if (existing) {
    const { error } = await supabase
      .from("mortgage_advisor_profiles")
      .update(profileData)
      .eq("id", existing.id);

    if (error) {
      console.error("Update mortgage advisor profile error:", error);
      return { error: error.message };
    }
  } else {
    const { error } = await supabase
      .from("mortgage_advisor_profiles")
      .insert(profileData);

    if (error) {
      console.error("Insert mortgage advisor profile error:", error);
      return { error: error.message };
    }
  }

  revalidatePath("/dashboard/mortgage");
  return { success: true };
}

/**
 * Get professional profile status
 */
export async function getProfessionalProfileStatus() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Get user role
  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!userData?.role) {
    return { error: "User role not found" };
  }

  const role = userData.role;

  // Get profile based on role
  let profile = null;
  let isComplete = false;

  if (role === "broker") {
    const { data } = await supabase
      .from("broker_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    profile = data;
    isComplete = data?.profile_completed || false;
  } else if (role === "lawyer") {
    const { data } = await supabase
      .from("lawyer_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    profile = data;
    isComplete = data?.profile_completed || false;
  } else if (role === "mortgage_advisor") {
    const { data } = await supabase
      .from("mortgage_advisor_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    profile = data;
    isComplete = data?.profile_completed || false;
  }

  return {
    role,
    profile,
    isComplete,
    verificationStatus: profile?.verification_status || null,
  };
}
