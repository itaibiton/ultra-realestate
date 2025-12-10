import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section
      className={cn(
        "py-32 border-t relative overflow-hidden",
        "border-gray-200 dark:border-white/5",
        "bg-gray-50 dark:bg-transparent"
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-900/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-200/20 dark:bg-blue-500/10 blur-[100px] rounded-full" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">
          Your Global Portfolio Starts Here
        </h2>
        <p className="text-lg mb-10 text-muted-foreground">
          From zero knowledge to your first global property&mdash;with one
          AI-powered platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className={cn(
              "h-12 px-8 text-sm font-semibold rounded-full",
              "shadow-xl shadow-blue-900/10 dark:shadow-white/10"
            )}
          >
            <Link href="#">Create Free Account</Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            No credit card required for Explorer plan.
          </span>
        </div>
      </div>
    </section>
  );
}
