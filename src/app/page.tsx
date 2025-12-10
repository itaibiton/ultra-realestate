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

export default function LandingPage() {
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
