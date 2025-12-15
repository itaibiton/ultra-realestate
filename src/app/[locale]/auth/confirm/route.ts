import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  // Extract locale from the URL path
  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(en|he)\//);
  const locale = localeMatch ? localeMatch[1] : "en";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // Check if user has completed onboarding
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Check for existing investor profile
        const { data: profile } = await supabase
          .from("investor_profiles")
          .select("profile_completed")
          .eq("user_id", user.id)
          .single();

        // Redirect to onboarding if profile doesn't exist or isn't completed
        if (!profile?.profile_completed) {
          return NextResponse.redirect(`${origin}/${locale}/welcome`);
        }
      }

      // User has completed onboarding, redirect to dashboard
      return NextResponse.redirect(`${origin}/${locale}/dashboard`);
    }
  }

  // Redirect to an error page if verification fails
  return NextResponse.redirect(`${origin}/${locale}/sign-in?error=verification_failed`);
}
