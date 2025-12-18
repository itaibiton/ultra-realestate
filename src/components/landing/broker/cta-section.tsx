"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  const t = useTranslations("landing.cta");
  const locale = useLocale();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Animated Orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Sparkles Icon */}
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 backdrop-blur">
            <Sparkles className="size-8 text-primary" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("title")}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="text-base px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href={`/${locale}/sign-up`}>
                {t("button")}
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-4 justify-center items-center pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span>No credit card required</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span>Setup in under 5 minutes</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
