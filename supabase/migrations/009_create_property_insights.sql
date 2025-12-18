-- Migration: Create property_insights table
-- Caches AI-generated insights for properties to avoid regenerating

-- Create insight type enum
CREATE TYPE insight_type AS ENUM (
  'analysis',         -- Overall property analysis
  'neighborhood',     -- Neighborhood information
  'legal',           -- Legal checklist and requirements
  'investment',      -- Investment projection and ROI analysis
  'comparison',      -- Market comparison
  'risks'            -- Risk assessment
);

CREATE TABLE IF NOT EXISTS public.property_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign Key
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,

  -- Insight Details
  insight_type insight_type NOT NULL,
  content JSONB NOT NULL,
  -- Example content structure:
  -- {
  --   "summary": "Brief summary text",
  --   "highlights": ["point 1", "point 2"],
  --   "details": {...},
  --   "score": 85,
  --   "recommendations": [...]
  -- }

  -- Localization
  locale TEXT DEFAULT 'en', -- 'en', 'he'

  -- Versioning and freshness
  version INTEGER DEFAULT 1,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,

  -- Generation metadata
  model_used TEXT, -- e.g., 'claude-3-opus', 'gpt-4'
  generation_time_ms INTEGER,

  -- Ensure one insight per property-type-locale combination
  CONSTRAINT unique_property_insight UNIQUE (property_id, insight_type, locale)
);

-- Create indexes
CREATE INDEX idx_insights_property ON public.property_insights(property_id);
CREATE INDEX idx_insights_type ON public.property_insights(insight_type);
CREATE INDEX idx_insights_locale ON public.property_insights(locale);
CREATE INDEX idx_insights_expires ON public.property_insights(expires_at) WHERE expires_at IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE public.property_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Insights are readable by authenticated users
CREATE POLICY "Authenticated users can view insights" ON public.property_insights
  FOR SELECT
  TO authenticated
  USING (true);

-- Only system can insert/update insights (via service role)
CREATE POLICY "System can manage insights" ON public.property_insights
  FOR ALL
  TO service_role
  USING (true);

-- Function to check if insight is expired
CREATE OR REPLACE FUNCTION public.is_insight_valid(insight_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  expiry TIMESTAMPTZ;
BEGIN
  SELECT expires_at INTO expiry
  FROM public.property_insights
  WHERE id = insight_id;

  IF expiry IS NULL THEN
    RETURN true;
  END IF;

  RETURN expiry > NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to get or mark insight as needing regeneration
CREATE OR REPLACE FUNCTION public.get_valid_insight(
  p_property_id UUID,
  p_insight_type insight_type,
  p_locale TEXT DEFAULT 'en'
)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
  expiry TIMESTAMPTZ;
BEGIN
  SELECT content, expires_at INTO result, expiry
  FROM public.property_insights
  WHERE property_id = p_property_id
    AND insight_type = p_insight_type
    AND locale = p_locale;

  IF result IS NULL THEN
    RETURN NULL;
  END IF;

  IF expiry IS NOT NULL AND expiry <= NOW() THEN
    RETURN NULL; -- Insight expired, needs regeneration
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql;
