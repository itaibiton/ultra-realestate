import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "he"],
  defaultLocale: "en",
  localePrefix: "always",
});

export const locales = routing.locales;
export type Locale = (typeof locales)[number];

// RTL locales
export const rtlLocales: Locale[] = ["he"];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
