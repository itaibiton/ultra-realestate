"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { DotsThreeVertical, Sun, Moon, Globe } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// For hydration-safe theme detection
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function Navbar() {
  const t = useTranslations("navbar");
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  const navLinks = [
    { href: "#how-it-works", label: t("links.howItWorks") },
    { href: "#features", label: t("links.features") },
    { href: "#pricing", label: t("links.pricing") },
    { href: "#partners", label: t("links.partners") },
  ];

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "he" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
              "bg-gradient-to-tr from-brand-600 to-brand-500 text-brand-50",
              "dark:from-brand-400 dark:to-brand-500 dark:text-brand-950"
            )}
          >
            <Globe weight="fill" className="w-[18px] h-[18px]" />
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
        <div className="flex items-center gap-3">
          {/* Settings Dropdown - Language + Theme */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:bg-accent"
                aria-label={t("settings")}
              >
                <DotsThreeVertical weight="bold" className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {/* Theme Toggle */}
              <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                {mounted && theme === "dark" ? (
                  <Sun weight="regular" className="h-4 w-4" />
                ) : (
                  <Moon weight="regular" className="h-4 w-4" />
                )}
                <span>{mounted && theme === "dark" ? t("lightMode") : t("darkMode")}</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Language Toggle */}
              <DropdownMenuItem onClick={toggleLocale} className="cursor-pointer">
                <Globe weight="regular" className="h-4 w-4" />
                <span>{locale === "en" ? t("hebrew") : t("english")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
              "shadow-lg shadow-brand-200/50 dark:shadow-none"
            )}
          >
            <Link href="/sign-up">{t("cta")}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
