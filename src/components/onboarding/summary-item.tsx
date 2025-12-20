"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SummaryItemProps {
  label: string;
  value?: string | string[];
  pending?: string;
  className?: string;
}

/**
 * Summary Item - Individual data item in summary section
 * Shows label and value, or placeholder if no value
 */
export function SummaryItem({
  label,
  value,
  pending = "Not specified yet",
  className,
}: SummaryItemProps) {
  const hasValue = value !== undefined && value !== null && value !== "";
  const displayValue = Array.isArray(value) ? value.join(", ") : value;

  return (
    <motion.div
      className={cn("flex flex-col gap-0.5", className)}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      {hasValue ? (
        <motion.span
          className="text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {displayValue}
        </motion.span>
      ) : (
        <span className="text-sm text-muted-foreground/50 italic">{pending}</span>
      )}
    </motion.div>
  );
}
