"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassPanel } from "@/components/shared";
import { signIn } from "../actions";
import { Globe, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";

export function SignInForm() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const verificationError = searchParams.get("error") === "verification_failed";
  const [error, setError] = useState<string | null>(
    verificationError ? t("verificationFailed") : null
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await signIn(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
    // If successful, the server action will redirect
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
                {t("signInTitle")}
              </CardTitle>
              <CardDescription className="text-center">
                {t("signInDescription")}
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t("password")}</Label>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {t("forgotPassword")}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t("passwordPlaceholder")}
                      className="ps-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("signingIn")}
                    </>
                  ) : (
                    t("signIn")
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">{t("noAccount")}</span>{" "}
                <Link
                  href="/sign-up"
                  className="text-primary hover:underline font-medium"
                >
                  {t("signUp")}
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
