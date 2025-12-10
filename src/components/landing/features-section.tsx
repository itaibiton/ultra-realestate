import { getTranslations } from "next-intl/server";
import { Bot, Globe, Landmark, Users, FileCheck, BarChart2 } from "lucide-react";
import { FeatureCard } from "@/components/shared";
import { cn } from "@/lib/utils";

const featureIcons = {
  aiOnboarding: Bot,
  globalMarketplace: Globe,
  financingHub: Landmark,
  expertMarketplace: Users,
  dealRoom: FileCheck,
  portfolioTracker: BarChart2,
};

const featureColors = {
  aiOnboarding: "blue" as const,
  globalMarketplace: "indigo" as const,
  financingHub: "green" as const,
  expertMarketplace: "orange" as const,
  dealRoom: "purple" as const,
  portfolioTracker: "pink" as const,
};

export async function FeaturesSection() {
  const t = await getTranslations("features");

  const features = [
    {
      key: "aiOnboarding",
      icon: featureIcons.aiOnboarding,
      title: t("items.aiOnboarding.title"),
      description: t("items.aiOnboarding.description"),
      color: featureColors.aiOnboarding,
    },
    {
      key: "globalMarketplace",
      icon: featureIcons.globalMarketplace,
      title: t("items.globalMarketplace.title"),
      description: t("items.globalMarketplace.description"),
      color: featureColors.globalMarketplace,
    },
    {
      key: "financingHub",
      icon: featureIcons.financingHub,
      title: t("items.financingHub.title"),
      description: t("items.financingHub.description"),
      color: featureColors.financingHub,
    },
    {
      key: "expertMarketplace",
      icon: featureIcons.expertMarketplace,
      title: t("items.expertMarketplace.title"),
      description: t("items.expertMarketplace.description"),
      color: featureColors.expertMarketplace,
    },
    {
      key: "dealRoom",
      icon: featureIcons.dealRoom,
      title: t("items.dealRoom.title"),
      description: t("items.dealRoom.description"),
      color: featureColors.dealRoom,
    },
    {
      key: "portfolioTracker",
      icon: featureIcons.portfolioTracker,
      title: t("items.portfolioTracker.title"),
      description: t("items.portfolioTracker.description"),
      color: featureColors.portfolioTracker,
    },
  ];

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
            {t("title")}
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.key}
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
