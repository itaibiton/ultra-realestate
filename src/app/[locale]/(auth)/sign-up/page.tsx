"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassPanel } from "@/components/shared";
import { signUp } from "../actions";
import { Globe, Mail, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const t = useTranslations("auth");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await signUp(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result?.success) {
      setSuccess(true);
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg -z-10 h-full" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 dark:bg-green-500/20 blur-[100px] rounded-full -z-10" />

        <GlassPanel intensity="medium" className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">{t("checkEmail")}</h2>
          <p className="text-muted-foreground mb-6">{t("checkEmailDescription")}</p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/sign-in">{t("backToSignIn")}</Link>
          </Button>
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg -z-10 h-full" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] rounded-full -z-10" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Globe className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-semibold">GlobalNest</span>
        </div>

        <GlassPanel intensity="medium" className="p-0 overflow-hidden">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-semibold text-center">
                {t("signUpTitle")}
              </CardTitle>
              <CardDescription className="text-center">
                {t("signUpDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <div className="relative">
                    <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="ps-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t("password")}</Label>
                  <div className="relative">
                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t("passwordPlaceholder")}
                      className="ps-10"
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                  <div className="relative">
                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder={t("confirmPasswordPlaceholder")}
                      className="ps-10"
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("signingUp")}
                    </>
                  ) : (
                    t("signUp")
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">{t("haveAccount")}</span>{" "}
                <Link
                  href="/sign-in"
                  className="text-primary hover:underline font-medium"
                >
                  {t("signIn")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </GlassPanel>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t("termsAgreement")}{" "}
          <Link href="#" className="underline hover:text-foreground">
            {t("termsOfService")}
          </Link>{" "}
          {t("and")}{" "}
          <Link href="#" className="underline hover:text-foreground">
            {t("privacyPolicy")}
          </Link>
        </p>
      </div>
    </div>
  );
}
