import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  Landmark,
  Scale,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedPing, GlassPanel, GradientText } from "@/components/shared";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="overflow-hidden pt-32 pb-20 relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 grid-bg -z-10 h-[800px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Content */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-medium mb-6",
              "border-blue-200 bg-blue-50 text-blue-700",
              "dark:border-white/10 dark:bg-white/5 dark:text-blue-300"
            )}
          >
            <AnimatedPing color="blue" size="sm" />
            The Real Estate OS for the Global Investor
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1] text-foreground">
            From Zero Knowledge to <br />
            <GradientText>Your First Global Property</GradientText>
          </h1>

          {/* Description */}
          <p className="text-lg mb-8 max-w-2xl leading-relaxed text-muted-foreground">
            The first AI-powered ecosystem that unifies property search,
            cross-border financing, legal experts, and deal management into one
            seamless workflow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className={cn(
                "w-full sm:w-auto h-10 px-6 text-sm font-medium rounded-full",
                "shadow-xl shadow-black/5 dark:shadow-none"
              )}
            >
              <Link href="#" className="flex items-center gap-2">
                Start Your Investment Journey
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                "w-full sm:w-auto h-10 px-6 text-sm font-medium rounded-full",
                "border-gray-200 dark:border-white/10",
                "bg-white dark:bg-white/5"
              )}
            >
              <Link href="#">For Professionals</Link>
            </Button>
          </div>

          {/* Feature Checkmarks */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            {[
              "AI-driven investment strategy",
              "Local & International mortgages",
              "Vetted Legal Experts",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* AI Illustration Panel */}
        <AIIllustrationPanel />
      </div>
    </section>
  );
}

function AIIllustrationPanel() {
  return (
    <GlassPanel
      className={cn(
        "relative max-w-5xl mx-auto mt-12 overflow-hidden",
        "shadow-2xl shadow-blue-900/5 dark:shadow-blue-900/10",
        "border border-gray-200 dark:border-white/10"
      )}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />

      <div className="flex flex-col md:flex-row h-[500px]">
        {/* Left: Chat Interface */}
        <div
          className={cn(
            "w-full md:w-1/3 border-b md:border-b-0 md:border-r p-6 flex flex-col",
            "border-gray-200 dark:border-white/10",
            "bg-gray-50/50 dark:bg-black/40"
          )}
        >
          <div className="flex items-center gap-2 mb-6 opacity-80 dark:opacity-60">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium uppercase tracking-widest text-foreground">
              GlobalNest AI
            </span>
          </div>

          <div className="flex-1 space-y-4">
            {/* User Message */}
            <div className="flex justify-end">
              <div
                className={cn(
                  "border border-blue-500/20 text-xs px-4 py-3 rounded-2xl rounded-tr-sm max-w-[90%] shadow-sm",
                  "bg-blue-50 text-blue-900",
                  "dark:bg-blue-600/20 dark:text-blue-100"
                )}
              >
                I have 500k NIS liquidity. Looking for high yield, preferably
                Europe.
              </div>
            </div>

            {/* AI Typing */}
            <div className="flex justify-start">
              <div
                className={cn(
                  "border text-xs px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] animate-pulse-slow shadow-sm",
                  "bg-white border-gray-200 text-gray-600",
                  "dark:bg-white/5 dark:border-white/5 dark:text-gray-300"
                )}
              >
                Processing liquidity parameters... Scanning 12 markets...
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div
                className={cn(
                  "border text-xs px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-sm",
                  "bg-white border-gray-200 text-gray-600",
                  "dark:bg-white/5 dark:border-white/5 dark:text-gray-300"
                )}
              >
                Based on your profile, I&apos;ve constructed a deal package in{" "}
                <strong>Athens, Greece</strong>.
                <br />
                <br />
                &bull; Projected Yield: <strong className="text-green-600 dark:text-green-400">7.2%</strong>
                <br />
                &bull; Financing: <strong>50% LTV Available</strong>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "mt-4 pt-4 border-t",
              "border-gray-200 dark:border-white/5"
            )}
          >
            <div
              className={cn(
                "h-10 rounded-lg w-full flex items-center px-4 text-xs border shadow-sm dark:shadow-none",
                "bg-white border-gray-200 text-gray-400",
                "dark:bg-white/5 dark:border-transparent dark:text-gray-600"
              )}
            >
              Ask follow up question...
            </div>
          </div>
        </div>

        {/* Right: Deal Orchestrator Visual */}
        <div
          className={cn(
            "w-full md:w-2/3 p-8 relative overflow-hidden",
            "bg-gray-50 dark:bg-[#0A0A0A]"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 dark:from-blue-900/10 via-transparent to-transparent" />

          <div className="relative z-10 h-full flex items-center justify-center">
            {/* Central Node (Deal) */}
            <DealCard />

            {/* Connecting Lines */}
            <svg
              className="absolute inset-0 w-full h-full z-0 pointer-events-none stroke-gray-300 dark:stroke-white/20"
              style={{ strokeDasharray: 4 }}
            >
              <line x1="50%" y1="50%" x2="20%" y2="20%" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="80%" y2="20%" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="50%" y2="80%" strokeWidth="1" />
            </svg>

            {/* Node: Finance */}
            <InfoNode
              icon={Landmark}
              label="Financing"
              value="50% LTV Approved"
              color="blue"
              className="absolute top-12 left-12"
            />

            {/* Node: Legal */}
            <InfoNode
              icon={Scale}
              label="Legal"
              value="Vetted Partner"
              color="purple"
              className="absolute top-12 right-12"
            />

            {/* Node: Due Diligence */}
            <InfoNode
              icon={FileCheck}
              label="Due Diligence"
              value="Clean Title"
              color="green"
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function DealCard() {
  return (
    <div
      className={cn(
        "relative z-20 p-4 rounded-xl w-64 shadow-xl",
        "bg-white border border-gray-200",
        "dark:bg-[#111] dark:border-white/10"
      )}
    >
      <div
        className={cn(
          "h-24 rounded-lg mb-3 overflow-hidden relative",
          "bg-gray-100 dark:bg-gray-800"
        )}
      >
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
        <div
          className={cn(
            "absolute bottom-2 left-2 backdrop-blur px-2 py-1 rounded text-[10px] shadow-sm",
            "bg-white/80 text-black",
            "dark:bg-black/60 dark:text-white"
          )}
        >
          Athens, Center
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-muted-foreground">Yield</span>
        <span className="text-xs font-mono text-green-600 dark:text-green-400">
          7.2%
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Price</span>
        <span className="text-xs font-mono text-foreground">&euro;145,000</span>
      </div>
    </div>
  );
}

interface InfoNodeProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: "blue" | "purple" | "green";
  className?: string;
}

function InfoNode({ icon: Icon, label, value, color, className }: InfoNodeProps) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
    green: "bg-green-50 text-green-600 dark:bg-green-500/20 dark:text-green-400",
  };

  return (
    <div
      className={cn(
        "p-3 rounded-lg flex items-center gap-3 w-48 shadow-lg",
        "bg-white border border-gray-200",
        "dark:bg-[#111] dark:border-white/10",
        className
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded flex items-center justify-center",
          colorStyles[color]
        )}
      >
        <Icon className="w-[14px] h-[14px]" />
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground uppercase">
          {label}
        </div>
        <div className="text-xs text-foreground">{value}</div>
      </div>
    </div>
  );
}
