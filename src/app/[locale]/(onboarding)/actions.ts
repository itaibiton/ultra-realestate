"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { InvestorProfileData } from "@/lib/onboarding/types";

/**
 * Save a single onboarding response
 */
export async function saveOnboardingResponse(
  questionId: string,
  value: string | string[],
  questionCategory?: string
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const responseData = {
    user_id: user.id,
    question_id: questionId,
    question_category: questionCategory,
    response_value: typeof value === "string" ? value : null,
    response_array: Array.isArray(value) ? value : null,
    response_metadata: {},
  };

  // Check if response already exists for this question
  const { data: existing } = await supabase
    .from("onboarding_responses")
    .select("id")
    .eq("user_id", user.id)
    .eq("question_id", questionId)
    .single();

  if (existing) {
    // Update existing response
    const { error } = await supabase
      .from("onboarding_responses")
      .update({
        response_value: responseData.response_value,
        response_array: responseData.response_array,
      })
      .eq("id", existing.id);

    if (error) {
      return { error: error.message };
    }
  } else {
    // Insert new response
    const { error } = await supabase
      .from("onboarding_responses")
      .insert(responseData);

    if (error) {
      return { error: error.message };
    }
  }

  return { success: true };
}

/**
 * Get current onboarding progress for a user
 */
export async function getOnboardingProgress() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Get investor profile
  const { data: profile } = await supabase
    .from("investor_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Get all responses
  const { data: responses } = await supabase
    .from("onboarding_responses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  return {
    profile,
    responses: responses || [],
    isComplete: profile?.profile_completed || false,
    currentStep: profile?.onboarding_step || 0,
  };
}

/**
 * Map MVP purpose to database investment_goal enum values
 */
function mapPurposeToInvestmentGoals(purpose: string): string[] {
  switch (purpose) {
    case 'investment':
      return ['capital_appreciation'];
    case 'living':
      return ['vacation_home'];
    case 'both':
      return ['capital_appreciation', 'vacation_home'];
    default:
      return ['capital_appreciation'];
  }
}

/**
 * Map MVP timeline to database investment_timeline enum values
 */
function mapTimelineToEnum(timeline: string): string {
  const mapping: Record<string, string> = {
    'asap': 'immediate',
    '3_6_months': 'within_6_months',
    '6_12_months': 'within_1_year',
    '1_year_plus': 'within_2_years',
  };
  return mapping[timeline] || 'flexible';
}

/**
 * Map MVP property types to database property_type enum values
 */
function mapPropertyTypesToEnum(types: string[]): string[] {
  const mapping: Record<string, string> = {
    'apartment': 'residential_apartment',
    'house': 'residential_house',
    'commercial': 'commercial_office',
    'land': 'land',
  };
  return types.map(t => mapping[t] || t);
}

/**
 * Complete the onboarding process and save the investor profile
 */
export async function completeOnboarding(profileData: InvestorProfileData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Map frontend data to database schema (MVP version)
  const dbProfile = {
    user_id: user.id,
    budget_min: profileData.budget,
    budget_max: profileData.budget,
    budget_currency: profileData.budgetCurrency,
    investment_goals: mapPurposeToInvestmentGoals(profileData.purpose),
    preferred_markets: profileData.preferredLocations,
    property_types: mapPropertyTypesToEnum(profileData.propertyTypes),
    investment_timeline: mapTimelineToEnum(profileData.timeline),
    experience_level: profileData.experienceLevel,
    monthly_income: profileData.monthlyIncome,
    monthly_expenses: profileData.monthlyExpenses,
    profile_completed: true,
    onboarding_step: 7,
  };

  // Check if profile exists
  const { data: existing } = await supabase
    .from("investor_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existing) {
    // Update existing profile
    const { error } = await supabase
      .from("investor_profiles")
      .update(dbProfile)
      .eq("id", existing.id);

    if (error) {
      return { error: error.message };
    }
  } else {
    // Insert new profile
    const { error } = await supabase.from("investor_profiles").insert(dbProfile);

    if (error) {
      return { error: error.message };
    }
  }

  // Update or create user journey
  const { data: existingJourney } = await supabase
    .from("user_journeys")
    .select("id")
    .eq("user_id", user.id)
    .single();

  const journeyData = {
    user_id: user.id,
    status: "researching" as const,
    current_step: "profile_completed",
    progress_percentage: 100,
    completed_at: new Date().toISOString(),
  };

  if (existingJourney) {
    await supabase
      .from("user_journeys")
      .update(journeyData)
      .eq("id", existingJourney.id);
  } else {
    await supabase.from("user_journeys").insert(journeyData);
  }

  revalidatePath("/dashboard");
  return { success: true };
}

/**
 * Skip onboarding and go directly to dashboard
 */
export async function skipOnboarding() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Create a minimal profile marked as incomplete
  const { data: existing } = await supabase
    .from("investor_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!existing) {
    await supabase.from("investor_profiles").insert({
      user_id: user.id,
      profile_completed: false,
      onboarding_step: 0,
    });
  }

  // Create user journey in onboarding status
  const { data: existingJourney } = await supabase
    .from("user_journeys")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!existingJourney) {
    await supabase.from("user_journeys").insert({
      user_id: user.id,
      status: "onboarding" as const,
      current_step: "skipped",
      progress_percentage: 0,
    });
  }

  return { success: true };
}

/**
 * Update onboarding step progress
 */
export async function updateOnboardingStep(step: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Check if profile exists
  const { data: existing } = await supabase
    .from("investor_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existing) {
    await supabase
      .from("investor_profiles")
      .update({ onboarding_step: step })
      .eq("id", existing.id);
  } else {
    await supabase.from("investor_profiles").insert({
      user_id: user.id,
      onboarding_step: step,
      profile_completed: false,
    });
  }

  return { success: true };
}
