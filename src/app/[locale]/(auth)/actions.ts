"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/routing";

export type AuthResult = {
  error?: string;
  success?: boolean;
};

export async function signIn(formData: FormData): Promise<AuthResult | void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const locale = (await getLocale()) as Locale;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return redirect({ href: "/dashboard", locale });
}

export async function signUp(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const locale = (await getLocale()) as Locale;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${locale}/auth/confirm`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Detect duplicate email: Supabase returns user but no session when email already exists
  // This is a security feature to prevent email enumeration
  if (data.user && !data.session) {
    return { error: "This email is already registered. Please sign in instead." };
  }

  return { success: true };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  const locale = (await getLocale()) as Locale;

  await supabase.auth.signOut();
  return redirect({ href: "/", locale });
}
