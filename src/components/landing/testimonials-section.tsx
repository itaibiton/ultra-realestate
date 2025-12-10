import { getTranslations } from "next-intl/server";
import { TestimonialCard } from "@/components/shared";
import { cn } from "@/lib/utils";

export async function TestimonialsSection() {
  const t = await getTranslations("testimonials");

  const testimonials = [
    {
      key: "amitR",
      quote: t("items.amitR.quote"),
      name: t("items.amitR.name"),
      title: t("items.amitR.title"),
      avatarGradient: "gray" as const,
    },
    {
      key: "sarahL",
      quote: t("items.sarahL.quote"),
      name: t("items.sarahL.name"),
      title: t("items.sarahL.title"),
      avatarGradient: "blue" as const,
    },
  ];

  return (
    <section
      className={cn(
        "py-24 border-t",
        "border-gray-200 dark:border-white/5",
        "bg-gray-50/50 dark:bg-white/[0.02]"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-3xl font-semibold tracking-tight mb-16 text-center text-foreground">
          {t("title")}
        </h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.key}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              avatarGradient={testimonial.avatarGradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
