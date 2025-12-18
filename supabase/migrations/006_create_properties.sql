-- Migration: Create properties table for marketplace
-- Part of the Property Marketplace Epic

-- Create property status enum
CREATE TYPE property_status AS ENUM (
  'draft',
  'active',
  'pending',
  'sold',
  'archived'
);

-- Create listing type enum
CREATE TYPE listing_type AS ENUM (
  'sale',
  'rent',
  'both'
);

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,

  -- Location
  country_code TEXT NOT NULL, -- ISO 3166-1 alpha-2 (e.g., 'US', 'IL')
  state TEXT,
  city TEXT NOT NULL,
  address TEXT,
  zip_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  neighborhood TEXT,

  -- Pricing
  price NUMERIC(15, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  price_per_sqm NUMERIC(10, 2),

  -- Property Details (using existing property_type enum)
  property_type property_type NOT NULL,
  bedrooms INTEGER,
  bathrooms DECIMAL(3, 1),
  area_sqm NUMERIC(10, 2),
  lot_size_sqm NUMERIC(10, 2),
  year_built INTEGER,
  floors INTEGER,
  parking_spaces INTEGER,

  -- Media
  images TEXT[] DEFAULT '{}',
  video_url TEXT,
  virtual_tour_url TEXT,

  -- Features & Amenities (stored as arrays for flexibility)
  features TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',

  -- Investment Metrics
  rental_yield DECIMAL(5, 2),
  estimated_monthly_rent NUMERIC(10, 2),
  hoa_fees NUMERIC(10, 2),
  property_tax_annual NUMERIC(10, 2),

  -- Status & Listing Type
  status property_status DEFAULT 'active',
  listing_type listing_type DEFAULT 'sale',

  -- Agent/Source
  agent_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  source TEXT, -- 'agent', 'api', 'manual'
  external_id TEXT,

  -- Engagement Metrics
  views_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for search performance
CREATE INDEX idx_properties_country ON public.properties(country_code);
CREATE INDEX idx_properties_city ON public.properties(city);
CREATE INDEX idx_properties_price ON public.properties(price);
CREATE INDEX idx_properties_type ON public.properties(property_type);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_agent ON public.properties(agent_id);
CREATE INDEX idx_properties_slug ON public.properties(slug);
CREATE INDEX idx_properties_featured ON public.properties(is_featured) WHERE is_featured = true;
CREATE INDEX idx_properties_created ON public.properties(created_at DESC);

-- Full text search index
CREATE INDEX idx_properties_search ON public.properties
  USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || city || ' ' || COALESCE(neighborhood, '')));

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view active properties
CREATE POLICY "Anyone can view active properties" ON public.properties
  FOR SELECT
  USING (status = 'active');

-- Authenticated users can view all properties (for agents dashboard)
CREATE POLICY "Authenticated users can view all properties" ON public.properties
  FOR SELECT
  TO authenticated
  USING (true);

-- Agents can insert new properties
CREATE POLICY "Agents can insert properties" ON public.properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = agent_id);

-- Agents can update their own properties
CREATE POLICY "Agents can update own properties" ON public.properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = agent_id);

-- Agents can delete their own properties
CREATE POLICY "Agents can delete own properties" ON public.properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = agent_id);

-- Create trigger for updated_at
CREATE TRIGGER on_properties_updated
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION public.generate_property_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(NEW.id::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug
CREATE TRIGGER on_properties_before_insert
  BEFORE INSERT ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.generate_property_slug();
