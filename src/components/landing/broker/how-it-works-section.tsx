"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, Search, Handshake } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    key: "profile",
    number: 1,
  },
  {
    icon: Search,
    key: "browse",
    number: 2,
  },
  {
    icon: Handshake,
    key: "connect",
    number: 3,
  },
] as const;

export function HowItWorksSection() {
  const t = useTranslations("landing.howItWorks");

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map(({ icon: Icon, key, number }, index) => (
            <div key={key} className="relative">
              {/* Connector Line (hidden on mobile, shown on md+) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 start-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 z-0" />
              )}

              <Card className="relative z-10 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all">
                <CardContent className="p-8 text-center">
                  {/* Step Number Badge */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
                    <div className="relative size-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="size-8 text-primary" />
                    </div>
                    <div className="absolute -top-1 -end-1 size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`steps.${key}.description`)}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
