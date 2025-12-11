"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { ThemeToggle, LanguageSwitcher } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("navbar");

  const navLinks = [
    { href: "#how-it-works", label: t("links.howItWorks") },
    { href: "#features", label: t("links.features") },
    { href: "#pricing", label: t("links.pricing") },
    { href: "#partners", label: t("links.partners") },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50",
        "border-b border-gray-200 dark:border-white/5",
        "bg-white/80 dark:bg-[#050505]/80",
        "backdrop-blur-md",
        "transition-colors duration-300"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shadow-md",
              "bg-gradient-to-tr from-gray-900 to-gray-700 text-white",
              "dark:from-gray-100 dark:to-gray-500 dark:text-black"
            )}
          >
            <Globe className="w-[18px] h-[18px]" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-foreground">
            {t("brand")}
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />

          <Link
            href="/sign-in"

            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            {t("login")}
          </Link>

          <Button
            asChild
            size="sm"
            className={cn(
              "h-8 px-4 text-xs font-medium rounded-full",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90",
              "shadow-lg shadow-gray-200/50 dark:shadow-none"
            )}
          >
            <a href="#">{t("cta")}</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
