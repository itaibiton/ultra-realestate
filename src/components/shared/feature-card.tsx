import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type FeatureColor = "blue" | "purple" | "green" | "orange" | "pink" | "indigo";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: FeatureColor;
  className?: string;
}

const colorStyles: Record<FeatureColor, { bg: string; text: string; darkBg: string; darkText: string }> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    darkBg: "dark:bg-blue-500/10",
    darkText: "dark:text-blue-400",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    darkBg: "dark:bg-purple-500/10",
    darkText: "dark:text-purple-400",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    darkBg: "dark:bg-green-500/10",
    darkText: "dark:text-green-400",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    darkBg: "dark:bg-orange-500/10",
    darkText: "dark:text-orange-400",
  },
  pink: {
    bg: "bg-pink-50",
    text: "text-pink-600",
    darkBg: "dark:bg-pink-500/10",
    darkText: "dark:text-pink-400",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    darkBg: "dark:bg-indigo-500/10",
    darkText: "dark:text-indigo-400",
  },
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  color = "blue",
  className,
}: FeatureCardProps) {
  const styles = colorStyles[color];

  return (
    <div
      className={cn(
        "group p-6 rounded-xl bg-gradient-to-b from-gray-50 to-transparent dark:from-white/5",
        "border border-gray-200 dark:border-white/5",
        "hover:border-gray-300 dark:hover:border-white/10",
        "transition-all",
        className
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center mb-6",
          "group-hover:scale-110 transition-transform",
          styles.bg,
          styles.text,
          styles.darkBg,
          styles.darkText
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-base font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
