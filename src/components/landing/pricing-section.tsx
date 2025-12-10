import { PricingCard } from "@/components/shared";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Explorer",
    description: "For the curious",
    price: "$0",
    features: ["Access to Marketplace", "Basic AI Chatbot", "Educational Resources"],
    ctaText: "Start Free",
    popular: false,
  },
  {
    name: "GlobalNest Pro",
    description: "For the active investor",
    price: "$49",
    features: ["Unlimited AI Analysis", "Financing Hub Access", "Full Deal Room"],
    ctaText: "Start Trial",
    popular: true,
  },
  {
    name: "Partner",
    description: "For Service Providers",
    price: "Custom",
    period: "",
    features: ["Verified Client Leads", "Branded Profile", "Deal Management CRM"],
    ctaText: "Apply as Partner",
    popular: false,
  },
];

export function PricingSection() {
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
            Invest with Confidence
          </h2>
          <p className="text-muted-foreground">
            Choose the plan that fits your investment activity level.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
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
