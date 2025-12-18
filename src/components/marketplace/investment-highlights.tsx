import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Percent, Calculator } from "lucide-react";
import { formatPrice, calculateROI } from "@/lib/marketplace/utils";
import type { PropertyWithExtras } from "@/lib/marketplace/types";
import { cn } from "@/lib/utils";

interface InvestmentHighlightsProps {
  property: PropertyWithExtras;
  className?: string;
}

export function InvestmentHighlights({ property, className }: InvestmentHighlightsProps) {
  const t = useTranslations("marketplace.detail");
  const locale = useLocale();

  const roi = calculateROI(property);

  const highlights = [
    {
      icon: Percent,
      label: t("rentalYield"),
      value: property.rental_yield !== null ? `${property.rental_yield}%` : null,
      description: "Annual rental return",
      color: "text-green-600",
      bgColor: "bg-green-50",
      show: property.rental_yield !== null,
    },
    {
      icon: DollarSign,
      label: t("estimatedRent"),
      value: property.estimated_monthly_rent !== null
        ? formatPrice(property.estimated_monthly_rent, property.currency, locale)
        : null,
      description: "Per month",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      show: property.estimated_monthly_rent !== null,
    },
    {
      icon: TrendingUp,
      label: "Cap Rate",
      value: roi ? `${roi.capRate.toFixed(2)}%` : null,
      description: "Net operating income",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      show: roi !== null,
    },
    {
      icon: Calculator,
      label: "Cash on Cash",
      value: roi ? `${roi.cashOnCash.toFixed(2)}%` : null,
      description: "With 25% down payment",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      show: roi !== null,
    },
  ];

  const displayHighlights = highlights.filter(h => h.show);

  // If no investment data is available, don't render the card
  if (displayHighlights.length === 0) {
    return null;
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("investment")}</CardTitle>
          <Badge variant="secondary" className="gap-1">
            <TrendingUp className="h-3 w-3" />
            Investment Analysis
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg border",
                  highlight.bgColor
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-md bg-white", highlight.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">
                      {highlight.label}
                    </p>
                    <p className={cn("text-2xl font-bold", highlight.color)}>
                      {highlight.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {roi && (
          <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-dashed">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-5 w-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Investment Disclaimer</p>
                <p className="text-xs">
                  These projections are estimates based on current market data and should not be considered financial advice.
                  Actual returns may vary. Consult with a financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
