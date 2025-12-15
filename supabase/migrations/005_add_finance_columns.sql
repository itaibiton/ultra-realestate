-- Migration: Add monthly finance columns to investor_profiles
-- This adds columns for tracking user's monthly income and expenses

ALTER TABLE investor_profiles
ADD COLUMN IF NOT EXISTS monthly_income numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS monthly_expenses numeric DEFAULT 0;

-- Add comments for documentation
COMMENT ON COLUMN investor_profiles.monthly_income IS 'Monthly income in budget currency';
COMMENT ON COLUMN investor_profiles.monthly_expenses IS 'Monthly expenses in budget currency';
