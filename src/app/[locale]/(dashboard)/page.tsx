import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/routing";

/**
 * Dashboard Route Group Root - Redirects to /dashboard
 *
 * This ensures that accessing /{locale}/ within the dashboard route group
 * redirects to the actual dashboard page.
 */
export default async function DashboardRootPage() {
  const locale = (await getLocale()) as Locale;
  return redirect({ href: "/dashboard", locale });
}
