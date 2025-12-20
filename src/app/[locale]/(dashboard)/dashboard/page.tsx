import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { GlassPanel } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/marketplace/property-card";
import { OnboardingBanner, OnboardingStatusCard } from "@/components/dashboard";
import { User as UserIcon, Heart, Building2, TrendingUp, Bell, ArrowRight, Sparkles } from "lucide-react";
import { getSavedProperties, getProperties } from "../properties/actions";
import type { PropertyWithExtras } from "@/lib/marketplace/types";
import { getTotalSteps } from "@/lib/onboarding";

/**
 * DashboardPage - Main dashboard overview
 *
 * Shows:
 * - Welcome section with user avatar
 * - Dashboard cards (Saved Properties, Matched Properties, Alerts)
 * - Recommended properties section
 * - Saved properties quick view
 *
 * Note: Auth check and layout are handled by the parent (dashboard)/layout.tsx
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const t = await getTranslations("dashboard");
  const locale = await getLocale();

  // Get user for display (auth already verified in layout)
  const { data: { user } } = await supabase.auth.getUser();
  const userEmail = user?.email;
  const userName = user?.user_metadata?.full_name || userEmail?.split("@")[0] || "Investor";

  // Get onboarding status
  const totalSteps = getTotalSteps();
  let onboardingStep = 0;
  let isOnboardingComplete = false;

  if (user) {
    const { data: profile } = await supabase
      .from("investor_profiles")
      .select("onboarding_step, onboarding_completed")
      .eq("user_id", user.id)
      .single();

    if (profile) {
      onboardingStep = profile.onboarding_step || 0;
      isOnboardingComplete = profile.onboarding_completed || false;
    }
  }

  // Determine profile strength based on completion
  const profileStrength: "weak" | "moderate" | "strong" =
    isOnboardingComplete ? "strong" :
    onboardingStep >= 7 ? "moderate" :
    "weak";

  // Fetch real data
  const savedProperties = await getSavedProperties();
  const savedCount = savedProperties.length;

  // Get recommended properties (featured Israeli properties)
  const { data: recommendedProperties } = await getProperties(
    { country_code: "IL", is_featured: true },
    { field: "created_at", direction: "desc" },
    { page: 1, limit: 3 }
  );

  // Get saved property IDs for the PropertyCard
  const savedPropertyIds = new Set(savedProperties.map(sp => sp.property_id));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Onboarding Banner - Shows when onboarding is incomplete */}
      {!isOnboardingComplete && (
        <OnboardingBanner
          currentStep={onboardingStep}
          totalSteps={totalSteps}
          isComplete={isOnboardingComplete}
        />
      )}

      {/* Welcome section */}
      <GlassPanel intensity="light" className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <UserIcon className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{t("welcome")}, {userName}!</h2>
              <p className="text-muted-foreground">{userEmail}</p>
            </div>
          </div>
          <Button asChild>
            <Link href={`/${locale}/properties`}>
              {t("cards.properties.title")}
              <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </GlassPanel>

      {/* Dashboard stats cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Onboarding Status Card */}
        <OnboardingStatusCard
          currentStep={onboardingStep}
          totalSteps={totalSteps}
          isComplete={isOnboardingComplete}
          profileStrength={profileStrength}
        />

        <Link href={`/${locale}/properties/saved`}>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("cards.properties.title")}</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{savedCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {t("cards.properties.subtitle")}
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("cards.investments.title")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("cards.investments.subtitle")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("cards.alerts.title")}</CardTitle>
            <Bell className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("cards.alerts.subtitle")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Properties Section */}
      {recommendedProperties.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">{t("recommended.title")}</h3>
            </div>
            <Button variant="ghost" asChild>
              <Link href={`/${locale}/properties`}>
                {t("recommended.viewAll")}
                <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedPropertyIds.has(property.id)}
                showMatchScore={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Saved Properties Quick View */}
      {savedProperties.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <h3 className="text-xl font-semibold">{t("savedProperties.title")}</h3>
            </div>
            <Button variant="ghost" asChild>
              <Link href={`/${locale}/properties/saved`}>
                {t("savedProperties.viewAll")}
                <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.slice(0, 3).map((saved) => {
              if (!saved.property) return null;
              return (
                <PropertyCard
                  key={saved.id}
                  property={saved.property as PropertyWithExtras}
                  isSaved={true}
                  showMatchScore={false}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Getting Started / Empty state */}
      {savedProperties.length === 0 && recommendedProperties.length === 0 && (
        <GlassPanel intensity="light" className="p-8 text-center">
          <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t("comingSoon.title")}</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            {t("comingSoon.description")}
          </p>
          <Button asChild>
            <Link href={`/${locale}/properties`}>
              Browse Properties
              <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </GlassPanel>
      )}
    </div>
  );
}
