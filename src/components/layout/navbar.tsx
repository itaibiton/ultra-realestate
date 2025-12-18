"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { DotsThreeVertical, Sun, Moon, Desktop, Check, Globe } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// For hydration-safe theme detection
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

// Flag components
const USFlag = () => (
  <svg className="h-4 w-4 rounded-sm" viewBox="0 0 640 480">
    <g fillRule="evenodd">
      <g strokeWidth="1pt">
        <path fill="#bd3d44" d="M0 0h640v37H0zm0 74h640v37H0zm0 73h640v37H0zm0 74h640v37H0zm0 73h640v37H0zm0 74h640v36H0z"/>
        <path fill="#fff" d="M0 37h640v37H0zm0 73h640v37H0zm0 74h640v37H0zm0 73h640v37H0zm0 74h640v37H0z"/>
      </g>
      <path fill="#192f5d" d="M0 0h260v259H0z"/>
    </g>
  </svg>
);

const ILFlag = () => (
  <svg className="h-4 w-4 rounded-sm" viewBox="0 0 640 480">
    <defs>
      <clipPath id="il-a">
        <path fillOpacity=".7" d="M-87.6 0H595v512H-87.6z"/>
      </clipPath>
    </defs>
    <g fillRule="evenodd" clipPath="url(#il-a)" transform="translate(82.1) scale(.94)">
      <path fill="#fff" d="M619.4 512H-112V0h731.4z"/>
      <path fill="#0038b8" d="M619.4 115.2H-112V48h731.4zm0 350.5H-112v-67.2h731.4zm-483-275l110.1 191.6L359 191.6l-222.6-.8z"/>
      <path fill="#fff" d="M225.8 317.8l20.9 35.5 21.4-35.3-42.4-.2z"/>
      <path fill="#0038b8" d="M136 320.6L246.2 129l112.4 190.8-222.6.8z"/>
      <path fill="#fff" d="M225.8 191.6l20.9-35.5 21.4 35.4-42.4.1zm-65.5 86.3l43.2-73.7 41.6 73.5-84.8.2zm111.2.1l41.6-73.7 43.2 73.5-84.8.2zm-69.8 27.1l43.2 73.7-84.8-.2 41.6-73.5zm68.2 0l41.6 73.7-84.8-.2 43.2-73.5z"/>
    </g>
  </svg>
);

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

  const setLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const currentTheme = mounted ? theme : "system";

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
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        {/* Logo - Fixed width left section */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer w-48 shrink-0">
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

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8 text-xs font-medium text-muted-foreground">
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

        {/* Right Side Actions - Fixed width to match left */}
        <div className="flex items-center justify-end gap-3 w-48 shrink-0">
          {/* Settings Dropdown - Language + Theme */}
          <DropdownMenu modal={false}>
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
            <DropdownMenuContent align="end" className="w-48 p-2">
              {/* Theme Toggle Pills */}
              <div className="mb-2">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1">
                  Theme
                </span>
                <div className="flex items-center gap-1 mt-1.5 p-1 bg-secondary/50 rounded-lg">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all",
                      currentTheme === "light"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Sun weight={currentTheme === "light" ? "fill" : "regular"} className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all",
                      currentTheme === "system"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Desktop weight={currentTheme === "system" ? "fill" : "regular"} className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all",
                      currentTheme === "dark"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Moon weight={currentTheme === "dark" ? "fill" : "regular"} className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <DropdownMenuSeparator className="my-2" />

              {/* Language Options */}
              <div>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1">
                  Language
                </span>
                <div className="mt-1.5 space-y-1">
                  <button
                    onClick={() => setLocale("en")}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-all",
                      locale === "en"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <USFlag />
                    <span>English</span>
                    {locale === "en" && <Check weight="bold" className="h-3.5 w-3.5 ml-auto text-brand-500" />}
                  </button>
                  <button
                    onClick={() => setLocale("he")}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-all",
                      locale === "he"
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <ILFlag />
                    <span>עברית</span>
                    {locale === "he" && <Check weight="bold" className="h-3.5 w-3.5 ml-auto text-brand-500" />}
                  </button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

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
