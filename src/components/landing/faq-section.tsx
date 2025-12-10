import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is investing abroad safe through GlobalNest?",
    answer:
      "Safety is our priority. We only list properties from verified developers. Our marketplace connects you with vetted legal professionals who perform due diligence on every deal before you sign.",
  },
  {
    question: "I have no experience. Is this for me?",
    answer:
      'Absolutely. GlobalNest was built for the "Zero Knowledge" investor. Our AI explains every step in simple terms, and human experts handle complex details.',
  },
  {
    question: "Can I get financing for international properties?",
    answer:
      "Yes. Our Financing Hub connects you with Israeli banks offering cross-border mortgages and local lenders in the destination country.",
  },
  {
    question: "How do you vet the professionals?",
    answer:
      "Every professional undergoes strict verification, including license checks, interviews, and track record reviews with international clients.",
  },
];

export function FAQSection() {
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
          Frequently Asked Questions
        </h2>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
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
