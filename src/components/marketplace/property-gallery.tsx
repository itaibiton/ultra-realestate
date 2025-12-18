"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const displayImages = images.length > 0 ? images : ["/images/property-placeholder.jpg"];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleLightboxPrevious = () => {
    setLightboxIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="w-full space-y-3">
        {/* Main Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted group">
          <Image
            src={displayImages[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />

          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute start-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute end-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Expand Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 end-4 gap-2"
            onClick={() => openLightbox(currentIndex)}
          >
            <Maximize2 className="h-4 w-4" />
            <span>View All Photos</span>
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-4 start-4 bg-background/90 backdrop-blur text-foreground px-3 py-1.5 rounded-full text-sm font-medium">
            {currentIndex + 1} / {displayImages.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {displayImages.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {displayImages.slice(0, 5).map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-md transition-all",
                  index === currentIndex
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="20vw"
                />
              </button>
            ))}
            {displayImages.length > 5 && (
              <button
                onClick={() => openLightbox(5)}
                className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center text-sm font-medium"
              >
                +{displayImages.length - 5} more
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Sheet open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <SheetContent side="bottom" className="h-full p-0">
          <div className="relative h-full bg-black">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 end-4 z-10 text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Image Counter */}
            <div className="absolute top-4 start-1/2 -translate-x-1/2 z-10 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
              {lightboxIndex + 1} / {displayImages.length}
            </div>

            {/* Main Lightbox Image */}
            <div className="relative h-[calc(100%-120px)] w-full">
              <Image
                src={displayImages[lightboxIndex]}
                alt={`${title} - Image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Navigation */}
            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute start-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12"
                  onClick={handleLightboxPrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute end-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12"
                  onClick={handleLightboxNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Thumbnail Strip in Lightbox */}
            <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-black/80 backdrop-blur">
              <div className="h-full overflow-x-auto overflow-y-hidden">
                <div className="flex gap-2 p-4 h-full">
                  {displayImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setLightboxIndex(index)}
                      className={cn(
                        "relative h-full aspect-[4/3] flex-shrink-0 overflow-hidden rounded-md transition-all",
                        index === lightboxIndex
                          ? "ring-2 ring-white"
                          : "opacity-50 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${title} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
