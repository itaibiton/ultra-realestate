import { Globe } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { requireAuth } from "@/lib/auth";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Onboarding Layout - Shared layout for the onboarding flow
 *
 * Provides:
 * - Centered full-screen layout
 * - Gradient background
 * - GlobalNest logo
 * - Auth protection (redirects if not logged in)
 */
export default async function OnboardingLayout({ children, params }: OnboardingLayoutProps) {
  // Set locale for next-intl
  const { locale } = await params;
  setRequestLocale(locale);

  // Auth check - redirects if not logged in
  await requireAuth();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-background via-background to-blue-950/10">
      {/* Header with logo */}
      <header className="shrink-0 w-full px-6 py-3">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-semibold">GlobalNest</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-stretch justify-center px-4 md:px-6 lg:px-8 pb-4 min-h-0">
        <div className="w-full max-w-6xl h-full">
          {children}
        </div>
      </main>

      {/* Decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>
    </div>
  );
}
