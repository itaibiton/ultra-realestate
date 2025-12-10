import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export async function Footer() {
  const t = await getTranslations("footer");

  const footerLinks = {
    platform: {
      title: t("sections.platform.title"),
      links: [
        { href: "#how-it-works", label: t("sections.platform.links.howItWorks") },
        { href: "#features", label: t("sections.platform.links.features") },
        { href: "#pricing", label: t("sections.platform.links.pricing") },
      ],
    },
    investors: {
      title: t("sections.investors.title"),
      links: [
        { href: "#", label: t("sections.investors.links.marketplace") },
        { href: "#", label: t("sections.investors.links.financingHub") },
        { href: "#", label: t("sections.investors.links.guides") },
      ],
    },
    professionals: {
      title: t("sections.professionals.title"),
      links: [
        { href: "#", label: t("sections.professionals.links.partnerProgram") },
        { href: "#", label: t("sections.professionals.links.developerApi") },
        { href: "#", label: t("sections.professionals.links.successStories") },
      ],
    },
    company: {
      title: t("sections.company.title"),
      links: [
        { href: "#", label: t("sections.company.links.about") },
        { href: "#", label: t("sections.company.links.contact") },
        { href: "#", label: t("sections.company.links.privacy") },
      ],
    },
  };

  return (
    <footer
      className={cn(
        "border-t pt-20 pb-10",
        "bg-white dark:bg-[#050505]",
        "border-gray-200 dark:border-white/10"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold mb-6 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-4 text-xs text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className={cn(
            "border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4",
            "border-gray-200 dark:border-white/5"
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            <div
              className={cn(
                "w-6 h-6 rounded flex items-center justify-center shadow-sm",
                "bg-gradient-to-tr from-gray-900 to-gray-700 text-white",
                "dark:from-gray-100 dark:to-gray-500 dark:text-black"
              )}
            >
              <Globe className="w-[14px] h-[14px]" />
            </div>
            <span className="font-semibold text-sm text-foreground">
              {t("brand")}
            </span>
          </Link>
          <div className="text-[10px] text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}
