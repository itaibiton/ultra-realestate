import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./src/i18n/routing";

// Role type for middleware (avoid importing from src to keep middleware lean)
type UserRole = "investor" | "broker" | "lawyer" | "mortgage_advisor";

// Role-specific dashboard routes
const ROLE_DASHBOARDS: Record<UserRole, string> = {
  investor: "/dashboard",
  broker: "/dashboard/broker",
  lawyer: "/dashboard/lawyer",
  mortgage_advisor: "/dashboard/mortgage",
};

// Role-specific onboarding routes for professionals
const ROLE_ONBOARDING: Record<UserRole, string | null> = {
  investor: "/onboarding", // Chat-based onboarding
  broker: "/onboarding/broker",
  lawyer: "/onboarding/lawyer",
  mortgage_advisor: "/onboarding/mortgage-advisor",
};

// Routes that require specific roles
const ROLE_ROUTES: Record<string, UserRole> = {
  "/dashboard/broker": "broker",
  "/dashboard/lawyer": "lawyer",
  "/dashboard/mortgage": "mortgage_advisor",
  "/properties/manage": "broker",
  "/listings": "broker",
  "/cases": "lawyer",
  "/applications": "mortgage_advisor",
};

// Routes that require authentication but any role
const AUTH_ROUTES = [
  "/dashboard",
  "/properties",
  "/saved",
  "/settings",
  "/profile",
  "/messages",
  "/complete",
  "/welcome",
  "/chat",
  "/summary",
  "/onboarding",
];

// Professional onboarding routes (mapped to their roles)
const PROFESSIONAL_ONBOARDING_ROUTES: Record<string, UserRole> = {
  "/onboarding/broker": "broker",
  "/onboarding/lawyer": "lawyer",
  "/onboarding/mortgage-advisor": "mortgage_advisor",
};

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

/**
 * Extract locale from pathname
 */
function getLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|he)/);
  return match ? match[1] : "en";
}

/**
 * Remove locale prefix from pathname
 */
function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|he)/, "") || "/";
}

/**
 * Check if route requires a specific role
 */
function getRequiredRole(pathname: string): UserRole | null {
  const pathWithoutLocale = stripLocale(pathname);

  for (const [route, role] of Object.entries(ROLE_ROUTES)) {
    if (pathWithoutLocale.startsWith(route)) {
      return role;
    }
  }
  return null;
}

/**
 * Check if route requires authentication
 */
function requiresAuth(pathname: string): boolean {
  const pathWithoutLocale = stripLocale(pathname);

  // Check role-specific routes
  for (const route of Object.keys(ROLE_ROUTES)) {
    if (pathWithoutLocale.startsWith(route)) {
      return true;
    }
  }

  // Check general auth routes
  for (const route of AUTH_ROUTES) {
    if (pathWithoutLocale.startsWith(route)) {
      return true;
    }
  }

  return false;
}

/**
 * Check if role is valid
 */
function isValidRole(role: unknown): role is UserRole {
  return (
    typeof role === "string" &&
    ["investor", "broker", "lawyer", "mortgage_advisor"].includes(role)
  );
}

/**
 * Check if user is on their own professional onboarding route
 */
function isOnOwnOnboardingRoute(pathname: string, role: UserRole): boolean {
  const pathWithoutLocale = stripLocale(pathname);
  const requiredRole = PROFESSIONAL_ONBOARDING_ROUTES[pathWithoutLocale];
  return requiredRole === role;
}

/**
 * Check if user is on any onboarding route
 */
function isOnOnboardingRoute(pathname: string): boolean {
  const pathWithoutLocale = stripLocale(pathname);
  return pathWithoutLocale.startsWith("/onboarding");
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocale(pathname);

  // First, handle locale routing with next-intl
  const intlResponse = intlMiddleware(request);

  // Create a response that we can modify
  let response = intlResponse || NextResponse.next();

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

  // Get user (validates JWT and refreshes if needed)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if route requires authentication
  if (requiresAuth(pathname)) {
    // Redirect to sign-in if not authenticated
    if (!user) {
      const signInUrl = new URL(`/${locale}/sign-in`, request.url);
      signInUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Get user role from metadata (set during signup)
    const userRole = user.user_metadata?.role;
    const role: UserRole = isValidRole(userRole) ? userRole : "investor";

    // Check if route requires a specific role
    const requiredRole = getRequiredRole(pathname);

    if (requiredRole && requiredRole !== role) {
      // User doesn't have required role - redirect to their dashboard
      const correctDashboard = ROLE_DASHBOARDS[role];
      const redirectUrl = new URL(`/${locale}${correctDashboard}`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // For professional roles, check if they're trying to access a professional onboarding
    // route that's not their own - redirect them to their own onboarding
    const pathWithoutLocale = stripLocale(pathname);
    const onboardingRole = PROFESSIONAL_ONBOARDING_ROUTES[pathWithoutLocale];
    if (onboardingRole && onboardingRole !== role) {
      // Redirect to their own onboarding or dashboard
      const ownOnboarding = ROLE_ONBOARDING[role];
      if (ownOnboarding) {
        const redirectUrl = new URL(`/${locale}${ownOnboarding}`, request.url);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // For professional roles accessing dashboard, check if profile is complete
    // Skip this check if they're already on an onboarding page
    if (
      ["broker", "lawyer", "mortgage_advisor"].includes(role) &&
      !isOnOnboardingRoute(pathname)
    ) {
      // Check profile completion in database
      let profileComplete = false;

      if (role === "broker") {
        const { data } = await supabase
          .from("broker_profiles")
          .select("profile_completed")
          .eq("user_id", user.id)
          .single();
        profileComplete = data?.profile_completed || false;
      } else if (role === "lawyer") {
        const { data } = await supabase
          .from("lawyer_profiles")
          .select("profile_completed")
          .eq("user_id", user.id)
          .single();
        profileComplete = data?.profile_completed || false;
      } else if (role === "mortgage_advisor") {
        const { data } = await supabase
          .from("mortgage_advisor_profiles")
          .select("profile_completed")
          .eq("user_id", user.id)
          .single();
        profileComplete = data?.profile_completed || false;
      }

      // Redirect to onboarding if profile not complete
      if (!profileComplete) {
        const onboardingUrl = ROLE_ONBOARDING[role];
        if (onboardingUrl) {
          const redirectUrl = new URL(`/${locale}${onboardingUrl}`, request.url);
          return NextResponse.redirect(redirectUrl);
        }
      }
    }
  }

  // Redirect authenticated users away from auth pages
  const pathWithoutLocale = stripLocale(pathname);
  if (user && (pathWithoutLocale === "/sign-in" || pathWithoutLocale === "/sign-up")) {
    const userRole = user.user_metadata?.role;
    const role: UserRole = isValidRole(userRole) ? userRole : "investor";
    const dashboardUrl = new URL(`/${locale}${ROLE_DASHBOARDS[role]}`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: ["/", "/(en|he)/:path*"],
};
