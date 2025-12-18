"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Globe, Menu, X } from "lucide-react";
import { ThemeToggle, LanguageSwitcher } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function MarketingHeader() {
  const t = useTranslations("marketing");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/marketplace", label: t("nav.properties") },
    { href: "/how-it-works", label: t("nav.howItWorks") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50",
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <Link
            href="/sign-in"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            {t("nav.signIn")}
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
            <Link href="/sign-up">{t("nav.getStarted")}</Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-white/5 bg-white dark:bg-[#050505]">
          <nav className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-white/5">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
