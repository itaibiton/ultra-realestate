import { cn } from "@/lib/utils";

interface TimelineItemProps {
  title: string;
  description: string;
  isActive?: boolean;
  className?: string;
}

export function TimelineItem({
  title,
  description,
  isActive = false,
  className,
}: TimelineItemProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "absolute -left-[41px] top-1 w-5 h-5 rounded-full border bg-white dark:bg-black",
          isActive
            ? "border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            : "border-gray-300 dark:border-white/20"
        )}
      />
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
