import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, isRTL, type Locale } from "@/i18n/routing";
import { inter, heebo } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "GlobalNest | The AI Operating System for Global Real Estate Investment",
    he: "GlobalNest | מערכת ההפעלה בבינה מלאכותית להשקעות נדל\"ן גלובליות",
  };

  const descriptions: Record<string, string> = {
    en: "From zero knowledge to closed deal. GlobalNest connects Israeli investors with global properties through AI-powered matching, cross-border financing, and vetted legal experts.",
    he: "מאפס ידע לעסקה סגורה. GlobalNest מחברת משקיעים ישראלים לנכסים גלובליים באמצעות התאמה מבוססת AI, מימון חוצה גבולות ומומחים משפטיים מאומתים.",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "real estate",
      "investment",
      "global property",
      "AI",
      "mortgage",
      "cross-border",
      "Israel",
    ],
    authors: [{ name: "GlobalNest" }],
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const rtl = isRTL(locale as Locale);
  const fontClass = locale === "he" ? heebo.variable : inter.variable;

  return (
    <html lang={locale} dir={rtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${fontClass} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
