import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ScrollToTop } from "@/components/scroll-to-top"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutPreviewSection } from "@/components/sections/about-preview-section"
import { ServicesSection } from "@/components/sections/services-section"
import { FeaturedPropertiesSection } from "@/components/sections/featured-properties-section"
import { StatsSection } from "@/components/sections/stats-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutPreviewSection />
      <ServicesSection />
      <FeaturedPropertiesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </main>
  )
}
