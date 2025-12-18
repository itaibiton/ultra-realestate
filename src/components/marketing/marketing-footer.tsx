import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Globe, Linkedin, Twitter, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";

export async function MarketingFooter() {
  const t = await getTranslations("marketing");

  const footerLinks = {
    platform: {
      title: t("footer.sections.platform"),
      links: [
        { href: "/how-it-works", label: t("nav.howItWorks") },
        { href: "/marketplace", label: t("nav.properties") },
        { href: "/#features", label: t("footer.links.features") },
        { href: "/#pricing", label: t("footer.links.pricing") },
      ],
    },
    investors: {
      title: t("footer.sections.investors"),
      links: [
        { href: "/marketplace", label: t("footer.links.marketplace") },
        { href: "#", label: t("footer.links.financingHub") },
        { href: "#", label: t("footer.links.guides") },
        { href: "/dashboard", label: t("footer.links.dashboard") },
      ],
    },
    professionals: {
      title: t("footer.sections.professionals"),
      links: [
        { href: "#", label: t("footer.links.partnerProgram") },
        { href: "#", label: t("footer.links.forAgents") },
        { href: "#", label: t("footer.links.resources") },
      ],
    },
    company: {
      title: t("footer.sections.company"),
      links: [
        { href: "/about", label: t("nav.about") },
        { href: "/contact", label: t("nav.contact") },
        { href: "#", label: t("footer.links.privacy") },
        { href: "#", label: t("footer.links.terms") },
      ],
    },
  };

  return (
    <footer
      className={cn(
        "border-t pt-16 pb-8",
        "bg-white dark:bg-[#050505]",
        "border-gray-200 dark:border-white/10"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold mb-4 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-3 text-xs text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
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
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
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
            <p className="text-[10px] text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
