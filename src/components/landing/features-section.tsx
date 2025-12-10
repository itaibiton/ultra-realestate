import { Bot, Globe, Landmark, Users, FileCheck, BarChart2 } from "lucide-react";
import { FeatureCard } from "@/components/shared";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Bot,
    title: "AI Onboarding & Insights",
    description:
      "An intelligent assistant that understands your financial DNA and recommends markets that fit your goals.",
    color: "blue" as const,
  },
  {
    icon: Globe,
    title: "Global Marketplace",
    description:
      "Curated investment opportunities in Israel and top global markets, verified for yield potential.",
    color: "indigo" as const,
  },
  {
    icon: Landmark,
    title: "Financing Hub",
    description:
      "Get pre-qualified for mortgages from both Israeli banks and international lenders directly within the platform.",
    color: "green" as const,
  },
  {
    icon: Users,
    title: "Expert Marketplace",
    description:
      "One-click access to vetted lawyers, tax advisors, and inspectors who specialize in cross-border deals.",
    color: "orange" as const,
  },
  {
    icon: FileCheck,
    title: "Secure Deal Room",
    description:
      "A centralized vault for all deal documentation, digital signatures, and compliance checks.",
    color: "purple" as const,
  },
  {
    icon: BarChart2,
    title: "Portfolio Tracker",
    description:
      "Post-purchase monitoring of your assets, cash flow, yield performance, and tenant status.",
    color: "pink" as const,
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className={cn(
        "py-24 border-t",
        "border-gray-200 dark:border-white/5",
        "bg-white dark:bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
            A Super-Platform for Real Estate
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Everything you need to buy, finance, and manage property, built into
            one OS.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
