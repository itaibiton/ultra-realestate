"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlassPanel } from "@/components/shared";
import { RoleSelection, type UserRole } from "@/components/auth/role-selection";
import { signUp } from "../actions";
import {
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

type Step = "role" | "credentials";

export default function SignUpPage() {
  const t = useTranslations("auth");
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleRoleSelect(role: UserRole) {
    setSelectedRole(role);
    setError(null);
  }

  function handleNextStep() {
    if (!selectedRole) {
      setError(t("selectRoleError"));
      return;
    }
    setError(null);
    setStep("credentials");
  }

  function handleBack() {
    setStep("role");
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedRole) {
      setError(t("selectRoleError"));
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    // Add role to form data
    formData.append("role", selectedRole);

    const result = await signUp(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result?.success) {
      toast.success(t("checkEmail"), {
        description: t("checkEmailDescription"),
      });
      setSuccess(true);
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <GlassPanel intensity="medium" className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">{t("checkEmail")}</h2>
        <p className="text-muted-foreground mb-6">
          {t("checkEmailDescription")}
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link href="/sign-in">{t("backToSignIn")}</Link>
        </Button>
      </GlassPanel>
    );
  }

  return (
    <>
      <GlassPanel intensity="medium" className="p-0 overflow-hidden">
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center">
              {step === "role" ? t("selectRoleTitle") : t("signUpTitle")}
            </CardTitle>
            <CardDescription className="text-center">
              {step === "role"
                ? t("selectRoleDescription")
                : t("signUpDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div
                className={`h-2 w-8 rounded-full transition-colors ${
                  step === "role" ? "bg-primary" : "bg-primary/30"
                }`}
              />
              <div
                className={`h-2 w-8 rounded-full transition-colors ${
                  step === "credentials" ? "bg-primary" : "bg-muted"
                }`}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-in fade-in slide-in-from-top-2 duration-300 mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {step === "role" ? (
              /* Step 1: Role Selection */
              <div className="space-y-6">
                <RoleSelection
                  selectedRole={selectedRole}
                  onRoleSelect={handleRoleSelect}
                  disabled={isLoading}
                />

                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full"
                  disabled={!selectedRole}
                >
                  {t("continue")}
                  <ArrowRight className="w-4 h-4 ms-2" />
                </Button>
              </div>
            ) : (
              /* Step 2: Credentials Form */
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      type={showPassword ? "text" : "password"}
                      placeholder={t("passwordPlaceholder")}
                      className="ps-10 pe-10"
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={
                        showPassword ? t("hidePassword") : t("showPassword")
                      }
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                  <div className="relative">
                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("confirmPasswordPlaceholder")}
                      className="ps-10 pe-10"
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={
                        showConfirmPassword
                          ? t("hidePassword")
                          : t("showPassword")
                      }
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 me-2" />
                    {t("back")}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 me-2 animate-spin" />
                        {t("signingUp")}
                      </>
                    ) : (
                      t("signUp")
                    )}
                  </Button>
                </div>
              </form>
            )}

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
    </>
  );
}
