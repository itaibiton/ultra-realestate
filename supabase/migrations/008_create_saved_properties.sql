-- Migration: Create saved_properties table (Watchlist)
-- Allows users to save/bookmark properties for later review

CREATE TABLE IF NOT EXISTS public.saved_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign Keys
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,

  -- User Notes
  notes TEXT,

  -- Notification preferences
  notify_price_change BOOLEAN DEFAULT true,
  notify_status_change BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one save per user-property combination
  CONSTRAINT unique_user_property_save UNIQUE (user_id, property_id)
);

-- Create indexes
CREATE INDEX idx_saved_properties_user ON public.saved_properties(user_id);
CREATE INDEX idx_saved_properties_property ON public.saved_properties(property_id);
CREATE INDEX idx_saved_properties_created ON public.saved_properties(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only manage their own saved properties
CREATE POLICY "Users can view own saved properties" ON public.saved_properties
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save properties" ON public.saved_properties
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved properties" ON public.saved_properties
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can remove saved properties" ON public.saved_properties
  FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update property saves_count when saved/unsaved
CREATE OR REPLACE FUNCTION public.update_property_saves_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.properties
    SET saves_count = saves_count + 1
    WHERE id = NEW.property_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.properties
    SET saves_count = GREATEST(saves_count - 1, 0)
    WHERE id = OLD.property_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers to maintain saves_count
CREATE TRIGGER on_saved_property_insert
  AFTER INSERT ON public.saved_properties
  FOR EACH ROW EXECUTE FUNCTION public.update_property_saves_count();

CREATE TRIGGER on_saved_property_delete
  AFTER DELETE ON public.saved_properties
  FOR EACH ROW EXECUTE FUNCTION public.update_property_saves_count();
