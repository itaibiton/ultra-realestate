-- Migration: Create user_journeys table for tracking investment journey status
-- Part of the Investor Onboarding Epic

-- Create enum for journey status
CREATE TYPE journey_status AS ENUM (
  'onboarding',
  'researching',
  'viewing',
  'offer',
  'due_diligence',
  'closing',
  'completed',
  'paused'
);

-- Create user_journeys table
CREATE TABLE IF NOT EXISTS public.user_journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Journey status
  status journey_status DEFAULT 'onboarding',
  current_step TEXT,
  progress_percentage INTEGER DEFAULT 0,

  -- Timeline
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- Metadata for additional tracking
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one active journey per user
  CONSTRAINT unique_user_journey UNIQUE (user_id)
);

-- Create indexes
CREATE INDEX idx_user_journeys_user_id ON public.user_journeys(user_id);
CREATE INDEX idx_user_journeys_status ON public.user_journeys(status);

-- Enable Row Level Security
ALTER TABLE public.user_journeys ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own journey" ON public.user_journeys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journey" ON public.user_journeys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journey" ON public.user_journeys
  FOR UPDATE USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER on_user_journeys_updated
  BEFORE UPDATE ON public.user_journeys
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
