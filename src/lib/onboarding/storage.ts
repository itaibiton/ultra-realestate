/**
 * Supabase Storage Helpers for Professional Onboarding
 * Upload and manage verification documents
 */

import { createClient } from "@/lib/supabase/client";
import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from "./professional-constants";

const BUCKET_NAME = "verification-documents";

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

export interface DocumentMetadata {
  documentType: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
}

/**
 * Validate file before upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    };
  }

  // Check file type
  const acceptedTypes = Object.keys(ACCEPTED_FILE_TYPES);
  if (!acceptedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "File type not accepted. Please upload PDF, JPG, PNG, or WebP",
    };
  }

  return { valid: true };
}

/**
 * Generate a unique file path for document storage
 */
export function generateFilePath(
  userId: string,
  documentType: string,
  fileName: string
): string {
  const timestamp = Date.now();
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `${userId}/${documentType}/${timestamp}_${sanitizedName}`;
}

/**
 * Upload a verification document to Supabase Storage
 */
export async function uploadVerificationDocument(
  file: File,
  documentType: string
): Promise<UploadResult> {
  const supabase = createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Not authenticated" };
  }

  // Validate file
  const validation = validateFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  // Generate file path
  const filePath = generateFilePath(user.id, documentType, file.name);

  // Upload file
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    return { success: false, error: error.message };
  }

  // Get public URL (signed URL since bucket is private)
  const signedUrlResult = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(data.path, 60 * 60 * 24 * 365); // 1 year expiry

  if (signedUrlResult.error || !signedUrlResult.data) {
    console.error("URL generation error:", signedUrlResult.error);
    return {
      success: true,
      path: data.path,
      error: "File uploaded but URL generation failed",
    };
  }

  return {
    success: true,
    url: signedUrlResult.data.signedUrl,
    path: data.path,
  };
}

/**
 * Delete a verification document from Supabase Storage
 */
export async function deleteVerificationDocument(
  filePath: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    console.error("Delete error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get a signed URL for a stored document
 */
export async function getDocumentUrl(
  filePath: string,
  expiresIn: number = 60 * 60 // 1 hour default
): Promise<{ url?: string; error?: string }> {
  const supabase = createClient();

  const result = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(filePath, expiresIn);

  if (result.error || !result.data) {
    console.error("URL generation error:", result.error);
    return { error: result.error?.message || "Failed to generate URL" };
  }

  return { url: result.data.signedUrl };
}

/**
 * List all documents for a user
 */
export async function listUserDocuments(
  userId: string
): Promise<{ files: string[]; error?: string }> {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(userId, {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });

  if (error) {
    console.error("List error:", error);
    return { files: [], error: error.message };
  }

  return {
    files: data.map((file) => `${userId}/${file.name}`),
  };
}
