import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlobalNest | The AI Operating System for Global Real Estate Investment",
  description:
    "From zero knowledge to closed deal. GlobalNest connects Israeli investors with global properties through AI-powered matching, cross-border financing, and vetted legal experts.",
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
    title: "GlobalNest | The AI Operating System for Global Real Estate Investment",
    description:
      "From zero knowledge to closed deal. GlobalNest connects Israeli investors with global properties.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
