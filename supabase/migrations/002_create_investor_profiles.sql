-- Migration: Create investor_profiles table for onboarding
-- Part of the Investor Onboarding Epic

-- Create enum types for investor profile fields
CREATE TYPE investment_goal AS ENUM (
  'capital_appreciation',
  'rental_income',
  'portfolio_diversification',
  'retirement_planning',
  'tax_benefits',
  'vacation_home',
  'relocation'
);

CREATE TYPE property_type AS ENUM (
  'residential_apartment',
  'residential_house',
  'commercial_office',
  'commercial_retail',
  'industrial',
  'land',
  'mixed_use'
);

CREATE TYPE risk_tolerance AS ENUM (
  'conservative',
  'moderate',
  'aggressive'
);

CREATE TYPE investment_timeline AS ENUM (
  'immediate',
  'within_6_months',
  'within_1_year',
  'within_2_years',
  'flexible'
);

CREATE TYPE experience_level AS ENUM (
  'first_time',
  'some_experience',
  'experienced',
  'professional'
);

CREATE TYPE working_style AS ENUM (
  'self_directed',
  'guided',
  'full_service'
);

-- Create investor_profiles table
CREATE TABLE IF NOT EXISTS public.investor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Investment preferences
  investment_goals investment_goal[] DEFAULT '{}',
  budget_min NUMERIC(15, 2),
  budget_max NUMERIC(15, 2),
  budget_currency TEXT DEFAULT 'USD',
  preferred_markets TEXT[] DEFAULT '{}',
  property_types property_type[] DEFAULT '{}',

  -- Risk and timeline
  risk_tolerance risk_tolerance,
  investment_timeline investment_timeline,

  -- Experience and background
  experience_level experience_level,
  citizenship TEXT,
  current_country TEXT,

  -- Working preferences
  working_style working_style,

  -- Profile completion tracking
  profile_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one profile per user
  CONSTRAINT unique_user_profile UNIQUE (user_id)
);

-- Create index for faster lookups
CREATE INDEX idx_investor_profiles_user_id ON public.investor_profiles(user_id);
CREATE INDEX idx_investor_profiles_completed ON public.investor_profiles(profile_completed);

-- Enable Row Level Security
ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own investor profile" ON public.investor_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own investor profile" ON public.investor_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own investor profile" ON public.investor_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own investor profile" ON public.investor_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER on_investor_profiles_updated
  BEFORE UPDATE ON public.investor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
