-- Migration: Create user roles and professional profiles
-- Part of Epic 1: User Roles & Authentication System

-- ============================================
-- STEP 1: Create enum types
-- ============================================

-- User role enum
CREATE TYPE user_role AS ENUM (
  'investor',
  'broker',
  'lawyer',
  'mortgage_advisor'
);

-- Verification status enum
CREATE TYPE verification_status AS ENUM (
  'pending',
  'under_review',
  'verified',
  'rejected'
);

-- Specialization enums for each professional type
CREATE TYPE broker_specialization AS ENUM (
  'residential',
  'commercial',
  'luxury',
  'investment',
  'international',
  'new_development',
  'land',
  'vacation_rentals'
);

CREATE TYPE lawyer_practice_area AS ENUM (
  'real_estate_transactions',
  'contracts',
  'title_review',
  'litigation',
  'corporate',
  'tax',
  'zoning',
  'landlord_tenant'
);

CREATE TYPE loan_type AS ENUM (
  'conventional',
  'fha',
  'va',
  'jumbo',
  'arm',
  'fixed',
  'investment_property',
  'refinance'
);

-- ============================================
-- STEP 2: Add role column to users table
-- ============================================

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'investor';

-- Add index for role queries
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- ============================================
-- STEP 3: Create broker_profiles table
-- ============================================

CREATE TABLE IF NOT EXISTS public.broker_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- License information
  license_number TEXT,
  license_state TEXT,
  license_expiry DATE,

  -- Brokerage information
  brokerage_name TEXT,
  brokerage_address TEXT,

  -- Professional details
  years_experience INTEGER DEFAULT 0,
  specializations broker_specialization[] DEFAULT '{}',
  service_areas TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT ARRAY['English'],

  -- Profile content
  bio TEXT,
  headline TEXT,
  website_url TEXT,

  -- Verification
  verification_status verification_status DEFAULT 'pending',
  verification_documents JSONB DEFAULT '[]',
  verified_at TIMESTAMPTZ,

  -- Profile metrics
  profile_completion_percentage INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Contact preferences
  contact_email TEXT,
  contact_phone TEXT,
  preferred_contact_method TEXT DEFAULT 'email',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT unique_broker_user UNIQUE (user_id)
);

-- Indexes for broker_profiles
CREATE INDEX idx_broker_profiles_user_id ON public.broker_profiles(user_id);
CREATE INDEX idx_broker_profiles_verification ON public.broker_profiles(verification_status);
CREATE INDEX idx_broker_profiles_featured ON public.broker_profiles(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_broker_profiles_license_state ON public.broker_profiles(license_state);

-- ============================================
-- STEP 4: Create lawyer_profiles table
-- ============================================

CREATE TABLE IF NOT EXISTS public.lawyer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Bar information
  bar_number TEXT,
  bar_state TEXT,
  bar_admission_date DATE,

  -- Firm information
  law_firm_name TEXT,
  firm_address TEXT,
  firm_size TEXT, -- 'solo', 'small', 'medium', 'large'

  -- Professional details
  years_experience INTEGER DEFAULT 0,
  practice_areas lawyer_practice_area[] DEFAULT '{}',
  service_areas TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT ARRAY['English'],

  -- Profile content
  bio TEXT,
  headline TEXT,
  website_url TEXT,

  -- Pricing
  hourly_rate NUMERIC(10, 2),
  consultation_fee NUMERIC(10, 2),
  offers_free_consultation BOOLEAN DEFAULT FALSE,

  -- Verification
  verification_status verification_status DEFAULT 'pending',
  verification_documents JSONB DEFAULT '[]',
  verified_at TIMESTAMPTZ,

  -- Profile metrics
  profile_completion_percentage INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Contact preferences
  contact_email TEXT,
  contact_phone TEXT,
  preferred_contact_method TEXT DEFAULT 'email',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT unique_lawyer_user UNIQUE (user_id)
);

-- Indexes for lawyer_profiles
CREATE INDEX idx_lawyer_profiles_user_id ON public.lawyer_profiles(user_id);
CREATE INDEX idx_lawyer_profiles_verification ON public.lawyer_profiles(verification_status);
CREATE INDEX idx_lawyer_profiles_featured ON public.lawyer_profiles(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_lawyer_profiles_bar_state ON public.lawyer_profiles(bar_state);

-- ============================================
-- STEP 5: Create mortgage_advisor_profiles table
-- ============================================

CREATE TABLE IF NOT EXISTS public.mortgage_advisor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- NMLS information
  nmls_id TEXT,
  license_states TEXT[] DEFAULT '{}',

  -- Company information
  company_name TEXT,
  company_address TEXT,
  company_nmls_id TEXT,

  -- Professional details
  years_experience INTEGER DEFAULT 0,
  loan_types loan_type[] DEFAULT '{}',
  service_areas TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT ARRAY['English'],

  -- Profile content
  bio TEXT,
  headline TEXT,
  website_url TEXT,

  -- Performance metrics
  avg_closing_time_days INTEGER,
  total_loans_closed INTEGER DEFAULT 0,
  total_loan_volume NUMERIC(15, 2) DEFAULT 0,

  -- Verification
  verification_status verification_status DEFAULT 'pending',
  verification_documents JSONB DEFAULT '[]',
  verified_at TIMESTAMPTZ,

  -- Profile metrics
  profile_completion_percentage INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Contact preferences
  contact_email TEXT,
  contact_phone TEXT,
  preferred_contact_method TEXT DEFAULT 'email',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT unique_mortgage_advisor_user UNIQUE (user_id)
);

