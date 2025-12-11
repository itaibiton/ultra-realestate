"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/shared";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface AuthErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Auth Error Boundary
 *
 * Catches errors in the auth route group and provides recovery options.
 * Styled consistently with the auth layout.
 */
export default function AuthError({ error, reset }: AuthErrorProps) {
  const t = useTranslations("errors");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Auth error:", error);
  }, [error]);

  return (
    <GlassPanel intensity="medium" className="p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>

      <h2 className="text-2xl font-semibold mb-2">{t("authErrorTitle")}</h2>
      <p className="text-muted-foreground mb-6">{t("authErrorDescription")}</p>

      {error.digest && (
        <p className="text-xs text-muted-foreground mb-4">
          Error ID: {error.digest}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={reset} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          {t("tryAgain")}
        </Button>
        <Button variant="outline" asChild className="gap-2">
          <Link href="/">
            <Home className="w-4 h-4" />
            {t("goHome")}
          </Link>
        </Button>
      </div>
    </GlassPanel>
  );
}
