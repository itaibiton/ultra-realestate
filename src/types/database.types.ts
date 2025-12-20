export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      broker_profiles: {
        Row: {
          bio: string | null
          brokerage_address: string | null
          brokerage_name: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          headline: string | null
          id: string
          is_featured: boolean | null
          languages: string[] | null
          license_expiry: string | null
          license_number: string | null
          license_state: string | null
          preferred_contact_method: string | null
          profile_completion_percentage: number | null
          service_areas: string[] | null
          specializations:
            | Database["public"]["Enums"]["broker_specialization"][]
            | null
          updated_at: string | null
          user_id: string
          verification_documents: Json | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
          website_url: string | null
          years_experience: number | null
        }
        Insert: {
          bio?: string | null
          brokerage_address?: string | null
          brokerage_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          headline?: string | null
          id?: string
          is_featured?: boolean | null
          languages?: string[] | null
          license_expiry?: string | null
          license_number?: string | null
          license_state?: string | null
          preferred_contact_method?: string | null
          profile_completion_percentage?: number | null
          service_areas?: string[] | null
          specializations?:
            | Database["public"]["Enums"]["broker_specialization"][]
            | null
          updated_at?: string | null
          user_id: string
          verification_documents?: Json | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          website_url?: string | null
          years_experience?: number | null
        }
        Update: {
          bio?: string | null
          brokerage_address?: string | null
          brokerage_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          headline?: string | null
          id?: string
          is_featured?: boolean | null
          languages?: string[] | null
          license_expiry?: string | null
          license_number?: string | null
          license_state?: string | null
          preferred_contact_method?: string | null
          profile_completion_percentage?: number | null
          service_areas?: string[] | null
          specializations?:
            | Database["public"]["Enums"]["broker_specialization"][]
            | null
          updated_at?: string | null
          user_id?: string
          verification_documents?: Json | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          website_url?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "broker_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          code: string
          created_at: string | null
          currency_code: string | null
          financing_options: Json | null
          flag_emoji: string | null
          hebrew_services_available: boolean | null
          id: string
          is_active: boolean | null
          israeli_banks_operating: string[] | null
          israeli_community_info: string | null
          israeli_population_estimate: number | null
          languages: string[] | null
          market_overview: Json | null
          name: string
          name_he: string | null
          ownership_rules: Json | null
          tax_info: Json | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          currency_code?: string | null
          financing_options?: Json | null
          flag_emoji?: string | null
          hebrew_services_available?: boolean | null
          id?: string
          is_active?: boolean | null
          israeli_banks_operating?: string[] | null
          israeli_community_info?: string | null
          israeli_population_estimate?: number | null
          languages?: string[] | null
          market_overview?: Json | null
          name: string
          name_he?: string | null
          ownership_rules?: Json | null
          tax_info?: Json | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          currency_code?: string | null
          financing_options?: Json | null
          flag_emoji?: string | null
          hebrew_services_available?: boolean | null
          id?: string
          is_active?: boolean | null
          israeli_banks_operating?: string[] | null
          israeli_community_info?: string | null
          israeli_population_estimate?: number | null
          languages?: string[] | null
          market_overview?: Json | null
          name?: string
          name_he?: string | null
          ownership_rules?: Json | null
          tax_info?: Json | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      investor_profiles: {
        Row: {
          budget_currency: string | null
          budget_max: number | null
          budget_min: number | null
          citizenship: string | null
          created_at: string | null
          current_country: string | null
          experience_level:
            | Database["public"]["Enums"]["experience_level"]
            | null
          id: string
          investment_goals:
            | Database["public"]["Enums"]["investment_goal"][]
            | null
          investment_timeline:
            | Database["public"]["Enums"]["investment_timeline"]
            | null
          monthly_expenses: number | null
          monthly_income: number | null
          onboarding_step: number | null
          preferred_markets: string[] | null
          profile_completed: boolean | null
          property_types: Database["public"]["Enums"]["property_type"][] | null
          risk_tolerance: Database["public"]["Enums"]["risk_tolerance"] | null
          updated_at: string | null
          user_id: string
          working_style: Database["public"]["Enums"]["working_style"] | null
        }
        Insert: {
          budget_currency?: string | null
          budget_max?: number | null
          budget_min?: number | null
          citizenship?: string | null
          created_at?: string | null
          current_country?: string | null
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          id?: string
          investment_goals?:
            | Database["public"]["Enums"]["investment_goal"][]
            | null
          investment_timeline?:
            | Database["public"]["Enums"]["investment_timeline"]
            | null
          monthly_expenses?: number | null
          monthly_income?: number | null
          onboarding_step?: number | null
          preferred_markets?: string[] | null
          profile_completed?: boolean | null
          property_types?: Database["public"]["Enums"]["property_type"][] | null
          risk_tolerance?: Database["public"]["Enums"]["risk_tolerance"] | null
          updated_at?: string | null
          user_id: string
          working_style?: Database["public"]["Enums"]["working_style"] | null
        }
        Update: {
          budget_currency?: string | null
          budget_max?: number | null
          budget_min?: number | null
          citizenship?: string | null
          created_at?: string | null
          current_country?: string | null
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          id?: string
          investment_goals?:
            | Database["public"]["Enums"]["investment_goal"][]
            | null
          investment_timeline?:
            | Database["public"]["Enums"]["investment_timeline"]
            | null
          monthly_expenses?: number | null
          monthly_income?: number | null
          onboarding_step?: number | null
          preferred_markets?: string[] | null
          profile_completed?: boolean | null
          property_types?: Database["public"]["Enums"]["property_type"][] | null
          risk_tolerance?: Database["public"]["Enums"]["risk_tolerance"] | null
          updated_at?: string | null
          user_id?: string
          working_style?: Database["public"]["Enums"]["working_style"] | null
        }
        Relationships: [
          {
            foreignKeyName: "investor_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_profiles: {
        Row: {
          bar_admission_date: string | null
          bar_number: string | null
          bar_state: string | null
          bio: string | null
          consultation_fee: number | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          firm_address: string | null
          firm_size: string | null
          headline: string | null
          hourly_rate: number | null
          id: string
          is_featured: boolean | null
          languages: string[] | null
          law_firm_name: string | null
          offers_free_consultation: boolean | null
          practice_areas:
            | Database["public"]["Enums"]["lawyer_practice_area"][]
            | null
          preferred_contact_method: string | null
          profile_completion_percentage: number | null
          service_areas: string[] | null
          updated_at: string | null
          user_id: string
          verification_documents: Json | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
          website_url: string | null
          years_experience: number | null
        }
        Insert: {
          bar_admission_date?: string | null
          bar_number?: string | null
          bar_state?: string | null
          bio?: string | null
          consultation_fee?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          firm_address?: string | null
          firm_size?: string | null
          headline?: string | null
          hourly_rate?: number | null
          id?: string
          is_featured?: boolean | null
          languages?: string[] | null
          law_firm_name?: string | null
          offers_free_consultation?: boolean | null
          practice_areas?:
            | Database["public"]["Enums"]["lawyer_practice_area"][]
            | null
          preferred_contact_method?: string | null
          profile_completion_percentage?: number | null
          service_areas?: string[] | null
          updated_at?: string | null
          user_id: string
          verification_documents?: Json | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          website_url?: string | null
          years_experience?: number | null
        }
        Update: {
          bar_admission_date?: string | null
          bar_number?: string | null
          bar_state?: string | null
          bio?: string | null
          consultation_fee?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          firm_address?: string | null
          firm_size?: string | null
          headline?: string | null
          hourly_rate?: number | null
          id?: string
          is_featured?: boolean | null
          languages?: string[] | null
          law_firm_name?: string | null
          offers_free_consultation?: boolean | null
          practice_areas?:
            | Database["public"]["Enums"]["lawyer_practice_area"][]
            | null
          preferred_contact_method?: string | null
          profile_completion_percentage?: number | null
          service_areas?: string[] | null
          updated_at?: string | null
          user_id?: string
          verification_documents?: Json | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          website_url?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          investment_range: string | null
          investor_type: string | null
          locale: string | null
          message: string | null
          name: string
          phone: string | null
          preferred_contact_method: string | null
          property_id: string | null
          source: string
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          investment_range?: string | null
          investor_type?: string | null
          locale?: string | null
          message?: string | null
          name: string
          phone?: string | null
          preferred_contact_method?: string | null
          property_id?: string | null
          source?: string
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          investment_range?: string | null
          investor_type?: string | null
          locale?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          preferred_contact_method?: string | null
          property_id?: string | null
          source?: string
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      mortgage_advisor_profiles: {
        Row: {
          avg_closing_time_days: number | null
          bio: string | null
          company_address: string | null
          company_name: string | null
          company_nmls_id: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          headline: string | null
          id: string
          is_featured: boolean | null
          languages: string[] | null
          license_states: string[] | null
          loan_types: Database["public"]["Enums"]["loan_type"][] | null
          nmls_id: string | null
          preferred_contact_method: string | null
          profile_completion_percentage: number | null
          service_areas: string[] | null
          total_loan_volume: number | null
          total_loans_closed: number | null
          updated_at: string | null
          user_id: string
          verification_documents: Json | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
          website_url: string | null
          years_experience: number | null
        }
        Insert: {
          avg_closing_time_days?: number | null
          bio?: string | null
          company_address?: string | null
          company_name?: string | null
          company_nmls_id?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          headline?: string | null
          id?: string
          is_featured?: boolean | null
          languages?: string[] | null
          license_states?: string[] | null
          loan_types?: Database["public"]["Enums"]["loan_type"][] | null
          nmls_id?: string | null
          preferred_contact_method?: string | null
          profile_completion_percentage?: number | null
          service_areas?: string[] | null
          total_loan_volume?: number | null
          total_loans_closed?: number | null
          updated_at?: string | null
          user_id: string
          verification_documents?: Json | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          website_url?: string | null
          years_experience?: number | null
        }
        Update: {
          avg_closing_time_days?: number | null
          bio?: string | null
          company_address?: string | null
          company_name?: string | null
          company_nmls_id?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          headline?: string | null
          id?: string
          is_featured?: boolean | null
          languages?: string[] | null
          license_states?: string[] | null
          loan_types?: Database["public"]["Enums"]["loan_type"][] | null
          nmls_id?: string | null
          preferred_contact_method?: string | null
          profile_completion_percentage?: number | null
          service_areas?: string[] | null
          total_loan_volume?: number | null
          total_loans_closed?: number | null
          updated_at?: string | null
          user_id?: string
          verification_documents?: Json | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          website_url?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mortgage_advisor_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_responses: {
        Row: {
          created_at: string | null
          id: string
          question_category: string | null
          question_id: string
          response_array: string[] | null
          response_metadata: Json | null
          response_time_ms: number | null
          response_value: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          question_category?: string | null
          question_id: string
          response_array?: string[] | null
          response_metadata?: Json | null
          response_time_ms?: number | null
          response_value?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          question_category?: string | null
          question_id?: string
          response_array?: string[] | null
          response_metadata?: Json | null
          response_time_ms?: number | null
          response_value?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string | null
          agent_id: string | null
          amenities: string[] | null
          area_sqm: number | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          country_code: string
          created_at: string | null
          currency: string | null
          description: string | null
          estimated_monthly_rent: number | null
          external_id: string | null
          features: string[] | null
          floors: number | null
          hoa_fees: number | null
          id: string
          images: string[] | null
          is_featured: boolean | null
          latitude: number | null
          listing_type: Database["public"]["Enums"]["listing_type"] | null
          longitude: number | null
          lot_size_sqm: number | null
          neighborhood: string | null
          parking_spaces: number | null
          price: number
          price_per_sqm: number | null
          property_tax_annual: number | null
          property_type: Database["public"]["Enums"]["property_type"]
          rental_yield: number | null
          saves_count: number | null
          slug: string
          source: string | null
          state: string | null
          status: Database["public"]["Enums"]["property_status"] | null
          title: string
          updated_at: string | null
          video_url: string | null
          views_count: number | null
          virtual_tour_url: string | null
          year_built: number | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          agent_id?: string | null
          amenities?: string[] | null
          area_sqm?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          country_code: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          estimated_monthly_rent?: number | null
          external_id?: string | null
          features?: string[] | null
          floors?: number | null
          hoa_fees?: number | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          latitude?: number | null
          listing_type?: Database["public"]["Enums"]["listing_type"] | null
          longitude?: number | null
          lot_size_sqm?: number | null
          neighborhood?: string | null
          parking_spaces?: number | null
          price: number
          price_per_sqm?: number | null
          property_tax_annual?: number | null
          property_type: Database["public"]["Enums"]["property_type"]
          rental_yield?: number | null
          saves_count?: number | null
          slug: string
          source?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["property_status"] | null
          title: string
          updated_at?: string | null
          video_url?: string | null
          views_count?: number | null
          virtual_tour_url?: string | null
          year_built?: number | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          agent_id?: string | null
          amenities?: string[] | null
          area_sqm?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          country_code?: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          estimated_monthly_rent?: number | null
          external_id?: string | null
          features?: string[] | null
          floors?: number | null
          hoa_fees?: number | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          latitude?: number | null
          listing_type?: Database["public"]["Enums"]["listing_type"] | null
          longitude?: number | null
          lot_size_sqm?: number | null
          neighborhood?: string | null
          parking_spaces?: number | null
          price?: number
          price_per_sqm?: number | null
          property_tax_annual?: number | null
          property_type?: Database["public"]["Enums"]["property_type"]
          rental_yield?: number | null
          saves_count?: number | null
          slug?: string
          source?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["property_status"] | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
          views_count?: number | null
          virtual_tour_url?: string | null
          year_built?: number | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      property_insights: {
        Row: {
          content: Json
          expires_at: string | null
          generated_at: string | null
          generation_time_ms: number | null
          id: string
          insight_type: Database["public"]["Enums"]["insight_type"]
          locale: string | null
          model_used: string | null
          property_id: string
          version: number | null
        }
        Insert: {
          content: Json
          expires_at?: string | null
          generated_at?: string | null
          generation_time_ms?: number | null
          id?: string
          insight_type: Database["public"]["Enums"]["insight_type"]
          locale?: string | null
          model_used?: string | null
          property_id: string
          version?: number | null
        }
        Update: {
          content?: Json
          expires_at?: string | null
          generated_at?: string | null
          generation_time_ms?: number | null
          id?: string
          insight_type?: Database["public"]["Enums"]["insight_type"]
          locale?: string | null
          model_used?: string | null
          property_id?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "property_insights_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_properties: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          notify_price_change: boolean | null
          notify_status_change: boolean | null
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          notify_price_change?: boolean | null
          notify_status_change?: boolean | null
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          notify_price_change?: boolean | null
          notify_status_change?: boolean | null
          property_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_properties_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_journeys: {
        Row: {
          completed_at: string | null
          created_at: string | null
          current_step: string | null
          id: string
          metadata: Json | null
          progress_percentage: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["journey_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          id?: string
          metadata?: Json | null
          progress_percentage?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["journey_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          id?: string
          metadata?: Json | null
          progress_percentage?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["journey_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_journeys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_professional_profile: { Args: { p_user_id: string }; Returns: Json }
      get_valid_insight: {
        Args: {
          p_insight_type: Database["public"]["Enums"]["insight_type"]
          p_locale?: string
          p_property_id: string
        }
        Returns: Json
      }
      is_insight_valid: { Args: { insight_id: string }; Returns: boolean }
    }
    Enums: {
      broker_specialization:
        | "residential"
        | "commercial"
        | "luxury"
        | "investment"
        | "international"
        | "new_development"
        | "land"
        | "vacation_rentals"
      experience_level:
        | "first_time"
        | "some_experience"
        | "experienced"
        | "professional"
      insight_type:
        | "analysis"
        | "neighborhood"
        | "legal"
        | "investment"
        | "comparison"
        | "risks"
      investment_goal:
        | "capital_appreciation"
        | "rental_income"
        | "portfolio_diversification"
        | "retirement_planning"
        | "tax_benefits"
        | "vacation_home"
        | "relocation"
      investment_timeline:
        | "immediate"
        | "within_6_months"
        | "within_1_year"
        | "within_2_years"
        | "flexible"
      journey_status:
        | "onboarding"
        | "researching"
        | "viewing"
        | "offer"
        | "due_diligence"
        | "closing"
        | "completed"
        | "paused"
      lawyer_practice_area:
        | "real_estate_transactions"
        | "contracts"
        | "title_review"
        | "litigation"
        | "corporate"
        | "tax"
        | "zoning"
        | "landlord_tenant"
      listing_type: "sale" | "rent" | "both"
      loan_type:
        | "conventional"
        | "fha"
        | "va"
        | "jumbo"
        | "arm"
        | "fixed"
        | "investment_property"
        | "refinance"
      property_status: "draft" | "active" | "pending" | "sold" | "archived"
      property_type:
        | "residential_apartment"
        | "residential_house"
        | "commercial_office"
        | "commercial_retail"
        | "industrial"
        | "land"
        | "mixed_use"
      risk_tolerance: "conservative" | "moderate" | "aggressive"
      user_role: "investor" | "broker" | "lawyer" | "mortgage_advisor"
      verification_status: "pending" | "under_review" | "verified" | "rejected"
      working_style: "self_directed" | "guided" | "full_service"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      broker_specialization: [
        "residential",
        "commercial",
        "luxury",
        "investment",
        "international",
        "new_development",
        "land",
        "vacation_rentals",
      ],
      experience_level: [
        "first_time",
        "some_experience",
        "experienced",
        "professional",
      ],
      insight_type: [
        "analysis",
        "neighborhood",
        "legal",
        "investment",
        "comparison",
        "risks",
      ],
      investment_goal: [
        "capital_appreciation",
        "rental_income",
        "portfolio_diversification",
        "retirement_planning",
        "tax_benefits",
        "vacation_home",
        "relocation",
      ],
      investment_timeline: [
        "immediate",
        "within_6_months",
        "within_1_year",
        "within_2_years",
        "flexible",
      ],
      journey_status: [
        "onboarding",
        "researching",
        "viewing",
        "offer",
        "due_diligence",
        "closing",
        "completed",
        "paused",
      ],
      lawyer_practice_area: [
        "real_estate_transactions",
        "contracts",
        "title_review",
        "litigation",
        "corporate",
        "tax",
        "zoning",
        "landlord_tenant",
      ],
      listing_type: ["sale", "rent", "both"],
      loan_type: [
        "conventional",
        "fha",
        "va",
        "jumbo",
        "arm",
        "fixed",
        "investment_property",
        "refinance",
      ],
      property_status: ["draft", "active", "pending", "sold", "archived"],
      property_type: [
        "residential_apartment",
        "residential_house",
        "commercial_office",
        "commercial_retail",
        "industrial",
        "land",
        "mixed_use",
      ],
      risk_tolerance: ["conservative", "moderate", "aggressive"],
      user_role: ["investor", "broker", "lawyer", "mortgage_advisor"],
      verification_status: ["pending", "under_review", "verified", "rejected"],
      working_style: ["self_directed", "guided", "full_service"],
    },
  },
} as const
