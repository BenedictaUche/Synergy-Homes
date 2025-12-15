import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PropertyDetails } from "./property-details"
import { getLandParcelBySlug, landParcels } from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return landParcels.map((land) => ({
    slug: land.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const land = getLandParcelBySlug(slug)

  if (!land) {
    return {
      title: "Land Not Found | Synergy Homes Limited",
    }
  }

  return {
    title: `${land.name} | Synergy Homes Limited`,
    description: land.shortDescription,
  }
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const land = getLandParcelBySlug(slug)

  if (!land) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <PropertyDetails property={land} />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
