import { redirect } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLocale, getTranslations } from "next-intl/server";
import { GlassPanel } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "../(auth)/actions";
import { User as UserIcon, LogOut, Home, Settings, Bell } from "lucide-react";
import { Locale } from "@/i18n/routing";

export default async function DashboardPage() {
  const supabase = await createClient();
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("dashboard");

  // Get user - this validates the JWT
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect({ href: "/sign-in", locale });
  }

  const userEmail = user.email;

  return (
    <div className="min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg -z-10 h-full" />
      <div className="absolute top-20 left-1/4 w-[400px] h-[200px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full -z-10" />
      <div className="absolute top-40 right-1/4 w-[300px] h-[200px] bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full -z-10" />

      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold">{t("title")}</h1>
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                {t("nav.home")}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                {t("nav.settings")}
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <form action={signOut}>
              <Button variant="outline" size="sm" className="gap-2">
                <LogOut className="w-4 h-4" />
                {t("signOut")}
              </Button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome section */}
        <GlassPanel intensity="light" className="p-6 mb-8">
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
              <p className="text-sm text-muted-foreground mt-1">{t("cards.properties.subtitle")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("cards.investments.title")}</CardTitle>
              <CardDescription>{t("cards.investments.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-500">$0</div>
              <p className="text-sm text-muted-foreground mt-1">{t("cards.investments.subtitle")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("cards.alerts.title")}</CardTitle>
              <CardDescription>{t("cards.alerts.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-500">0</div>
              <p className="text-sm text-muted-foreground mt-1">{t("cards.alerts.subtitle")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Coming soon section */}
        <GlassPanel intensity="light" className="p-8 mt-8 text-center">
          <h3 className="text-xl font-semibold mb-2">{t("comingSoon.title")}</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t("comingSoon.description")}
          </p>
        </GlassPanel>
      </main>
    </div>
  );
}
