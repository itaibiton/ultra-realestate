import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const personas = [
  {
    title: "The First-Time Investor",
    description:
      "You have savings but zero knowledge. You need safety, education, and hand-holding.",
    features: [
      "Step-by-step AI guidance",
      "Vetted low-risk opportunities",
      "Full legal protection",
    ],
    highlighted: false,
  },
  {
    title: "The Portfolio Scaler",
    description:
      "You own property in Israel and want to diversify abroad. You need efficiency and deal flow.",
    features: [
      "Cross-border tax tools",
      "International financing",
      "Unified portfolio dashboard",
    ],
    highlighted: true,
  },
  {
    title: "The Professional",
    description:
      "Lawyers, Brokers, and Agents looking for qualified, serious clients.",
    features: [
      "High-intent client leads",
      "Digital document workflow",
      "Integrated billing",
    ],
    highlighted: false,
  },
];

export function PersonasSection() {
  return (
    <section
      className={cn(
        "py-24 border-t",
        "border-gray-200 dark:border-white/5",
        "bg-white dark:bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
            Designed for Every Stage
          </h2>
          <p className="text-muted-foreground">
            Whether you are buying your first home or scaling a global empire.
          </p>
        </div>

        {/* Personas Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.title}
              title={persona.title}
              description={persona.description}
              features={persona.features}
              highlighted={persona.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PersonaCardProps {
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

function PersonaCard({
  title,
  description,
  features,
  highlighted = false,
}: PersonaCardProps) {
  return (
    <div
      className={cn(
        "p-8 rounded-xl border",
        highlighted
          ? "bg-gradient-to-br from-blue-50 to-white dark:from-white/10 dark:to-white/5 border-blue-200 dark:border-white/10"
          : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5"
      )}
    >
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-xs mb-6 min-h-[48px] text-muted-foreground">
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-xs text-muted-foreground"
          >
            <Check className="mt-0.5 w-[14px] h-[14px] text-blue-600 dark:text-blue-400 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
