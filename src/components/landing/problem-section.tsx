import { getTranslations } from "next-intl/server";
import { Languages, Unlink, SearchX, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const problemIcons = {
  languageBarriers: Languages,
  disconnectedProviders: Unlink,
  zeroKnowledge: SearchX,
  trustDeficit: ShieldAlert,
};

export async function ProblemSection() {
  const t = await getTranslations("problem");

  const problems = [
    {
      key: "languageBarriers",
      icon: problemIcons.languageBarriers,
      title: t("items.languageBarriers.title"),
      description: t("items.languageBarriers.description"),
    },
    {
      key: "disconnectedProviders",
      icon: problemIcons.disconnectedProviders,
      title: t("items.disconnectedProviders.title"),
      description: t("items.disconnectedProviders.description"),
    },
    {
      key: "zeroKnowledge",
      icon: problemIcons.zeroKnowledge,
      title: t("items.zeroKnowledge.title"),
      description: t("items.zeroKnowledge.description"),
    },
    {
      key: "trustDeficit",
      icon: problemIcons.trustDeficit,
      title: t("items.trustDeficit.title"),
      description: t("items.trustDeficit.description"),
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
              {t("title")}
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Right Column - Problem Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {problems.map((problem) => (
              <ProblemCard
                key={problem.key}
                icon={problem.icon}
                title={problem.title}
                description={problem.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProblemCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function ProblemCard({ icon: Icon, title, description }: ProblemCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border transition-colors",
        "bg-gray-50 border-gray-200 hover:border-gray-300",
        "dark:bg-white/5 dark:border-white/5 dark:hover:border-white/10"
      )}
    >
      <Icon className="mb-4 w-6 h-6 text-muted-foreground" />
      <h3 className="text-sm font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
