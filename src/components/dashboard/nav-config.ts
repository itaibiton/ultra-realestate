import {
  LayoutDashboard,
  Building2,
  Bookmark,
  Route,
  Users,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";

/** Feature color options matching the design system */
export type FeatureColor = "blue" | "purple" | "green" | "orange" | "pink" | "indigo";

/** Single navigation item */
export interface NavItem {
  /** Translation key: used as "sidebar.nav.{key}" */
  key: string;
  /** Route path (relative to locale) */
  href: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Optional accent color from design system */
  color?: FeatureColor;
  /** Optional notification badge count */
  badge?: number;
}

/** Navigation section with optional collapsibility */
export interface NavSection {
  /** Translation key: used as "sidebar.sections.{key}" */
  key: string;
  /** Items in this section */
  items: NavItem[];
  /** Whether section can be collapsed (default: false) */
  collapsible?: boolean;
}

/**
 * Main navigation configuration for the dashboard sidebar.
 * Organized into sections that can be collapsible.
 */
export const navConfig: NavSection[] = [
  {
    key: "main",
    items: [
      {
        key: "dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        color: "blue",
      },
    ],
  },
  {
    key: "properties",
    collapsible: true,
    items: [
      {
        key: "marketplace",
        href: "/properties",
        icon: Building2,
        color: "purple",
      },
      {
        key: "watchlist",
        href: "/properties/watchlist",
        icon: Bookmark,
        color: "orange",
      },
    ],
  },
  {
    key: "journey",
    collapsible: true,
    items: [
      {
        key: "status",
        href: "/journey",
        icon: Route,
        color: "green",
      },
      {
        key: "professionals",
        href: "/journey/professionals",
        icon: Users,
        color: "indigo",
      },
    ],
  },
  {
    key: "profile",
    collapsible: true,
    items: [
      {
        key: "settings",
        href: "/profile",
        icon: Settings,
      },
      {
        key: "account",
        href: "/profile/account",
        icon: User,
      },
    ],
  },
];

/** Color class mapping for nav item icons */
export const navColorClasses: Record<FeatureColor, string> = {
  blue: "text-blue-500 dark:text-blue-400",
  purple: "text-purple-500 dark:text-purple-400",
  green: "text-green-500 dark:text-green-400",
  orange: "text-orange-500 dark:text-orange-400",
  pink: "text-pink-500 dark:text-pink-400",
  indigo: "text-indigo-500 dark:text-indigo-400",
};
