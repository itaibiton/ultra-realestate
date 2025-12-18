"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Heart,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatPrice,
  formatArea,
  getCountryFlag,
  getMatchScoreLabel,
} from "@/lib/marketplace/utils";
import type { PropertyWithExtras } from "@/lib/marketplace/types";

interface PropertyCardProps {
  property: PropertyWithExtras;
  onSave?: (propertyId: string) => void;
  onUnsave?: (propertyId: string) => void;
  isSaved?: boolean;
  showMatchScore?: boolean;
  className?: string;
}

export function PropertyCard({
  property,
  onSave,
  onUnsave,
  isSaved = false,
  showMatchScore = false,
  className,
}: PropertyCardProps) {
  const locale = useLocale();
  const t = useTranslations("marketplace");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [saved, setSaved] = useState(isSaved);

  const images = property.images.length > 0
    ? property.images
    : ["/images/property-placeholder.jpg"];

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (saved) {
      onUnsave?.(property.id);
    } else {
      onSave?.(property.id);
    }
    setSaved(!saved);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const matchScoreLabel = property.match_score
    ? getMatchScoreLabel(property.match_score)
    : null;

  return (
    <Link href={`/${locale}/properties/${property.slug}`}>
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 cursor-pointer p-0",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {/* Main Image */}
          <Image
            src={images[currentImageIndex]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Image Navigation */}
          {images.length > 1 && isHovered && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute start-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-90"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute end-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-90"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Image Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.slice(0, 5).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    idx === currentImageIndex
                      ? "bg-white w-3"
                      : "bg-white/60"
                  )}
                />
              ))}
              {images.length > 5 && (
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </div>
          )}

          {/* Top Badges Row */}
          <div className="absolute top-2 start-2 end-2 flex justify-between items-start">
            <div className="flex gap-1.5 flex-wrap">
              {/* Featured Badge */}
              {property.is_featured && (
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  {t("badges.featured")}
                </Badge>
              )}

              {/* Match Score Badge */}
              {showMatchScore && property.match_score && matchScoreLabel && (
                <Badge
                  variant="secondary"
                  className={cn(
                    matchScoreLabel === "excellent" && "bg-green-500/90 text-white",
                    matchScoreLabel === "good" && "bg-blue-500/90 text-white",
                    matchScoreLabel === "fair" && "bg-yellow-500/90 text-white"
                  )}
                >
                  {property.match_score}% {t("badges.match")}
                </Badge>
              )}
            </div>

            {/* Save Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full",
                      saved && "bg-red-50 text-red-500 hover:bg-red-100"
                    )}
                    onClick={handleSaveToggle}
                  >
                    <Heart
                      className={cn("h-4 w-4", saved && "fill-current")}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {saved ? t("actions.unsave") : t("actions.save")}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-2 start-2">
            <Badge
              variant="secondary"
              className="bg-background/95 backdrop-blur text-foreground font-semibold text-base px-3 py-1"
            >
              {formatPrice(property.price, property.currency, locale)}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">
              {property.city}
              {property.state && `, ${property.state}`}
            </span>
            <span className="ms-auto text-base" title={property.country_code}>
              {getCountryFlag(property.country_code)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          {/* Property Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {property.bedrooms !== null && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms !== null && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.area_sqm !== null && (
              <div className="flex items-center gap-1">
                <Maximize className="h-4 w-4" />
                <span>{formatArea(property.area_sqm, "sqm", locale)}</span>
              </div>
            )}
          </div>

          {/* Footer Stats */}
          <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span>{property.views_count} {t("stats.views")}</span>
            </div>
            {property.rental_yield && (
              <Badge variant="outline" className="text-xs font-normal">
                {property.rental_yield}% {t("stats.yield")}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
