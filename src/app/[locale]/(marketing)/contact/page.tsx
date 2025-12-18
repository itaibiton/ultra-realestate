import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ContactForm } from "@/components/marketing";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  Linkedin,
  Twitter,
} from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("marketing.contact");

  const offices = [
    {
      city: t("offices.newYork.city"),
      address: t("offices.newYork.address"),
      phone: t("offices.newYork.phone"),
      email: t("offices.newYork.email"),
      hours: t("offices.newYork.hours"),
      icon: MapPin,
    },
    {
      city: t("offices.telAviv.city"),
      address: t("offices.telAviv.address"),
      phone: t("offices.telAviv.phone"),
      email: t("offices.telAviv.email"),
      hours: t("offices.telAviv.hours"),
      icon: MapPin,
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: t("methods.phone.title"),
      value: t("methods.phone.value"),
      description: t("methods.phone.description"),
      action: `tel:${t("methods.phone.value")}`,
    },
    {
      icon: Mail,
      title: t("methods.email.title"),
      value: t("methods.email.value"),
      description: t("methods.email.description"),
      action: `mailto:${t("methods.email.value")}`,
    },
    {
      icon: MessageSquare,
      title: t("methods.chat.title"),
      value: t("methods.chat.value"),
      description: t("methods.chat.description"),
      action: "#",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-transparent dark:from-green-950/20 dark:to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.action}
                className={cn(
                  "group bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10",
                  "rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary"
                )}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{method.title}</h3>
                <p className="text-primary font-medium mb-2">{method.value}</p>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </a>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {t("form.title")}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t("form.description")}
              </p>
              <ContactForm />
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {t("offices.title")}
              </h2>
              <div className="space-y-6">
                {offices.map((office) => (
                  <div
                    key={office.city}
                    className="bg-gray-50 dark:bg-white/5 rounded-xl p-6 border border-gray-200 dark:border-white/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3">
                          {office.city}
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{office.address}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <a
                              href={`tel:${office.phone}`}
                              className="hover:text-primary transition-colors"
                            >
                              {office.phone}
                            </a>
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <a
                              href={`mailto:${office.email}`}
                              className="hover:text-primary transition-colors"
                            >
                              {office.email}
                            </a>
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{office.hours}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  {t("social.title")}
                </h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-gray-50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">{t("map.placeholder")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t("faq.description")}
          </p>
          <Link
            href="/how-it-works#faq"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {t("faq.link")}
            <span className="text-xl">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
