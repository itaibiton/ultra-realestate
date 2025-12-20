"use client";

import { motion } from "framer-motion";
import { LucideIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SummarySectionProps {
  title: string;
  icon: LucideIcon;
  isComplete?: boolean;
  isActive?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Summary Section - Reusable section component for summary panel
 * Shows icon, title, completion status, and content
 */
export function SummarySection({
  title,
  icon: Icon,
  isComplete = false,
  isActive = false,
  children,
  className,
}: SummarySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-lg border p-3 space-y-2 transition-colors",
        isActive ? "border-primary/50 bg-primary/5" : "border-border/50 bg-card/30",
        className
      )}
    >
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
        <h4 className="font-medium text-sm flex-1">{title}</h4>
        {isComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
          </motion.div>
        )}
      </div>

      {/* Section Content */}
      <div className="space-y-2">{children}</div>
    </motion.div>
  );
}
