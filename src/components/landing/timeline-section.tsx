import { TimelineItem } from "@/components/shared";
import { cn } from "@/lib/utils";

const timelineSteps = [
  {
    title: "Discovery",
    description:
      "AI analyzes your finances and goals to suggest specific markets and properties tailored to you.",
    isActive: true,
  },
  {
    title: "Team Building",
    description:
      "Automatically connect with a lawyer, tax advisor, and lender specialized in your target region.",
    isActive: false,
  },
  {
    title: "Due Diligence",
    description:
      "Professionals review the asset. AI summarizes risks. You make an informed decision based on data.",
    isActive: false,
  },
  {
    title: "Closing",
    description:
      "Digital signing, secure fund transfer, and ownership registration via the Deal Room.",
    isActive: false,
  },
  {
    title: "Management",
    description:
      "Track rent collection, maintenance requests, and portfolio value in real-time.",
    isActive: false,
  },
];

export function TimelineSection() {
  return (
    <section
      className={cn(
        "py-24 border-t",
        "border-gray-200 dark:border-white/5",
        "bg-white dark:bg-transparent"
      )}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
            The Complete Lifecycle
          </h2>
          <p className="text-muted-foreground">
            A unified timeline from your first question to your monthly passive
            income.
          </p>
        </div>

        {/* Timeline */}
        <div
          className={cn(
            "relative pl-8 border-l space-y-12",
            "border-gray-200 dark:border-white/10"
          )}
        >
          {timelineSteps.map((step) => (
            <TimelineItem
              key={step.title}
              title={step.title}
              description={step.description}
              isActive={step.isActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
