-- Migration: Add new fields for enhanced investor onboarding
-- Adds special requirements, contact preference, and other enhancements

-- Create contact preference enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contact_preference') THEN
    CREATE TYPE contact_preference AS ENUM (
      'email',
      'whatsapp',
      'phone'
    );
  END IF;
END $$;

-- Add new columns to investor_profiles
ALTER TABLE public.investor_profiles
  ADD COLUMN IF NOT EXISTS special_requirements TEXT,
  ADD COLUMN IF NOT EXISTS preferred_contact contact_preference DEFAULT 'email';

-- Add comment for documentation
COMMENT ON COLUMN public.investor_profiles.special_requirements IS 'Free text field for special requirements or preferences';
COMMENT ON COLUMN public.investor_profiles.preferred_contact IS 'User preferred contact method';

-- Create index for filtering by contact preference
CREATE INDEX IF NOT EXISTS idx_investor_profiles_contact
  ON public.investor_profiles(preferred_contact);
