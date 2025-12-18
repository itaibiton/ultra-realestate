"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Trash2, StickyNote, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PropertyCard } from "@/components/marketplace/property-card";
import { unsaveProperty, updateSavedPropertyNotes } from "../actions";
import type { PropertyWithExtras, SavedProperty } from "@/lib/marketplace/types";

interface SavedPropertyActionsProps {
  savedProperty: SavedProperty;
  property: PropertyWithExtras;
}

export function SavedPropertyActions({
  savedProperty,
  property,
}: SavedPropertyActionsProps) {
  const t = useTranslations("marketplace.saved");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState(savedProperty.notes || "");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const handleUnsave = async () => {
    startTransition(async () => {
      await unsaveProperty(property.id);
      router.refresh();
    });
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      await updateSavedPropertyNotes(property.id, notes);
      setIsNotesOpen(false);
      router.refresh();
    } finally {
      setIsSavingNotes(false);
    }
  };

  return (
    <div className="relative group/saved">
      <PropertyCard
        property={property}
        isSaved={true}
        onUnsave={handleUnsave}
      />

      {/* Actions overlay */}
      <div className="absolute bottom-4 start-4 end-4 flex gap-2 opacity-0 group-hover/saved:opacity-100 transition-opacity z-10">
        {/* Notes Dialog */}
        <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 backdrop-blur-sm bg-background/80"
            >
              <StickyNote className="h-4 w-4 me-2" />
              {t("notes")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("notes")}</DialogTitle>
              <DialogDescription>
                {property.title}
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("addNote")}
              className="min-h-32"
            />
            <DialogFooter>
              <Button
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
              >
                {isSavingNotes ? (
                  <Loader2 className="h-4 w-4 me-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 me-2" />
                )}
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Remove Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="backdrop-blur-sm"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("removeFromSaved")}</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove &quot;{property.title}&quot; from your saved properties?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUnsave}>
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Notes indicator */}
      {savedProperty.notes && (
        <div className="absolute top-2 end-12 z-10">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            onClick={() => setIsNotesOpen(true)}
          >
            <StickyNote className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
