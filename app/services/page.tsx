import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { sanityFetch } from "@/sanity/lib/live"
import { serviceQuery } from "@/sanity/lib/queries"
import { ServicesPageClient } from "./services-page-client"

interface Service {
  _id: string
  title: string
  description: string
  features: string[]
  icon: string
}

export default async function ServicesPage() {
  const { data: services } = await sanityFetch({ query: serviceQuery })

  // Transform services to match expected format
  const transformedServices = (services || []).map((service: Service) => ({
    ...service,
    id: service._id,
  }))

  return <ServicesPageClient services={transformedServices} />
}
