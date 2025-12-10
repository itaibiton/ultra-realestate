import { getTranslations } from "next-intl/server";
import { PricingCard } from "@/components/shared";
import { cn } from "@/lib/utils";

export async function PricingSection() {
  const t = await getTranslations("pricing");

  const pricingPlans = [
    {
      key: "explorer",
      name: t("plans.explorer.name"),
      description: t("plans.explorer.description"),
      price: t("plans.explorer.price"),
      features: t.raw("plans.explorer.features") as string[],
      ctaText: t("plans.explorer.cta"),
      popular: false,
    },
    {
      key: "pro",
      name: t("plans.pro.name"),
      description: t("plans.pro.description"),
      price: t("plans.pro.price"),
      features: t.raw("plans.pro.features") as string[],
      ctaText: t("plans.pro.cta"),
      popular: true,
    },
    {
      key: "partner",
      name: t("plans.partner.name"),
      description: t("plans.partner.description"),
      price: t("plans.partner.price"),
      period: "",
      features: t.raw("plans.partner.features") as string[],
      ctaText: t("plans.partner.cta"),
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className={cn(
        "py-24 border-t",
        "border-gray-200 dark:border-white/5",
        "bg-gray-50/50 dark:bg-white/[0.02]"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.key}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              ctaText={plan.ctaText}
              popular={plan.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
