import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export async function FAQSection() {
  const t = await getTranslations("faq");

  const faqs = [
    {
      key: "safety",
      question: t("items.safety.question"),
      answer: t("items.safety.answer"),
    },
    {
      key: "experience",
      question: t("items.experience.question"),
      answer: t("items.experience.answer"),
    },
    {
      key: "financing",
      question: t("items.financing.question"),
      answer: t("items.financing.answer"),
    },
    {
      key: "vetting",
      question: t("items.vetting.question"),
      answer: t("items.vetting.answer"),
    },
  ];

  return (
    <section
      className={cn(
        "py-24 border-t",
        "border-gray-200 dark:border-white/5",
        "bg-white dark:bg-transparent"
      )}
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-3xl font-semibold tracking-tight mb-12 text-center text-foreground">
          {t("title")}
        </h2>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.key}
              value={`item-${index}`}
              className={cn(
                "rounded-lg border px-6 transition-all duration-300",
                "bg-white border-gray-200",
                "dark:bg-white/5 dark:border-white/5",
                "data-[state=open]:bg-gray-50 data-[state=open]:border-gray-300",
                "dark:data-[state=open]:bg-white/[0.07] dark:data-[state=open]:border-white/10"
              )}
            >
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
