import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bed,
  Bath,
  Maximize,
  Calendar,
  Car,
  Building2,
  DollarSign,
  Home,
} from "lucide-react";
import { formatArea, formatPrice } from "@/lib/marketplace/utils";
import type { PropertyWithExtras } from "@/lib/marketplace/types";
import { cn } from "@/lib/utils";

interface PropertySpecsProps {
  property: PropertyWithExtras;
  className?: string;
}

export function PropertySpecs({ property, className }: PropertySpecsProps) {
  const t = useTranslations("marketplace.detail");
  const locale = useLocale();

  const specs = [
    {
      icon: Bed,
      label: "Bedrooms",
      value: property.bedrooms !== null ? property.bedrooms : "N/A",
      show: property.bedrooms !== null,
    },
    {
      icon: Bath,
      label: "Bathrooms",
      value: property.bathrooms !== null ? property.bathrooms : "N/A",
      show: property.bathrooms !== null,
    },
    {
      icon: Maximize,
      label: "Area",
      value: property.area_sqm !== null ? formatArea(property.area_sqm, "sqm", locale) : "N/A",
      show: property.area_sqm !== null,
    },
    {
      icon: Home,
      label: t("lotSize"),
      value: property.lot_size_sqm !== null ? formatArea(property.lot_size_sqm, "sqm", locale) : "N/A",
      show: property.lot_size_sqm !== null,
    },
    {
      icon: Calendar,
      label: t("yearBuilt"),
      value: property.year_built || "N/A",
      show: property.year_built !== null,
    },
    {
      icon: Building2,
      label: t("floors"),
      value: property.floors || "N/A",
      show: property.floors !== null,
    },
    {
      icon: Car,
      label: t("parking"),
      value: property.parking_spaces !== null ? `${property.parking_spaces} spaces` : "N/A",
      show: property.parking_spaces !== null,
    },
    {
      icon: DollarSign,
      label: t("hoaFees"),
      value: property.hoa_fees !== null ? formatPrice(property.hoa_fees, property.currency, locale) + "/mo" : "N/A",
      show: property.hoa_fees !== null,
    },
    {
      icon: DollarSign,
      label: t("propertyTax"),
      value: property.property_tax_annual !== null ? formatPrice(property.property_tax_annual, property.currency, locale) + "/yr" : "N/A",
      show: property.property_tax_annual !== null,
    },
  ];

  // Filter to only show specs that have values
  const displaySpecs = specs.filter(spec => spec.show);

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>{t("overview")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displaySpecs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 p-2 rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                  <p className="font-semibold truncate">{spec.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
