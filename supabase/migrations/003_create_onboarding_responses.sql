-- Migration: Create onboarding_responses table for tracking individual responses
-- Part of the Investor Onboarding Epic

-- Create onboarding_responses table
CREATE TABLE IF NOT EXISTS public.onboarding_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Question identification
  question_id TEXT NOT NULL,
  question_category TEXT,

  -- Response data
  response_value TEXT,
  response_array TEXT[],
  response_metadata JSONB DEFAULT '{}',

  -- Tracking
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX idx_onboarding_responses_user_id ON public.onboarding_responses(user_id);
CREATE INDEX idx_onboarding_responses_question_id ON public.onboarding_responses(question_id);
CREATE INDEX idx_onboarding_responses_created_at ON public.onboarding_responses(created_at);

-- Enable Row Level Security
ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own onboarding responses" ON public.onboarding_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own onboarding responses" ON public.onboarding_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding responses" ON public.onboarding_responses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own onboarding responses" ON public.onboarding_responses
  FOR DELETE USING (auth.uid() = user_id);
