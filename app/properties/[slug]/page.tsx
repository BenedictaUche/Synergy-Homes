import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PropertyDetails } from "./property-details"
import { getPropertyBySlug, properties } from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    return {
      title: "Property Not Found | Prestige Estates",
    }
  }

  return {
    title: `${property.name} | Prestige Estates`,
    description: property.shortDescription,
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <PropertyDetails property={property} />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
