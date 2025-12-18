"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, TrendingUp } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("landing.hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Trust Badge */}
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-background/80 backdrop-blur border-primary/20"
          >
            <Building2 className="size-4 me-2" />
            {t("badge")}
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="text-base px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href={`/${locale}/sign-up`}>
                {t("ctaPrimary")}
                <ArrowRight className="size-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base px-8"
            >
              <Link href={`/${locale}/properties`}>
                {t("ctaSecondary")}
                <TrendingUp className="size-5" />
              </Link>
            </Button>
          </div>

          {/* Social Proof Indicators */}
          <div className="flex flex-wrap gap-6 justify-center items-center pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="size-8 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 border-2 border-background"
                  />
                ))}
              </div>
              <span>Trusted by 500+ investors</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-border" />

            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-green-500" />
              <span>$100M+ in transactions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
