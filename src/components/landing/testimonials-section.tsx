import { TestimonialCard } from "@/components/shared";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "I wanted to buy in Cyprus but was terrified of the legal complexities. GlobalNest connected me with a local lawyer and a lender in 24 hours. The deal was seamless.",
    name: "Amit R.",
    title: "Tech Investor, Tel Aviv",
    avatarGradient: "gray" as const,
  },
  {
    quote:
      "This platform cuts my administrative time in half. The clients come prepared, documents are organized, and the AI handles the basic questions. It's a game changer.",
    name: "Sarah L.",
    title: "Real Estate Attorney",
    avatarGradient: "blue" as const,
  },
];

export function TestimonialsSection() {
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
          Trusted by Investors and Experts
        </h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
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
