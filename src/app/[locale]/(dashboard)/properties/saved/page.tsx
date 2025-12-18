import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/shared";
import { getSavedProperties } from "../actions";
import { SavedPropertyActions } from "./saved-property-actions";
import type { PropertyWithExtras } from "@/lib/marketplace/types";

export default async function SavedPropertiesPage() {
  const t = await getTranslations("marketplace.saved");
  const locale = await getLocale();
  const savedProperties = await getSavedProperties();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button asChild>
          <Link href={`/${locale}/properties`}>
            Browse Properties
            <ArrowRight className="ms-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Content */}
      {savedProperties.length === 0 ? (
        <GlassPanel intensity="light" className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{t("empty")}</h2>
            <p className="text-muted-foreground mb-6">
              {t("emptyDescription")}
            </p>
            <Button asChild>
              <Link href={`/${locale}/properties`}>
                {t("browseProperties")}
              </Link>
            </Button>
          </div>
        </GlassPanel>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((saved) => {
            if (!saved.property) return null;

            return (
              <SavedPropertyActions
                key={saved.id}
                savedProperty={saved}
                property={saved.property as PropertyWithExtras}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
