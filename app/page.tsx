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
import { sanityFetch } from "@/sanity/lib/live"
import { featuredLandParcelsQuery, serviceQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

export default async function HomePage() {
  const [featuredPropertiesResult, servicesResult] = await Promise.all([
    sanityFetch({ query: featuredLandParcelsQuery }),
    sanityFetch({ query: serviceQuery }),
  ])

  // Transform featured properties
  const featuredProperties = featuredPropertiesResult.data
    ?.slice(0, 3)
    .map((land: any) => ({
      ...land,
      id: land._id,
      images: land.images?.map((img: any) => urlFor(img.asset).url()) || [],
    })) || []

  // Transform services
  const services = servicesResult.data?.map((service: any) => ({
    ...service,
    id: service._id,
  })) || []

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutPreviewSection />
      <ServicesSection services={services} />
      <FeaturedPropertiesSection featuredProperties={featuredProperties} />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </main>
  )
}
