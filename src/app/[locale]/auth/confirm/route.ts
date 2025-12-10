import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

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
      // Redirect to the dashboard or the next URL after successful verification
      return NextResponse.redirect(`${origin}/${locale}${next}`);
    }
  }

  // Redirect to an error page if verification fails
  return NextResponse.redirect(`${origin}/${locale}/sign-in?error=verification_failed`);
}
