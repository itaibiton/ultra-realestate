import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "light" | "medium" | "strong";
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, intensity = "medium", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-panel rounded-xl",
          intensity === "light" && "backdrop-blur-sm",
          intensity === "medium" && "backdrop-blur-md",
          intensity === "strong" && "backdrop-blur-lg",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";

export { GlassPanel };
