import { cn } from "@/lib/utils";

interface AnimatedPingProps {
  className?: string;
  color?: "blue" | "green" | "red" | "yellow";
  size?: "sm" | "md" | "lg";
}

export function AnimatedPing({
  className,
  color = "blue",
  size = "sm",
}: AnimatedPingProps) {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const colorClasses = {
    blue: "bg-blue-400",
    green: "bg-green-400",
    red: "bg-red-400",
    yellow: "bg-yellow-400",
  };

  const pingColorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  return (
    <span className={cn("relative flex", sizeClasses[size], className)}>
      <span
        className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
          colorClasses[color]
        )}
      />
      <span
        className={cn(
          "relative inline-flex rounded-full h-full w-full",
          pingColorClasses[color]
        )}
      />
    </span>
  );
}
