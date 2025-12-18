import { notFound } from "next/navigation";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { PropertyGallery } from "@/components/marketplace/property-gallery";
import { PropertySpecs } from "@/components/marketplace/property-specs";
import { InvestmentHighlights } from "@/components/marketplace/investment-highlights";
import { PropertySidebar } from "@/components/marketplace/property-sidebar";
import { PropertyCard } from "@/components/marketplace/property-card";
import { getPropertyBySlug, getProperties } from "../actions";
import { MapPin, Home, CheckCircle2 } from "lucide-react";
import { formatPrice, getPropertyTypeLabel } from "@/lib/marketplace/utils";

interface PropertyDetailPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  const priceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price);

  return {
    title: `${property.title} - ${priceFormatted} | GlobalNest`,
    description: property.description || `${property.title} in ${property.city}. ${property.bedrooms} bed, ${property.bathrooms} bath property for ${priceFormatted}.`,
    openGraph: {
      title: property.title,
      description: property.description || undefined,
      images: property.images.length > 0 ? [property.images[0]] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  // Fetch similar properties
  const similarPropertiesResponse = await getProperties(
    {
      country_code: property.country_code,
      property_type: [property.property_type],
      status: "active",
    },
    undefined,
    { page: 1, limit: 4 }
  );

  // Filter out current property
  const similarProperties = similarPropertiesResponse.data.filter(
    (p) => p.id !== property.id
  ).slice(0, 3);

  const t = await getTranslations("marketplace");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${params.locale}/properties`}>
                {t("title")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{property.city}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">
                {property.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Layout: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Property Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <span className="text-lg">
                      {property.address && `${property.address}, `}
                      {property.city}
                      {property.state && `, ${property.state}`}
                      {property.neighborhood && ` - ${property.neighborhood}`}
                    </span>
                  </div>
                </div>

                {/* Desktop Price (hidden on mobile) */}
                <div className="hidden lg:block text-end">
                  <div className="text-3xl font-bold">
                    {formatPrice(property.price, property.currency, params.locale)}
                  </div>
                  {property.price_per_sqm && (
                    <div className="text-sm text-muted-foreground">
                      {formatPrice(property.price_per_sqm, property.currency, params.locale)}/m²
                    </div>
                  )}
                </div>
              </div>

              {/* Key Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Home className="h-3 w-3" />
                  {t(`propertyTypes.${property.property_type.split("_")[1] || "unknown"}`)}
                </Badge>
                {property.bedrooms !== null && (
                  <Badge variant="outline">{property.bedrooms} Bedrooms</Badge>
                )}
                {property.bathrooms !== null && (
                  <Badge variant="outline">{property.bathrooms} Bathrooms</Badge>
                )}
                {property.area_sqm !== null && (
                  <Badge variant="outline">{property.area_sqm} m²</Badge>
                )}
                {property.is_featured && (
                  <Badge variant="default">{t("badges.featured")}</Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Property Specs */}
            <PropertySpecs property={property} />

            {/* Description */}
            {property.description && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("detail.description")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Features & Amenities */}
            {(property.features.length > 0 || property.amenities.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("detail.features")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {property.features.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3 text-sm text-muted-foreground">
                        Features
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {property.amenities.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3 text-sm text-muted-foreground">
                        Amenities
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <span className="text-sm">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Investment Highlights */}
            <InvestmentHighlights property={property} />

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>{t("detail.location")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{property.city}</p>
                      <p className="text-sm text-muted-foreground">
                        {property.state && `${property.state}, `}
                        {property.country_code}
                        {property.zip_code && ` ${property.zip_code}`}
                      </p>
                    </div>
                  </div>
                  {property.neighborhood && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">Neighborhood: </span>
                        {property.neighborhood}
                      </p>
                    </div>
                  )}
                  {/* Placeholder for map - can be added later */}
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map view coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">{t("detail.similarProperties")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {similarProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="lg:col-span-1">
            <PropertySidebar property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
