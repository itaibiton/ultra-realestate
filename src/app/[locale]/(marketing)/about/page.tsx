import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Target,
  Heart,
  Shield,
  Lightbulb,
  Users,
  Globe,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("marketing.about");

  const values = [
    {
      icon: Shield,
      title: t("values.trust.title"),
      description: t("values.trust.description"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lightbulb,
      title: t("values.transparency.title"),
      description: t("values.transparency.description"),
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Award,
      title: t("values.expertise.title"),
      description: t("values.expertise.description"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: t("values.empowerment.title"),
      description: t("values.empowerment.description"),
      color: "from-red-500 to-rose-500",
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: t("stats.investors"),
    },
    {
      number: "$500M+",
      label: t("stats.properties"),
    },
    {
      number: "15+",
      label: t("stats.markets"),
    },
    {
      number: "500+",
      label: t("stats.professionals"),
    },
  ];

  const team = [
    {
      name: t("team.ceo.name"),
      role: t("team.ceo.role"),
      bio: t("team.ceo.bio"),
      image: "/placeholder-team-1.jpg",
    },
    {
      name: t("team.cto.name"),
      role: t("team.cto.role"),
      bio: t("team.cto.bio"),
      image: "/placeholder-team-2.jpg",
    },
    {
      name: t("team.coo.name"),
      role: t("team.coo.role"),
      bio: t("team.coo.bio"),
      image: "/placeholder-team-3.jpg",
    },
    {
      name: t("team.head.name"),
      role: t("team.head.role"),
      bio: t("team.head.bio"),
      image: "/placeholder-team-4.jpg",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent" />
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

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                {t("mission.badge")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("mission.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t("mission.description")}
              </p>
              <p className="text-lg text-muted-foreground">
                {t("mission.vision")}
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Globe className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50 dark:bg-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("story.title")}
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-muted-foreground">{t("story.paragraph1")}</p>
            <p className="text-muted-foreground">{t("story.paragraph2")}</p>
            <p className="text-muted-foreground">{t("story.paragraph3")}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("values.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("values.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl p-6 text-center"
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center",
                    "bg-gradient-to-br shadow-lg",
                    value.color
                  )}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("team.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("team.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="group bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("partners.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("partners.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-video bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center"
              >
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className={cn(
                "h-12 px-8 text-base font-medium rounded-full",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90",
                "shadow-lg"
              )}
            >
              <Link href="/sign-up">
                {t("cta.primary")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base rounded-full"
            >
              <Link href="/contact">{t("cta.secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
