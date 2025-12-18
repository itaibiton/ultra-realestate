import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getProperties, getSavedPropertyIds, getCountries } from "./actions";
import { PropertyMarketplace } from "./property-marketplace";
import { Skeleton } from "@/components/ui/skeleton";
import type { PropertyFilters, PropertySort } from "@/lib/marketplace/types";

interface PropertiesPageProps {
  searchParams: Promise<{
    country?: string;
    city?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
    sort?: string;
    page?: string;
    search?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const t = await getTranslations("marketplace");
  const params = await searchParams;

  // Parse search params into filters
  const filters: PropertyFilters = {
    status: "active",
    country_code: params.country || undefined,
    city: params.city || undefined,
    property_type: params.type ? params.type.split(",") as PropertyFilters["property_type"] : undefined,
    price_min: params.minPrice ? parseInt(params.minPrice, 10) : undefined,
    price_max: params.maxPrice ? parseInt(params.maxPrice, 10) : undefined,
    bedrooms_min: params.beds ? parseInt(params.beds, 10) : undefined,
  };

  // Parse sort
  const sort: PropertySort | undefined = params.sort
    ? {
        field: params.sort.split("_")[0] as PropertySort["field"],
        direction: params.sort.includes("asc") ? "asc" : "desc",
      }
    : undefined;

  // Parse pagination
  const page = params.page ? parseInt(params.page, 10) : 1;

  // Fetch data
  const [propertiesResult, savedPropertyIds, countries] = await Promise.all([
    getProperties(filters, sort, { page, limit: 12 }, params.search),
    getSavedPropertyIds(),
    getCountries(),
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Marketplace Content */}
      <Suspense fallback={<MarketplaceSkeleton />}>
        <PropertyMarketplace
          initialProperties={propertiesResult.data}
          initialTotal={propertiesResult.total}
          initialPage={propertiesResult.page}
          totalPages={propertiesResult.totalPages}
          savedPropertyIds={savedPropertyIds}
          countries={countries}
          initialFilters={filters}
          initialSort={sort}
          initialSearch={params.search}
        />
      </Suspense>
    </div>
  );
}

function MarketplaceSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filters skeleton */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 flex-1" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border overflow-hidden">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
