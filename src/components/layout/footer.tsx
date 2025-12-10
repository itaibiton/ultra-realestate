import Link from "next/link";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = {
  platform: {
    title: "Platform",
    links: [
      { href: "#how-it-works", label: "How it Works" },
      { href: "#features", label: "AI Features" },
      { href: "#pricing", label: "Pricing" },
    ],
  },
  investors: {
    title: "For Investors",
    links: [
      { href: "#", label: "Marketplace" },
      { href: "#", label: "Financing Hub" },
      { href: "#", label: "Investment Guides" },
    ],
  },
  professionals: {
    title: "For Professionals",
    links: [
      { href: "#", label: "Partner Program" },
      { href: "#", label: "Developer API" },
      { href: "#", label: "Success Stories" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Contact" },
      { href: "#", label: "Privacy Policy" },
    ],
  },
};

export function Footer() {
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
          <div className="flex items-center gap-2">
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
              GlobalNest
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground">
            &copy; {new Date().getFullYear()} GlobalNest. Empowering Israeli
            investors worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
}