-- Indexes for mortgage_advisor_profiles
CREATE INDEX idx_mortgage_advisor_profiles_user_id ON public.mortgage_advisor_profiles(user_id);
CREATE INDEX idx_mortgage_advisor_profiles_verification ON public.mortgage_advisor_profiles(verification_status);
CREATE INDEX idx_mortgage_advisor_profiles_featured ON public.mortgage_advisor_profiles(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_mortgage_advisor_profiles_nmls ON public.mortgage_advisor_profiles(nmls_id);

-- ============================================
-- STEP 6: Enable Row Level Security
-- ============================================

ALTER TABLE public.broker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lawyer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mortgage_advisor_profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 7: Create RLS policies for broker_profiles
-- ============================================

-- Anyone can view verified broker profiles
CREATE POLICY "Anyone can view verified broker profiles" ON public.broker_profiles
  FOR SELECT USING (verification_status = 'verified');

-- Brokers can view their own profile regardless of status
CREATE POLICY "Brokers can view own profile" ON public.broker_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Brokers can insert their own profile
CREATE POLICY "Brokers can insert own profile" ON public.broker_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Brokers can update their own profile
CREATE POLICY "Brokers can update own profile" ON public.broker_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Brokers can delete their own profile
CREATE POLICY "Brokers can delete own profile" ON public.broker_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- STEP 8: Create RLS policies for lawyer_profiles
-- ============================================

-- Anyone can view verified lawyer profiles
CREATE POLICY "Anyone can view verified lawyer profiles" ON public.lawyer_profiles
  FOR SELECT USING (verification_status = 'verified');

-- Lawyers can view their own profile regardless of status
CREATE POLICY "Lawyers can view own profile" ON public.lawyer_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Lawyers can insert their own profile
CREATE POLICY "Lawyers can insert own profile" ON public.lawyer_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Lawyers can update their own profile
CREATE POLICY "Lawyers can update own profile" ON public.lawyer_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Lawyers can delete their own profile
CREATE POLICY "Lawyers can delete own profile" ON public.lawyer_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- STEP 9: Create RLS policies for mortgage_advisor_profiles
-- ============================================

-- Anyone can view verified mortgage advisor profiles
CREATE POLICY "Anyone can view verified mortgage_advisor profiles" ON public.mortgage_advisor_profiles
  FOR SELECT USING (verification_status = 'verified');

-- Mortgage advisors can view their own profile regardless of status
CREATE POLICY "Mortgage advisors can view own profile" ON public.mortgage_advisor_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Mortgage advisors can insert their own profile
CREATE POLICY "Mortgage advisors can insert own profile" ON public.mortgage_advisor_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Mortgage advisors can update their own profile
CREATE POLICY "Mortgage advisors can update own profile" ON public.mortgage_advisor_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Mortgage advisors can delete their own profile
CREATE POLICY "Mortgage advisors can delete own profile" ON public.mortgage_advisor_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- STEP 10: Create triggers for updated_at
-- ============================================

CREATE TRIGGER on_broker_profiles_updated
  BEFORE UPDATE ON public.broker_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_lawyer_profiles_updated
  BEFORE UPDATE ON public.lawyer_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_mortgage_advisor_profiles_updated
  BEFORE UPDATE ON public.mortgage_advisor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- STEP 11: Create helper function to get professional profile
-- ============================================

CREATE OR REPLACE FUNCTION public.get_professional_profile(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_role user_role;
  v_profile JSONB;
BEGIN
  -- Get user role
  SELECT role INTO v_role FROM public.users WHERE id = p_user_id;

  -- Return profile based on role
  CASE v_role
    WHEN 'broker' THEN
      SELECT to_jsonb(bp.*) INTO v_profile
      FROM public.broker_profiles bp
      WHERE bp.user_id = p_user_id;
    WHEN 'lawyer' THEN
      SELECT to_jsonb(lp.*) INTO v_profile
      FROM public.lawyer_profiles lp
      WHERE lp.user_id = p_user_id;
    WHEN 'mortgage_advisor' THEN
      SELECT to_jsonb(map.*) INTO v_profile
      FROM public.mortgage_advisor_profiles map
      WHERE map.user_id = p_user_id;
    ELSE
      SELECT to_jsonb(ip.*) INTO v_profile
      FROM public.investor_profiles ip
      WHERE ip.user_id = p_user_id;
  END CASE;

  RETURN COALESCE(v_profile, '{}'::JSONB);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STEP 12: Update handle_new_user function to include role
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_role user_role;
BEGIN
  -- Get role from metadata, default to investor
  v_role := COALESCE(
    (NEW.raw_user_meta_data->>'role')::user_role,
    'investor'
  );

  -- Insert user with role
  INSERT INTO public.users (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    v_role
  );

  -- Create appropriate profile based on role
  CASE v_role
    WHEN 'investor' THEN
      INSERT INTO public.investor_profiles (user_id) VALUES (NEW.id);
    WHEN 'broker' THEN
      INSERT INTO public.broker_profiles (user_id) VALUES (NEW.id);
    WHEN 'lawyer' THEN
      INSERT INTO public.lawyer_profiles (user_id) VALUES (NEW.id);
    WHEN 'mortgage_advisor' THEN
      INSERT INTO public.mortgage_advisor_profiles (user_id) VALUES (NEW.id);
  END CASE;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
