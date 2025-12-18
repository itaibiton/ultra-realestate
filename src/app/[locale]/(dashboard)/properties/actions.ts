"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type {
  Property,
  PropertyWithExtras,
  PropertyFilters,
  PropertySort,
  PaginationParams,
  PaginatedResponse,
  SavedProperty,
  Country,
} from "@/lib/marketplace/types";
import { DEFAULT_PAGE_SIZE } from "@/lib/marketplace/constants";

/**
 * Get properties with filters, sorting, and pagination
 */
export async function getProperties(
  filters?: PropertyFilters,
  sort?: PropertySort,
  pagination?: PaginationParams,
  search?: string
): Promise<PaginatedResponse<PropertyWithExtras>> {
  const supabase = await createClient();
  const page = pagination?.page || 1;
  const limit = pagination?.limit || DEFAULT_PAGE_SIZE;
  const offset = (page - 1) * limit;

  // Build query
  let query = supabase
    .from("properties")
    .select("*", { count: "exact" });

  // Apply filters
  if (filters?.status) {
    query = query.eq("status", filters.status);
  } else {
    query = query.eq("status", "active");
  }

  if (filters?.country_code) {
    query = query.eq("country_code", filters.country_code);
  }

  if (filters?.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }

  if (filters?.state) {
    query = query.eq("state", filters.state);
  }

  if (filters?.property_type && filters.property_type.length > 0) {
    query = query.in("property_type", filters.property_type);
  }

  if (filters?.listing_type) {
    query = query.eq("listing_type", filters.listing_type);
  }

  if (filters?.price_min !== undefined) {
    query = query.gte("price", filters.price_min);
  }

  if (filters?.price_max !== undefined) {
    query = query.lte("price", filters.price_max);
  }

  if (filters?.bedrooms_min !== undefined) {
    query = query.gte("bedrooms", filters.bedrooms_min);
  }

  if (filters?.bedrooms_max !== undefined) {
    query = query.lte("bedrooms", filters.bedrooms_max);
  }

  if (filters?.bathrooms_min !== undefined) {
    query = query.gte("bathrooms", filters.bathrooms_min);
  }

  if (filters?.area_min !== undefined) {
    query = query.gte("area_sqm", filters.area_min);
  }

  if (filters?.area_max !== undefined) {
    query = query.lte("area_sqm", filters.area_max);
  }

  if (filters?.is_featured !== undefined) {
    query = query.eq("is_featured", filters.is_featured);
  }

  // Full-text search
  if (search && search.trim()) {
    query = query.or(`title.ilike.%${search}%,city.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // Apply sorting
  const sortField = sort?.field || "created_at";
  const sortDirection = sort?.direction || "desc";
  query = query.order(sortField, { ascending: sortDirection === "asc" });

  // Apply pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching properties:", error);
    return {
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
      hasMore: false,
    };
  }

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    data: (data as PropertyWithExtras[]) || [],
    total,
    page,
    limit,
    totalPages,
    hasMore: page < totalPages,
  };
}

/**
 * Get a single property by slug
 */
export async function getPropertyBySlug(slug: string): Promise<PropertyWithExtras | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching property:", error);
    return null;
  }

  // Increment view count
  await supabase
    .from("properties")
    .update({ views_count: (data.views_count || 0) + 1 })
    .eq("id", data.id);

  return data as PropertyWithExtras;
}

/**
 * Get a single property by ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Property;
}

/**
 * Save a property to user's watchlist
 */
export async function saveProperty(propertyId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("saved_properties")
    .insert({
      user_id: user.id,
      property_id: propertyId,
    });

  if (error) {
    if (error.code === "23505") {
      return { success: true }; // Already saved
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/properties");
  return { success: true };
}

/**
 * Remove a property from user's watchlist
 */
export async function unsaveProperty(propertyId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("saved_properties")
    .delete()
    .eq("user_id", user.id)
    .eq("property_id", propertyId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/properties");
  return { success: true };
}

/**
 * Get user's saved properties
 */
export async function getSavedProperties(): Promise<SavedProperty[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("saved_properties")
    .select(`
      *,
      property:properties(*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved properties:", error);
    return [];
  }

  return data as SavedProperty[];
}

/**
 * Get IDs of properties saved by user
 */
export async function getSavedPropertyIds(): Promise<string[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("saved_properties")
    .select("property_id")
    .eq("user_id", user.id);

  if (error) {
    return [];
  }

  return data.map((sp) => sp.property_id);
}

/**
 * Update saved property notes
 */
export async function updateSavedPropertyNotes(
  propertyId: string,
  notes: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("saved_properties")
    .update({ notes })
    .eq("user_id", user.id)
    .eq("property_id", propertyId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get all active countries
 */
export async function getCountries(): Promise<Country[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching countries:", error);
    return [];
  }

  return data as Country[];
}

/**
 * Get country by code
 */
export async function getCountryByCode(code: string): Promise<Country | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("code", code)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Country;
}

/**
 * Get featured properties
 */
export async function getFeaturedProperties(limit: number = 6): Promise<PropertyWithExtras[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "active")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }

  return data as PropertyWithExtras[];
}

/**
 * Search properties by text
 */
export async function searchProperties(
  query: string,
  limit: number = 10
): Promise<PropertyWithExtras[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "active")
    .or(`title.ilike.%${query}%,city.ilike.%${query}%,neighborhood.ilike.%${query}%`)
    .order("views_count", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error searching properties:", error);
    return [];
  }

  return data as PropertyWithExtras[];
}
