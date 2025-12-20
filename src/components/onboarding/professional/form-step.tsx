"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormStepProps {
  children: React.ReactNode;
  isActive: boolean;
  direction?: "forward" | "backward";
  className?: string;
}

const variants = {
  enter: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? -50 : 50,
    opacity: 0,
  }),
};

export function FormStep({
  children,
  isActive,
  direction = "forward",
  className,
}: FormStepProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      {isActive && (
        <motion.div
          key="step"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className={cn("w-full", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface FormStepContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FormStepContainer({
  children,
  className,
}: FormStepContainerProps) {
  return (
    <div className={cn("relative min-h-[400px] w-full", className)}>
      {children}
    </div>
  );
}
