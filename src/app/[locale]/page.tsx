import { setRequestLocale } from "next-intl/server";
import { Navbar, Footer } from "@/components/layout";
import {
  HeroSection,
  ProblemSection,
  HowItWorksSection,
  FeaturesSection,
  AIShowcaseSection,
  PersonasSection,
  PricingSection,
  TimelineSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from "@/components/landing";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <AIShowcaseSection />
        <PersonasSection />
        <PricingSection />
        <TimelineSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
