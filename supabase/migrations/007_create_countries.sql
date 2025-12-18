-- Migration: Create countries table for marketplace
-- Stores country-specific information for real estate investment

CREATE TABLE IF NOT EXISTS public.countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Info
  code TEXT UNIQUE NOT NULL, -- ISO 3166-1 alpha-2 (e.g., 'US', 'IL')
  name TEXT NOT NULL,
  name_he TEXT, -- Hebrew name
  flag_emoji TEXT,

  -- Market Overview (JSONB for flexibility)
  market_overview JSONB DEFAULT '{}',
  -- Example: {avg_price_sqm, price_trend, rental_yield_avg, market_size, popular_cities}

  -- Legal & Ownership Information
  ownership_rules JSONB DEFAULT '{}',
  -- Example: {foreign_ownership: true, restrictions: [], visa_requirements: [], required_docs: []}

  -- Tax Information
  tax_info JSONB DEFAULT '{}',
  -- Example: {property_tax_rate, capital_gains_tax, stamp_duty, income_tax_rental, tax_treaty_israel}

  -- Israeli Community Info (specific to our target audience)
  israeli_community_info TEXT,
  israeli_population_estimate INTEGER,
  hebrew_services_available BOOLEAN DEFAULT false,
  israeli_banks_operating TEXT[] DEFAULT '{}',

  -- Banking & Finance Options
  financing_options JSONB DEFAULT '{}',
  -- Example: {local_mortgage: true, israeli_banks: [], max_ltv, requirements: []}

  -- General Info
  currency_code TEXT,
  timezone TEXT,
  languages TEXT[] DEFAULT '{}',

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for lookups
CREATE INDEX idx_countries_code ON public.countries(code);
CREATE INDEX idx_countries_active ON public.countries(is_active) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Countries are publicly readable
CREATE POLICY "Anyone can view active countries" ON public.countries
  FOR SELECT
  USING (is_active = true);

-- Create trigger for updated_at
CREATE TRIGGER on_countries_updated
  BEFORE UPDATE ON public.countries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Seed initial countries: Israel & USA
INSERT INTO public.countries (code, name, name_he, flag_emoji, currency_code, timezone, languages, is_active, market_overview, ownership_rules, tax_info, financing_options, hebrew_services_available) VALUES
(
  'US',
  'United States',
  'ארצות הברית',
  '🇺🇸',
  'USD',
  'America/New_York',
  ARRAY['English', 'Spanish'],
  true,
  '{
    "avg_price_sqm": 3500,
    "price_trend": "stable",
    "rental_yield_avg": 5.2,
    "market_size": "largest",
    "popular_cities": ["Miami", "New York", "Los Angeles", "Austin", "Phoenix"]
  }'::jsonb,
  '{
    "foreign_ownership": true,
    "restrictions": [],
    "visa_requirements": ["No visa required for property ownership"],
    "required_docs": ["Passport", "ITIN (for tax purposes)", "Proof of funds"]
  }'::jsonb,
  '{
    "property_tax_rate": "0.5-2.5% annually (varies by state)",
    "capital_gains_tax": "15-20% for long-term",
    "stamp_duty": "Varies by state (0-2%)",
    "income_tax_rental": "10-37% (graduated)",
    "tax_treaty_israel": true
  }'::jsonb,
  '{
    "local_mortgage": true,
    "foreign_buyer_mortgage": true,
    "max_ltv": 65,
    "israeli_banks": ["Bank Hapoalim", "Bank Leumi"],
    "requirements": ["Credit history or higher down payment", "US bank account", "ITIN"]
  }'::jsonb,
  true
),
(
  'IL',
  'Israel',
  'ישראל',
  '🇮🇱',
  'ILS',
  'Asia/Jerusalem',
  ARRAY['Hebrew', 'Arabic', 'English'],
  true,
  '{
    "avg_price_sqm": 8500,
    "price_trend": "rising",
    "rental_yield_avg": 3.2,
    "market_size": "small",
    "popular_cities": ["Tel Aviv", "Jerusalem", "Haifa", "Herzliya", "Netanya"]
  }'::jsonb,
  '{
    "foreign_ownership": true,
    "restrictions": ["Some areas restricted for non-citizens"],
    "visa_requirements": ["No visa required for Jewish buyers under Law of Return"],
    "required_docs": ["Passport", "Israeli ID or tourist visa", "Proof of funds"]
  }'::jsonb,
  '{
    "property_tax_rate": "0.1-1.5% annually (Arnona)",
    "capital_gains_tax": "25% (with exemptions for primary residence)",
    "purchase_tax": "0-10% (depends on buyer status and property value)",
    "income_tax_rental": "10% flat or progressive",
    "tax_treaty_israel": true
  }'::jsonb,
  '{
    "local_mortgage": true,
    "foreign_buyer_mortgage": true,
    "max_ltv": 75,
    "requirements": ["Israeli bank account", "Proof of income", "Credit check"]
  }'::jsonb,
  true
);
