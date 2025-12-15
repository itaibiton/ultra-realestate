import { Globe } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface OnboardingLayoutProps {
  children: React.ReactNode;
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
export default async function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect to sign-in if not authenticated
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-blue-950/10">
      {/* Header with logo */}
      <header className="w-full px-6 py-4">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-semibold">GlobalNest</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
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
