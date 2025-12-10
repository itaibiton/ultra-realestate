import { getTranslations } from "next-intl/server";
import { Languages, Map, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const showcaseIcons = {
  translation: Languages,
  marketMatching: Map,
  riskAssessment: ShieldCheck,
};

export async function AIShowcaseSection() {
  const t = await getTranslations("aiShowcase");

  const showcaseItems = [
    {
      key: "translation",
      icon: showcaseIcons.translation,
      title: t("items.translation.title"),
      before: t("items.translation.before"),
      after: t("items.translation.after"),
    },
    {
      key: "marketMatching",
      icon: showcaseIcons.marketMatching,
      title: t("items.marketMatching.title"),
      before: t("items.marketMatching.before"),
      after: t("items.marketMatching.after"),
    },
    {
      key: "riskAssessment",
      icon: showcaseIcons.riskAssessment,
      title: t("items.riskAssessment.title"),
      before: t("items.riskAssessment.before"),
      after: t("items.riskAssessment.after"),
    },
  ];

  return (
    <section className={cn("py-24", "bg-gray-50/50 dark:bg-white/[0.02]")}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Showcase Cards */}
          <div className="order-2 lg:order-1 space-y-6">
            {showcaseItems.map((item) => (
              <ShowcaseCard
                key={item.key}
                icon={item.icon}
                title={item.title}
                before={item.before}
                after={item.after}
                beforeLabel={t("before")}
                afterLabel={t("after")}
              />
            ))}
          </div>

          {/* Right: Header */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
              {t("title")}
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t("cta")}
              <ArrowRight className="ms-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ShowcaseCardProps {
  icon: LucideIcon;
  title: string;
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
}

function ShowcaseCard({ icon: Icon, title, before, after, beforeLabel, afterLabel }: ShowcaseCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border",
        "bg-white border-gray-200",
        "dark:bg-[#0A0A0A] dark:border-white/10"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "p-5 border-b flex justify-between items-center",
          "border-gray-200 dark:border-white/5"
        )}
      >
        <span className="text-xs font-semibold text-foreground">{title}</span>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Before / After Grid */}
      <div className="grid grid-cols-2">
        {/* Before */}
        <div
          className={cn(
            "p-5 border-e",
            "bg-red-50 border-gray-200",
            "dark:bg-red-500/5 dark:border-white/5"
          )}
        >
          <div className="text-[10px] uppercase mb-2 font-medium text-red-600 dark:text-red-400">
            {beforeLabel}
          </div>
          <p className="text-xs text-muted-foreground italic">{before}</p>
        </div>

        {/* After */}
        <div className={cn("p-5", "bg-green-50 dark:bg-green-500/5")}>
          <div className="text-[10px] uppercase mb-2 font-medium text-green-600 dark:text-green-400">
            {afterLabel}
          </div>
          <p className="text-xs text-foreground dark:text-gray-300">{after}</p>
        </div>
      </div>
    </div>
  );
}
