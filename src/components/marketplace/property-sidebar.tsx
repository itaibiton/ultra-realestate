"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Share2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Bed,
  Bath,
  Maximize,
  MapPin,
} from "lucide-react";
import { formatPrice, formatArea } from "@/lib/marketplace/utils";
import type { PropertyWithExtras } from "@/lib/marketplace/types";
import { cn } from "@/lib/utils";

interface PropertySidebarProps {
  property: PropertyWithExtras;
  onSave?: (propertyId: string) => void;
  onUnsave?: (propertyId: string) => void;
  isSaved?: boolean;
  className?: string;
}

export function PropertySidebar({
  property,
  onSave,
  onUnsave,
  isSaved = false,
  className,
}: PropertySidebarProps) {
  const t = useTranslations("marketplace");
  const locale = useLocale();
  const [saved, setSaved] = useState(isSaved);

  const handleSaveToggle = () => {
    if (saved) {
      onUnsave?.(property.id);
    } else {
      onSave?.(property.id);
    }
    setSaved(!saved);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log("Share cancelled or failed", error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Could add a toast notification here
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Price Card */}
      <Card className="sticky top-4">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">
                {formatPrice(property.price, property.currency, locale)}
              </CardTitle>
              {property.price_per_sqm && (
                <p className="text-sm text-muted-foreground mt-1">
                  {formatPrice(property.price_per_sqm, property.currency, locale)}/m²
                </p>
              )}
            </div>
            <Badge variant={property.listing_type === "sale" ? "default" : "secondary"}>
              {t(`listingTypes.${property.listing_type}`)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Stats */}
          <div className="flex items-center justify-between text-sm">
            {property.bedrooms !== null && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms !== null && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.area_sqm !== null && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Maximize className="h-4 w-4" />
                <span>{formatArea(property.area_sqm, "sqm", locale)}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Location */}
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium">{property.city}</p>
              <p className="text-muted-foreground">
                {property.state && `${property.state}, `}
                {property.country_code}
              </p>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button size="lg" className="w-full gap-2">
              <Mail className="h-4 w-4" />
              {t("actions.contact")}
            </Button>
            <Button size="lg" variant="outline" className="w-full gap-2">
              <Calendar className="h-4 w-4" />
              {t("actions.schedule")}
            </Button>
          </div>

          <Separator />

          {/* Save and Share */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={cn(
                "flex-1 gap-2",
                saved && "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
              )}
              onClick={handleSaveToggle}
            >
              <Heart className={cn("h-4 w-4", saved && "fill-current")} />
              {saved ? t("actions.unsave") : t("actions.save")}
            </Button>
            <Button variant="outline" className="flex-1 gap-2" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              {t("actions.share")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Agent Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">GN</span>
            </div>
            <div className="flex-1">
              <p className="font-medium">GlobalNest Agent</p>
              <p className="text-sm text-muted-foreground">Real Estate Professional</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2" size="sm">
              <Phone className="h-4 w-4" />
              <span>Call Agent</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" size="sm">
              <Mail className="h-4 w-4" />
              <span>Send Message</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Property Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Views</span>
            <span className="font-medium">{property.views_count || 0}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Saves</span>
            <span className="font-medium">{property.saves_count || 0}</span>
          </div>
          {property.rental_yield && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rental Yield</span>
              <Badge variant="secondary">{property.rental_yield}%</Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
