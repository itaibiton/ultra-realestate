import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { GlassPanel } from "@/components/shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon } from "lucide-react";

/**
 * DashboardPage - Main dashboard overview
 *
 * Shows:
 * - Welcome section with user avatar
 * - Dashboard cards (Properties, Investments, Alerts)
 * - Coming soon section
 *
 * Note: Auth check and layout are handled by the parent (dashboard)/layout.tsx
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const t = await getTranslations("dashboard");

  // Get user for display (auth already verified in layout)
  const { data: { user } } = await supabase.auth.getUser();
  const userEmail = user?.email;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome section */}
      <GlassPanel intensity="light" className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <UserIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{t("welcome")}</h2>
            <p className="text-muted-foreground">{userEmail}</p>
          </div>
        </div>
      </GlassPanel>

      {/* Dashboard cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("cards.properties.title")}</CardTitle>
            <CardDescription>{t("cards.properties.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-500">0</div>
            <p className="text-sm text-muted-foreground mt-1">
              {t("cards.properties.subtitle")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("cards.investments.title")}</CardTitle>
            <CardDescription>{t("cards.investments.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-500">$0</div>
            <p className="text-sm text-muted-foreground mt-1">
              {t("cards.investments.subtitle")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("cards.alerts.title")}</CardTitle>
            <CardDescription>{t("cards.alerts.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">0</div>
            <p className="text-sm text-muted-foreground mt-1">
              {t("cards.alerts.subtitle")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Coming soon section */}
      <GlassPanel intensity="light" className="p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">{t("comingSoon.title")}</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t("comingSoon.description")}
        </p>
      </GlassPanel>
    </div>
  );
}
