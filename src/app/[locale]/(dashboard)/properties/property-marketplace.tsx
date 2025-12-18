"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";
import { Search, SlidersHorizontal, X, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PropertyGrid } from "@/components/marketplace";
import { saveProperty, unsaveProperty } from "./actions";
import { SORT_OPTIONS, SUPPORTED_COUNTRIES } from "@/lib/marketplace/constants";
import type {
  PropertyWithExtras,
  PropertyFilters,
  PropertySort,
  Country,
} from "@/lib/marketplace/types";

interface PropertyMarketplaceProps {
  initialProperties: PropertyWithExtras[];
  initialTotal: number;
  initialPage: number;
  totalPages: number;
  savedPropertyIds: string[];
  countries: Country[];
  initialFilters?: PropertyFilters;
  initialSort?: PropertySort;
  initialSearch?: string;
}

export function PropertyMarketplace({
  initialProperties,
  initialTotal,
  initialPage,
  totalPages,
  savedPropertyIds: initialSavedIds,
  countries,
  initialFilters,
  initialSort,
  initialSearch,
}: PropertyMarketplaceProps) {
  const t = useTranslations("marketplace");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [properties] = useState(initialProperties);
  const [savedPropertyIds, setSavedPropertyIds] = useState(initialSavedIds);
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");
  const [selectedCountry, setSelectedCountry] = useState(initialFilters?.country_code || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update URL params
  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset to page 1 when filters change
      if (!updates.page) {
        params.delete("page");
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams]
  );

  // Handle search
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateParams({ search: searchQuery || undefined });
    },
    [searchQuery, updateParams]
  );

  // Handle country filter
  const handleCountryChange = useCallback(
    (value: string) => {
      setSelectedCountry(value);
      updateParams({ country: value === "all" ? undefined : value });
    },
    [updateParams]
  );

  // Handle sort change
  const handleSortChange = useCallback(
    (value: string) => {
      updateParams({ sort: value });
    },
    [updateParams]
  );

  // Handle save/unsave
  const handleSave = useCallback(async (propertyId: string) => {
    const result = await saveProperty(propertyId);
    if (result.success) {
      setSavedPropertyIds((prev) => [...prev, propertyId]);
      toast.success(t("actions.save"));
    } else {
      toast.error(result.error || "Failed to save property");
    }
  }, [t]);

  const handleUnsave = useCallback(async (propertyId: string) => {
    const result = await unsaveProperty(propertyId);
    if (result.success) {
      setSavedPropertyIds((prev) => prev.filter((id) => id !== propertyId));
      toast.success(t("actions.unsave"));
    } else {
      toast.error(result.error || "Failed to unsave property");
    }
  }, [t]);

  // Handle pagination
  const handlePageChange = useCallback(
    (newPage: number) => {
      updateParams({ page: newPage.toString() });
    },
    [updateParams]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCountry("");
    startTransition(() => {
      router.push(pathname);
    });
  }, [pathname, router]);

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery ||
    selectedCountry ||
    initialFilters?.property_type?.length ||
    initialFilters?.price_min ||
    initialFilters?.price_max;

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-10"
            />
          </div>
          <Button type="submit" disabled={isPending}>
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Country Filter */}
        <div className="flex gap-2">
          {SUPPORTED_COUNTRIES.map((country) => (
            <Button
              key={country.code}
              variant={selectedCountry === country.code ? "default" : "outline"}
              size="sm"
              onClick={() => handleCountryChange(country.code === selectedCountry ? "all" : country.code)}
              className="gap-1"
            >
              <span>{country.flag}</span>
              <span className="hidden sm:inline">{t(`countries.${country.code.toLowerCase()}`)}</span>
            </Button>
          ))}
        </div>

        {/* Sort */}
        <Select
          value={initialSort ? `${initialSort.field}_${initialSort.direction}` : "created_at_desc"}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("sort.label")} />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem
                key={`${option.field}_${option.direction}`}
                value={`${option.field}_${option.direction}`}
              >
                {t(option.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Mobile Filter Button */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="sm:hidden">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>{t("filters.title")}</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-4">
              {/* Filter content */}
              <p className="text-muted-foreground text-sm">
                More filters coming soon...
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">{t("filters.title")}:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              &quot;{searchQuery}&quot;
              <button
                onClick={() => {
                  setSearchQuery("");
                  updateParams({ search: undefined });
                }}
                className="ms-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedCountry && (
            <Badge variant="secondary" className="gap-1">
              {SUPPORTED_COUNTRIES.find((c) => c.code === selectedCountry)?.flag}{" "}
              {t(`countries.${selectedCountry.toLowerCase()}`)}
              <button
                onClick={() => handleCountryChange("all")}
                className="ms-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            {t("filters.clearAll")}
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t("results", { count: initialTotal })}
        </p>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Property Grid */}
      <PropertyGrid
        properties={properties}
        onSave={handleSave}
        onUnsave={handleUnsave}
        savedPropertyIds={savedPropertyIds}
        showMatchScore={false}
        isLoading={isPending}
        emptyMessage={t("empty.title")}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={initialPage <= 1}
            onClick={() => handlePageChange(initialPage - 1)}
          >
            {t("pagination.previous")}
          </Button>
          <span className="text-sm text-muted-foreground">
            {t("pagination.page", { current: initialPage, total: totalPages })}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={initialPage >= totalPages}
            onClick={() => handlePageChange(initialPage + 1)}
          >
            {t("pagination.next")}
          </Button>
        </div>
      )}
    </div>
  );
}
