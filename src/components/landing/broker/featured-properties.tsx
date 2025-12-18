import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/marketplace/property-card";
import { getFeaturedProperties } from "@/app/[locale]/(dashboard)/properties/actions";
import { ArrowRight } from "lucide-react";

export async function FeaturedProperties() {
  const t = await getTranslations("landing.featuredProperties");
  const locale = await getLocale();

  // Fetch featured properties
  const properties = await getFeaturedProperties(6);

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
          </div>

          <Button asChild variant="outline" size="lg">
            <Link href={`/${locale}/properties`}>
              {t("viewAll")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Property Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              showMatchScore={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
