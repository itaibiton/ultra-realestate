import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout";
import {
  Hero,
  Problem,
  Solution,
  Features,
  AIShowcase,
  Testimonials,
  Pricing,
  CTA,
  Footer,
} from "@/components/landing/globalnest";

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
      <main className="bg-gn-black min-h-screen">
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <AIShowcase />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
