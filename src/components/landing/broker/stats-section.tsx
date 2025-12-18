"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Building, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: DollarSign,
    key: "capital",
  },
  {
    icon: Building,
    key: "properties",
  },
  {
    icon: Clock,
    key: "support",
  },
  {
    icon: Award,
    key: "experience",
  },
] as const;

export function StatsSection() {
  const t = useTranslations("landing.stats");

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("title")}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map(({ icon: Icon, key }) => (
            <Card
              key={key}
              className="relative overflow-hidden border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <CardContent className="p-8 text-center relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center size-14 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="size-7 text-primary" />
                </div>

                {/* Value */}
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {t(`items.${key}.value`)}
                </div>

                {/* Label */}
                <p className="text-muted-foreground font-medium">
                  {t(`items.${key}.label`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
