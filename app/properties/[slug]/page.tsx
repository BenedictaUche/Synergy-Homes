import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PropertyDetails } from "./property-details"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { landParcelQuery, landParcelBySlugQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const landParcels = await client.fetch(landParcelQuery)
  return landParcels.map((land: any) => ({
    slug: land.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data: land } = await sanityFetch({
    query: landParcelBySlugQuery,
    params: { slug }
  })

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
  const { data: land } = await sanityFetch({
    query: landParcelBySlugQuery,
    params: { slug }
  })

  if (!land) {
    notFound()
  }

  // Transform Sanity images to URLs
  const transformedLand = {
    ...land,
    id: land._id,
    images: land.images?.map((img: any) => urlFor(img.asset).url()) || [],
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <PropertyDetails property={transformedLand} />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
