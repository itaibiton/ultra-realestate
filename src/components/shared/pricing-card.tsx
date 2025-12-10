import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaHref?: string;
  className?: string;
}

export function PricingCard({
  name,
  description,
  price,
  period = "/mo",
  features,
  popular = false,
  ctaText,
  ctaHref = "#",
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-8 rounded-xl border relative",
        popular
          ? "border-blue-200 dark:border-blue-500/30 bg-white dark:bg-white/5 shadow-xl shadow-blue-500/5 dark:shadow-none"
          : "border-gray-200 dark:border-white/10 bg-white dark:bg-black shadow-lg shadow-gray-200/50 dark:shadow-none",
        className
      )}
    >
      {popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-blue-600 text-white">
          Most Popular
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-3xl font-bold text-foreground">{price}</span>
        {price !== "Custom" && (
          <span className="text-sm text-muted-foreground">{period}</span>
        )}
      </div>

      <Button
        asChild
        variant={popular ? "default" : "outline"}
        className={cn(
          "w-full h-10 rounded-lg mb-8",
          popular && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        <a href={ctaHref}>{ctaText}</a>
      </Button>

      <ul className="space-y-4 flex-1">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <Check
              className={cn(
                "shrink-0 mt-0.5 w-4 h-4",
                popular
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-foreground"
              )}
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
