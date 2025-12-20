import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Role type for redirect logic
type UserRole = "investor" | "broker" | "lawyer" | "mortgage_advisor";

// Role-specific onboarding routes
const ROLE_ONBOARDING: Record<UserRole, string> = {
  investor: "/welcome",
  broker: "/onboarding/broker",
  lawyer: "/onboarding/lawyer",
  mortgage_advisor: "/onboarding/mortgage-advisor",
};

// Role-specific dashboard routes
const ROLE_DASHBOARDS: Record<UserRole, string> = {
  investor: "/dashboard",
  broker: "/dashboard/broker",
  lawyer: "/dashboard/lawyer",
  mortgage_advisor: "/dashboard/mortgage",
};

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

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error && data.user) {
      const user = data.user;

      // Get user role from metadata
      const userRole = user.user_metadata?.role as UserRole | undefined;
      const role: UserRole = userRole && ["investor", "broker", "lawyer", "mortgage_advisor"].includes(userRole)
        ? userRole
        : "investor";

      // Check profile completion based on role
      let profileComplete = false;

      if (role === "investor") {
        const { data: profile } = await supabase
          .from("investor_profiles")
          .select("profile_completed")
          .eq("user_id", user.id)
          .single();
        profileComplete = profile?.profile_completed || false;
      } else if (role === "broker") {
        const { data: profile } = await supabase
          .from("broker_profiles")
          .select("profile_completed")
          .eq("user_id", user.id)
          .single();
        profileComplete = profile?.profile_completed || false;
      } else if (role === "lawyer") {
        const { data: profile } = await supabase
          .from("lawyer_profiles")
          .select("profile_completed")
          .eq("user_id", user.id)
          .single();
        profileComplete = profile?.profile_completed || false;
      } else if (role === "mortgage_advisor") {
        const { data: profile } = await supabase
          .from("mortgage_advisor_profiles")
          .select("profile_completed")
          .eq("user_id", user.id)
          .single();
        profileComplete = profile?.profile_completed || false;
      }

      // Redirect to appropriate page with verified=true param
      if (!profileComplete) {
        const onboardingUrl = ROLE_ONBOARDING[role];
        return NextResponse.redirect(`${origin}/${locale}${onboardingUrl}?verified=true`);
      }

      // Profile complete - redirect to dashboard
      const dashboardUrl = ROLE_DASHBOARDS[role];
      return NextResponse.redirect(`${origin}/${locale}${dashboardUrl}?verified=true`);
    }
  }

  // Redirect to sign-in with error if verification fails
  return NextResponse.redirect(`${origin}/${locale}/sign-in?error=verification_failed`);
}
