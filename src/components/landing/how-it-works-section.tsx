import { getTranslations } from "next-intl/server";
import { MessageSquarePlus, GitMerge, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const stepIcons = {
  aiStrategy: MessageSquarePlus,
  perfectMatch: GitMerge,
  dealRoom: CheckCircle2,
};

const stepColors = {
  aiStrategy: "blue" as const,
  perfectMatch: "purple" as const,
  dealRoom: "green" as const,
};

export async function HowItWorksSection() {
  const t = await getTranslations("howItWorks");

  const steps = [
    {
      key: "aiStrategy",
      icon: stepIcons.aiStrategy,
      title: t("steps.aiStrategy.title"),
      description: t("steps.aiStrategy.description"),
      color: stepColors.aiStrategy,
    },
    {
      key: "perfectMatch",
      icon: stepIcons.perfectMatch,
      title: t("steps.perfectMatch.title"),
      description: t("steps.perfectMatch.description"),
      color: stepColors.perfectMatch,
    },
    {
      key: "dealRoom",
      icon: stepIcons.dealRoom,
      title: t("steps.dealRoom.title"),
      description: t("steps.dealRoom.description"),
      color: stepColors.dealRoom,
    },
  ];

  return (
    <section
      id="how-it-works"
      className={cn("py-24", "bg-gray-50/50 dark:bg-white/[0.02]")}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 start-[16%] end-[16%] h-px bg-gradient-to-r from-blue-500/0 via-blue-200 dark:via-blue-500/20 to-blue-500/0" />

          {steps.map((step, index) => (
            <StepCard
              key={step.key}
              icon={step.icon}
              title={step.title}
              description={step.description}
              color={step.color}
              stepNumber={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "blue" | "purple" | "green";
  stepNumber: number;
}

function StepCard({
  icon: Icon,
  title,
  description,
  color,
  stepNumber,
}: StepCardProps) {
  const colorStyles = {
    blue: {
      glow: "bg-blue-500/5",
      icon: "text-blue-600 dark:text-blue-400",
      hoverBorder: "group-hover:border-blue-200 dark:group-hover:border-white/20",
    },
    purple: {
      glow: "bg-purple-500/5",
      icon: "text-purple-600 dark:text-purple-400",
      hoverBorder: "group-hover:border-purple-200 dark:group-hover:border-white/20",
    },
    green: {
      glow: "bg-green-500/5",
      icon: "text-green-600 dark:text-green-400",
      hoverBorder: "group-hover:border-green-200 dark:group-hover:border-white/20",
    },
  };

  const styles = colorStyles[color];

  return (
    <div className="relative flex flex-col items-center text-center group">
      <div
        className={cn(
          "w-24 h-24 rounded-2xl border flex items-center justify-center mb-6 relative z-10 transition-colors shadow-lg",
          "bg-white border-gray-200",
          "dark:bg-[#0A0A0A] dark:border-white/10",
          styles.hoverBorder
        )}
      >
        <div
          className={cn(
            "absolute inset-0 blur-xl rounded-full",
            styles.glow
          )}
        />
        <Icon className={cn("w-8 h-8", styles.icon)} />
        <div
          className={cn(
            "absolute -top-3 -end-3 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-mono",
            "bg-gray-900 border-gray-700 text-white",
            "dark:bg-[#1A1A1A] dark:border-white/10"
          )}
        >
          {stepNumber}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground px-4">{description}</p>
    </div>
  );
}
