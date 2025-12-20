"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("marketing.contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          {t("form.successTitle")}
        </h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          {t("form.successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">{t("form.name")}</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          placeholder={t("form.namePlaceholder")}
          className="w-full"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">{t("form.email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t("form.emailPlaceholder")}
          className="w-full"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">{t("form.phone")}</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder={t("form.phonePlaceholder")}
          className="w-full"
        />
      </div>

      {/* Investor Type */}
      <div className="space-y-2">
        <Label htmlFor="investorType">{t("form.investorType")}</Label>
        <Select name="investorType" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("form.investorTypePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first-time">
              {t("form.investorTypes.firstTime")}
            </SelectItem>
            <SelectItem value="experienced">
              {t("form.investorTypes.experienced")}
            </SelectItem>
            <SelectItem value="professional">
              {t("form.investorTypes.professional")}
            </SelectItem>
            <SelectItem value="agent">
              {t("form.investorTypes.agent")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">{t("form.message")}</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t("form.messagePlaceholder")}
          className="w-full resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full h-11 text-sm font-medium",
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 me-2 animate-spin" />
            {t("form.sending")}
          </>
        ) : (
          t("form.submit")
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        {t("form.privacy")}
      </p>
    </form>
  );
}
