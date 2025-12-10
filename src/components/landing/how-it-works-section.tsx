import { MessageSquarePlus, GitMerge, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const steps = [
  {
    icon: MessageSquarePlus,
    title: "AI Strategy Session",
    description:
      "Chat with our AI advisor to define your budget and goals. We translate your reality into a roadmap.",
    color: "blue" as const,
  },
  {
    icon: GitMerge,
    title: "The Perfect Match",
    description:
      "We match you with a property, a lender who will finance it, and a legal expert simultaneously.",
    color: "purple" as const,
  },
  {
    icon: CheckCircle2,
    title: "The Deal Room",
    description:
      "Execute with confidence. Manage docs, sign contracts, and transfer funds in a secure vault.",
    color: "green" as const,
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className={cn("py-24", "bg-gray-50/50 dark:bg-white/[0.02]")}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
            Turning Chaos into a Guided Flow
          </h2>
          <p className="text-muted-foreground">
            GlobalNest replaces fragmentation with a streamlined, three-step
            journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-blue-500/0 via-blue-200 dark:via-blue-500/20 to-blue-500/0" />

          {steps.map((step, index) => (
            <StepCard
              key={step.title}
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
            "absolute -top-3 -right-3 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-mono",
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
