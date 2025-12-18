import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Building2,
  FileCheck,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
  Globe,
} from "lucide-react";

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HowItWorksContent />;
}

function HowItWorksContent() {
  const t = useTranslations("marketing.howItWorks");

  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: t("steps.profile.title"),
      description: t("steps.profile.description"),
      details: [
        t("steps.profile.details.goals"),
        t("steps.profile.details.budget"),
        t("steps.profile.details.preferences"),
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      icon: Building2,
      title: t("steps.browse.title"),
      description: t("steps.browse.description"),
      details: [
        t("steps.browse.details.ai"),
        t("steps.browse.details.verified"),
        t("steps.browse.details.detailed"),
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "03",
      icon: FileCheck,
      title: t("steps.insights.title"),
      description: t("steps.insights.description"),
      details: [
        t("steps.insights.details.market"),
        t("steps.insights.details.legal"),
        t("steps.insights.details.financial"),
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      number: "04",
      icon: Users,
      title: t("steps.connect.title"),
      description: t("steps.connect.description"),
      details: [
        t("steps.connect.details.agents"),
        t("steps.connect.details.lawyers"),
        t("steps.connect.details.advisors"),
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "05",
      icon: CheckCircle2,
      title: t("steps.close.title"),
      description: t("steps.close.description"),
      details: [
        t("steps.close.details.documents"),
        t("steps.close.details.secure"),
        t("steps.close.details.support"),
      ],
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const investorBenefits = [
    {
      icon: Sparkles,
      title: t("forInvestors.benefits.personalized.title"),
      description: t("forInvestors.benefits.personalized.description"),
    },
    {
      icon: Shield,
      title: t("forInvestors.benefits.vetted.title"),
      description: t("forInvestors.benefits.vetted.description"),
    },
    {
      icon: TrendingUp,
      title: t("forInvestors.benefits.insights.title"),
      description: t("forInvestors.benefits.insights.description"),
    },
    {
      icon: Globe,
      title: t("forInvestors.benefits.global.title"),
      description: t("forInvestors.benefits.global.description"),
    },
  ];

  const agentBenefits = [
    {
      icon: Users,
      title: t("forAgents.benefits.qualified.title"),
      description: t("forAgents.benefits.qualified.description"),
    },
    {
      icon: FileCheck,
      title: t("forAgents.benefits.tools.title"),
      description: t("forAgents.benefits.tools.description"),
    },
    {
      icon: TrendingUp,
      title: t("forAgents.benefits.network.title"),
      description: t("forAgents.benefits.network.description"),
    },
  ];

  const faqs = [
    {
      question: t("faq.items.0.question"),
      answer: t("faq.items.0.answer"),
    },
    {
      question: t("faq.items.1.question"),
      answer: t("faq.items.1.answer"),
    },
    {
      question: t("faq.items.2.question"),
      answer: t("faq.items.2.answer"),
    },
    {
      question: t("faq.items.3.question"),
      answer: t("faq.items.3.answer"),
    },
    {
      question: t("faq.items.4.question"),
      answer: t("faq.items.4.answer"),
    },
    {
      question: t("faq.items.5.question"),
      answer: t("faq.items.5.answer"),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {t("hero.description")}
            </p>
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
                {t("hero.cta")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("steps.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("steps.description")}
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  "flex flex-col md:flex-row gap-8 items-center",
                  index % 2 === 1 && "md:flex-row-reverse"
                )}
              >
                {/* Icon and Number */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div
                      className={cn(
                        "w-24 h-24 rounded-2xl flex items-center justify-center",
                        "bg-gradient-to-br shadow-lg",
                        step.color
                      )}
                    >
                      <step.icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Investors Section */}
      <section className="py-20 bg-gray-50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("forInvestors.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("forInvestors.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {investorBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Agents Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("forAgents.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("forAgents.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {agentBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 rounded-xl p-6 border border-gray-200 dark:border-white/10"
              >
                <div className="w-12 h-12 rounded-lg bg-foreground text-background flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
            >
              <Link href="/contact">{t("forAgents.cta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("faq.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("faq.description")}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
              <Link href="/sign-up">{t("cta.primary")}</Link>
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
