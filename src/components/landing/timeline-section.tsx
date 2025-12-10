import { getTranslations } from "next-intl/server";
import { TimelineItem } from "@/components/shared";
import { cn } from "@/lib/utils";

export async function TimelineSection() {
  const t = await getTranslations("timeline");

  const timelineSteps = [
    {
      key: "discovery",
      title: t("steps.discovery.title"),
      description: t("steps.discovery.description"),
      isActive: true,
    },
    {
      key: "teamBuilding",
      title: t("steps.teamBuilding.title"),
      description: t("steps.teamBuilding.description"),
      isActive: false,
    },
    {
      key: "dueDiligence",
      title: t("steps.dueDiligence.title"),
      description: t("steps.dueDiligence.description"),
      isActive: false,
    },
    {
      key: "closing",
      title: t("steps.closing.title"),
      description: t("steps.closing.description"),
      isActive: false,
    },
    {
      key: "management",
      title: t("steps.management.title"),
      description: t("steps.management.description"),
      isActive: false,
    },
  ];

  return (
    <section
      className={cn(
        "py-24 border-t",
        "border-gray-200 dark:border-white/5",
        "bg-white dark:bg-transparent"
      )}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Timeline */}
        <div
          className={cn(
            "relative ps-8 border-s space-y-12",
            "border-gray-200 dark:border-white/10"
          )}
        >
          {timelineSteps.map((step) => (
            <TimelineItem
              key={step.key}
              title={step.title}
              description={step.description}
              isActive={step.isActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
