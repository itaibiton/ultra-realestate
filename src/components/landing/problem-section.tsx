import { Languages, Unlink, SearchX, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const problems = [
  {
    icon: Languages,
    title: "Language Barriers",
    description:
      "Navigating foreign contracts and tax laws without a local guide is dangerous.",
  },
  {
    icon: Unlink,
    title: "Disconnected Providers",
    description:
      "Your lawyer doesn't talk to your mortgage broker, causing delays and lost deals.",
  },
  {
    icon: SearchX,
    title: "Zero Knowledge",
    description:
      "Not knowing where to invest or how to accurately assess risk in a foreign market.",
  },
  {
    icon: ShieldAlert,
    title: "Trust Deficit",
    description:
      "Fear of scams, unverified developers, and lack of trusted partners abroad.",
  },
];

export function ProblemSection() {
  return (
    <section
      className={cn(
        "py-24 border-t",
        "border-gray-200 dark:border-white/5",
        "bg-white dark:bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
              Global Investing is Broken and Fragmented
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Most investors stop before they even start because the process is
              a disconnected maze of foreign laws, languages, and untrusted
              vendors.
            </p>
          </div>

          {/* Right Column - Problem Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {problems.map((problem) => (
              <ProblemCard
                key={problem.title}
                icon={problem.icon}
                title={problem.title}
                description={problem.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProblemCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function ProblemCard({ icon: Icon, title, description }: ProblemCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border transition-colors",
        "bg-gray-50 border-gray-200 hover:border-gray-300",
        "dark:bg-white/5 dark:border-white/5 dark:hover:border-white/10"
      )}
    >
      <Icon className="mb-4 w-6 h-6 text-muted-foreground" />
      <h3 className="text-sm font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
