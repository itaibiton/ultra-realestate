"use client";

import { useTranslations } from "next-intl";
import { Shield, Lock, Headphones, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const badges = [
  {
    icon: Shield,
    key: "licensed",
  },
  {
    icon: Lock,
    key: "secure",
  },
  {
    icon: Headphones,
    key: "support",
  },
  {
    icon: TrendingUp,
    key: "capital",
  },
] as const;

export function TrustBadges() {
  const t = useTranslations("landing.trustBadges");

  return (
    <section className="py-12 bg-muted/30 border-y">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map(({ icon: Icon, key }) => (
            <Card
              key={key}
              className="flex flex-col items-center justify-center p-6 text-center border-primary/10 hover:border-primary/30 transition-colors"
            >
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon className="size-6 text-primary" />
              </div>
              <p className="text-sm font-medium">{t(key)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
