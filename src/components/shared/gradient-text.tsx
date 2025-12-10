import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "muted";
}

const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "gradient-text bg-gradient-to-r",
          variant === "default" &&
            "from-gray-600 to-gray-900 dark:from-gray-200 dark:to-gray-500",
          variant === "brand" &&
            "from-blue-600 to-blue-900 dark:from-blue-400 dark:to-blue-600",
          variant === "muted" &&
            "from-gray-400 to-gray-600 dark:from-gray-400 dark:to-gray-600",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

GradientText.displayName = "GradientText";

export { GradientText };
