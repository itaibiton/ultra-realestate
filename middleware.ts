import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./src/i18n/routing";

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // First, handle locale routing with next-intl
  const intlResponse = intlMiddleware(request);

  // Create a response that we can modify
  const response = intlResponse || NextResponse.next();

  // Create Supabase client with cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh the auth token (validates JWT and refreshes if needed)
  // This is critical for keeping the session alive
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/", "/(en|he)/:path*"],
};
