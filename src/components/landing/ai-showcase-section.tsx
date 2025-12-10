import { Languages, Map, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const showcaseItems = [
  {
    icon: Languages,
    title: "Translation & Clarity",
    before:
      '"Confusing 20-page foreign legal contract in Greek or Portuguese."',
    after:
      '"This clause requires a 10% deposit by Friday, or the deal is void. High urgency."',
  },
  {
    icon: Map,
    title: "Market Matching",
    before: '"Spending weeks Googling \'best places to invest in Europe\'."',
    after:
      '"Based on your 400k NIS liquidity, Batumi and Cyprus offer the best yields. Here are 3 matches."',
  },
  {
    icon: ShieldCheck,
    title: "Risk Assessment",
    before: '"Buying blind and hoping the developer is solvent."',
    after:
      '"Developer flagged for delayed delivery in 2021. We recommend using an escrow account."',
  },
];

export function AIShowcaseSection() {
  return (
    <section className={cn("py-24", "bg-gray-50/50 dark:bg-white/[0.02]")}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Showcase Cards */}
          <div className="order-2 lg:order-1 space-y-6">
            {showcaseItems.map((item) => (
              <ShowcaseCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                before={item.before}
                after={item.after}
              />
            ))}
          </div>

          {/* Right: Header */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
              Your Intelligent Investment Co-Pilot
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              See how GlobalNest AI removes friction and adds clarity. The AI
              reads contracts, analyzes markets, and spots risks faster than any
              human agent.
            </p>
            <Link
              href="#"
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              See full AI capabilities
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ShowcaseCardProps {
  icon: LucideIcon;
  title: string;
  before: string;
  after: string;
}

function ShowcaseCard({ icon: Icon, title, before, after }: ShowcaseCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border",
        "bg-white border-gray-200",
        "dark:bg-[#0A0A0A] dark:border-white/10"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "p-5 border-b flex justify-between items-center",
          "border-gray-200 dark:border-white/5"
        )}
      >
        <span className="text-xs font-semibold text-foreground">{title}</span>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Before / After Grid */}
      <div className="grid grid-cols-2">
        {/* Before */}
        <div
          className={cn(
            "p-5 border-r",
            "bg-red-50 border-gray-200",
            "dark:bg-red-500/5 dark:border-white/5"
          )}
        >
          <div className="text-[10px] uppercase mb-2 font-medium text-red-600 dark:text-red-400">
            Before
          </div>
          <p className="text-xs text-muted-foreground italic">{before}</p>
        </div>

        {/* After */}
        <div className={cn("p-5", "bg-green-50 dark:bg-green-500/5")}>
          <div className="text-[10px] uppercase mb-2 font-medium text-green-600 dark:text-green-400">
            GlobalNest AI
          </div>
          <p className="text-xs text-foreground dark:text-gray-300">{after}</p>
        </div>
      </div>
    </div>
  );
}
