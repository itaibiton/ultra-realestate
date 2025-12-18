"use client";

import { PropertyCard } from "./property-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PropertyWithExtras } from "@/lib/marketplace/types";

interface PropertyGridProps {
  properties: PropertyWithExtras[];
  onSave?: (propertyId: string) => void;
  onUnsave?: (propertyId: string) => void;
  savedPropertyIds?: string[];
  showMatchScore?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function PropertyGrid({
  properties,
  onSave,
  onUnsave,
  savedPropertyIds = [],
  showMatchScore = false,
  isLoading = false,
  emptyMessage = "No properties found",
}: PropertyGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">🏠</div>
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onSave={onSave}
          onUnsave={onUnsave}
          isSaved={savedPropertyIds.includes(property.id)}
          showMatchScore={showMatchScore}
        />
      ))}
    </div>
  );
}

function PropertyCardSkeleton() {
  return (
    <div className="rounded-xl border overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
