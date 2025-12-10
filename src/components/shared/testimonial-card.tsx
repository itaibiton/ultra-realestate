import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatarGradient?: "blue" | "gray" | "green" | "purple";
  className?: string;
}

const gradientStyles = {
  blue: "from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800",
  gray: "from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600",
  green: "from-green-100 to-green-200 dark:from-green-900 dark:to-green-800",
  purple: "from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800",
};

export function TestimonialCard({
  quote,
  name,
  title,
  avatarGradient = "gray",
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "p-8 rounded-xl border",
        "bg-white dark:bg-black",
        "border-gray-200 dark:border-white/10",
        "shadow-lg shadow-gray-200/50 dark:shadow-none",
        className
      )}
    >
      <p className="text-sm mb-6 leading-relaxed text-muted-foreground">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "w-10 h-10 rounded-full bg-gradient-to-tr",
            gradientStyles[avatarGradient]
          )}
        />
        <div>
          <div className="text-sm font-semibold text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground">{title}</div>
        </div>
      </div>
    </div>
  );
}
